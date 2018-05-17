// @flow
import React from 'react';
import { Tooltip, Avatar, Icon } from 'antd';
import type { FanPlayer } from "../../modules/Profile/ProfileModule";

type Props = {
  players: Array<FanPlayer>,
  header: string,
  edit: boolean,

};


const styles = {
  container: {

  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: '50%',
    MozBorderRadius: '50%',
    WebkitBorderRadius: '50%'
  },
  fanWrapper: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'flex-start',
    padding: 'auto 5px',
  },
  countryFlag: {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
  },
  flagSpan: {
    margin: 3
  },
  fanHeader: {
    textAlign: 'center',
    fontSize: 15,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
  }
};

export const FanPlayers = ( {players = [], header, edit }: Props) => {
  if(players.length){
    return (
      <div style={styles.fanWrapper}>
        <div style={styles.fanHeader} >
          <span>{header} ({players.length})</span>
          {edit && <span style={{marginLeft: 5}}><Icon type="edit" /></span>}
        </div>
        <div style={styles.countryFlag} className="Flag">
          {players.map(d =>
              <span key={d.id} style={styles.flagSpan} className="flagSpan">
                <Tooltip title={`${d.name}, ${d.country}`} >
                  <img style={styles.avatar} src={d.avatar} alt={d.name}  />
                </Tooltip>
              </span>
          )}
        </div>
      </div>
    );
  } else {
    return <div style={{ width: '100%'}} />
  }
};


export default FanPlayers;