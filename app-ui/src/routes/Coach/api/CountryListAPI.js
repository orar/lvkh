// @flow
import API, {APIResponse} from 'util/API';
import 'whatwg-fetch';

/**
 * API routes for the functions below
 * @type {{fetchCountries: string}}
 */
const routes = {
  fetchCountries: 'https://randomapi.com/api/304109ce956d24f229944fd36f08e62a?noinfo&fmt=raw&sole&lim=5',
};

/**
 * Executes CountryListAPI calls against the backend API.
 */
export default class CountryListAPI extends API {


  /**
   * Fetches country list for form validation.
   * This will have no use.
   * Country list will be hard coded to frorm to improve performance of form
   *
   * @returns {Promise.<void>}
   */
  async fetchCountries (): Promise<APIResponse> {
    //const response = await this.request(`${routes.fetchCountries}`);
    const response = await fetch(`${routes.fetchCountries}`, {method: 'GET'});

    return response.json();
  }
}