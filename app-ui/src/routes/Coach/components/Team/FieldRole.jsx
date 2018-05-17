// @flow
import React from 'react';
import isEmpty from 'lodash';
import type {RoleMap} from "../../modules/Team/RoleModule";
import FieldPlayerContainer from '../../containers/Team/FieldPlayerContainer';
import './FieldRole.scss';

/**
 * Type merging with role
 */
type Role = Array<RoleMap & {role: string}>

/**
 * type Props
 */
type Props = {
  teamID: string,
  roleMap: Array<Role>,
  readOnly: boolean,
  zoomFactorY: number,
};


/**
 * Default pitch positions range of player roles
 * y is z in 3d from center pitch
 */
export const positionOffset = {
  forward: { x: 200, z: -90 },
  midfield: { x: 215, z: 80 },
  defence: { x: 230, z: 230 },
  goalkeep: { x: 10, z: 390 }
};


/**
 * Makes pitch cordinates (X, Z) of each player on the pitch
 * Z is Y in 3d perspective
 * @param rolemap
 * @returns {Array}
 */
export const makeCoord = (rolemap: Array<Role>) => {
  //group players according to role: midfield, defence, forward, goalkeep
  const group = rolemap.reduce((acc, cur) => {
    const gr = (acc[cur.role] || []);
    gr.push(cur);
    acc[cur.role] = gr;
    return acc;
  }, {});

  let rlmap = [];
  //calc x coordinate of each player in a group
  for (let key in group){
    if(group.hasOwnProperty(key)){
      //get position range of players group using role
      const pOffset = positionOffset[key];
      //sort the group by formation sequence ID
      const assigned = group[key].sort((a, b) => a.seqId.localeCompare(b.seqId)).reduce((acc, cur, index) => {
        //get size of group
        const size = group[key].length;
        //divide equally to get pace
        const unit = pOffset.x * 2 / size;
        //X coordinate on pitch
        const x = unit * index + unit / 2;
        const offsetX = x - pOffset.x;
        cur.coord = { x: offsetX, z: pOffset.z};
        cur.role = key;
        acc.push(cur);
        return acc;
      }, []);
      rlmap = rlmap.concat(assigned);
    }
  }
  return rlmap;
};


/**
 * Renders players on a pitch by their roles(position)
 */
export class FieldRoleComponent extends React.Component<Props> {
  props: Props;



  //calculates the center coordinates (X, Y) of the pitch container from the left and bottom
  getCenterCoordinatesStyle = () => {
    const {teamID, zoomFactorY } = this.props;
    const fieldEl = document.getElementById(`fieldRole_${teamID}`);
    if(fieldEl !== null){
      const rect = fieldEl.getBoundingClientRect();
      return {
        bottom: rect.height / 2 + zoomFactorY / 2.4 ,
        left: rect.width / 2 + zoomFactorY / 2.4,
      };
    }
    return {};
  };

  render(){
    const { teamID, roleMap, readOnly } = this.props;

    const style = this.getCenterCoordinatesStyle();

    return (
      <div id={`fieldRole_${teamID}`} className="fieldRoleContainer">
        <div className="fieldRoleWrap">
          {makeCoord(roleMap).map(r =>
            <div key={r.seqId} className="fieldRolePlayer" style={style}>

              {/** Apply FieldPlayerComponent */}
              <FieldPlayerContainer
                key={r.seqId}
                teamID={teamID}
                square={60}
                readOnly={readOnly}
                {...r}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default FieldRoleComponent;