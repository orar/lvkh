import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { fetchBenchPlayers } from "../../modules/Team/BenchModule";
import { submitTeamRoles, fetchTeamRoles } from "../../modules/Team/RoleModule";
import Bench from '../../components/Team/Bench';
import type {Player} from "../../modules/Team/Player";
import isEmpty from 'lodash/isEmpty';


/**
 * Aggregates field nonEmpty rolemap team list
 *
 * A roleMap is considered empty if its id property is undefined or empty
 *
 * @param team
 * @returns {*}
 */
export const teamList = (team: {[string]: Array<Player>}) => {
  if(!isEmpty(team)) {
    const aggregate = [];
    for(let key in team){
      if(team.hasOwnProperty(key)){
        team[key].filter(f => !!f.id).map(c => {
          c.role = key;
          aggregate.push(c);
        });
      }
    }
    //console.log(aggregate);
    return aggregate;
  }
  return [];
};

/**
 * Filters players on bench by comparing players assigned roles in team. ie Players on field
 * Filtering by Player.field property wouldnt suffice since a player moved to field would not be
 * taken out from bench. Player.field property is toggled from server upon saving the current formation
 *
 * @param bench Full list of players of a team
 * @param team A list of players (touched or untouched) assigned field roles
 * @returns {*} A list of players currently on bench
 */
export const benched = (bench: Array<Player> = [], team: Array<Player> = [] ) => {
  return bench.reduce((acc, cur) => {
    if(team.every(f => f.id !== cur.id)) {
      acc.push(cur);
    }
    return acc;
  }, []);
};

/**
 * BenchComponent props state
 * @param state whole Redux state
 * @param props ownProps passed to BenchComponent
 */
const mapStateToProps = (state, props) => ({
  data: state.coach.team.bench[props.teamID] || [],
  onBench: benched(state.coach.team.bench[props.teamID], teamList(state.coach.team.role[props.teamID])),
});




/**
 * BenchComponent works in collaboration with FieldRole MarkerComponent to manage a team.
 * Bench initiate a fetchAction to fetch both FieldRoleModule data and list of Bench Players
 * Bench coordinates API call to save a FieldRole formation.
 */
const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  //onFetchTeamRoles: data => dispatch(fetchTeamRoles(data)),
  onFetchTeamPlayers: data => dispatch(fetchBenchPlayers(data)),
  onSubmitFormation: data => dispatch(submitTeamRoles(data)),
  onSetOffset: data => dispatch(setOffset(data))
});



export default connect(mapStateToProps, mapDispatchToProps)(Bench);