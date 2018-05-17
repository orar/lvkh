// @flow
import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { Tabs } from 'antd';
import type { Player } from "../../modules/PlayerList/PlayerListModule";
import CountryComponent from './Country';
import type { Country } from "../../modules/CountryList/CountryListModule";

const TabPane = Tabs.TabPane;

type Props = {
  data: Array<Country>,
  onFetchPlayers: () => any,
  style: Object,
  imgStyle: Object,
  className: string,
  onSelected: (p: Player) => any,
  deSelected: (p: Player) => any,
  viewSwitches: Object,
  expandView: (p: Player) => Node,
}

export class CountryListComponent extends React.Component<Props> {

  props: Props;

  componentDidMount() {
    if (isEmpty(this.props.data)) {
      this.props.onFetchPlayers();
    }
  }

  renderCountryList = (data: Array<Country> = [] ) => {
    const { style, imgStyle, className, viewSwitches, expandView, onSelected, deSelected } = this.props;
    if(data.length){
      return data.map(d =>
        <CountryComponent
          key={d.id}
          imgStyle={imgStyle}
          data={data}
          style={style}
          className={className}
          viewSwitches={viewSwitches}
          expandView={expandView}
          onSelected={onSelected}
          deSelected={deSelected}
        /> )
    } else {
      return null;
    }
  };

  render(){

    return(
      <div>
        {this.renderCountryList(this.props.data)}
      </div>
    );
  }
}

export default CountryListComponent;