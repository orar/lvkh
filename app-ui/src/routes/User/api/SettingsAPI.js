// @flow
import API, {APIResponse} from 'util/API';
import type {Settings} from "../modules/Settings/SettingsModule";

const routes = {
  getSettings: 'https://randomapi.com/api/193ce132cee04fdddccc96c92519b5e2?noinfo&fmt=raw&sole',
  updateSettings: '',
};

export default class AccountAPI extends API {


  async getSettings (): Promise<APIResponse> {
    //const response = await this.request(`${routes.getSettings}/${userID}`);
    const response = await fetch(`${routes.getSettings}`);

    return response.json();
  }

  async updateSettings (data: Settings): Promise<APIResponse> {
    const response = await this.jsonRequest(`${routes.updateSettings}`, data);

    return response.json();
  }


}