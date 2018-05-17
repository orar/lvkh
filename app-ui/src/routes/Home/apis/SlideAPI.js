// @flow
import API, {APIResponse} from 'util/API';

const routes = {
  fetchSlides: 'https://randomapi.com/api/22800318b290372122db8d5086588ded?noinfo&fmt=raw&sole',
};

export default class SlideAPI extends API {


  async fetchSlides (): Promise<APIResponse> {
    //const response = await this.request(`${routes.fetchSlides}`);
    const response = await fetch(`${routes.fetchSlides}`);

    return response.json();
  }


}