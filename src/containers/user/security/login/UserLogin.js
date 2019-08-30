import React, {Component} from 'react';
import {connect} from "react-redux";
import {UserLoginForm} from "./UserLoginForm";
import {Button, Icon, Result, Spin} from "antd";
import {currentOperation} from "../UserSecurityModule";

const currentLoginStatus = {
    LOGIN: 'LOGIN',
    WAITING: 'WAITING',
    INVALID_DATA: 'INVALID_DATA',
    ERROR: 'ERROR',
};

class UserLogin extends Component {

    state = {
        status: currentLoginStatus.LOGIN
    };

    onTryAgain = () => this.setState({status: currentLoginStatus.LOGIN});

    handleLogin = (user) =>{
        console.log('>>>', user);
        this.setState({status: currentLoginStatus.WAITING}, () => {
            setTimeout(() => {
                this.setState({status: currentLoginStatus.INVALID_DATA});
            }, 2000);
        });
    };

    renderBody(){
        switch (this.state.status) {
            case currentLoginStatus.LOGIN:
                return (<div> <h3 style={{textAlign: 'center', padding:'5px', fontSize: '20px'}}> LOG IN </h3>
                            <UserLoginForm onLogin={this.handleLogin} onForgotPassword={
                                () => this.props.onModuleStatusChange(currentOperation.FORGOT_PASSWORD)} />
                            <Button style={{ width: '100%'}}
                                    onClick={() => this.props.onModuleStatusChange(currentOperation.REGISTRATION)}> Create New Account </Button>
                        </div>);
            case currentLoginStatus.WAITING:
                return (<div style={{ textAlign: 'center', padding: '80px'}}>
                            <Spin indicator={<Icon type="loading" style={{fontSize: 80}} spin/>}/>
                        </div>);
            case currentLoginStatus.INVALID_DATA:
                return (<div style={{textAlign: 'center'}}>
                            <Result status="error"
                                style={{padding: '20px'}}
                                title="Invalid user data!"/>
                            <br/>
                            <Button onClick={this.onTryAgain}> Try to Login Again </Button>
                        </div>);
            case currentLoginStatus.ERROR:
                return (<div style={{textAlign: 'center'}}>
                            <Result status="warning"
                                    style={{padding: '20px'}}
                                    subTitle="There are some problems with your operation. Try again later."/>
                            <Button onClick={this.onTryAgain}> Try to Login Again </Button>
                        </div>);
            default: return null;
        }
    }
    render() {
        const body = this.renderBody();
        console.log(this.props);
        return (
            <div>
                {body}
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    // isModalOpen: state.security.isSignUpModalOpen
});

const mapDispatchToProps = (dispatch) =>({
    // changeModalVisiblity: () => dispatch(changeUserSignUpModalVisibility())
});


export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);

