import React, {Component} from 'react';
import {Modal} from 'antd';
import {changeUserSignUpModalVisibility} from "../../redux/actions/securityActions";
import {connect} from "react-redux";

class UserSignUpModal extends Component {

    handleOk = e => {
        console.log(e);
        this.props.changeModalVisibility();
    };

    handleCancel = () => {
        this.props.changeModalVisibility();
    };

    render() {
        return (
            <div>
                <Modal
                    title="Registration"
                    visible={this.props.isSignUpModalOpen}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                 <p> SOME SIGN UP LOGIC ...</p>

                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isSignUpModalOpen: state.security.isSignUpModalOpen
});

const mapDispatchToProps = (dispatch) =>({
    changeModalVisibility: () => dispatch(changeUserSignUpModalVisibility())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSignUpModal);






