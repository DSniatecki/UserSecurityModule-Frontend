import React from 'react';
import './MyHeader.css'
import {Layout} from 'antd';

const { Header} = Layout;

const MyHeader = () =>(
    <Header className="MyHeader">
        <p> User Security Module </p>
    </Header>
);

export default MyHeader;
