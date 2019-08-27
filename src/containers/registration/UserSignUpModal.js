import React, {Component} from 'react';
import {Button, Modal} from 'antd';
import {changeUserSignUpModalVisibility} from "../../redux/actions/securityActions";
import {connect} from "react-redux";
import UserSignUp from "./UserSignUp";

class UserSignUpModal extends Component{


    handleOk = e => {
        this.props.changeSignUpModalVisibility();
    };

    handleCancel = e => {
        this.props.changeSignUpModalVisibility();
    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.props.changeSignUpModalVisibility}>
                    Create New Account
                </Button>
                <Modal
                    title="Create new Account"
                    visible={this.props.isModalOpen}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <UserSignUp/>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isModalOpen: state.security.isSignUpModalOpen
});


const mapDispatchToProps = (dispatch) =>({
    changeSignUpModalVisibility: () => dispatch(changeUserSignUpModalVisibility())
});


export default connect(mapStateToProps, mapDispatchToProps)(UserSignUpModal);
