import React, {Component} from "react";
import UserLogin from "./login/UserLogin";
import UserRegistration from "./registration/UserRegistration";
import PasswordRecovery from "./forgotpassword/PasswordRecovery";

export const currentOperation = {
    LOGIN: 1,
    REGISTRATION: 2,
    FORGOT_PASSWORD: 3,
};


class UserSecurityModule extends Component {

    constructor(props){
        super(props);
        if((this.props.location.hash==='#create-account')){
            this.state = {status: currentOperation.REGISTRATION}
        }else {
            this.state = {status: currentOperation.LOGIN}
        }
    }

    changeModuleStatus = (newStatus) =>{
        this.setState({
            status : newStatus
        })
    };


    renderBody() {
        switch (this.state.status) {
            case currentOperation.LOGIN:
                return (<div style={{minHeight: 255}}>
                            <UserLogin onModuleStatusChange={this.changeModuleStatus}/>
                        </div>);
            case currentOperation.REGISTRATION:
                return (<UserRegistration onModuleStatusChange={this.changeModuleStatus}/>);
            case currentOperation.FORGOT_PASSWORD:
                return (<PasswordRecovery onModuleStatusChange={this.changeModuleStatus}/>);
            default: return null
        }
    }

    render() {
        let body = this.renderBody();

        return (
            <div style={{
                minWidth: '230px',
                maxWidth: '500px',
                margin: 'auto',
                border: '1px solid #d5d5d5',
                borderRadius: 10,
                padding: '10px 23px 23px 23px'
            }}>
                 {body}
            </div>
        );
    }


}

export default UserSecurityModule;
