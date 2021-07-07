const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthModel = require('./auth.model');

const SALT_ROUNDS = 10;
const TOKEN_SECRET = 'kotoamatsukame';

module.exports.signUp = async function (req, res) {
    const {
        name,
        email,
        password,
        confirm_password,
        phone_number
    } = req.body;

    const regex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    if (!name || !email || !password || !confirm_password || !phone_number) {
        res.status(409).send('All fields are required');
    } else if (password !== confirm_password) {
        res.status(400).send('password and confirm password does not match');
    } else if (!regex.test(password)) {
        res.status(400).send('password is invalid');
    } else {
        const isExist = await AuthModel.findOne({ email }).lean();
        if (!isExist) {
            const HashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            const newUser = new AuthModel({
                name,
                email,
                password: HashedPassword,
                phone_number
            });
            const savedUser = await newUser.save();
            res.status(201).send(savedUser);
        }
        else {
            res.status(400).send('user already exists');
        }
    }
}

module.exports.signIn = async function (req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(409).send('All fields are required');
    } else {

        const userDetail = await AuthModel.findOne({ email }).lean();
        if (userDetail && userDetail !== null && userDetail !== undefined) {
            const passwordhash = userDetail.password;
            const compare = await bcrypt.compare(password, passwordhash);
            if (compare) {

                const token = jwt.sign({ _id: userDetail.email.toLowerCase() }, TOKEN_SECRET);

                res.status(200).json({
                    status: true,
                    data: userDetail,
                    token,
                });

            } else {
                res.status(401).send('Invalid credentials');
            }
        } else {
            res.status(404).send('User does not exist');
        }
    }
}