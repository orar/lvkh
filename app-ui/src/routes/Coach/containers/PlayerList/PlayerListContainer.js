// @flow
import groupBy from 'lodash/groupBy';
import { connect } from "react-redux";
import type {Dispatch} from 'redux';
import { fetchPlayerList } from "../../modules/PlayerList/PlayerListModule";
import { searchPlayerList } from "../../modules/PlayerList/PlayerMetaModule";
import PlayerListView from "../../components/PlayerList/PlayerListView";
import type {Player} from "../../modules/PlayerList/PlayerListModule";
import toLower from 'lodash/toLower';

const groupRole = (data: Array<Player>) => groupBy(data, 'role');

const searchList = (list: Array<Player>, token: string = '') => {
  if(token) {
    return list.reduce((acc, cur) => {
      const base = toLower(Object.values(cur).join(' '));
      const tokens = token.split(' ');
      if (tokens.some(t => base.indexOf(t) > 0)) {
        acc.push(cur);
      }
      return acc;
    }, [])
  }
  return list;
};

const mapStateToProps = (state, props ) => ({
  data: groupRole(searchList(state.coach.player.list, state.coach.player.meta.search.data)),
  exhaust: state.coach.player.meta.exhaust,
  request: state.coach.player.meta.request,
  search: state.coach.player.meta.search.data,
  team: state.coach.team.bench,

});



const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  onFetchPlayers: data => dispatch(fetchPlayerList(data)),
  onSearch: data => dispatch(searchPlayerList(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(PlayerListView);