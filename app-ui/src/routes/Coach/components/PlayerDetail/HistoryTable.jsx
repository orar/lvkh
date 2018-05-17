// @flow
import React from 'react';
import type {PlayerPerfHistory} from "../../modules/PlayerList/PlayerDetailModule";
import { Column, Table } from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
import { Tooltip } from 'antd';

export const HistoryTableComponent = ({ history }: {history: Array<PlayerPerfHistory> }) => {

  const list = history.reduce((acc, cur) => {
      acc.push(Object.values(cur));
      return acc;
  }, []);


  const columnWidth = 40;

  return (
    <div>
      <Table
        width={700}
        height={300}
        headerHeight={20}
        rowHeight={20}
        rowCount={history.length}
        rowGetter={({ index }) => history[index]}
        rowStyle={{borderBottom: '1px solid #b3b3b3'}}
      >
        <Column
          label='Round'
          dataKey='roundName'
          width={100}
        />
        <Column
          label={<Tooltip title="Opponent">OP</Tooltip>}
          dataKey='opponent'
          width={120}
        />
        <Column
          label={<Tooltip title="Game Points">PTS</Tooltip>}
          dataKey='points'
          width={columnWidth}
        />
        <Column
          label={<Tooltip title="Minutes Played">MP</Tooltip>}
          dataKey='minutes'
          width={columnWidth}
        />
        <Column
          label={<Tooltip title="Goal Scored">GS</Tooltip>}
          dataKey='goalScore'
          width={columnWidth}
        />
        <Column
          label={<Tooltip title="Assists">AS</Tooltip>}
          dataKey='assist'
          width={columnWidth}
        />
        <Column
          label={<Tooltip title="Saves">SV</Tooltip>}
          dataKey='saves'
          width={columnWidth}
        />
        <Column
          label={<Tooltip title="Own Goal">OG</Tooltip>}
          dataKey='ownGoal'
          width={columnWidth}
        />
        <Column
          label={<Tooltip title="Goal Conceded">GC</Tooltip>}
          dataKey='goalConcede'
          width={columnWidth}
        />
        <Column
          label={<Tooltip title="Clean Sheet">CS</Tooltip>}
          dataKey='cleanSheet'
          width={columnWidth}
        />
        <Column
        label='Penalty Miss'
        dataKey='penaltyMiss'
        width={columnWidth}
        />
        <Column
        label='Yellow Card'
        dataKey='yellowCard'
        width={columnWidth}
        /><Column
        label='RCard'
        dataKey='redCard'
        width={columnWidth}
      />
        <Column
          label='Penalty Save'
          dataKey='penaltySave'
          width={columnWidth}
        />
      </Table>
    </div>
  )
};

export default HistoryTableComponent;