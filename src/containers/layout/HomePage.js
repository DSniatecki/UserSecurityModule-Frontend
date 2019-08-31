import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import LogoutButton from "../user/security/inner/LogoutButton";

class HomePage extends Component {


    renderNavigation() {
        if (!this.props.isUserAuthenticated) {
            return (
                <div >
                    <Link to="/login"> SIGN IN </Link>
                    <br/>
                    <br/>
                    <Link to={{pathname: '/login', hash: '#create-account'}}> SIGN UP </Link>
                </div>
            );
        } else {
            return (
                <div style={{textAlign: 'center'}}>
                    <h4> HELLO DEAR : {this.props.username} </h4>  <LogoutButton/>
                </div>
            );
        }
    }

    render() {
        return (
            <div style={{margin: 'auto', textAlign: 'center'}}>
                <div><h1> HOME PAGE </h1>
                    {this.renderNavigation()}

                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    isUserAuthenticated: state.security.isUserAuthenticated,
    username: state.security.username,
});

export default connect(mapStateToProps)(HomePage);
