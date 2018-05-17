// @flow

import { connect } from "react-redux";
import type {Dispatch} from 'redux';
import PlayerDetail from "../../components/PlayerDetail/PlayerDetail";
import { getPlayerDetail } from "../../modules/PlayerList/PlayerDetailModule";

const mapStateToProps = (state, props ) => ({
  data: state.coach.player.detail[props.playerID],
});


const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  onGetPlayerDetail: data => dispatch(getPlayerDetail(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(PlayerDetail);