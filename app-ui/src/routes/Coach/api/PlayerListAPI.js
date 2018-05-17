// @flow
import API, {APIResponse} from 'util/API';
import type { TransferForm } from "../modules/Transfer/TransferModule";
import 'whatwg-fetch';

const routes = {
  fetchPlayerList: 'https://randomapi.com/api/2833148e8de5abb14f72cd6481f1f501?noinfo&fmt=raw&sole&lim=30',
};

/**
 * Executes playerList calls against the backend API.
 */
export default class PlayerListAPI extends API {


  /**
   * Fetch players of a particular league
   * Eg. all players of wc russia 2018
   *
   * @param seasonID
   * @returns {Promise.<void>}
   */
  async fetchPlayers (seasonID: string): Promise<APIResponse> {
    //const response = await this.request(`${routes.fetchPlayerList}/${teamID}`);
    const response = await fetch(`${routes.fetchPlayerList}&seasonID=${seasonID}`, {method: 'GET'});

    return response.json();
  }


}