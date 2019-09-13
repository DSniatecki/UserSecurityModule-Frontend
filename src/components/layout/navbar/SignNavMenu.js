import React from 'react';
import {Icon, Menu} from 'antd';
import {NavLink} from "react-router-dom";


export const  SignNavMenu = (props) => (
    <Menu mode={props.mode} selectable={false}>
        <Menu.Item key="signin">
            <NavLink to="/signin" exact activeStyle={{color: '#1890ff'}} onClick={props.onClick}>
                <Icon type="login" /> Sign in </NavLink>
        </Menu.Item>
        <Menu.Item key="signup">
            <NavLink to="/signup" exact activeStyle={{color: '#1890ff'}} onClick={props.onClick}>
                <Icon type="user-add" /> Sign up </NavLink>
        </Menu.Item>
    </Menu>
);

