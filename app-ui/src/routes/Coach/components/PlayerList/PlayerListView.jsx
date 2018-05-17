// @flow
import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { Tabs, Spin, Icon } from 'antd';
import type { Player } from "../../modules/PlayerList/PlayerListModule";
import PlayerComponent from './Player';
import { windowWidth } from "../../../../util/HelperUtil";
import PlayerList from './PlayerList';
import './PlayerListView.scss';


const TabPane = Tabs.TabPane;

type Props = {
  data: { [string]: Array<Player> },
  onFetchPlayers: () => any,
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

export class PlayerListViewComponent extends React.Component<Props> {

  props: Props;

  componentDidMount() {
    if (isEmpty(this.props.data)) {
      this.props.onFetchPlayers();
    }
  }

  switchTitle = (full: string, abbr: string) => {
    return windowWidth() >= 500 ? full : abbr;
  };

  render(){
    const { data = {}, ...rest } = this.props;
    return(
      <div className="playerListContainer">
        <div className="playerListTabsWrap" style={{width: rest.style.tabs.width}}>
            <Tabs defaultActiveKey="1">
              <TabPane tab={this.switchTitle("Goal Keeper", 'GK')} key="1">
                <div className="playerListWrap">
                  <PlayerList position="goalkeep" data={data.goalkeep} {...rest} />
                </div>
              </TabPane>
              <TabPane tab={this.switchTitle("Defender", 'DF')} key="2">
                <div className="playerListWrap">
                  <PlayerList position="defence" data={data.defence} {...rest} />
                </div>
              </TabPane>
              <TabPane tab={this.switchTitle('Midfielder', 'MD')} key="3">
                <div className="playerListWrap">
                  <PlayerList position="midfield" data={data.midfield} {...rest} />
                </div>
              </TabPane>
              <TabPane tab={this.switchTitle('Forward', 'FR')} key="4">
                <div className="playerListWrap">
                  <PlayerList position="forward" data={data.forward} {...rest} />
                </div>
              </TabPane>
            </Tabs>
        </div>
      </div>
    );
  }
}

export default PlayerListViewComponent;