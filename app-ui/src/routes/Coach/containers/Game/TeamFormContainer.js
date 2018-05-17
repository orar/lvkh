// @flow
import { connect } from "react-redux";
import type {Dispatch} from 'redux';
import { createTeam } from "../../modules/Game/CreateTeamFormModule";
import NewTeamForm from '../../components/Game/CreateTeamForm';
import get from 'lodash/get';
import { requestPrivilege } from "../../modules/Game/GamePrivilegeModule";

const mapStateToProps = (state ) => ({
  ...state.coach.game.createTeamForm,
  teams: get(state, 'coach.coach.data', []),
  privilege: state.coach.game.privilege.data,
  privilegeRequest: state.coach.game.privilege.request,
});


const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  onCreateTeam: data => dispatch(createTeam(data)),
  onRequestPrivilege: data => dispatch(requestPrivilege(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(NewTeamForm);