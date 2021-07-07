import { useHistory } from "react-router-dom";
import './dashboard.css'

const DashboardComponent = () => {

    const history = useHistory();
    const user = localStorage.getItem('name');

    if (!user) {
        history.push('/signin')
    }

    return (
        <>
            <div className="dashboard">
                <h1>Dashboard </h1>
                <h3>Welcome {user}!!</h3>
            </div>
        </>
    )
}

export default DashboardComponent;