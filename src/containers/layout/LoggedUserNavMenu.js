import React, {Component} from "react";
import '../../components/layout/navbar/Navbar.css';
import {connect} from "react-redux";
import {Icon, Menu, message} from "antd";
import {Link} from "react-router-dom";
import {logoutUser} from "../../redux/actions/securityActions";

const SubMenu = Menu.SubMenu;

class LoggedUserNavMenu extends Component {

    handleLogout = () => {
        this.props.logoutUser();
        message.success('You have been logged out.', 3);
        this.props.onClick();
    };

    render() {
        return (
            <div>
                <Menu mode={this.props.mode} selectable={false}>
                        <SubMenu
                            key="sub1"
                            title={
                                <span> <Icon type="user" /> {this.props.username}</span>
                            }>
                            <Menu.Item key="1">
                                <Link to="/account" onClick={this.props.onClick}> <Icon type="idcard" /> Account </Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to="/account/settings" onClick={this.props.onClick}> <Icon type="setting" /> Settings </Link>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Link to="/" onClick={this.handleLogout}> <Icon type="logout" /> Logout </Link>
                            </Menu.Item>
                        </SubMenu>
                </Menu>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    username: state.security.username,
});

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoggedUserNavMenu);
