// @flow
import API, {APIResponse} from 'util/API';
import type { RoleData } from "../modules/Team/RoleModule";
import type {CreateTeamForm} from "../modules/Game/CreateTeamFormModule";
import type { UpdateTeamForm } from "../modules/Team/UpdateTeamFormModule";
import 'whatwg-fetch';

/**
 * API routes for the functions below
 */
const teamRoutes = {
  fetchFormation: 'https://randomapi.com/api/fd7212dd5f4500604b02e7e570653298?noinfo&fmt=raw&sole',
  fetchTeam: 'https://randomapi.com/api/646e992e7c1bc5ab6b430411740e9e2a?noinfo&fmt=raw&sole&lim=2',
  fetchBench: 'https://randomapi.com/api/8cf0d373ae6b317ac25cab1a30627779?noinfo&fmt=raw&sole',
  fetchTeamRoles: 'https://randomapi.com/api/e4d7989256eab73d2a4fd2042f42c658?noinfo&fmt=raw&sole',
  createTeam: '',
  updateTeam: '',
  changeFormation: '',
  submitRoles: '',
};

/**
 * Executes team calls against the backend API.
 */
export default class TeamAPI extends API {

  /**
   * Creates team for a particular
   * @deprecated
   *
   * @param data
   * @returns {Promise.<void>}
   */
  async createTeam (data: CreateTeamForm ): Promise<APIResponse> {
    const response = await this.jsonRequest(teamRoutes.createTeam, data);

    return response.json();
  }

  /**
   * Update team details (name, )
   * @param data
   * @returns {Promise.<void>}
   */
  async updateTeam (data: UpdateTeamForm ): Promise<APIResponse> {
    const response = await this.jsonRequest(teamRoutes.createTeam, data);

    return response.json();
  }

  /**
   * Fetch bench players
   * @param teamID
   * @returns {Promise.<void>}
   */
  async fetchBenchPlayers (teamID: string): Promise<APIResponse> {
    //const response = await this.request(`${teamRoutes.fetchBench}/${teamID}`);
    const response = await fetch(`${teamRoutes.fetchBench}&teamID=${teamID}`);

    return response.json();
  }

  /**
   * Change formation of a user team
   *
   * @param data preferred formation data
   * @returns {Promise.<void>}
   */
  async changeFormation (data: {teamID: string, formationID: string }): Promise<APIResponse> {
    const response = await this.jsonRequest(teamRoutes.changeFormation, data);

    return response.json();
  }

  /**
   * Fetch formation list of a particular game
   * @param teamID
   * @returns {Promise.<void>}
   */
  async fetchFormation (teamID: string): Promise<APIResponse> {
    //const response = await this.request(`${teamRoutes.fetchFormation}/${teamID}`);
    const response = await fetch(`${teamRoutes.fetchFormation}&teamID=${teamID}`);
    return response.json();
  }

  /**
   * @deprecated
   * @param teamID
   * @returns {Promise.<void>}
   */
  async fetchTeamRoles (teamID: string): Promise<APIResponse> {
    //const response = await this.request(`${teamRoutes.fetchFormation}/${teamID}`);
    const response = await fetch(`${teamRoutes.fetchTeamRoles}&teamID=${teamID}`);
    return response.json();
  }

  /**
   * Arrange team players on pitch and bench
   *
   * @param data
   * @returns {Promise.<void>}
   */
  async submitTeamRoles (data: RoleData): Promise<APIResponse> {
    const response = await this.jsonRequest(teamRoutes.changeFormation, data);

    return response.json();
  }

  /**
   * Fetch minimal team for a particular user
   * @param username
   * @returns {Promise.<void>}
   */
  async fetchTeam (username: string): Promise<APIResponse> {
    //const response = await this.request(`${teamRoutes.fetchTeam}/${username}`);
    const response = await fetch(`${teamRoutes.fetchTeam}&usr=${username}`, {method: 'GET'});
    return response.json();
  }
}