// @flow

import { connect } from "react-redux";
import type {Dispatch} from 'redux';
import { getTeam, fetchTeam } from "../../modules/Coach/CoachModule";
import Coach from '../../components/Coach/Coach';
import isNil from 'lodash/isNil';

const mapStateToProps = (state, props ) => ({
  isGuest: isNil(state.auth.user.data.id)
});



const mapDispatchToProps = (dispatch: Dispatch<*>) => ({});


export default connect(mapStateToProps, mapDispatchToProps)(Coach);