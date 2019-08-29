import React from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import UserSecurityModule from "./containers/user/security/UserSecurityModule";


const App = () =>(
    <BrowserRouter>
        <div className="App">
        <br/>
        <br/>
                <UserSecurityModule/>
        </div>
    </BrowserRouter>
);

export default App;

