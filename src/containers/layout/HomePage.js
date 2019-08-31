import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import LogoutButton from "../user/security/inner/LogoutButton";

class HomePage extends Component {


    renderNavigation() {
        if (!this.props.isUserAuthenticated) {
            return (
                <div>
                    <p><Link to="/login"> SIGN IN </Link></p>
                    <p><Link to={{pathname: '/login', hash: '#create-account'}}> SIGN UP </Link></p>
                </div>
            );
        } else {
            return (
                <div>
                    <LogoutButton/>
                    <h1> HELLO DEAR USER </h1>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <div><h1> SWEET HOME ALABAMA </h1>
                    {this.renderNavigation()}

                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    isUserAuthenticated: state.security.isUserAuthenticated
});

export default connect(mapStateToProps)(HomePage);
