// @flow
import React from 'react';
import type {Fixture} from "../../modules/Fixture/FixtureModule";
import StageList from './StageList';
import isEmpty from 'lodash/isEmpty';
import './Fixture.scss';

type Props = {
  data: {[string]: { [string]: Array<Fixture> }},
  onFetchFixtures: () => any,
  onSaveFixtures: () => any,
}



export class FixtureComponent extends React.Component<Props> {
  props: Props;

  componentDidMount() {
    if(isEmpty(this.props.data)){
      //this.props.onFetchFixtures();
      this.props.onSaveFixtures();
    }
  }

  render() {
    const { data = {} } = this.props;
    const keys = Object.keys(data) || [];

    return (
      <div className="fixtureContainer">
        <div className="fixtureStage">
          {keys.map((d, i ) =>
            <StageList key={`${i}`} stage={d} data={data[d]}/>
          )}
        </div>
      </div>
    );
  }
}


export default FixtureComponent;