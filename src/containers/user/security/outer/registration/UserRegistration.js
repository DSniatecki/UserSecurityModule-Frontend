import React, {Component} from "react";
import {Button, Icon, Result, Spin} from "antd";
import {NewAccountForm} from "./NewAccountForm";
import {currentOperation} from "../UserFrontSecurityModule";
import {withRouter} from "react-router-dom";
import axios from "axios";


const currentRegistrationStatus = {
    CREATING: 'CREATING',
    WAITING: 'WAITING',
    SUCCESS: 'SUCCESS',
    INVALID_DATA: 'INVALID_DATA',
    ERROR: 'ERROR',
};

class UserRegistration extends Component {

    state = {
        status: currentRegistrationStatus.CREATING,
        responseMessage: '',
    };

    handleSubmit = (account) => {
        this.setState({status: currentRegistrationStatus.WAITING, currentAccount: account}, () => {
            axios.post('/users/signup', {
                username: account.nickname,
                email: account.email.toLowerCase(),
                password: account.password
            })
                .then((response) => {
                    this.setState({status: currentRegistrationStatus.SUCCESS});
                })
                .catch((error) => {
                    this.handleUserRegistrationErrors(error);
                });
        });
    };

    handleUserRegistrationErrors(error) {
        if (!error.response) {
            this.setState({
                status: currentRegistrationStatus.ERROR,
            });
        } else if (error.response.status === 400) {
            this.setState({
                status: currentRegistrationStatus.INVALID_DATA,
                responseMessage: error.response.data.message
            });
        } else {
            this.setState({status: currentRegistrationStatus.ERROR});
        }
    }

    renderBody() {
        switch (this.state.status) {
            case currentRegistrationStatus.CREATING:
                return this.renderRegistrationForm();
            case currentRegistrationStatus.WAITING:
                return this.renderLoadingSpinner();
            case currentRegistrationStatus.SUCCESS:
                return this.renderRegistrationSuccessResponseMessage();
            case currentRegistrationStatus.INVALID_DATA:
                return this.renderInvalidRegistrationDataErrorMessage();
            case currentRegistrationStatus.ERROR:
                return this.renderOperationFailedErrorMessage();
            default:
                return null;
        }
    }

    renderOperationFailedErrorMessage() {
        return (<div style={{textAlign: 'center'}}>
            <Result status="warning" title="Operation failed"
                    subTitle="There are some problems with your operation. Try again later."/>
            {this.renderProperReturnButton()}
        </div>);
    }

    renderInvalidRegistrationDataErrorMessage() {
        return (<div style={{textAlign: 'center'}}>
            <Result status="warning" title={this.state.responseMessage}
                    subTitle="Please change it and try to create an account again."/>
            <Button style={{width: '100%'}}
                    onClick={() => this.setState({status: currentRegistrationStatus.CREATING})}> Return </Button>
        </div>);
    }

    renderRegistrationSuccessResponseMessage() {
        return (<div style={{textAlign: 'center'}}>
            <Result status="success" title="Account Created"
                    subTitle="An Activation email will be sent to you shortly."/>
            {this.renderProperReturnButton()}
        </div>);
    }

    renderLoadingSpinner() {
        return (<div style={{textAlign: 'center', padding: '80px'}}>
            <Spin indicator={<Icon type="loading" style={{fontSize: 80}} spin/>}/>
        </div>);
    }

    renderRegistrationForm() {
        return (<div>
            <h3 style={{textAlign: 'center', padding: '5px', fontSize: '20px'}}> Create New Account </h3>
            <NewAccountForm currentAccount={this.state.currentAccount} onCreate={this.handleSubmit}/>
            {this.renderProperReturnButton()}
        </div>);
    }

    renderProperReturnButton(){
        if (this.props.location.hash === '') {
            return (
                <Button style={{width: '100%'}}
                        onClick={() => this.props.onModuleStatusChange(currentOperation.LOGIN)}> Return </Button>
            )
        } else {
            return (<Button style={{width: '100%'}}
                            onClick={() => this.props.history.replace('/')}> Return To Home Page </Button>
            );
        }
    }


    render() {
        return (
            <div>
                {this.renderBody()}
            </div>
        );
    }


}

export default withRouter(UserRegistration);
