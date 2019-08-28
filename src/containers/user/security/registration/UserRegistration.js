import React, {Component} from "react";
import {Button, Icon, Result, Spin} from "antd";
import {NewAccountForm} from "./NewAccountForm";
import {currentOperation} from "../UserSecurityModule";


class UserRegistration extends Component {

    state = {
        wasSubmitted: false,
        isLoading: false,
        wasSuccessfulCreated: false,
    };


    handleSubmit = (account) => {
        console.log('>>>', account);
        this.setState({wasSubmitted: true, isLoading: true}, () => {
            setTimeout(() => {
                console.log('>>>', account);
                this.setState({wasSuccessfulCreated: false, isLoading: false});
            }, 2000);
        });
    };


    render() {

        let body = null;

        if (!this.state.wasSubmitted) {
            body = (<div>
                        <NewAccountForm onCreate={this.handleSubmit}/>
                    </div>);
        } else {
            if (this.state.isLoading) {
                body = (<div style={{ textAlign: 'center', padding: '80px'}}>
                            <Spin indicator={<Icon type="loading" style={{fontSize: 80}} spin/>}/>
                        </div>);
            } else {
                if (this.state.wasSuccessfulCreated) {
                    body = (<div style={{textAlign: 'center'}}>
                                <Result status="success"
                                        title="Account Created"
                                        subTitle="An activation link has been sent to your email."/>
                            </div>);
                } else {
                    body = (<div style={{textAlign: 'center' }}>
                                <Result status="warning" title="Operation failed"
                                        subTitle="There are some problems with your operation. Try again later."/>
                            </div>);
                }
            }
        }
        if(!this.state.isLoading){
            body = (<div> {body}
                        <Button style={{width: '100%'}}
                                onClick={() => this.props.onModuleStatusChange(currentOperation.LOGIN)}> Return </Button>
                    </div>)
        }

        return (
            <div>
                    {body}
            </div>
        );
    }
}

export default UserRegistration;
