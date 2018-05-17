// @flow
import React from 'react';

import './ScoreBoard.scss';
import isEmpty from 'lodash/isEmpty';
import type {RoundScore, RoundScoreStat, SeasonScoreStat} from "../../modules/Scoreboard/ScoreBoardModule";
import SeasonScoreStatComponent from "./SeasonScoreStat";
import RoundScoreStatComponent from "./RoundScoreStat";
import RoundScoreListComponent from "./RoundScoreList";

type Props = {
  seasonID: string,
  teamID: string,

  seasonChart: SeasonScoreStat,
  roundChart: RoundScoreStat,
  round: Array<RoundScore>,

  //onGetStat: ({teamID: string, seasonID: string} ) => any,
  onFetchScoreData: ({teamID: string, seasonID: string}) => any,
}


/**
 * Main TeamCard scoreboard entry - subcomponent-ing other components
 */
export class ScoreBoardComponent extends React.Component<Props> {
  props: Props;

  //timeSort = (s1: TeamScore, s2: TeamScore) => s1.date === s2.date ? 0 : (s1.date > s2.date) ? -1 : 1;
  //highScoreSort = (s1: TeamScore, s2: TeamScore) => s1.score === s2.score ? 0 : (s1.score > s2.score) ? -1 : 1;

  componentDidMount(){

    const { seasonID, teamID } = this.props;
    if(isEmpty(this.props.seasonChart) || isEmpty(this.props.roundChart)){
      this.props.onFetchScoreData({seasonID, teamID});
    }
  }

  render(){
    const { seasonChart, roundChart, round } = this.props;

    return (
      <div>
        <div>
          {!isEmpty(seasonChart) && <SeasonScoreStatComponent season={this.props.seasonChart} />}
        </div>
       {/* <div>
          {!isEmpty(roundChart) && <RoundScoreStatComponent round={this.props.roundChart} />}
        </div>*/}
        <div>
          {!isEmpty(round) && <RoundScoreListComponent round={this.props.round}/>}
        </div>
      </div>
    );
  }
}


export default ScoreBoardComponent;