import React, {Component} from "react";
import {Button, Icon, Result, Spin} from "antd";
import {NewAccountForm} from "./NewAccountForm";


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
                this.setState({wasSuccessfulCreated: true, isLoading: false});
            }, 2000);
        });
    };

    onNewRegistration = () => {
        this.setState({
                wasSubmitted: false,
                isLoading: false,
                wasSuccessfulCreated: false,
            }
        )
    };


    render() {

        let body = null;

        if (!this.state.wasSubmitted) {
            body = (<NewAccountForm onCreate={this.handleSubmit}/>);
        } else {
            if (this.state.isLoading) {
                body = (<div style={{textAlign: 'center', paddingTop: '110px'}}>
                            <Spin indicator={<Icon type="loading" style={{fontSize: 80}} spin/>}/>
                        </div>);
            } else {
                if (this.state.wasSuccessfulCreated) {
                    body = (
                        <div style={{textAlign: 'center'}}>
                            <Result status="success"
                                    title="Account Successfully Created"
                                    subTitle="An activation link has been sent to your email."/>
                            <Button onClick={this.onNewRegistration}> Create Another Account </Button>
                        </div>);
                } else {
                    body = (
                        <div style={{textAlign: 'center'}}>
                            <Result status="warning"
                                    title="There are some problems with your operation."
                                    subTitle="Try again later."/>
                            <Button onClick={this.onNewRegistration}> Try Again </Button>
                        </div>);
                }
            }
        }

        return (
            <div >
                <div style={{ minHeight: 312}}>
                {body}
                </div>
            </div>
        );
    }
}

export default UserRegistration;
