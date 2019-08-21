import React, {Component} from 'react';
import {Button} from "antd";
import {connect} from "react-redux";
import {changeUserSignUpModalVisibility} from "../../redux/actions/securityActions";
import UserSignUpModal from "../../components/modal/UserSignUpModal";


class UserLoginContainer extends Component {
    render() {
        return (
            <div>
                <Button type="primary" onClick={this.props.changeSignUpModalVisibility}> Open Modal </Button>
                <hr/>
                    <br/>
                <h1> SOME LOGIN LOGIC .... </h1>



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


export default connect(mapStateToProps, mapDispatchToProps)(UserLoginContainer);
