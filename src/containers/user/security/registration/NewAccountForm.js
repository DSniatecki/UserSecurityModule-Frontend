import React, {Component} from 'react';
import {Button, Checkbox, Form, Input,} from 'antd';
import {formItemLayout, tailFormAgreementCheckBoxLayout, tailFormItemLayout} from "./NewAccountFormLayout";
import AgreementModal from "../../../../components/layout/AgreementModal";


class RegistrationForm extends Component {

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.onCreate(values);
            }
        });
    };

    handleConfirmBlur = e => {
        const {value} = e.target;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    compareToFirstPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Passwords that you enter are inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const {form} = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    checkCheckBox = (rule, value, callback) => {
        console.log(value);
        if (!value) {
            callback('Please confirm reading the agreement!');
        } else {
            callback();
        }
    };

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="Nickname">
                    {getFieldDecorator('nickname', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your nickname!',
                                whitespace: true
                            },
                            {
                                min: 4,
                                message: 'Must contain at least 4 characters!',
                            },
                            {
                                max: 20,
                                message: 'Cannot contain more than 20 characters!',
                            }
                    ],
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label="E-mail">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                            {
                                max: 80,
                                message: 'Cannot contain more than 80 characters!',
                            }
                        ],
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$',
                                message: 'Must contain at least 8 characters, one letter and one number!'
                            },
                            {
                                max: 40,
                                message: 'Cannot contain more than 40 characters!',
                            },
                            {
                                validator: this.validateToNextPassword,
                            }
                        ],
                    })(<Input.Password/>)}
                </Form.Item>
                <Form.Item label="Confirm Password" hasFeedback >
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input.Password onBlur={this.handleConfirmBlur}/>)}
                </Form.Item>
                <Form.Item {...tailFormAgreementCheckBoxLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                        rules: [
                            { validator: this.checkCheckBox }
                        ]
                    })(
                        <Checkbox>
                            <div style={{display: 'inline'}}> I have read the <AgreementModal/> </div>
                        </Checkbox>,
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout} >
                    <Button type="primary" htmlType="submit" style={{width: '60%'}}>
                        Confirm
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export const NewAccountForm = Form.create({
    mapPropsToFields(props) {
        return {
            onCreate: Form.createFormField({...props.onCreate, value: props.onCreate.value,
            }),
        }
    },
    name: 'register',
    })(RegistrationForm);
