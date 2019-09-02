import React, {Component} from 'react';
import {connect} from "react-redux";
import {UserLoginForm} from "./UserLoginForm";
import {Button, Icon, Result, Spin, message} from "antd";
import {currentOperation} from "../UserFrontSecurityModule";
import {authenticateUser} from "../../../../../redux/actions/securityActions";
import {withRouter} from "react-router-dom";
import axios from "axios";

const currentLoginStatus = {
    LOGIN: 'LOGIN',
    WAITING: 'WAITING',
    INVALID_DATA: 'INVALID_DATA',
    ERROR: 'ERROR',
};

class UserLogin extends Component {

    state = {
        status: currentLoginStatus.LOGIN
    };

    onTryAgain = () => this.setState({status: currentLoginStatus.LOGIN});

    handleLogin = (user) => {
        this.setState({status: currentLoginStatus.WAITING}, () => {
            axios.post('/users/signin', {username: user.username, password: user.password})
                .then((response) => {
                    this.handleLoginSuccess(response, user);
                })
                .catch((error) => {
                    this.handleLoginError(error);
                });
        });
    };


    handleLoginSuccess(response, user) {
        this.props.authenticateUser(response.data.token, user.username);
        message.success('You have been successfully logged in.', 2);
        this.props.history.replace('/');
    }

    handleLoginError(error) {
        if (!error.response) {
            this.setState({status: currentLoginStatus.ERROR});
        } else if (error.response.status === 401 || error.response.status === 400) {
            this.setState({status: currentLoginStatus.INVALID_DATA});
        } else {
            this.setState({status: currentLoginStatus.ERROR});
        }
    }

    renderBody() {
        switch (this.state.status) {
            case currentLoginStatus.LOGIN:
                return this.renderLoginFormPlaceHolder();
            case currentLoginStatus.WAITING:
                return this.renderLoadingSpinner();
            case currentLoginStatus.INVALID_DATA:
                return this.renderInvalidDataMessage();
            case currentLoginStatus.ERROR:
                return this.renderErrorMessage();
            default:
                return null;
        }
    }

    renderLoginFormPlaceHolder() {
        return (
            <div>
                <h3 style={{textAlign: 'center', padding: '5px', fontSize: '20px'}}> LOG IN </h3>
                <UserLoginForm onLogin={this.handleLogin} onForgotPassword={
                    () => this.props.onModuleStatusChange(currentOperation.FORGOT_PASSWORD)}/>
                <Button style={{width: '100%'}}
                        onClick={() => this.props.onModuleStatusChange(currentOperation.REGISTRATION)}
                > Create New Account </Button>
            </div>
        );
    }

    renderLoadingSpinner() {
        return (
            <div style={{textAlign: 'center', padding: '80px'}}>
                <Spin indicator={<Icon type="loading" style={{fontSize: 80}} spin/>}/>
            </div>
        );
    }

    renderInvalidDataMessage() {
        return (
            <div style={{textAlign: 'center'}}>
                <Result status="error"
                        style={{padding: '20px'}}
                        title="Invalid user data!"/>
                <br/>
                <Button onClick={this.onTryAgain}> Try to Login Again </Button>
            </div>
        );
    }

    renderErrorMessage() {
        return (
            <div style={{textAlign: 'center'}}>
                <Result status="warning"
                        style={{padding: '20px'}}
                        subTitle="There are some problems with your operation. Try again later."/>
                <Button onClick={this.onTryAgain}> Try to Login Again </Button>
            </div>
        );
    }

    render() {
        const body = this.renderBody();
        return (
            <div>
                {body}
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    authenticateUser: (receivedSecurityToken, username) => dispatch(authenticateUser(receivedSecurityToken, username))
});

const userLogin = connect(null, mapDispatchToProps)(UserLogin);
export default withRouter(userLogin);
