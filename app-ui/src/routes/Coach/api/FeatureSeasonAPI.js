// @flow
import API, {APIResponse} from 'util/API';
import 'whatwg-fetch';

const routes = {
  fetchFeatureSeasons: 'https://randomapi.com/api/66d7ff42ba06a4cff23cffe7e1a88f1b?noinfo&fmt=raw&sole&lim=30',
};

export default class FeatureSeasonAPI extends API {

  async fetchFeatureSeasons (): Promise<APIResponse> {
    //const response = await this.request(`${routes.fetchFeatureSeasons}`);
    const response = await fetch(routes.fetchFeatureSeasons, {method: 'GET'});

    return response.json();
  }
}