import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import FieldPlayer from '../../components/Team/FieldPlayer';
import { roleAdd, roleRemove, roleReplace, makeCaptain, makeViceCaptain } from "../../modules/Team/RoleModule";

import { clog } from "../../../../util/HelperUtil";

/**
 * Maps the redux state to component props
 * */
const mapStateToProps = (state, props) => ({
  data: (state.coach.team.bench[props.teamID] || []).find(f => f.id === props.id) || {},
});


/**
 * Maps the redux dispatch function to component props
 * */
const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  onRoleAdd: data => dispatch(roleAdd(data)),
  onRoleReplace: data => dispatch(roleReplace(data)),
  onRoleRemove: data => dispatch(roleRemove(data)),
  onCaptainize: data => dispatch(makeCaptain(data)),
  onViceCaptainize: data => dispatch(makeViceCaptain(data)),
});



export default connect(mapStateToProps, mapDispatchToProps)(FieldPlayer);