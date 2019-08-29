import React, {Component} from "react";
import {currentOperation} from "../UserSecurityModule";
import {Button, Icon, Result, Spin} from "antd";
import {PasswordRecoveryForm} from "./PasswordRecoveryForm";


const currentPasswordRecoveryStatus = {
    RECOVERY: 'RECOVERY',
    WAITING: 'WAITING',
    SUCCESS: 'SUCCESS',
    INVALID_DATA: 'INVALID_DATA',
    ERROR: 'ERROR',
};

class PasswordRecovery extends Component {

    state = {
        status: currentPasswordRecoveryStatus.RECOVERY
    };

    onTryAgain = () => this.setState({status: currentPasswordRecoveryStatus.RECOVERY});

    handlePasswordRecovery= (email) =>{
        this.setState({status: currentPasswordRecoveryStatus.WAITING}, () => {
            setTimeout(() => {
                this.setState({status: currentPasswordRecoveryStatus.SUCCESS});
            }, 2000);
        });
    };

    renderBody(){
        switch (this.state.status) {
            case currentPasswordRecoveryStatus.RECOVERY:
                return (<div>
                            <h3 style={{textAlign: 'center', padding:'5px', fontSize: '20px'}}> Recover Password </h3>
                            <PasswordRecoveryForm onConfirmRecovery={this.handlePasswordRecovery}/>
                            <Button style={{width: '100%'}}
                                    onClick={() => this.props.onModuleStatusChange(currentOperation.LOGIN)}> Return </Button>
                        </div>);
            case currentPasswordRecoveryStatus.WAITING:
                return (<div style={{textAlign: 'center', padding: '80px'}}>
                            <Spin indicator={<Icon type="loading" style={{fontSize: 80}} spin/>}/>
                        </div>);
            case currentPasswordRecoveryStatus.SUCCESS:
                return (<div style={{textAlign: 'center'}}>
                            <Result status="success" title="Success!"
                                    subTitle="A Password recovery email will be sent to you shortly."/>
                            <Button style={{width: '100%'}}
                                    onClick={() => this.props.onModuleStatusChange(currentOperation.LOGIN)}> Return </Button>
                        </div>);
            case currentPasswordRecoveryStatus.INVALID_DATA:
                return (<div style={{textAlign: 'center'}}>
                            <Result status="error"
                                    style={{padding: '20px'}}
                                    title="Invalid email!"/>
                            <br/>
                            <Button onClick={this.onTryAgain}> Try Again </Button>
                        </div>);
            case currentPasswordRecoveryStatus.ERROR:
                return (<div style={{textAlign: 'center'}}>
                            <Result status="warning"
                                    style={{padding: '20px'}}
                                    title="Operation failed"
                                    subTitle="There are some problems with your operation. Try again later."/>
                            <Button style={{width: '100%'}}
                                    onClick={()=>this.props.onModuleStatusChange(currentOperation.LOGIN)}> Return </Button>
                        </div>);
            default: return null;
        }
    }

    render(){
        const body = this.renderBody();

        return (
            <div>
                {body}
            </div>
        );
    }
}

export default PasswordRecovery;
