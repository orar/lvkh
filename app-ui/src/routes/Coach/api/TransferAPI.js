// @flow
import API, {APIResponse} from 'util/API';
import type { TransferForm } from "../modules/Transfer/TransferModule";
import 'whatwg-fetch';

const routes = {
  getPlayerDetail: 'https://randomapi.com/api/880c908b734597faaec434b3441eb4f9?noinfo&fmt=raw&sole',
  fetchPlayerList: 'https://randomapi.com/api/2833148e8de5abb14f72cd6481f1f501?noinfo&fmt=raw&sole&lim=30',
  transferPlayer: '',
};

/**
 * Executes transfer calls against the backend API.
 */
export default class TransferAPI extends API {


  /**
   * Get player details prior to transfer
   * @param playerID
   * @returns {Promise.<void>}
   */
  async getPlayerDetail (playerID: string): Promise<APIResponse> {
    //const response = await this.request(`${routes.getPlayerDetail}/${playerID}`);
    const response = await fetch(`${routes.getPlayerDetail}&playerID=${playerID}`, {method: 'GET'});

    return response.json();
  }

  /**
   * Fetch transferable players from backend
   *
   * @param seasonID league ID
   * @returns {Promise.<void>}
   */
  async fetchPlayers (seasonID: string): Promise<APIResponse> {
    //const response = await this.request(`${routes.fetchPlayerList}/${teamID}`);
    const response = await fetch(`${routes.fetchPlayerList}&seasonID=${seasonID}`, {method: 'GET'});

    return response.json();
  }

  /**
   * Executes a transfer of a player
   * @param data
   * @returns {Promise.<void>}
   */
  async transferPlayer (data: TransferForm ): Promise<APIResponse> {
    const response = await this.jsonRequest(routes.transferPlayer, data);

    return response.json();
  }

}