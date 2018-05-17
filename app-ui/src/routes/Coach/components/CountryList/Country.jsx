// @flow
import React from 'react';
import type { Node } from 'react';
import type { Country } from "../../modules/CountryList/CountryListModule";
import { List, Divider, Icon} from 'antd';
import { UnmountClosed as Collapse } from 'react-collapse';
import isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';

import './CountryList.scss';

const Meta = List.Item.Meta;


type Props = {
  data: Country,
  style: Object,
  imgStyle: Object,
  className: string,
  onSelected: (p: Country) => any,
  deSelected: (p: Country) => any,
  viewSwitches: Object,
  expandView: (p: Country) => Node,
};

type State = {
  selected: boolean,
  expand: boolean,
}

const Span = ({children, margin, left, right}) => {
  const style = {};
  if(left && typeof left === 'number')
    style.marginLeft = left;
  if(right && typeof right === 'number')
    style.marginRight = right;
  if(!isEmpty(margin))
    style.margin = margin;

  return (
    <span style={style}>{children}</span>
  );
};

const Evicted = ({evicted}) => {
  const style = {padding: 4};
  return evicted ?
    <span className="redWhiteFace" style={style} >ACTIVE</span> :
    <span className="greenWhiteFace" style={style} >EVICTED</span>;
};



export class CountryComponent extends React.Component<Props, State> {
  props: Props;

  state: State = { selected: false, expand: false };

  selectCountry = (evt: SyntheticEvent<*>) => {
    evt.preventDefault();
    if(this.state.selected) {
      this.props.deSelected(this.props.data);
    } else {
      this.props.onSelected(this.props.data);
    }
    this.setState({selected: !this.state.selected});
  };

  toggleExpand = () => this.setState({ selected: !this.state.selected });



  render() {
    const { data, style, imgStyle, className, viewSwitches, expandView } = this.props;

    let sw = viewSwitches || {};

    return (
      <div className="playerInfoContainer" onClick={this.selectCountry}>
        <Meta
          style={style}
          className={classnames('playerInfoMeta', {playerSelected: this.state.selected}, className)}
          avatar={<img style={{...{width: 80, height: 50}, imgStyle}} src={data.flag} alt={data.name} /> }
          title={data.name}
          description={
            <div>
              <div>
                <Span left={4}><span>Region:</span>{data.continent}</Span>
                <Span left={4}><Evicted evicted={data.evicted}/></Span>
              </div>
              { !isEmpty(expandView) &&
              <div style={{ width: '100%'}} >
                <div style={{ textAlign: 'center'}}>
                    <span onClick={this.toggleExpand}>
                      { this.state.expand ? <Icon type="up" /> : <Icon type="down" /> }
                    </span>
                </div>
                <Collapse isOpened={this.state.expand} >
                  <div>
                    <Divider />
                    {expandView(data)}
                  </div>
                </Collapse>
              </div>
              }
            </div>
          }
        />
      </div>
    );
  }
}


export default CountryComponent;