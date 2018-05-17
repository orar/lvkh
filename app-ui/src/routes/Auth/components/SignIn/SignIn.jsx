// @flow
import React from 'react';
import { Link } from 'react-router';
import { Card, Button, Input, Form, Icon, Checkbox } from 'antd';
import { withI18n, Trans } from 'lingui-react';
import { isRequired, isEmail } from 'util/Validator';
import { modelPath } from 'routes/Auth/modules/SignInModule';
import config from 'config/index';
import type { FormProps } from 'util/Form';
import type { Form as FormType} from 'antd';
import './SignIn.scss';


const FormItem = Form.Item;

type Props = {
  form: FormType,
  isPending: boolean,
  i18n: Object,
  onSignIn: (o: Object) => any,
  reset: () => any,
}

export class SignInComponent extends React.Component<Props> {

  //componentDid

  componentWillUnmount(){
    this.props.reset();
  }

  handleSubmit = (e: SyntheticEvent<*>) => {
    const { form, onSignIn } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((error, values) => {
      if (!error) {
        onSignIn(values);
      }
    });
  };

  render(){
    const { form, isPending, i18n,  } = this.props;
    const getFieldDecorator = form.getFieldDecorator;

    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 16}
    };
    return (
      <div className="signInContainer">
        <Card className="sign-in" title={i18n.t`Sign-In`}>
          <Form layout="horizontal" onSubmit={this.handleSubmit} autoComplete="off">
            <FormItem>
              {getFieldDecorator('username', {
                rules: [
                  {required: true, message: i18n.t`Please enter your username`},
                  {max: 32, message: i18n.t`Username should be less than 32`}
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)', marginLeft: -4}}/>}
                  placeholder={i18n.t`Username`}
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{required: true, message: i18n.t`Please enter your Password`}],
              })(
                <Input
                  prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)', marginLeft: -4}}/>}
                  type="password"
                  placeholder={i18n.t`Password`}
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('rememberMe', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox><Trans>Remember me</Trans></Checkbox>
              )}
            </FormItem>
            <FormItem>
              <Button style={{width: '100%'}} loading={isPending} type="primary" htmlType="submit">
                <Trans>Log in</Trans>
              </Button>
            </FormItem>
            <span style={{float: 'left'}}><Trans><Link
              to={config.route.auth.passwordRecovery}>Forgot password</Link></Trans></span>
            <span style={{float: 'right'}}> <Trans> <Link to={config.route.auth.signUp}>Sign Up</Link></Trans></span>
          </Form>
        </Card>
      </div>
    );
  }

}
const translatedForm = withI18n()(SignInComponent);
export default Form.create()(translatedForm);
