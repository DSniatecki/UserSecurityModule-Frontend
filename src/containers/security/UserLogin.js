import React, {Component} from 'react';
import {connect} from "react-redux";
import {changeUserSignUpModalVisibility} from "../../redux/actions/securityActions";




class UserLogin extends Component {
    render() {
        return (
            <div>

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


export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);

