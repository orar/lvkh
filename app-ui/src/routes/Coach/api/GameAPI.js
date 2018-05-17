// @flow
import API, {APIResponse} from 'util/API';
import 'whatwg-fetch';

/**
 * API routes for the API functions below
 * @type {{fetchGames: string, requestPrivilege: string, createTeam: string}}
 */
const routes = {
  fetchGames: 'https://randomapi.com/api/16f52083bcac1df97b794be937f0f60b?fmt=raw&noinfo&sole',
  requestPrivilege: '',
  createTeam: '',
};

/**
 * Executes Game calls against the backend API.
 */
export default class GameAPI extends API {

  /**
   * Fetch list of active playable games from server API
   * @param teamID
   * @returns {Promise.<void>}
   */
  async fetchGames (teamID: string): Promise<APIResponse> {
    //const response = await this.request(`${routes.fetchGames}`);
    const response = await fetch(`${routes.fetchGames}`, {method: 'GET'});

    return response.json();
  }


  /**
   * Request user's current privilege to access or join a particular game
   *
   * @param gameID
   * @returns {Promise.<void>}
   */
  async requestPrivilege (gameID: string): Promise<APIResponse> {
    //const response = await this.request(`${routes.requestPrivilege}`);
    const response = await fetch(`${routes.requestPrivilege}`, {method: 'GET'});

    return response.json();
  }

  /**
   * Create a team from a game
   * This is not effective as backend team creation procedure has changed
   *
   * @param form
   * @returns {Promise.<void>}
   */
   async createTeam (form: { gameID: string, teamName: string }): Promise<APIResponse> {
    const response = await this.jsonRequest(`${routes.fetchGames}`, form);
    //const response = await fetch(`${routes.createTeam}`, {method: 'GET'});

    return response.json();
  }

}