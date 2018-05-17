/* @flow */
import React from 'react';
import { withI18n, Trans } from 'lingui-react';
import { Card, Button, Spin } from 'antd';
import Spinner from 'components/Spinner';

import './ActivateAccount.scss';

type Props = {
  email: string,
  isPending: boolean,
  i18n: Object,
  onSend: (email: string) => any,
}

export const ActivateAccountComponent = ({
  email, isPending, i18n, onSend,
}: Props) => (
  <Card title={i18n.t`Activate account`} style={{ width: '30rem' }}>
    <p><Trans>You can&apos;t log in yet. We previously sent an activation email to you at:</Trans></p>
    <p className="email">{email}</p>
    <p><Trans>Please follow the instructions in that email to activate your account.</Trans></p>
    <p><Trans>Click the button to send the activation email again.</Trans></p>
    <Button
      ghost
      type="primary"
      style={{ width: '100%'}}
      disabled={isPending}
      onClick={() => onSend(email)}
    >
      <Trans>Send</Trans>
    </Button>
  </Card>
);

export default withI18n()(ActivateAccountComponent);
