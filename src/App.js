import React from 'react';
import './App.css';
import {Link, Route, Switch} from 'react-router-dom';
import UserSecurityModule from "./containers/user/security/UserSecurityModule";
import {PageNotFound} from "./components/layout/PageNotFound";


const App = () =>(
        <div className="App">
                <Switch>
                        <Route path="/" exact render={()=> <div><h1> SWEET HOME ALABAMA </h1>
                                <p> <Link to="/login" > SIGN IN </Link> </p>
                                <p> <Link to={{
                                        pathname: '/login',
                                        hash: '#create-account'}} > SIGN UP </Link></p>
                                <p> <Link to={{
                                        pathname: '/login',
                                        hash: '#recover-password'}} > RECOVER PASSWORD </Link></p>
                        </div>}/>
                        <Route path="/login" exact component={UserSecurityModule}/>
                        <Route component={PageNotFound}/>
                </Switch>
        </div>
);

export default App;

