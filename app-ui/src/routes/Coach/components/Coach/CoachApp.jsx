// @flow
import React from 'react';
import type { Team } from "../../modules/Coach/CoachModule";
import SeasonCard from "./CoachSeasonCard";
import './Coach.scss';
//import TeamFormContainer from '../../containers/Team/TeamFormContainer';


type Props = {
  username: string,
  data: Array<Team>,
  onFetchTeam: (username: string) => any,
}

/**
 * CoachApp container is connected to redux by CoachAppContainer
 * Referenced in Coach.jsx
 */
export class CoachAppComponent extends React.Component<Props> {
  props: Props;

  componentDidMount(){
    if (!this.props.data.length){
      this.props.onFetchTeam(this.props.username);
    }
  }

  /**
   *Renders a list of SeasonCard
   */
  render(){
    const { data = [] } = this.props;

    const teams = data.sort((a, b) => a.dateTime - b.dateTime);

    return (
      <div className="coachAppContainer">
        {/*<TeamFormContainer username={this.props.username} />*/}
        {teams.map(d => <SeasonCard key={d.id} team={d}/>)}
      </div>
    );
  }
}



export default CoachAppComponent;