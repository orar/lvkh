// @flow
import React from 'react';
import type { Node } from 'react';
import { browserHistory } from 'react-router';
import { Card, Icon, Avatar } from 'antd';
import type { Team } from "../../modules/Coach/CoachModule";
import ScoreBoardContainer from '../../containers/Scoreboard/ScoreBoardContainer';
import './CoachSeasonCard.scss';
import StageComponent from "../Team/Stage";
import TransferComponent from "../Transfer/Transfer";
import config from 'config/index';


type Props = {
  team: Team,
}

type State = {
  key: string,
}

/**
 * Tablist map and headings on TeamCard
 * @type {[null,null,null]}
 */
const  tabList = [
  {
    key: 'scoreboard',
    tab: <span><Icon type="dashboard" />Score Board</span>
  },

  {
    key: 'team',
    tab: <span><Icon type="team" />Team</span>
  },

  {
    key: 'transfer',
    tab: <span><Icon type="swap" />Transfer</span>
  },
  /*  {
     key: 'deal',
     tab: <span><Icon type="pie-chart" />Deals</span>
   },*/
];

/**
 * SeasonCardComponent to be renamed to TeamCardComponent
 * Renders a team
 */
export class SeasonCardComponent extends React.Component<Props, State> {
  props: Props;

  state: State = { key: 'scoreboard' };

  updateLocation = (evt: SyntheticEvent<*>) => {
    const { username, id } = this.props.team;
    browserHistory.push(`${config.route.coach.appRaw}/${username}/${id}`);
    evt.preventDefault();
  };



  getTab = (key: string) => {
    const { id, readOnly, seasonID } = this.props.team;

    const tabs = {
      scoreboard: <ScoreBoardContainer teamID={id} seasonID={seasonID} readOnly={readOnly} />,
      team: <StageComponent teamID={id} readOnly={readOnly} />,
      transfer: <TransferComponent teamID={id} readOnly={readOnly} />,
    };
    return tabs[key];
  };


  onTabChange = ( key: string, value: string) => {
    this.setState({ [key]: value });
  };

  openTabs = () => {
    const { openTabs } = this.props.team;
    return tabList.filter(f => openTabs.includes(f.key));
  };

  render() {
    const { team } = this.props;
    const titleStyle = ({ display: 'inline-flex', alignItems: 'center', backgroundColor: '#fff' });

    /**
     * TeamCard
     *  card id to be used for scrollTo
     *  onFocus( click ), update history to reflect team for better SEO and sharing
     */
    return (
          <Card
            id={team.id}
            onFocus={this.updateLocation}
            hoverable
            className="seasonCardContainer"
            bordered={false}
            title={
              <div style={titleStyle} >
                {!!team.coverUrl && <Avatar size="large" shape="square" src={team.coverUrl} />}
                <p style={{ margin: '8px 0 0 20px'}}>{team.name}</p>
              </div>}
            tabList={this.openTabs()}
            onTabChange={key => {
              this.onTabChange('key', key);
            }}
          >
            {this.getTab(this.state.key)}
          </Card>
    )
  }
}



export default SeasonCardComponent;