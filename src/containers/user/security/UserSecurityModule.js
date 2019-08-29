import React, {Component} from "react";
import UserLogin from "./login/UserLogin";
import UserRegistration from "./registration/UserRegistration";
import PasswordRecovery from "./forgotpassword/PasswordRecovery";
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
            body = (<div style={{minHeight: 255}}>
                        <UserLogin onModuleStatusChange={this.changeModuleStatus}/>
                    </div>)
        } else if (this.state.status === currentOperation.REGISTRATION) {
            body = (<UserRegistration onModuleStatusChange={this.changeModuleStatus} />);
        } else if (this.state.status === currentOperation.FORGOT_PASSWORD) {
            body = (<PasswordRecovery onModuleStatusChange={this.changeModuleStatus}/>);
        }

        return (
            <div style={{
                minWidth: '230px',
                maxWidth: '500px',
                margin: 'auto',
                border: '1px solid #d5d5d5',
                borderRadius: 10,
                padding: '13px 23px 23px 23px'
            }}>
                 {body}
            </div>
        );
    }
}

export default UserSecurityModule;
