// @flow
import React from 'react';
import _ from 'lodash';
import TransferContainer from "../../containers/Transfer/TransferContainer";
import PlayerListContainer from '../../containers/PlayerList/PlayerListContainer'
import PlayerDetailContainer from "../../containers/PlayerList/PlayerDetailContainer";


type Props = {
  teamID: string
}

const styles = {
  tabs: {
    //width: 400,
  },
  player: {
    meta: {
      //width: 380,
    }
  }
};


export const TransferComponent = ({teamID}: Props) => {
console.log(teamID);
    return (
      <PlayerListContainer
        style={styles}
        expandView={(data) => <PlayerDetailContainer playerID={data.id} />}
        actions={(data) => <TransferContainer teamID={teamID} player={data} />}
        role
        jersey
        evicted
        goal
        price
        totalScore
      />
    );
};

export default TransferComponent;