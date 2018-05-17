// @flow
import React from 'react';
import type { Account, Reward } from "../../modules/Account/AccountModule";
import { Input, Button, Icon, Divider, Card } from 'antd';
import isEmpty from 'lodash/isEmpty';
import ReactTable from 'react-table';
import { Icon as FaIcon } from 'react-fa';
import theme from '../../../../util/Theme';
import PromoCodeFormContainer from '../../containers/PromoCodeContainer';
import RedeemContainer from '../../containers/RedeemContainer';
import "react-table/react-table.css";
import './Account.scss';

type Props = {
  data: Account,
  onGetAccount: () => any,
}

type State = {
  code: string,
}


const RewardHistory = ({ data }) => {
  const pageSize = data.length >= 10 ? 10 : data.length + 1;
  const pagination = data.length > 10;
  return (
    <div>
      <ReactTable
        data={data}
        defaultPageSize={pageSize}
        showPagination={pagination}
        className="-striped -highlight"
        columns={[
          {
            Header: "Win",
            accessor: "reward"
          },
          {
            Header: "Value",
            id: "value",
            accessor: d => d.value,
            Cell: (r: Reward) => (
              <div style={{textAlign: 'center'}}>{r.value.toLocaleString()}</div>
            )
          },
          {
            Header: "Redeemed",
            id: "redeemed",
            accessor: d => d.redeemed,
            Cell: (d) => (
              <div style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                {console.log(d)}
                {d.row.redeemed ?
                  <FaIcon style={{ color: theme.grayFade, marginTop: 5, fontSize: 9 }} name="circle" />
                  :
                  <RedeemContainer data={d} />
                }
              </div>
            )
          }
        ]}
      />
    </div>
  );
};

export class AccountComponent extends React.Component<Props, State> {
  props: Props;

  state: State = {code: ''};

  componentDidMount(){
    if(isEmpty(this.props.data)){
      this.props.onGetAccount();
    }
  }



  render(){
    const { data } = this.props;
    console.log(this.props);
    return (
      <div className="accountContainer">
        {!isEmpty(data) && <div className="accountContainer">
          <Card
            hoverable
            title={<div className="accountPromoCardTitle">Account</div>}
            className="accountPromoCard"
          >
            <div>
              <PromoCodeFormContainer style={{ wrapper: {width: '95%' }}} />
            </div>
            <Divider/>

        <div className="accountBalance">
          <span>Live Funds:  ${data.vBalance.toLocaleString()}</span>
          <span>Total Wins:  ${data.rewardBalance.toLocaleString()}</span>
        </div>

        {data.rewardHistory.length &&
          <div>
            <Divider />
            <RewardHistory data={data.rewardHistory}/>
          </div>
        }
        </Card>
      </div>}
      </div>
    );
  }
}


export default AccountComponent;