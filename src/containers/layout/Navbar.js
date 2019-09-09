import React, {Component} from 'react';
import '../../components/layout/navbar/Navbar.css';
import {Button, Drawer} from 'antd';

import {Link} from "react-router-dom";
import {SignNavMenu} from "../../components/layout/navbar/SignNavMenu";
import {MainNavMenu} from "../../components/layout/navbar/MainNavMenu";
import LoggedUserNavMenu from "./LoggedUserNavMenu";
import {connect} from "react-redux";

class Navbar extends Component {

    state = {
        current: 'signin',
        visible: false
    };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    renderSecondNavbar(mode){
        console.log(this.props)
        if(!this.props.isUserAuthenticated){
            return (<SignNavMenu onClick={this.onClose} mode={mode}/>);
        }else{
            return(<LoggedUserNavMenu onClick={this.onClose} mode={mode}/>);
        }
    }


    render() {
        return (
            <nav className="menuBar">
                <div className="logo">
                    <Link to="/"> User Security Module </Link>
                </div>
                <div className="menuCon">
                    <div className="leftMenu">
                        <MainNavMenu mode="horizontal"/>
                    </div>
                    <div className="rightMenu">
                        {this.renderSecondNavbar("horizontal")}
                    </div>
                    <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
                        <header className="barsBtn"> </header>
                    </Button>
                    <Drawer
                        title="Menu"
                        placement="right"
                        closable={true}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                        <MainNavMenu onClick={this.onClose} mode="inline"/>
                        {this.renderSecondNavbar("inline")}
                    </Drawer>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => ({
    isUserAuthenticated: state.security.isUserAuthenticated,
});

export default connect(mapStateToProps)(Navbar);

