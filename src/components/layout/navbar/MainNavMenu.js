import React from 'react';
import {Icon, Menu} from 'antd';
import {NavLink} from "react-router-dom";

export const MainNavMenu = (props) => (
    <Menu mode={props.mode} selectable={false}>
        <Menu.Item key="home">
            <NavLink to="/" exact activeStyle={{color: '#1890ff'}} onClick={props.onClick}> <Icon type="home" /> Home </NavLink>
        </Menu.Item>
    </Menu>
);
