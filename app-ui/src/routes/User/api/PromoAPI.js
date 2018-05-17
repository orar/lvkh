// @flow
import API, {APIResponse} from 'util/API';

const routes = {
  getPromoData: 'https://randomapi.com/api/a800c51d33b63b3f29f2e248903bc62c?noinfo&fmt=raw&sole',
};

export default class PromoAPI extends API {


  async verifyPromoCode (data): Promise<APIResponse> {
    const response = await this.jsonRequest(routes.verifyPromoCode, data);

    return response.json();
  }


  async getPromoData (): Promise<APIResponse> {
    //const response = await this.request(`${routes.getProfile}/${userID}`);
    const response = await fetch(`${routes.getPromoData}`);

    return response.json();
  }

}