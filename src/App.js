import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import UserFrontSecurityModule from "./containers/user/security/outer/UserFrontSecurityModule";
import {PageNotFound} from "./components/layout/PageNotFound";
import HomePage from "./containers/layout/HomePage";


class App extends Component {

    render() {
        return (
            <div className="App">
            <br/>
                <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/login" exact component={UserFrontSecurityModule}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </div>
        );
    }
}

export default App;

