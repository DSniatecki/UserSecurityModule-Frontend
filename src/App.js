import React from 'react';
import './App.css';
import {Layout} from 'antd';
import MyHeader from "./components/layout/myheader/MyHeader";
import {MyFooter} from "./components/layout/footer/MyFooter";
import UserLoginContainer from "./containers/security/UserLoginContainer";

const { Content} = Layout;

const App = () =>(
    <div className="App">
        <Layout className="layout">
            <MyHeader/>
            <Content className="Content">
                    <UserLoginContainer/>
            </Content>
            <MyFooter/>
        </Layout>
    </div>
);

export default App;

