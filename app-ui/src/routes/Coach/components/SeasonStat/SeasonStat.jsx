// @flow
import React from 'react';
import { Icon, Tooltip } from 'antd';
import classNames from 'classnames';
import './SeasonStat.scss';


type Props = {
  id: string,
  seasonID: string,
  topScore: number,
  score: number,
  prevScore: number,
  increment: boolean,
  averageIncrement: number,
  dateTime: number,
  requestLock: boolean,
  onGetStat: (id: string) => any,
}


/**
 * A Team score stats. This is usually same on all teams
 *
 * @deprecated
 */
export class SeasonStatComponent extends React.Component<Props> {
  props: Props;



  render() {
    //seasonGlobalPosition,
    // seasonCountryPosition,
    // weeklyGlobalPosition,
    // weeklyCountryPosition
    // averagePerf,
    // seasonGlobalScore,
    // weeklyGlobalScore,
    // seasonCountryScore,
    // weeklyCountryScore,
    // seasonAwards,
    // countryAwards
    const {topScore, score, prevScore, increment, averageIncrement} = this.props;
    console.log(this.props);

    return (
      <div className='seasonStat blueDarkFace'>
        <Tooltip placement="top" title="Average Rise/Fall">
         <span className={classNames('average', { greenDarkFace: increment, redWhiteFace: !increment })}>
        {increment ? <Icon type="arrow-up"/> : <Icon type="arrow-down"/>} {increment ? averageIncrement : `${averageIncrement}`}
        </span>
        </Tooltip>
        <Tooltip placement="top" title="Current Score">
          <span className="mainScore"><Icon type="area-chart"/> <strong>{score}</strong></span>
        </Tooltip>
        <Tooltip placement="topRight" title="Previous Score">
          <span className="prevScore"><Icon type="double-left"/> {prevScore}</span>
        </Tooltip>
        <Tooltip placement="topRight" title="Global Score">
          <span className="globalScore"><Icon type="global"/> {topScore}</span>
        </Tooltip>
      </div>
    )
  };
}


export default SeasonStatComponent;