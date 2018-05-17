import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import FieldRole from '../../components/Team/FieldRole';
import { teamList } from "./BenchContainer";

/**
 * Maps the redux state to component props
 *
 * @param state
 * @param props
 */
const mapStateToProps = (state, props) => ({
  roleMap: teamList(state.coach.team.role[props.teamID]),
});

/**
 *
 * RoleData doesn't call any API.
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  //onClearRoles: () => dispatch(clearRoles()),
});


export default connect(mapStateToProps, mapDispatchToProps)(FieldRole);