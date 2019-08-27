import React, {Component} from "react";
import {Icon, Result, Spin} from "antd";
import {NewAccountForm} from "./NewAccountForm";


class UserSignUp extends Component {

    state = {
        wasSubmitted: false,
        isLoading: false,
        wasSuccessfulCreated: false,
    };

    handleSubmit = (account) => {
        console.log('>>>' , account);
        this.setState({wasSubmitted: true, isLoading: true}, ()=> {
            setTimeout(() => {
                console.log('>>>', account);
                this.setState({wasSuccessfulCreated: true, isLoading: false});
            }, 2000);
        });
    };

    render() {

        let body = null;

        if(!this.state.wasSubmitted){
            body = ( <NewAccountForm onCreate={this.handleSubmit} /> );
        }else{
            if(this.state.isLoading){
                body = ( <div style={{textAlign: 'center', padding: '50px'}}><Spin  indicator={
                            <Icon type="loading" style={{ fontSize: 60 }} spin />}
                        /> </div>);
            }
            else {
                if(this.state.wasSuccessfulCreated) {
                    body = ( <Result status="success"
                                    title="Account Successfully Created"
                                    subTitle="An activation link has been sent to your email." /> );
                }else{
                    body = ( <Result status="warning"
                                     title="There are some problems with your operation."
                                     subTitle="An activation link has been sent to your email." /> );
                }
            }
        }

        return (
            <div >
                {body}
            </div>
        );
    }
}

export default UserSignUp;
