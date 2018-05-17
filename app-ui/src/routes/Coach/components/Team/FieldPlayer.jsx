// @flow
import React from 'react';
import type { Node } from 'react';
import type {Player} from "../../modules/Team/Player";
import { Icon } from 'antd';
import './FieldPlayer.scss';
import type {RoleMap, PitchCoord} from "../../modules/Team/RoleModule";
import {isObjEmpty, PLAYER_POSITION as position, abbreviateRole} from "../../../../util/HelperUtil";
import classNames from 'classnames';
import { Motion, spring } from 'react-motion';
import isEmpty from 'lodash';

type Props = {
  teamID: string,
  role: string,
  data: Player,
  square: number,
  id: string,
  seqId?: string,
  captain: boolean,
  viceCaptain: boolean,
  coord?: PitchCoord,
  readOnly: boolean,
  hasEmptyRoleMap: boolean,
  onRoleAdd: (o: Object ) => any,
  onRoleRemove: (o: Object ) => any,
  onCaptainize: (o: Object ) => any,
  onViceCaptainize: (o: Object ) => any,
}

type State = {
  showOptions: boolean,
};


/*
const Position3D = ({ coord, children }) => {
  return (<Motion defaultStyle={{x: 0}} style={{x: spring(coord.x), z: spring(coord.z)}}>
    { xz => <div style={{transform: `translate3d(${xz.x}px, 0, ${xz.z}px)`}}>{children}</div>}
  </Motion>);
};


const fieldRoleRect = (id: string) => {
  const fieldRole = document.getElementById(id);
  if(fieldRole !== null) {
    //Array.prototype.slice.call(fieldRole)
    return fieldRole.getBoundingClientRect();
  }
  return {};
};
*/



export class FieldPlayerComponent extends React.Component<Props, State> {
  props: Props;

  state: State = {
    showOptions: false,
  };

  timeOff = null;

  toggleOptions = () => {
    if(!this.state.showOptions) {
      this.timeOff = setTimeout(() => { this.setState({ showOptions: false })}, 20000);
    } else {
      clearTimeout(this.timeOff);
    }
    this.setState({ showOptions: !this.state.showOptions });
  };

  onCaptainize = () => {
    const { captain, viceCaptain, onCaptainize, seqId, id, teamID } = this.props;
    if(!captain && !viceCaptain){
      onCaptainize({ teamID, id });
    }
  };

  onViceCaptainize = () => {
    const { captain, viceCaptain, onViceCaptainize, seqId, id, teamID } = this.props;
    if(!captain && !viceCaptain){
      onViceCaptainize({teamID, id });
    }
  };

  onRoleRemove = () => {
    clearTimeout(this.timeOff);
    const { onRoleRemove, seqId, role, teamID } = this.props;
    onRoleRemove({ teamID, seqId, role});
  };


  render(){
    const { data = {}, square, coord, captain, viceCaptain, readOnly } = this.props;

    const transformStyle = ({x, z, o}) => ({
      transform: `translate3d(${x}px, 0, ${z}px)`,
      opacity: o,
      color: '#fff',
    });

    const startX = (Math.random() * 200) - 110;
    const grayoutStyle = captain || viceCaptain ? { cursor: 'default', background: 'rgba(176, 176, 176, .5)'} : {};

    return (
      <Motion defaultStyle={{x: startX, z: 420,  o: .4, s: 0}} style={{x: spring(coord.x), z: spring(coord.z), o: spring(1), s: spring(square)}}>
        {interpolatingStyle =>
          <div className="playerInfo" style={transformStyle(interpolatingStyle)}>
            {!readOnly && this.state.showOptions &&
            <div className="playerSideOptions">
              <div
                onClick={this.onRoleRemove}
                className="removeRole"><Icon type="close"/></div>
              <div
                onClick={this.onCaptainize}
                disabled={captain}
                className="captainize"
                style={grayoutStyle}>c
              </div>
              <div
                onClick={this.onViceCaptainize}
                disabled={viceCaptain}
                className="viceCaptainize"
                style={grayoutStyle}>v
              </div>
            </div>
            }
            {this.state.showOptions &&
            <div className="totalScore">{Math.floor(Math.random() * 150) /*TODO player total score sync with scoreboard */}</div>
            }
            <div className="playerDragImg" onClick={this.toggleOptions}>
              <img style={{height: interpolatingStyle.s, width: interpolatingStyle.s * .8}} src='/static/brand/jersey/shirt_player.png'/>
            </div>
            <div className="fieldPlayerInfo_name" onClick={this.toggleOptions}>
              {captain && <div className="captain">C</div>}
              {viceCaptain && <div className="viceCaptain">V</div>}
              <span className="playerName" title={data.jerseyName}>{data.jerseyName}</span>
              <span className="playerRole">{abbreviateRole(data.role)}</span>
            </div>
          </div>
        }
      </Motion>
    );
  }
}


//export default DragSource((props) => props.role, playerSource, collect)(FieldPlayerComponent);
export default FieldPlayerComponent;