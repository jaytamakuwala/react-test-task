import axios from 'axios';
import { NotificationManager } from 'react-notifications';

const signUp = async (data) => {
    try {
        const response = await axios.post('http://localhost:4000/auth/signup', data);
        NotificationManager.success('Account Created');
        return response;
    }
    catch (err) {
        NotificationManager.error(err.response.data);
        return err;
    }
}


const signIn = async (data) => {
    try {
        const response = await axios.post('http://localhost:4000/auth/signIn', data);
        localStorage.setItem('user_id', response?.data?.data?._id)
        localStorage.setItem('name', response?.data?.data?.name)
        localStorage.setItem('email', response?.data?.data?.email)
        localStorage.setItem('token', response?.data?.token)
        NotificationManager.success('Login Sucessfull');
        return response;
    }
    catch (err) {
        NotificationManager.error(err.response.data);
        return err;
    }
}

export {
    signUp,
    signIn
}