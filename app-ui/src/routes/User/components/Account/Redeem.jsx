// @flow
import React from 'react';
import type { Reward } from "../../modules/Account/AccountModule";
import type { RedeemState } from '../../modules/Account/RedeemModule';
import { Button } from 'antd';

type Props = {
  data: Reward,
  request: RedeemState,
  onRedeemReward: ({rewardID: string}) => any,
}

const styles = {

};

export const RedeemComponent = ({ data, request, onRedeemReward }: Props) => {

  const redeem = (e: SyntheticEvent<*>) => {
    e.preventDefault();
    onRedeemReward({ rewardID: data.id });
  };

    return (
      <div style={styles}>
        <Button
          ghost
          type="primary"
          size="small"
          onClick={redeem}
          loading={request.isPending}
         >Redeem
        </Button>
      </div>
    );

};


export default RedeemComponent;