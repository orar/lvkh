// @flow
import React from 'react';
import DateFixture from './DateFixture';
import type {Fixture} from "../../modules/Fixture/FixtureModule";
import { Divider } from 'antd';
import Moment from 'moment';

type Props = {
  data: Array<Fixture>,
  title: string,
};


export const DateListComponent = ({data, title: date}: Props) => {
  return (
    <div>
      <Divider><span> {Moment(date).format('dddd, MMMM Do, YYYY')}</span></Divider>
      <div>
        <div>{data.map((d, i) => <DateFixture key={`f${i}`} data={d} />)}</div>
      </div>
    </div>
  )
};
export default DateListComponent;