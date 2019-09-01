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
        responseMessage:'',
        currentAccount: {
            nickname: '',
            email: '',
            password: '',
            confirm: '',
            agreement: false,
        }
    };


    handleSubmit = (account) => {
        this.setState({status: currentRegistrationStatus.WAITING, currentAccount: account}, () => {
            axios.post('/users/signup', {
                username: account.nickname,
                email: account.email,
                password: account.password
            })
                .then((response)=>{
                    console.log(response);
                    this.setState({status: currentRegistrationStatus.SUCCESS});
                })
                .catch((error)=>{
                    console.log(error.response);
                    if(!error.response){
                        this.setState({
                            status: currentRegistrationStatus.ERROR,
                            responseMessage: error.response.data.message
                        });
                    }else{
                        if(error.response.status===400){
                            this.setState({
                                status: currentRegistrationStatus.INVALID_DATA,
                                responseMessage: error.response.data.message
                            });
                        }else {
                            this.setState({status: currentRegistrationStatus.ERROR});
                        }
                    }
                });
        });
    };

    renderBody(){
        switch(this.state.status){
            case currentRegistrationStatus.CREATING:
                return (<div>
                            <h3 style={{textAlign: 'center', padding:'5px', fontSize: '20px'}}> Create New Account </h3>
                            <NewAccountForm currentAccount={this.state.currentAccount} onCreate={this.handleSubmit}/>
                        </div>);
            case currentRegistrationStatus.WAITING:
                return  (<div style={{ textAlign: 'center', padding: '80px'}}>
                            <Spin indicator={<Icon type="loading" style={{fontSize: 80}} spin/>}/>
                        </div>);
            case currentRegistrationStatus.SUCCESS:
                return (<div style={{textAlign: 'center'}}>
                            <Result status="success" title="Account Created"
                                    subTitle="An Activation email will be sent to you shortly." />
                        </div>);
            case currentRegistrationStatus.INVALID_DATA:
                return (<div style={{textAlign: 'center'}}>
                    <Result status="warning" title={this.state.responseMessage}
                            subTitle="Please change it and try to create an account again." />
                    <Button style={{width: '100%'}}
                            onClick={() => this.setState({status: currentRegistrationStatus.CREATING})}> Return </Button>
                </div>);
            case currentRegistrationStatus.ERROR:
                return (<div style={{textAlign: 'center' }}>
                            <Result status="warning" title="Operation failed"
                                subTitle="There are some problems with your operation. Try again later."/>
                        </div>);
            default: return null;
        }
    }

    render() {
        console.log('-------------')
        console.log(this.state);
        let body = this.renderBody();

        if(this.state.status !== currentRegistrationStatus.WAITING && this.state.status !== currentRegistrationStatus.INVALID_DATA){
            if(this.props.location.hash ==='') {
                body = (<div> {body}
                            <Button style={{width: '100%'}}
                                onClick={() => this.props.onModuleStatusChange(currentOperation.LOGIN)}> Return </Button>
                        </div>)
            }else{
                body = (<div> {body}
                            <Button style={{width: '100%'}}
                                    onClick={() => this.props.history.replace('/')}> Return To Home Page </Button>
                        </div>)
            }
        }
        return (
            <div>
                {body}
            </div>
        );
    }
}

export default withRouter(UserRegistration);
