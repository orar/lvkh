// @flow
import React from 'react';
import DateList from './DateList';
import type {Fixture} from "../../modules/Fixture/FixtureModule";
import { Divider } from 'antd';
import './StageList.scss';
type Props = {
  stage: string,
  data: { [string]: Array<Fixture> },
};


export const StageListComponent = ({stage, data}: Props) => {
  const keys = Object.keys(data);
  return (
    <div className="stageListContainer">
      <div className="stageListHeader"><h3>{stage}</h3></div>
      <div>
        {keys.map(k => <DateList key={k} title={k} data={data[k]}/>)}
      </div>
    </div>
  )
};

export default StageListComponent;