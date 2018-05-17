// @flow
import API, {APIResponse} from 'util/API';

const routes = {
  getAccount: 'https://randomapi.com/api/193ce132cee04fdddccc96c92519b5e2?noinfo&fmt=raw&sole',
  redeemReward: '',
};

export default class AccountAPI extends API {


  async getAccount (): Promise<APIResponse> {
    //const response = await this.request(`${routes.getProfile}/${userID}`);
    const response = await fetch(`${routes.getAccount}`);

    return response.json();
  }

 async redeemReward (data): Promise<APIResponse> {
    const response = await this.jsonRequest(`${routes.redeemReward}`, data);

    return response.json();
  }


}