// @flow
import React from 'react';
import { Card, Icon, Input, Button } from 'antd';
import type {Team} from "../../modules/Coach/CoachModule";
import _ from 'lodash'
import './CreateTeamForm.scss';
import type {PrivilegeRequest, PrivilegeRequestState} from "../../modules/Game/GamePrivilegeModule";
import type {GamePlan} from "../../modules/Game/GameModule";
import {createTeamRequestSuccessful} from "../../modules/Game/CreateTeamFormModule";

const InputGroup = Input.Group;

/**
 * NewTeamFormComponent data properties type
 */
type Props = {
  gamePlan: GamePlan,
  teams: Array<Team>,

  privilegeRequest: PrivilegeRequestState,
  privilege: PrivilegeRequest,

  isPending: boolean,
  isSuccess: boolean,
  isComplete: boolean,

  onCreateTeam: (d: Object) => any,
  onRequestPrivilege: (gameID: string) => any,

  //onSetTeamName: (d: Object) => any,
  //form: { teamName: string,}
}

/**
 * NewTeamFormComponent state type
 */
type State = {
  valid: boolean,
  teamName: string,
}

export class NewTeamFormComponent extends React.Component<Props, State> {
  props: Props;

  state: State = { valid: false, teamName: ''};

  /**
   * On component mount request privilege (if user is eligible to access or join game)
   */
  componentDidMount() {
      this.props.onRequestPrivilege(this.props.gamePlan.id)
  }

  /**
   * Submit team creation form
   * @param e
   */
  handleSubmit = (e: SyntheticEvent<*>) => {
    const { gamePlan } = this.props;
    const { valid, teamName } = this.state;
      if (valid && teamName ){
        this.props.onCreateTeam({gameID: gamePlan.id, teamName });
      }
      e.preventDefault();
  };

  /**
   * Check if someone somewhere else on this game has already use this team name
   * Intend to use for url concat -- SEO
   * @param e
   */
  validateName = (e: SyntheticEvent<*>) => {
    e.preventDefault();
    const { teams = [] } = this.props;
    const valid = teams.some(t => _.toLower(t.name).includes(_.toLower(e.target.value)));
    this.setState({ valid, teamName: e.target.value });
  };
  render(){

    const { privilege, privilegeRequest, teams = [], isPending, isSuccess, isComplete } = this.props;

    if(privilege.valid) {

      return (
        <div className="teamCreateContainer">
          <InputGroup compact>
            <Input
              className="teamCreateInput"
              value={this.state.teamName}
              placeholder="Enter team name to create"
              onChange={this.validateName}
            />
            <Button
              className="teamCreateButton"
              loading={isPending}
              icon={isSuccess ? 'check': isComplete ? 'cancel': '' }
              htmlType="submit"
              disabled={!this.state.valid}
              size="small"
              onClick={this.handleSubmit}
            >
              Create
            </Button>
          </InputGroup>
        </div>
      );
    } else {

      return(
      <div className="teamPrivilegeContainer" data-priv={!privilegeRequest.isPending && privilegeRequest.isComplete ? 'error' : 'success'}>
        {privilegeRequest.isPending && <Icon type="loading" spin={true} /> }
        {!privilegeRequest.isPending && privilegeRequest.isComplete &&
          <div className="privilegeErrorMessage">
            <p className="header">Error</p>
            <h3 className="message">{privilege.message}</h3>
          </div>
        }
      </div>
      );
    }
  }
}

export default NewTeamFormComponent;