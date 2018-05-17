// @flow
import React from 'react';
import capitalize from 'lodash/capitalize';
import type { RoundScoreStat } from "../../modules/Scoreboard/ScoreBoardModule";
import { Divider, Card, Tooltip, Icon, Avatar } from 'antd';
import toUpper from 'lodash/toUpper';
import classNames from 'classnames';

type Props = {
  round: RoundScoreStat
};


/**
 * The top collapsible bar with a little starts of the game in context and user's team
 * @param s
 * @returns {XML}
 * @constructor
 */
export const RoundScoreChartComponent = ({round: s}: Props) => {

  return (
    <Card>
      <Divider>{s.roundName} Chart</Divider>
      {/** First section: Top bar starts of team */}
      <div>
        <Tooltip placement="top" title="Average Index">
          <h3>
          <span className={classNames('average', {greenDarkFace: s.increment, redWhiteFace: !s.increment})}>
            {s.increment ? <Icon type="arrow-up"/> : <Icon type="arrow-down"/>}
          </span>
            <span>
            {s.increment ? `+${s.averageIndex}` : `-${s.averageIndex}`}
          </span>
          </h3>
        </Tooltip>
        <span><h3>{s.score}</h3></span>
      </div>

      {/** Usually collapsed lower section */}
      <Divider>{s.roundName} Global Chart {s.globalPosition}/{s.lastGlobalPosition}</Divider>
      <div>
        <span>Position: {s.globalPosition}</span>
      </div>
      <div>
        <span>{!!s.globalAvatar ? <Avatar src={s.globalAvatar} /> :  <Avatar>{toUpper(s.globalTeam.split('')[0])}</Avatar>}</span>
        {!!s.globalUser && <span><Icon type="user" /> {s.globalUser}</span>}
        <span><Tooltip title="Team"><Icon type="team" /> {s.globalTeam}</Tooltip></span>
        <span>{s.globalScore}</span>
        <span>{s.globalLocation}</span>
      </div>
      <Divider>{s.localName} Chart {s.localPosition}/{s.lastLocalPosition}</Divider>
      <div>
        <span>Position: {s.localPosition}</span>
      </div>
      <div>
        {!!s.globalAvatar && <span><Avatar src={s.localAvatar} /></span>}
        {!!s.localUser && <span><Icon type="user" /> {s.localUser}</span>}
        {!!s.localTeam && <span><Tooltip title="Team"><Icon type="team" /> {s.localUser}</Tooltip></span>}
        <span><Tooltip title={`${capitalize(s.localName)} Top Score`}><Icon type="pie-chart" /> {s.localScore}</Tooltip></span>
        <span><Tooltip title="Location"><Icon type="environment-o" /> {s.localLocation}</Tooltip></span>
      </div>
    </Card>
  )
};

export default RoundScoreChartComponent;