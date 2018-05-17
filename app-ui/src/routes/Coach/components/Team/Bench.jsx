// @flow
import React from 'react';
import { Button } from 'antd';
import type {Player} from "../../modules/Team/Player";
import BenchPlayerContainer from '../../containers/Team/BenchPlayerContainer';
import './Bench.scss';
import isEmpty from 'lodash/isEmpty';
import { TransitionMotion, spring } from 'react-motion';
import {benchHeight, benchHeightAdjustment, benchWidthAdjustment,  stageHeight} from '../../../../util/Theme';

type Props = {
  teamID: string,
  team: Object,
  data: Array<Player>,
  onBench: Array<Player>,
  readOnly: boolean,
  onFetchTeamPlayers: (teamID: string) => any,
  onSubmitFormation: (data: Object) => any,
  onFetchTeamRoles: (teamID: string) => any,
  onSetOffset: ({ X: number, Y: number }) => any,
}

/**
 * BenchComponent renders all players on bench at the moment.
 * On doubleclicking a player on bench moves the player to field if there's an available slot
 */
export class BenchComponent extends React.Component<Props> {
  props: Props;

  /**
   * on componentDidMount, dispatch fetch team players, if there is data prop is empty
   */
  componentDidMount() {
    if (isEmpty(this.props.data)) {
      this.props.onFetchTeamPlayers(this.props.teamID);
    }
  }


  /**
   *Save the current arragement of team on bench and field
   * This sends all slots(filled and empty) to api
   */
  submitFormation = (evt: SyntheticEvent<*>) => {
    evt.preventDefault();
    this.props.onSubmitFormation(this.props.team);
  };

  /**
   * Renders a horizontal bench with list of players
   */
  render(){
    const { data, teamID, onBench, readOnly } = this.props;

    return (
      <div className="benchContainer" >
        {!readOnly && <div className="benchContent" >
          <div className="benchTop">
            <small>Total: {data.length}</small>
            <span />
            <small>Bench: {onBench.length}</small>
            <span />
            <small>Pitch: {data.length - onBench.length}</small>
            <Button
              onClick={this.submitFormation}
              className="submitFormation_button"
              ghost
              size="small"
              htmlType="submit"
              icon="lock"
            >Save</Button>
          </div>
          <div className="benchPlayersWrap">

            {/**
             Animates bench players' entry sliding in from the right
              naturally following trail of the preceeding player --buggy
             */}
           {/* <TransitionMotion
              willLeave={{}}
              willEnter={{}}
              styles={onBench.map(d => ({
                key: d.id,
                d,
                style: {width: 60, height: 60},
              }))}>
              {interpolatedStyles =>
                // first render: a, b, c. Second: still a, b, c! Only last one's a, b.
                <div>
                  {interpolatedStyles.map(config => {
                    return  (<div key={config.key} className="benchSingle" style={config.style}>
                        <BenchPlayerContainer
                          teamID={teamID}
                          role={config.d.role}
                          id={config.d.id}
                          square={60}
                        />
                      </div>)
                  })}
                </div>
              }
            </TransitionMotion>*/}
            <div className="benchPlayers">
              {onBench.map(d =>
                <div key={d.id} className="benchSingle">

                  {/** A single player on bench is rendered by BenchPlayerComponent connected to redux by BenchPlayerContainer */}
                  <BenchPlayerContainer
                    teamID={teamID}
                    role={d.role}
                    id={d.id}
                    square={60}
                  />

                </div>
              )}
            </div>
          </div>
        </div>}
      </div>
    )
  }
}


export default BenchComponent;