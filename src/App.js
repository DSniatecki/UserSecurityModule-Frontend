import React, {Component} from 'react';
import './App.css';
import {Redirect, Route, Switch} from 'react-router-dom';
import UserFrontSecurityModule from "./containers/user/security/outer/UserFrontSecurityModule";
import {PageNotFound} from "./components/layout/PageNotFound";
import HomePage from "./containers/layout/HomePage";
import Navbar from "./containers/layout/Navbar";
import {connect} from "react-redux";
import AccountPage from "./containers/layout/AccountPage";
import AccountSettingsPage from "./containers/layout/AccountSettingsPage";


class App extends Component {

    renderRoutes() {
        if(this.props.isUserAuthenticated){
            return this.renderSecuredRoutes()
        }else{
            return this.renderPublicRoutes();
        }
    }

    renderSecuredRoutes(){
      return  <Switch>
            <Redirect path="/signup" exact to="/"/>
            <Redirect path="/signin" exact to="/"/>
            <Route path="/" exact component={HomePage}/>
            <Route path="/account" exact component={AccountPage} />
            <Route path="/account/settings" exact component={AccountSettingsPage} />
            <Route component={PageNotFound}/>
        </Switch>
    }

    renderPublicRoutes(){
      return  <Switch>
            <Redirect path="/account" to="/signin"/>
            <Route path="/" exact component={HomePage}/>
            <Route path="/signup" exact component={UserFrontSecurityModule}/>
            <Route path="/signin" exact component={UserFrontSecurityModule}/>
            <Route component={PageNotFound}/>
        </Switch>
    }


    render() {
        return (
            <div className="App">
                <Navbar/>
                <br/>
                {this.renderRoutes()}
            </div>
        );
    }


}

const mapStateToProps = (state) => ({
    isUserAuthenticated: state.security.isUserAuthenticated,
});

export default connect(mapStateToProps)(App);

