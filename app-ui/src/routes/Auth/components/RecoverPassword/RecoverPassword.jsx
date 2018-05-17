// @flow
import React from 'react';
import { Link } from 'react-router';
import { Card, Button, Form, Input, Icon } from 'antd';
import type { Form as FormType } from 'antd';
import { withI18n, Trans } from 'lingui-react';
import { isRequired, isEmail } from 'util/Validator';
import { modelPath } from 'routes/Auth/modules/RecoverPasswordModule';
import config from 'config/index';
import type { FormProps } from 'util/Form';

import './RecoverPassword.scss';

const FormItem = Form.Item;

type Props = {
  form: FormType,
  email: FormProps,
  isPending: boolean,
  i18n: Object,
  onSend: (val: Object) => any,
}

export const RecoverPasswordComponent = ({ form, isPending, i18n, onSend }: Props) => {

  const getFieldDecorator = form.getFieldDecorator;

  const handleSubmit = (e: SyntheticEvent<*>) => {
    e.preventDefault();
    form.validateFieldsAndScroll((error, values) => {
      if (!error) {
        console.log(values);
        onSend(values);
      } else {
        console.log(error);
      }
    });
  };

  return (
    <Card
      className="recover-password"
      title={i18n.t`Recover password`}
      style={{width: '30rem'}}
    >
      <p>
        <Trans>
          Please enter your email address and we will send you an email with further instructions to reset your
          password.
        </Trans>
      </p>

      <Form onSubmit={handleSubmit}>
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
              prefix={<span style={{color: 'rgba(0,0,0,.25)', marginLeft: -4}}>@ </span>}
              placeholder={i18n.t`Email`}
            />
          )}
        </FormItem>

        <FormItem>
          <Button style={{width: '100%'}} loading={isPending} type="primary" htmlType="submit">
            <Trans>Proceed</Trans>
          </Button>
        </FormItem>
      </Form>
      <p className="sign-in-link"><Link to={config.route.auth.signIn}><Trans>Back to Sign-In</Trans></Link></p>
    </Card>
  );

};

const translatedForm = withI18n()(RecoverPasswordComponent);
export default Form.create()(translatedForm);
