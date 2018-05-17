import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import { fetchFormation, changeFormation } from "../../modules/Team/FormationModule";
import Formation from '../../components/Team/Formation';



/**
 * Maps the redux state to component props
 * */
const mapStateToProps = (state, props) => ({
  ...state.coach.team.formation[props.teamID],
});


/**
 * Maps the redux dispatch function to component props
 * */
const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  onFetchFormation: data => dispatch(fetchFormation(data)),
  onChangeFormation: data => dispatch(changeFormation(data)),
});



export default connect(mapStateToProps, mapDispatchToProps)(Formation);