import React, {Component} from 'react';
import {Button, Checkbox, Form, Icon, Input} from 'antd';


class BasicUserLoginForm extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onLogin(values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form   style={{width: '100%'}}
                onSubmit={this.handleSubmit}
                className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [
                                { required: true, message: ' ' }
                            ],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [
                            { required: true, message: ' ' }
                        ],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item style={{ marginBottom: 8 }}>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: false,
                    })(<Checkbox disabled>Remember me</Checkbox>)}
                    {/*eslint-disable-next-line*/}
                    <a style={{ float: 'right'}} onClick={this.props.onForgotPassword} >Forgot password </a>
                    <Button style={{width: '100%'}}
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                    > Log in </Button>
                </Form.Item>
            </Form>
        );
    }
}

export const UserLoginForm = Form.create({
    mapPropsToFields(props) {
        return {
            onLogin: Form.createFormField({...props.onLogin, value: props.onLogin.value,}),
            onForgotPassword: Form.createFormField({...props.onForgotPassword, value: props.onForgotPassword.value,})
        }
    },
    name: 'normal_login' })(BasicUserLoginForm);
