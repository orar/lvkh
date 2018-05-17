// @flow
import React from 'react';
import { Link } from 'react-router';
import { Card, Button, Form, Input, Icon } from 'antd';
import { withI18n, Trans } from 'lingui-react';
import { isRequired, isEmail } from 'util/Validator';
import { modelPath } from 'routes/Auth/modules/SignUpModule'
import config from 'config/index';
import { Form as FormType } from 'antd';
import type { FormProps } from 'util/Form';
import Phone from 'react-phone-number-input';

import './SignUp.scss';
const FormItem = Form.Item;

type Props = {
  form: FormType,
  isPending: boolean,
  i18n: Object,
  onSignUp: (o: Object) => any,
}

type State = { email: string, phone: string };

export class SignUpComponent extends React.Component<Props, State> {

  props: Props;

  state: State = {email: '', phone: ''};

  handleSubmit = (e: SyntheticEvent<*>) => {
    e.preventDefault();
    form.validateFieldsAndScroll((error, values) => {
      if (!error) {
        onSignUp(values);
      }
    });
  };

  render() {
    const {form, isPending, i18n, onSignUp} = this.props;

    const getFieldDecorator = form.getFieldDecorator;

    return (
      <div className="signUpContainer">
        <Card className="sign-up" title={i18n.t`Sign-Up`}>
          <Form layout="horizontal" onSubmit={this.handleSubmit} onFieldsChange={this.fieldsChange} autoComplete="off">
            <FormItem>
              {getFieldDecorator('firstName', {
                rules: [{required: true, message: i18n.t`Please enter your first name`}],
              })(
                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)', marginLeft: -4}}/>}
                       placeholder={i18n.t`First Name`}/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('lastName', {
                rules: [{required: true, message: i18n.t`Please enter your last name`}],
              })(
                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)', marginLeft: -4}}/>}
                       placeholder={i18n.t`Last Name`}/>
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('username', {
                rules: [{required: true, message: i18n.t`Please choose a username`},
                  {min: 6, message: i18n.t`Username length is less than 6`},
                  {max: 32, message: i18n.t`Username length is more than 32`}
                ],
              })(
                <Input
                  prefix={<span style={{color: 'rgba(0,0,0,.25)', marginLeft: -4}}>@ </span>}
                  placeholder={i18n.t`Username`}/>
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('contact', {
                rules: [{required: true, message: i18n.t`Please enter your email`},
                  {
                    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ig,
                    message: i18n.t`Enter a valid email`
                  },
                ],
              })(
                <Input
                  prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)', marginLeft: -4}}/>}
                  placeholder={i18n.t`Email`}
                />
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('password', {
                rules: [{required: true, message: i18n.t`Please enter your password`}],
              })(
                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)', marginLeft: -4}}/>} type="password"
                       placeholder={i18n.t`Password`}/>
              )}
            </FormItem>

            <FormItem>
              <Button style={{width: '100%'}} loading={isPending} type="primary" htmlType="submit">
                <Trans>Sign Up</Trans>
              </Button>
            </FormItem>
            <div style={{textAlign: 'center'}}><Trans>
              Already a coach? <Link to={config.route.auth.signIn}>Sign in</Link>
            </Trans></div>
          </Form>
        </Card>
      </div>
    );
  };
}


const translatedForm = withI18n()(SignUpComponent);
export default Form.create()(translatedForm);
