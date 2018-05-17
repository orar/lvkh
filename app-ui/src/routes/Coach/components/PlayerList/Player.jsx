// @flow
import React from 'react';
import type { Node } from 'react';
import type {Player} from "../../modules/PlayerList/PlayerListModule";
import { List, Divider, Icon, Avatar, Modal, Input } from 'antd';
import { UnmountClosed as Collapse } from 'react-collapse';
import isEmpty from 'lodash/isEmpty';
import { Icon as FaIcon } from 'react-fa';
import classnames from 'classnames';
import upperFirst from 'lodash/upperFirst'
import './Player.scss';
import { slashNumber, abbreviateRole } from "../../../../util/HelperUtil";

const Meta = List.Item.Meta;


type Props = {
  data: Player,
  style: Object,
  className: string,
  onSelected: (p: Player) => any,
  deSelected: (p: Player) => any,
  expandView: (p: Player) => Node,
  actions: Array<(d: Player) => Node>,
  role: boolean,
  jersey: boolean,
  evicted: boolean,
  goals: boolean,
  price: boolean,
  weight: boolean,
  height: boolean,
  totalScore: boolean,
  form: boolean,
  country: boolean
};

type State = {
  selected: boolean,
  expand: boolean,
};

const PlayerTitle = ({ data, actions }) => {
  const { name, originName } = data;
  const _actions = Array.isArray(actions) ? actions : !!actions ? [actions] : [];
  return (
  <div className="playerTitle">
    <div>{upperFirst(name)}{/*<span style={{fontSize: 5, margin: '0 0 8 auto'}}><FaIcon name="circle" /></span>*/}
      <span style={{fontSize: 5, margin: '0'}}><FaIcon name="circle" /></span>
      <span style={{fontWeight: 200, fontSize: 11}}>{upperFirst(originName)}</span>
    </div>
    <div className="playerTitleActionsList" >
      {_actions.map((f, i) =>
        <span className="playerTitleAction" key={`k${i}`}>{f(data)}</span>
    )}
    </div>
  </div>
  );
};


const Span = ({children, margin, left, right}) => {
  const style = { };
  if(left && typeof left === 'number')
    style.marginLeft = left;
  if(right && typeof right === 'number')
    style.marginRight = right;
  if(!isEmpty(margin))
    style.margin = margin;

 return (
   <div className="playerInfoDescLaySpan" ><span style={style}>{children}</span></div>
 );
};

export const PlayerStatus = ({evicted, injured}) => {
  const style = {fontSize: 10, textTransform: 'uppercase'};
  return evicted ?
    <span className='evicted' style={style} >eliminated</span>:
    <div>
      <span className='active' style={style} >active</span>
      {injured && <span className='injured' style={style} >injured</span>}
    </div>;
};

const Price = ({}) => {

};


export class PlayerComponent extends React.Component<Props, State> {
  props: Props;

  state: State = { selected: false, expand: false };

  selectPlayer = (evt: SyntheticEvent<*>) => {
    evt.preventDefault();
    if(this.state.selected) {
      if(this.props.deSelected)
        this.props.deSelected(this.props.data);
    } else {
      if(this.props.onSelected)
        this.props.onSelected(this.props.data);
    }
    this.setState({selected: !this.state.selected});
  };

  /**
   * Opens a modal to view more information on player
   */
  toggleExpand = () => this.setState({ selected: !this.state.selected });



  render() {

    const { data, style, className, expandView, actions,
      role,
      jersey,
      evicted,
      goals,
      price,
      weight,
      height,
      //performance,
      form,
      totalScore,
      country } = this.props;
    console.log(isEmpty(expandView));
    if(!isEmpty(data)) {
    return (
      <div className="playerInfoContainer" onClick={this.selectPlayer} >
        <Meta
          style={style.player.meta}
          className={classnames('playerInfoMeta', {playerSelected: this.state.selected}, className)}
          //avatar={<Avatar src={data.avatarUrl} size="large" />}
          title={<PlayerTitle data={data} actions={actions}/>}
          description={
            <div className="playerInfoDesc" >
              <div className="playerInfoDescLay">
                {evicted && <Span left={4}><PlayerStatus {...data}  /></Span>}
                {role && <Span left={4}><span>POS:</span>{abbreviateRole(data.role)}</Span> }
                {totalScore && <Span left={4}><span>TS:</span>{data.totalScore}</Span> }

                {goals && <Span left={4}><span>Goals:</span>{data.goals}</Span>}
                {price && <Span left={4}><span>Price:</span>&euro;{slashNumber(data.price)}</Span>}
                {weight && <Span left={4}><span>Weight:</span>{data.weight}</Span>}
                {height && <Span left={4}><span>Height:</span>{data.height}</Span>}
                {form && <Span left={4}><span>FORM:</span>{data.form}</Span>}
                {country && <Span left={4}><span>Country:</span>{data.country}</Span>}
              </div>
              { typeof expandView === 'function' &&
                <div>
                  <Modal
                    className="playerInfoExpandModal"
                    visible={this.state.selected}
                    onCancel={this.toggleExpand}
                    footer={null}
                    >
                    {expandView(data)}
                  </Modal>
                </div>
              }
            </div>
          }
        />
      </div>
    );} else {
      return null;
    }
  }
}


export default PlayerComponent;