// @flow
import React from 'react';
import type {SeasonScoreStat} from "../../modules/Scoreboard/ScoreBoardModule";
import { Divider, Card, Tooltip, Icon, Avatar, List, Modal } from 'antd';
import classNames from 'classnames';
import {positionth} from "../../../../util/HelperUtil";
import toUpper from 'lodash/toUpper';
import upperFirst from 'lodash/upperFirst';
import { Icon as FaIcon } from 'react-fa';
import { UnmountClosed as Collapse} from 'react-collapse';
import SeasonScoreChartContainer from '../../containers/Scoreboard/SeasonScoreChartContainer';
import theme from '../../../../util/Theme';
import './ScoreBoard.scss';



type Props = {
  season: SeasonScoreStat
};

type State = {
  collapse: boolean,
  chartOpen: boolean,
}


export class SeasonScoreChartComponent extends React.Component<Props, State> {
  props: Props;

  state: State = { collapse: false, chartOpen: false };

  toggleCollapse = () => this.setState({ collapse: !this.state.collapse });

  toggleChartModal = () => this.setState({ chartOpen: !this.state.chartOpen });

  styles = {
    scoreCard: {
      cursor: 'auto',
    },
    seasonScoreBar: {
      cursor: 'pointer'
    },
    collapseDiv: {
      padding: '0 10px',
      //cursor: 'none',
    },
    nowrap: {
      whiteSpace: 'nowrap',
    },
    bigScoreWrapper: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
    },
    bigScore: {
      width: 110,
      fontSize: 27,
      textAlign: 'center',
      border: '2px solid',
      borderColor: theme.linkBlue,
      borderRadius: 30,
      mozBorderRadius: 30,
      webkitBorderRadius: 30,
      cursor: 'pointer',
    }
  };

  render() {
    const {season: s} = this.props;

    return (
      <div className="seasonScoreChart">
        <Card style={this.styles.scoreCard} hoverable>
          <div style={this.styles.seasonScoreBar} onClick={this.toggleCollapse} className="seasonScoreBar">
            <div className="seasonScore--tick">
              <h3>
                <Tooltip arrowPointAtCenter placement="topLeft" title="Average Status">
                  <span className={classNames('average', {greenDarkFace: s.increment, redWhiteFace: !s.increment})}>
                    {s.increment ? <Icon type="arrow-up"/> : <Icon type="arrow-down"/>}
                  </span>
                  <span>
                    {s.increment ? `+${s.averageIndex}` : `-${s.averageIndex}`}
                  </span>
                </Tooltip>
              </h3>
            </div>
            <div className="seasonScore--score">
              <Tooltip title="Season Score"><span>{s.score}</span></Tooltip></div>
            <div className="seasonScore--global">
              <Tooltip title="Global Season Position">
                <FaIcon name="globe"/>
                <span>{s.globalPosition.toLocaleString()}<sup>{toUpper(positionth(s.globalPosition))}</sup></span>
              </Tooltip>
            </div>
            <div className="seasonScore--local">
              <Tooltip title={`${upperFirst(s.localName)} Season Position`}>
                <FaIcon name="map-marker"/>
                <span>{s.localPosition.toLocaleString()}<sup>{toUpper(positionth(s.localPosition))}</sup></span>
              </Tooltip>
            </div>
          </div>
          <Collapse isOpened={this.state.collapse}>
            <div style={this.styles.collapseDiv}>
            <Divider/>
            <div style={this.styles.bigScoreWrapper}>
              <div style={this.styles.bigScore}>
                <span>{s.score}</span>
              </div>
            </div>

              {/*<Modal
                title="Performance Chart"
                width={700}
                mask={false}
                visible={this.state.chartOpen}
                onCancel={this.toggleChartModal}
                destroyOnClose
                footer={null}
              >
                <SeasonScoreChartContainer teamID={this.props.season.teamID} />
              </Modal>*/}

            <Divider>Global Chart</Divider>

            <span style={this.styles.nowrap}>
              Position:
              <Tooltip>
                <span> {s.globalPosition.toLocaleString()}<sup>{toUpper(positionth(s.globalPosition))}</sup>
                </span>
              </Tooltip>
            </span>
            <span style={this.styles.nowrap}>
              Last Position:
              <Tooltip>
                <span> {s.lastGlobalPosition.toLocaleString()}<sup>{toUpper(positionth(s.lastGlobalPosition))}</sup>
                </span>
              </Tooltip>
            </span>
            <Divider/>
            <div>
              <div>
                <List.Item.Meta
                  style={{ width: '100%' }}
                  avatar={!!s.globalAvatar ?
                    <Avatar size="large" src={s.globalAvatar}/> :
                    <Avatar size="large">{toUpper(s.globalUser.charAt(0))}</Avatar>
                  }
                  title={<a href="#">{s.globalTeam}</a>}
                  description={
                    <div style={{ display: 'flex', flexFlow: 'row wrap'}} >
                      <span style={this.styles.nowrap}><Icon type="user"/> {s.globalUser}</span>
                      <span style={this.styles.nowrap}><FaIcon name="map-marker"/> {s.globalLocation}</span>
                    </div>
                  }
                />
              </div>
            </div>
            <Divider>{s.localName} Chart</Divider>
              <span style={this.styles.nowrap}>
              Position:
              <Tooltip>
                <span> {s.localPosition.toLocaleString()}<sup>{toUpper(positionth(s.localPosition))}</sup>
                </span>
              </Tooltip>
            </span>
              <span style={this.styles.nowrap}>
              Last Position:
              <Tooltip>
                <span> {s.lastLocalPosition.toLocaleString()}<sup>{toUpper(positionth(s.lastLocalPosition))}</sup>
                </span>
              </Tooltip>
            </span>
              <Divider/>
              <div>
                <div>
                  <List.Item.Meta
                    style={{ width: '100%' }}
                    avatar={!!s.localAvatar ?
                      <Avatar size="large" src={s.localAvatar}/> :
                      <Avatar size="large">{toUpper(s.localUser.charAt(0))}</Avatar>
                    }
                    title={<a href="#">{s.localTeam}</a>}
                    description={
                      <div style={{ display: 'flex', flexFlow: 'row wrap'}}>
                        <span style={this.styles.nowrap} ><Icon type="user"/> {s.localUser}</span>
                        <span style={this.styles.nowrap} ><FaIcon name="map-marker"/> {s.localLocation}</span>
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
          </Collapse>
        </Card>
      </div>
    )
  }
}


export default SeasonScoreChartComponent;