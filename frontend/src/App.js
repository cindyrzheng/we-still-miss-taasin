import React from 'react';
import logo from './logo.svg';
import './App.css';
import RegisterRushee from "./Components/registerRushee.js";
import CheckInSuccess from "./Components/checkInSuccess.js"
import CheckIn from "./Components/checkIn.js";
import WelcomeScreen from "./Components/welcomeScreen.js";
import RegisterReturningRushee from "./Components/registerReturningRushee.js";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <main>
            <Switch>
                <Route path="/" component={WelcomeScreen} exact />
                <Route path="/checkin" component={CheckIn} />
                <Route path="/new" component={RegisterRushee} />
                <Route path="/returning" component={RegisterReturningRushee} />
                <Route path="/thanks" component={CheckInSuccess} />
                <Route path="/thanks/checkin" component={CheckIn} />
            </Switch>
        </main>
  );
}

export default App;