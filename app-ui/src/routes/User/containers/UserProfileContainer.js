// @flow
import { connect } from 'react-redux';
import { getUserProfile } from "../modules/Profile/ProfileModule";
import { commitProfile, requestReset } from "../modules/Profile/ProfileFormModule";
import type { Dispatch } from "redux";
import get from 'lodash/get'
import UserProfile from '../components/Profile/Profile';





export const  mapStateToProps = (state, props) => ({
  data: state.user.profile.user,
  request: state.user.profileForm.request,
  user: get(state, 'auth.user.data', {}),
});


export const mapDispatchToProps = (dispatch: Dispatch<*> ) => ({
  onGetProfile: data => dispatch(getUserProfile(data)),
  onCommitProfile: data => dispatch(commitProfile(data)),
  onResetRequest: () => dispatch(requestReset()),
});


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)