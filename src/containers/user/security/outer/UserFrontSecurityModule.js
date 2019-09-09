import React, {Component} from "react";
import UserLogin from "./login/UserLogin";
import UserRegistration from "./registration/UserRegistration";
import PasswordRecovery from "./forgotpassword/PasswordRecovery";

export const currentOperation = {
    LOGIN: 1,
    REGISTRATION: 2,
    FORGOT_PASSWORD: 3,
};


class UserFrontSecurityModule extends Component {

    constructor(props) {
        super(props);
        if (this.props.location.pathname === '/signup') {
            this.state = {status: currentOperation.REGISTRATION}
        } else {
            this.state = {status: currentOperation.LOGIN}
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.location !== this.props.location) {
            if (this.props.location.pathname === '/signup') {
                this.setState({status: currentOperation.REGISTRATION});
            } else {
                this.setState({status: currentOperation.LOGIN});
            }

        }
    }

    changeModuleStatus = (newStatus) => {
        this.setState({
            status: newStatus
        })
    };

    renderBody() {
        switch (this.state.status) {
            case currentOperation.LOGIN:
                return (<div>
                    <UserLogin onModuleStatusChange={this.changeModuleStatus}/>
                </div>);
            case currentOperation.REGISTRATION:
                return (<UserRegistration onModuleStatusChange={this.changeModuleStatus}/>);
            case currentOperation.FORGOT_PASSWORD:
                return (<PasswordRecovery onModuleStatusChange={this.changeModuleStatus}/>);
            default:
                return null
        }
    }

    render() {
        let body = this.renderBody();
        return (
            <div>
                <div
                    style={{
                        boxShadow: '0 0 30px #f3f1f1',
                        minWidth: '280px',
                        maxWidth: '500px',
                        margin: 'auto',
                        border: '1px solid #d5d5d5',
                        borderRadius: 10,
                        padding: '10px 23px 23px 23px'
                    }}>
                    {body}
                </div>
            </div>
        );
    }


}

export default UserFrontSecurityModule;
