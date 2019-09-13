import React, {Component} from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {message} from "antd";

class HomePage extends Component {


    render() {
        return (
            <div style={{margin: 'auto', textAlign: 'center'}}>
                <div style={{textAlign: 'center'}}>
                    <br/>
                    <br/>
                    <h3> HOME PAGE </h3>
                    <br/>
                    <br/>
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
