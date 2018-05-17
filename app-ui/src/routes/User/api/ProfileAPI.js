// @flow
import API, {APIResponse} from 'util/API';

const routes = {
  getProfile: 'https://randomapi.com/api/72a13aa314e8fe856402ff69e575f06d?noinfo&fmt=raw&sole',
  getUserProfile: '',
  commitProfile: '',
};

export default class ProfileAPI extends API {


  async getProfile ( username: string ): Promise<APIResponse> {
    //const response = await this.request(`${routes.getProfile}/${userID}`);
    const response = await fetch(`${routes.getProfile}&usr=${username}`);

    return response.json();
  }

  async getUserProfile (): Promise<APIResponse> {
    //const response = await this.request(`${routes.getProfile}/${userID}`);
    const response = await fetch(`${routes.getProfile}`);

    return response.json();
  }

  async commitProfile (data: ProfileForm ): Promise<APIResponse> {
    const response = await this.jsonRequest(routes.commitProfile, data);

    return response.json();
  }

}