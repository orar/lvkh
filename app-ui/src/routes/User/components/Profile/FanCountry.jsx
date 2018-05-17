// @flow
import React from 'react';
import { Tooltip, Icon } from 'antd';
import type { FanCountry } from "../../modules/Profile/ProfileModule";

type Props = {
  countries: Array<FanCountry>,
  header: string,
  edit: boolean,
}


const styles = {
  fanWrapper: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'flex-start',
  },
  countryFlag: {
    width: '100%',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    padding: 'auto 5px',
  },
  flagSpan: {
    width: 45,
    height: 30,
    margin: 4,
  },
  fanHeader: {
    textAlign: 'center',
    fontSize: 15,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
  }
};

export const FanCountries = ( {countries = [], header, edit }: Props) => {
  if(countries.length){
    return (
      <div style={styles.fanWrapper}>
        <div style={styles.fanHeader}>
          <span>{header} ({countries.length})</span>
          {edit && <span style={{marginLeft: 5}}><Icon type="edit" /></span> }
        </div>
        <div className="countryFlag" style={styles.countryFlag}>
          {countries.map(d =>
        <span key={d.id} className="flagSpan" style={styles.flagSpan}>
          <Tooltip title={d.name}>
            <img style={styles.flagSpan} src={d.flag} alt={d.name} />
          </Tooltip>
        </span>
          )}
        </div>
      </div>
    )} else {
      return <div style={{width: "100%"}}/>
    }
};


export default FanCountries;