// @flow
import type {Node} from 'react';
import React from 'react';
import type {Player} from "../../modules/Team/Player";
import './BenchPlayer.scss';
import {abbreviateRole, isObjEmpty} from "../../../../util/HelperUtil";

type Props = {
  teamID: string,
  role: string,
  data: Player,
  square: number,
  id: string,
  hasEmptyRoleMap: boolean,
  onRoleAdd: (o: Object ) => any,
  onRoleReplace: (o: Object ) => any,
}

type State = {
  showOptions: boolean,
};


/**
 * Renders a player on bench
 */
export class FieldPlayerComponent extends React.Component<Props, State> {
  props: Props;

  state: State = {
    showOptions: false,
  };

  /**
   * On double click, dispatch add a player to role if player is in role already as a result of duplication
   * Checks if a player has coord or else add to role
   * @param evt
   */
  addPlayerToRole = (evt: SyntheticEvent<*>) => {
    const { teamID, role, id, onRoleAdd, coord, hasEmptyRoleMap } = this.props;
    if(isObjEmpty(coord) && hasEmptyRoleMap){
      onRoleAdd({ teamID, role, id });
    }
    evt.preventDefault();
  };

  render(){
    const { data = {}, square  } = this.props;

    return (
      <div className="playerInfo">
        <div className="playerDragImg" onDoubleClick={this.addPlayerToRole} >
          {/** A player jersey image. Intends to be a 3d-svg in any future release */}
        {/*  <img style={{height: square, width: square*.8 }} src={data.avatar}/>*/}
          <img style={{height: square, width: square*.8 }} src='/static/brand/jersey/shirt_player.png'/>
        </div>
        <div className="playerInfo_name">
          <span className="playerName" title={data.jerseyName}>{data.jerseyName}</span>
          <span className="playerRole" title={data.role}>{abbreviateRole(data.role)}</span>
        </div>
        </div>
    );
  }
}

export default FieldPlayerComponent;