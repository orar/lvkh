// @flow
import React from 'react';
import Date from './DateFixture';
import type {Fixture, FixtureTeam, Goal} from "../../modules/Fixture/FixtureModule";
import Moment from 'moment';
import MediaQuery from 'react-responsive';
import { Icon as FaIcon } from 'react-fa';
import './DateFixture.scss';

type Props = {
  data: Fixture,
};

const Scores = ({scores}) => {

  return (
    <div>
      <h3>{scores}</h3>
    </div>
  );
};

const GoalList = ({goals}) => {

  return (
    <div className="goalListContainer">
      <MediaQuery maxWidth={500}>
        <div className="smGoalList">
          {goals.map(g =>
            <span>{g.playerName}</span>
          )}
        </div>
      </MediaQuery>
      <MediaQuery minWidth={500}>
        <div className="mdGoalList">
          {goals.map(g =>
           <div>
             <span>{g.playerName}</span>
             <span>{g.gameTime}</span>
           </div>
          )}
        </div>
      </MediaQuery>
    </div>
  );
};




const Team = ({name, flag, goals}: FixtureTeam) => {

  return (
    <div className="fixtureTeamContainer">
      <div className="fixtureTeamContent">
        <div className="fixtureTeamImgWrap">
          <img className="fixtureTeamImg" src={flag} alt={name} />
        </div>
        <div className="fixtureTeamName"><h3>{name}</h3></div>
      </div>
      <div className="teamGoallist"><GoalList goals={goals}/></div>
    </div>
  );
};

const TimeBoard = ({time}) => {
  return <div>
    {Moment.utc(time).local(true).format('hh:mm a')}
  </div>
};

const MatchIndicator = ({ kickoff, time }) => {
  const fullTime = Moment.utc(time).local().add(120, 'minutes');
  const playing = Moment().isAfter(fullTime);
  if(kickoff && playing) {
    return <span style={{fontSize: 11, color: '#3dad40'}}>
    <FaIcon name="circle"/>
  </span>
  } else {
    return null;
  }
};

export const DateFixtureComponent = ({data: { stage, location, stadium, kickoff, time, scores, team1, team2 }}: Props) => {

  return (
    <div className="dateFixtureContainer">
      <div className="fixtureLocationBar">
        <span><FaIcon name="map-marker" /> {stadium}</span>
        <span><MatchIndicator kickoff={kickoff} time={time}/></span>
        <span>{location}</span></div>
      <div className="fixtureContentBoard">
        <div className="team1"><Team {...team1} /></div>
        <div className="scoreTime">
          {kickoff ? <Scores scores={scores} /> : <TimeBoard time={time}/>}
        </div>
        <div className=   "team2"><Team {...team2} /></div>
      </div>
    </div>
  )
};
export default DateFixtureComponent;