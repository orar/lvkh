// @flow
import { connect } from 'react-redux';
import { getProfile, resetProfile} from "../modules/Profile/ProfileModule";
import type { Dispatch } from "redux";
import get from 'lodash/get'
import isNil from 'lodash/isNil';
import UserProfileWidget from '../components/ProfileWidget/UserProfileWidget';


const findProfile = (state, username ) => {
  return state.user.profile.data.find(d => d.username === username) || {}
};

const ownsProfile = (state, username) => {
  if(state.user.profile.user && !isNil(state.user.profile.user.username)){
    return state.user.profile.user.username === username;
  } else {
    return false;
  }
};

export const  mapStateToProps = (state, props) => ({
  data: findProfile(state, props.username),
  ownProfile: ownsProfile(state, props.username),
  //profile: state.user.profile.user,
  //user: get(state, 'auth.user.data', {}),
});


export const mapDispatchToProps = (dispatch: Dispatch<*> ) => ({
  onGetProfile: data => dispatch(getProfile(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(UserProfileWidget)