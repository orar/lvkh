// @flow
import API, {APIResponse} from 'util/API';
import type { SupportHelp } from '../modules/Support/SupportModule';


const routes = {
  sendSupport: 'https://randomapi.com/api/72a13aa314e8fe856402ff69e575f06d?noinfo&fmt=raw&sole',
};

export default class SupportAPI extends API {


  async sendSupport (data: SupportHelp ): Promise<APIResponse> {
    const response = await this.jsonRequest(routes.sendSupport, data);

    return response.json();
  }

}