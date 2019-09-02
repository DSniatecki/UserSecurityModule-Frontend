import React, {Component} from 'react';
import {Button, Form, Icon, Input, Tooltip,} from 'antd';

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 5,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

class BasicPasswordRecoveryForm extends Component {

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.onConfirmRecovery(values);
            }
        });
    };

    compareToFirstEmail = (rule, value, callback) => {
        const {form} = this.props;
        if (value && value !== form.getFieldValue('email')) {
            callback('E-mails that you enter are inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextEmail = (rule, value, callback) => {
        const {form} = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label={
                    <span>
                        E-Mail <Tooltip title="An email that is assigned to your account.">
                                        <Icon type="question-circle-o"/>
                                      </Tooltip> </span>
                } hasFeedback>
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                max: 40,
                                message: 'Cannot contain more than 40 characters!',
                            },
                            {
                                validator: this.validateToNextEmail,
                            },
                        ],
                    })(<Input/>)}
                </Form.Item>
                <Form.Item label="Confirm E-mail" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please Confirm your E-mail!',
                            },
                            {
                                validator: this.compareToFirstEmail,
                            },
                        ],
                    })(<Input/>)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout} >
                    <Button type="primary" htmlType="submit" style={{width: '60%'}}> Confirm </Button>
                </Form.Item>
            </Form>
        );
    }
}

export const PasswordRecoveryForm = Form.create({
    mapPropsToFields(props) {
        return {
            onConfirmRecovery: Form.createFormField({
                ...props.onConfirmRecovery, value: props.onConfirmRecovery.value,
            }),
        }
    },
    name: 'register',
})(BasicPasswordRecoveryForm);
