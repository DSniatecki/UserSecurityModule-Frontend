import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import UserFrontSecurityModule from "./containers/user/security/outer/UserFrontSecurityModule";
import {PageNotFound} from "./components/layout/PageNotFound";
import HomePage from "./containers/layout/HomePage";
import Navbar from "./containers/layout/Navbar";
import {connect} from "react-redux";


class App extends Component {

    render() {
        return (
            <div className="App">
                <Navbar/>
                <br/>
                <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/signup" exact component={UserFrontSecurityModule}/>
                    <Route path="/signin" exact component={UserFrontSecurityModule}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isUserAuthenticated: state.security.isUserAuthenticated,
});

export default connect(mapStateToProps)(App);

