import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import BenchPlayer from '../../components/Team/BenchPlayer';
import { roleAdd, roleRemove, roleReplace } from "../../modules/Team/RoleModule";
import { isObjEmpty } from "../../../../util/HelperUtil";
import get from 'lodash/get';

import { clog } from "../../../../util/HelperUtil";


const getRoleMap = (state, props) => {
  const pl = (state.coach.team.bench[props.teamID] || []).find(f => f.id === props.id) || {};
  if(isObjEmpty(pl)) {
    return get(state.coach.team.role, `${pl.teamID}.${pl.role}`, []);
  }
};

/**
 * Checks if there is an empty roleMap w.r.t the role of the Player
 *
 * @param state
 * @param props
 * @returns {boolean}
 */
const anyEmptyRoleMap = (state, props) => {
  //Check if player exist in bench
  const player = (state.coach.team.bench[props.teamID] || []).find(f => f.id === props.id) || {};
  if(!isObjEmpty(player)) {
    const rolemap = get(state.coach.team.role, `${player.teamID}.${player.role}`, []);
    if(rolemap.length > 0){
      return rolemap.some(f => !f.id);
    }
  }
  return false;
};

/**
 * Maps the redux state to component props
 * @param state
 * @param props
 */
const mapStateToProps = (state, props) => ({
  //Filter by teamID and find a player with props.id
  data: (state.coach.team.bench[props.teamID] || []).find(f => f.id === props.id) || {},
  hasEmptyRoleMap: anyEmptyRoleMap(state, props),

});


/**
 * Maps the redux dispatch function to component props
 * */
const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  onRoleAdd: data => dispatch(roleAdd(data)),
});



export default connect(mapStateToProps, mapDispatchToProps)(BenchPlayer);