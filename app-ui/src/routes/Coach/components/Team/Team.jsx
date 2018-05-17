// @flow

import React from 'react';
import { List, Divider, Avatar } from 'antd';
import type {Team} from "../../modules/Coach/CoachModule";
import classNames from 'classnames';
import './Team.scss';

type Props = {
  data: Team
}


/**
 * @param data
 * @returns {XML}
 * @constructor
 */
export const TeamComponent = ({data}: Props) => {

  return (
    <div>
      <div>
        <h3>{data.name}</h3>
      </div>
      <Divider>Team ({data.players.length})</Divider>
      <List
        itemLayout="horizontal"
        dataSource={data.players}
        renderItem={player => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={player.avatar} />}
              title={<h3>{player.name}</h3>}
              description={
                <div className={classNames('teamPlayer', {grayFace: player.field})}>
                  <span>Position: {player.position}</span>{/*Add PopOver to view player details*/}
                  <span>Role: {player.role}</span>
                  <span className={classNames({greenFace: !player.field, orangeFace: player.field})}>
                    {player.field ? 'Bench': 'Field'}
                  </span>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default TeamComponent;