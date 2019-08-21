import React, {Component} from 'react';
import {Button, Form, Icon, Input} from 'antd';
import {changeUserSignUpModalVisibility} from "../../../../redux/actions/securityActions";
import {connect} from "react-redux";

class BasicUserSignIn extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="UserSignInForm">
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input style={{ color: 'black', fontSize: 20, fontWeight: 'bold'  }}
                                   prefix={<Icon type="user" /> }
                                placeholder=" Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}
                                prefix={<Icon type="lock" /> }
                                type="password"
                                placeholder=" Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" size="large">
                        Log in
                        </Button>
                    <br/>
                        <Button  size="large" onClick={this.props.changeSignUpModalVisibility}>
                            Create new account
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) =>({
    changeSignUpModalVisibility: () => dispatch(changeUserSignUpModalVisibility())
});

export const UserSignInForm = Form.create({ name: 'normal_login' })(BasicUserSignIn);
export default connect(mapStateToProps, mapDispatchToProps)(UserSignInForm);



