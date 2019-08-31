import {logoutUser} from "../../../../redux/actions/securityActions";
import {connect} from "react-redux";
import {Button, Icon, message} from "antd";
import {withRouter} from "react-router-dom";
import React from "react";

export const LogoutButton = (props) => {

    const handleLogout = () => {
        props.logoutUser();
        message.success('You have been logged out.', 3);
        props.history.replace("/");

    };

    return (
        <Button type="primary" onClick={handleLogout}> Logout </Button>
    );
};


const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser())
});

export default withRouter(connect(null, mapDispatchToProps)(LogoutButton));
