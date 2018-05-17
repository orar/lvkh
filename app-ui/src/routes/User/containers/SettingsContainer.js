// @flow
import { connect } from 'react-redux';
import { getUserProfile } from "../modules/Profile/ProfileModule";
import { getSettings, updateSettings } from "../modules/Settings/SettingsModule";
import type { Dispatch } from "redux";
import get from 'lodash/get'
import Settings from '../components/Settings/Settings';





export const  mapStateToProps = (state, props) => ({
  data: state.user.settings
});


export const mapDispatchToProps = (dispatch: Dispatch<*> ) => ({
  onGetSettings: data => dispatch(getSettings(data)),
  onUpdateSettings: data => dispatch(updateSettings(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Settings)