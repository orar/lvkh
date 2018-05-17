// @flow
import React from 'react';
import { Card, Button, Form , Icon, Input} from 'antd';
import { withI18n, Trans } from 'lingui-react';
import { isRequired, isEmail } from 'util/Validator';
import { modelPath } from 'routes/Auth/modules/ResetPasswordModule';
import { Form as FormType } from 'antd';

const FormItem = Form.Item;

type Props = {
  form: FormType,
  token: string,
  isPending: boolean,
  i18n: Object,
  onReset: (token: string, data: Object) => any,
}

export const ResetPasswordComponent = ({ form, token, isPending, i18n, onReset }: Props) => {

  const getFieldDecorator = form.getFieldDecorator;

  const handleSubmit = (e: SyntheticEvent<*>) => {
    e.preventDefault();
    form.validateFieldsAndScroll((error, values) => {
      if (!error) {
        console.log(values);
        onReset(token, values);
      } else {
        console.log(error);
      }
    });
  };

  return (
    <div className="recoverPassContainer">
    <Card className="reset-password" title={i18n.t`Reset password`}>
      <p>
        <Trans>Strong passwords include numbers, letters and special characters.</Trans>
      </p>

      <Form onSubmit={handleSubmit} >
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: i18n.t`Please enter your new password` }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)', marginLeft: -4 }} />} placeholder={i18n.t`Password`} />
          )}
        </FormItem>

        <FormItem>
          <Button style={{ width: '100%'}} loading={isPending} type="primary" htmlType="submit" >
            <Trans>Reset Password</Trans>
          </Button>
        </FormItem>
      </Form>
    </Card>
    </div>
  );

};

const translatedForm = withI18n()(ResetPasswordComponent);

export default Form.create()(translatedForm);
