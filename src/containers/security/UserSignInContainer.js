import React, {Component} from 'react';
import {connect} from "react-redux";
import {changeUserSignUpModalVisibility} from "../../redux/actions/securityActions";
import UserSignUpModal from "../../components/layout/security/modal/UserSignUpModal";
import UserSignInForm from "../../components/layout/security/login/UserSignInForm";




class UserSignInContainer extends Component {
    render() {
        return (
            <div>
                <UserSignInForm/>
                <UserSignUpModal/>
            </div>
        );
    }
}



const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) =>({
    changeSignUpModalVisibility: () => dispatch(changeUserSignUpModalVisibility())
});


export default connect(mapStateToProps, mapDispatchToProps)(UserSignInContainer);
