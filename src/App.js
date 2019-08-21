import React from 'react';
import './App.css';
import MyHeader from "./components/layout/myheader/MyHeader";
import {MyFooter} from "./components/layout/footer/MyFooter";
import UserLoginContainer from "./containers/security/UserSignInContainer";


const App = () =>(
    <div className="App">
            <MyHeader/>
            <UserLoginContainer/>
            <MyFooter/>

    </div>
);

export default App;

