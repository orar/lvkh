// @flow
import React from 'react';
import type { Node } from 'react';
import { List as IList, Map } from 'immutable';
import { Card, Tabs, Icon, Avatar, WhiteSpace } from 'antd-mobile';
import type {Season} from "../../modules/SeasonModule";
import ScoreBoardContainer from '../../containers/Scoreboard/ScoreBoardContainer';
import PlayerContainer from '../../containers/PlayerContainer';
import BudgetContainer from '../../containers/Deal/DealContainer';
import SubstituteContainer from '../../containers/SubstituteContainer';
import TeamContainer from '../../containers/Coach/CoachAppContainer';
import SeasonStatContainer from '../../containers/SeasonStatContainer';
import './CoachSeasonCard.scss';


type Props = {
  season: Season,
}

type State = {
  key: string,
}

/**
 * Renders a minimal version of TeamCardComponent on mobile screens
 *
 * Not used at the moment - since it's not complete
 *
 */
export class MobileSeasonCardComponent extends React.Component<Props, State> {
  props: Props;

  tabList = [
    {
      title: <span><Icon type="dashboard" />Dash</span>
    }, {
      title: <span><Icon type="swap" />Substitute</span>
    }, {
      title: <span><Icon type="team" />Team</span>
    }, {
      title: <span><Icon type="user" />Player</span>
    }, {
      title: <span><Icon type="dashboard" />Transfer</span>
    }, {
      title: <span><Icon type="pie-chart" />Budget</span>
    },
  ];

  contentMap: Array<Node> = [
    <ScoreBoardContainer seasonID={this.props.season.id} />,
    <SubstituteContainer seasonID={this.props.season.id} />,
    <TeamContainer seasonID={this.props.season.id} />,
    <PlayerContainer seasonID={this.props.season.id} />,
    <ScoreBoardContainer seasonID={this.props.season.id} />,
    <BudgetContainer seasonID={this.props.season.id} />
  ];

  render() {
    const { seasonChart } = this.props;

    return (
      <div>
        <Card full>
          <Card.Header
            title={<p style={{ margin: '8px 0 0 20px'}}>{team.name}</p>}
            thumb={team.coverUrl}
            thumbStyle={{borderRadius: '50%'}}
            extra={<SeasonStatContainer seasonID={team.id}/>}
          />
          <Card.Body>
            <Tabs
              tabs={this.tabList}
              initialPage={1}
            >
              {this.contentMap.map(v => v)}
            </Tabs>
          </Card.Body>
          <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
        </Card>
      </div>
    )
  }
}



export default MobileSeasonCardComponent;