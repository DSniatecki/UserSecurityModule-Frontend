import React, {Component} from 'react';
import axios from "axios";
import {connect} from "react-redux";
import {Descriptions, Icon, message, Result, Spin} from "antd";
import {logoutUser} from "../../redux/actions/securityActions";


const currentStatus = {
    WAITING: 'WAITING',
    RECEIVED: 'RECEIVED',
    ERROR: 'ERROR',
};

class AccountPage extends Component {

    state = {
        status: currentStatus.WAITING,
        userDetails: {}
    };

    componentDidMount() {
        console.log(this.props.securityToken);
        axios.get('/users/',
            {
                headers: {
                    'Authorization': "Bearer " + this.props.securityToken,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((response) => {
                this.setState({status: currentStatus.RECEIVED, userDetails: response.data})
            })
            .catch((error) => {
                if(error.response === undefined){
                    this.setState({status: currentStatus.ERROR})
                } else if(error.response.status === 401 || error.response.status === 400){
                    message.error('you have been automatically logged out for security reasons.', 5);
                    this.props.logoutUser();
                    this.props.history.replace('/');
                }else {
                    this.setState({status: currentStatus.ERROR})
                }
            });
    }


    render() {
        return (
            <div>
                {this.renderBody()}
            </div>
        );
    }

    getFormattedCreationDate() {
        const creationDate = new Date(Date.parse(this.state.userDetails.creationDate));
        return `${creationDate.getFullYear()}.${creationDate.getMonth()+1}.${creationDate.getDay()} ` +
             ` ${creationDate.getHours()}:${creationDate.getMinutes()}`
    }

    renderBody(){
        if (this.state.status === currentStatus.WAITING) {
            return <div style={{textAlign: 'center', padding: '80px'}}>
                <Spin indicator={<Icon type="loading" style={{fontSize: 80}} spin/>}/>
            </div>
        } else if (this.state.status === currentStatus.RECEIVED) {
            return <div style={{textAlign: 'center'}} >

                <Descriptions
                    title="Account Details"
                    bordered
                    column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                >
                    <Descriptions.Item label="Username">{this.state.userDetails.username}</Descriptions.Item>
                    <Descriptions.Item label="E-Mail">{this.state.userDetails.email}</Descriptions.Item>
                    <Descriptions.Item label="Account Type"> {this.state.userDetails.type}</Descriptions.Item>
                    <Descriptions.Item label="Date created">{this.getFormattedCreationDate()}</Descriptions.Item>
                </Descriptions>
            </div>
        } else if (this.state.status === currentStatus.ERROR) {
            return <div style={{textAlign: 'center'}}>
                <Result status="warning" title="Operation failed"
                        subTitle="There are some problems with your operation. Try again later."/>
            </div>
        } else {
            return null;
        }


    }
}

const mapStateToProps = (state) => ({
    securityToken: state.security.securityToken
});

const mapDispatchToProps = (dispatch) => ({
    logoutUser: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);

