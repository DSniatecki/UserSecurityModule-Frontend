import React, {Component} from "react";
import UserLogin from "./login/UserLogin";
import UserRegistration from "./registration/UserRegistration";
import ForgotPassword from "./forgotpassword/ForgotPassword";
import {Button} from "antd";

export const currentOperation = {
    LOGIN: 1,
    REGISTRATION: 2,
    FORGOT_PASSWORD: 3,
};


class UserSecurityModule extends Component {

    state = {
        status : currentOperation.LOGIN
    };

    changeToLogin = () =>{

    };

    changeModuleStatus = (newStatus) =>{
        this.setState({
            status : newStatus
        })
    };

    render() {
        let body = null;

        if (this.state.status === currentOperation.LOGIN) {
            body = (
                <div style={{height: 255}}>
                    <UserLogin onModuleStatusChange={this.changeModuleStatus}/>
                </div>)
        } else if (this.state.status === currentOperation.REGISTRATION) {
            body = <div>
                        <UserRegistration onModuleStatusChange={this.changeModuleStatus} />
                    </div>
        } else if (this.state.status === currentOperation.FORGOT_PASSWORD) {
            body = <div>
                <ForgotPassword/>
                    <Button style={{ width: '100%'}}
                        onClick={()=>this.changeModuleStatus(currentOperation.LOGIN)}> Return </Button>
                </div>
        }

        return (
            <div style={{
                minWidth: '230px',
                maxWidth: '500px',
                margin: 'auto',
                border: '1px solid #d5d5d5',
                borderRadius: 10,
                padding: 23
            }}>
                {body}
            </div>
        );
    }
}

export default UserSecurityModule;
