import React, {Component} from 'react';
import {connect} from "react-redux";
import {changeUserSignUpModalVisibility} from "../../../redux/actions/securityActions";
import {UserLoginForm} from "./UserLoginForm";
import {Button, Icon, Result, Spin} from "antd";
import UserRegistrationModal from "../registration/UserRegistrationModal";


class UserLogin extends Component {

    state = {
        wasSubmitted: false,
        isLoading: false,
        isUserDataWrong: false,
        hasServerErrorOccurred: false
    };

    onTryAgain = () =>{
        this.setState({
            wasSubmitted: false,
            isLoading: false,
            isUserDataWrong: false,
            hasServerErrorOccurred: false,
        })

    };

    handleLogin = (user) =>{
        console.log('>>>', user);
        this.setState({wasSubmitted: true, isLoading: true}, () => {
            setTimeout(() => {
                console.log('>>>', user);
                this.setState({isUserDataWrong: true, isLoading: false});
            }, 2000);
        });
    };

    render() {

        let body = null;

        if (!this.state.wasSubmitted) {
            body = (<UserLoginForm onLogin={this.handleLogin}/>);
        } else {
            if (this.state.isLoading) {
                body = (<div style={{textAlign: 'center', padding: '50px'}}>
                    <Spin indicator={<Icon type="loading" style={{fontSize: 80}} spin/>}/>
                </div>);
            }else {
                if(this.state.isUserDataWrong){
                    body = (
                        <div style={{textAlign: 'center'}}>
                            <Result status="error"
                                    style={{padding: 10}}
                                    title="Invalid user data!"/>
                                <Button onClick={this.onTryAgain}> Try to Login Again </Button>
                        </div>);
                }else if (this.state.hasServerErrorOccurred) {
                    body = (
                        <div style={{textAlign: 'center'}}>
                            <Result status="warning"
                                    style={{padding: 10}}
                                    subTitle="There are some problems with your operation. Try again later." />
                             <Button onClick={this.onTryAgain}> Try to Login Again </Button>
                        </div>);
                }else{
                    body = (
                        <div style={{textAlign: 'center'}}>
                            <Result status="success"
                                    title="Successfully Login"/>
                        </div>);
                }
            }
        }

        return (
            <div style={{maxWidth: 400,
                        margin: 'auto',
                        border: '1px solid #d5d5d5',
                        borderRadius: 10,
                        padding: 23}}>
                <div style={{ height: 215}}>
                    {body}
                </div>
                <div style={{
                        maxWidth: 300,
                        margin: 'auto',}}>
                    <UserRegistrationModal/>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    isModalOpen: state.security.isSignUpModalOpen
});

const mapDispatchToProps = (dispatch) =>({
    changeModalVisiblity: () => dispatch(changeUserSignUpModalVisibility())
});


export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);

