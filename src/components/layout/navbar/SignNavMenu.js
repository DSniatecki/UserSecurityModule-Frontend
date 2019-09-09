import React from 'react';
import {Menu} from 'antd';
import {NavLink} from "react-router-dom";


export const  SignNavMenu = (props) => (
    <Menu mode={props.mode} selectable={false}>
        <Menu.Item key="signin">
            <NavLink to="/signin" exact activeStyle={{color: '#1890ff'}} onClick={props.onClick}> Sign
                in </NavLink>
        </Menu.Item>
        <Menu.Item key="signup">
            <NavLink to="/signup" exact activeStyle={{color: '#1890ff'}} onClick={props.onClick}> Sign
                up </NavLink>
        </Menu.Item>
    </Menu>
);

