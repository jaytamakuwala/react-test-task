import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { NotificationContainer } from 'react-notifications';

import DashboardComponent from './Component/DashboardContainer/Dashboard';
import SignInComponent from './Component/SignInContainer/SignIn';
import SignUpComponent from './Component/SignUpContainer/SignUp';

import 'react-notifications/lib/notifications.css';

function App() {

  window.addEventListener("beforeunload", (ev) => {
    localStorage.clear();
  });

  return (
    <Router>
      <Switch>
        <Route path="/signin">
          <SignInComponent />
        </Route>
        <Route path="/signup">
          <SignUpComponent />
        </Route>
        <Route exact path="/">
          <DashboardComponent />
        </Route>
      </Switch>
      <NotificationContainer />
    </Router>
  );
}

export default App;
