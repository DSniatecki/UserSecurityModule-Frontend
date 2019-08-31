import React, {Component} from "react";
import {Button, Icon, Result, Spin} from "antd";
import {NewAccountForm} from "./NewAccountForm";
import {currentOperation} from "../UserFrontSecurityModule";
import {withRouter} from "react-router-dom";


const currentRegistrationStatus = {
    CREATING: 'CREATING',
    WAITING: 'WAITING',
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR',
};

class UserRegistration extends Component {

    state = {
        status: currentRegistrationStatus.CREATING
    };


    handleSubmit = (account) => {
        console.log('>>>', account);
        this.setState({status: currentRegistrationStatus.WAITING}, () => {
            setTimeout(() => {
                console.log('>>>', account);
                this.setState({status: currentRegistrationStatus.SUCCESS});
            }, 2000);
        });
    };

    renderBody(){
        switch(this.state.status){
            case currentRegistrationStatus.CREATING:
                return (<div>
                            <h3 style={{textAlign: 'center', padding:'5px', fontSize: '20px'}}> Create New Account </h3>
                            <NewAccountForm onCreate={this.handleSubmit}/>
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
            case currentRegistrationStatus.ERROR:
                return (<div style={{textAlign: 'center' }}>
                            <Result status="warning" title="Operation failed"
                                subTitle="There are some problems with your operation. Try again later."/>
                        </div>);
            default: return null;
        }
    }

    render() {
        console.log(this.props)
        let body = this.renderBody();

        if(this.state.status !== currentRegistrationStatus.WAITING){
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
