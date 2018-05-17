// @flow
import API, {APIResponse} from 'util/API';
import 'whatwg-fetch';
const routes = {
  fetchDeals: 'https://randomapi.com/api/304109ce956d24f229944fd36f08e62a?noinfo&fmt=raw&sole&lim=5',
};
/**
 * Executes transfer deal calls against the backend API.
 * @deprecated
 */
export default class DealAPI extends API {

  async fetchDeals (teamID: string): Promise<APIResponse> {
    //const response = await this.request(`${routes.fetchDeals}/${teamID}`);
    const response = await fetch(`${routes.fetchDeals}&teamID=${teamID}`, {method: 'GET'});

    return response.json();
  }
}