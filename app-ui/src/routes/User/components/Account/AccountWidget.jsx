// @flow
import React from 'react';
import type { Account } from "../../modules/Account/AccountModule";
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router';
import config from 'config/index';

type Props = {
  data: Account,
  onGetAccount: () => any,
}

const styles = {

};

export class AccountWidgetComponent extends React.Component<Props> {
  props: Props;

  componentDidMount(){
    if(isEmpty(this.props.data)){
      this.props.onGetAccount();
    }
  }

  render(){
    const { data } = this.props;

    return (
      <div className="accountWidgetContainer" style={styles}>
        <Link to={config.route.user.account} >{data.vBalance}</Link>
      </div>
    );
  }
}


export default AccountWidgetComponent;