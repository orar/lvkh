// @flow
import React from 'react';
import { Tabs, Spin, Icon, List, Input } from 'antd';
import type { Player } from "../../modules/PlayerList/PlayerListModule";
import type { RequestState, RoleExhaust } from "../../modules/PlayerList/PlayerMetaModule";
import PlayerComponent from './Player';
import InfiniteScroll from 'react-infinite-scroller';
import './PlayerList.scss';

const ListItem = List.Item;
const Search = Input.Search;


type Props = {
  request: RequestState,
  exhaust: RoleExhaust,
  onFetchPlayers: ({ position: string, page: number }) => any,
  onSearch: (data: string) => any,
  search: string,
  data: Array<Player>,
  position: string,
  style: Object,
  className: string,
  onSelected: (p: Player) => any,
  deSelected: (p: Player) => any,
  viewSwitches: Object,
  expandView: (p: Player) => Node,

  role: boolean,
  jersey: boolean,
  evicted: boolean,
  goals: boolean,
  price: boolean,
  weight: boolean,
  height: boolean,
  performance: boolean,
  country: boolean
}

type State = {
  loading: boolean,
}

export class PlayerListComponent extends React.Component<Props> {

  props: Props;

  handleInfiniteOnLoad = () => {

    const { data = [], exhaust, position, onFetchPlayers } = this.props;
    if (data.length > 0 && !exhaust[position]) {
      console.log('handleInfiniteOnLoad');
      onFetchPlayers({position, page: data.length});
    }
  };

  sortData = (data: Array<Player> = []) => {
    return data.sort((a, b) => a.name === b.name ? 0 : a.name < b.name ? -1 : 1 );
  };

  beginSearch = (evt: SyntheticEvent<*>) => {
    this.props.onSearch(evt.target.value);
    evt.preventDefault();
  };

  render(){
    const { data = [], exhaust, position, request, ...rest } = this.props;
    return(
    <div className="playerListContainer">
      <div className="searchBar">
        <Search
          onChange={this.beginSearch}
          value={this.props.search}
          size="small"
          placeholder="Type to search"
          style={{ width: 250 }}
        />
      </div>
      <div className="playerListScroll" style={{height: rest.style.height}}>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!exhaust[position] && !request.isPending}
          useWindow={false}
        >
          <List
            dataSource={this.sortData(data)}
            renderItem={d =>
              <ListItem>
                <PlayerComponent key={d.id} data={d} {...rest} />
              </ListItem>
            }
          >
            {request.isPending && <div className="playerListScrollLoading"><Spin
              spinning size="small"
              indicator={ <Icon type="loading" style={{ fontSize: 24 }} spin />}
            /></div>}
          </List>
        </InfiniteScroll>
      </div>
    </div>
    );
  }
}

export default PlayerListComponent;