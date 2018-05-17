// @flow
import React from 'react';
import { Link } from 'react-router';
import isEmpty from 'lodash/isEmpty';
import upperFirst from 'lodash/upperFirst';
import toUpper from 'lodash/toUpper';
import { Tabs, List, Avatar, Icon, Tooltip, Popover } from 'antd';
import { UnmountClosed } from 'react-collapse';
import { Icon as FaIcon } from 'react-fa';
import InCommentContainer from '../../../User/containers/Comment/InCommentContainer';
import type {TeamScore} from "../../modules/Scoreboard/RoundScoreDetailModule";
import { positionth, windowHeight } from '../../../../util/HelperUtil';
import config from 'config/index';
import './ScoreBoard.scss';

const TabPane = Tabs.TabPane;


type Props = {
  teamID: string,
  userID: string,
  seasonID: string,
  roundID: string,
  roundName: string,
  roundCoverUrl: string,
  score: number,

  globalScore: number,
  globalPosition: number,

  localName: string,
  localScore: number,
  localPosition: number,

  startDate: number,
  endDate: number,

  global: Array<TeamScore>,
  local: Array<TeamScore>,
  friend: Array<TeamScore>,
  onFetchScoreList: ({teamID: string, roundID: string }) => any,
}

type State = {
  collapse: boolean,
}

export class RoundScoreDetailComponent extends React.Component<Props, State> {
  props: Props;

  //state of componente
  state: State = { collapse: false };

  /**
   *On componentDidMount, fetch team score list
   */
  componentDidMount(){
    if(isEmpty(this.props.global)){
      const { teamID, roundID } = this.props;
      this.props.onFetchScoreList({ teamID, roundID });
    }
  }

  styles = {
    userInfo: {
      display: 'flex',
      flexFlow: 'row wrap',
    },
    playerScoreLine: {
      display: 'flex',
      flexFlow: 'row nowrap',
      fontSize: '1.3rem',
    },
    playerScore: {
      float: 'left',
      display: 'flex',
      flexFlow: 'column nowrap',
    },
    span: {
      marginTop: 3,
    },
    scoreLabel: {
      marginTop: -8,
      textTransform: 'uppercase',
      fontSize: '0.9rem',
    }
  };

  /**
   * Render score detail: list of users their teams on the score list sorted by highest score
   */
  renderScoreList = (data: Array<TeamScore>) => {
    return (
      <div style={{ maxHeight: windowHeight() * 0.8, overflowY: 'auto' }}>
        <List
          className="playerScoreList"
          itemLayout="horizontal"
          dataSource={data}
          renderItem={d => (
            <List.Item >
              <List.Item.Meta
                style={{ width: '100%' }}
                avatar={<Avatar src={d.avatar} />}
                title={<Link to={`${config.route.coach.appRaw}/${d.username}/${d.teamName.replace(new RegExp(' ', 'g'), '_')}`}>{d.teamName}</Link>}
                description={
                  <div className="playerScoreList_desc">
                    <div style={this.styles.userInfo}>
                      <div style={{ marginRight: 6 }}>
                        <Icon type="user" />
                        <Tooltip title={`@${d.username}`}>
                          <Link to={`${config.route.coach.appRaw}/${d.username}`}>{d.name}</Link>
                        </Tooltip>
                      </div>
                      <div>
                        <FaIcon name="map-marker" /><span>{d.location}</span>
                      </div>
                    </div>
                    <div style={this.styles.playerScoreLine}>
                      <div style={this.styles.playerScore}>
                        <span style={this.styles.span}>{d.score.toLocaleString()}</span>
                        <span style={this.styles.scoreLabel}>Score</span>
                      </div>
                      <div style={{...this.styles.playerScore, marginLeft: 16}}>
                         <span style={this.styles.span}>
                           {d.position.toLocaleString()}
                           <sup style={{ fontSize: '.9rem'}}>
                             {toUpper(positionth(d.position))}
                             </sup>
                         </span>
                        <span style={this.styles.scoreLabel}>Position</span>
                      </div>
                    </div>
                    <div className="collapseMore">
                      <InCommentContainer threadID={d.teamID} teamID={d.teamID} roundID={d.roundID} />
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    )
  };

  /**
   * Renders title pane
   *
   * not used
   *
   * @param title
   * @returns {XML}
   */
  renderPaneTitle = (title: string) => {
    return (
      <div style={{ textAlign: 'center', margin: 0}}>
        <p>{title}</p>
      </div>
    )
  };

  /**
   * Entry Render
   * A scorelist is tabbed to global, local, friend domains of the team user
   */
  render(){
    const { global, local, friend, localName } = this.props;
    return(
      <div style={{ marginTop: -23 }}>
        <Tabs
          tabBarStyle={{ display: 'flex', justifyContent: 'center'}}>
          {/*<TabPane tab="Team" key="team"> //TODO:
            {this.renderList(this.props.global)}
          </TabPane>*/}
         {!isEmpty(global) && <TabPane tab="Global" key="global">
            {this.renderScoreList(global)}
          </TabPane>}
          {!isEmpty(local) && <TabPane tab={upperFirst(localName)} key="local">
            {this.renderScoreList(local)}
          </TabPane>}
          {!isEmpty(friend) && <TabPane tab="Friends" key="friend">
            {this.renderScoreList(friend)}
          </TabPane>}
        </Tabs>
      </div>
    )
  }
}


export default RoundScoreDetailComponent;