// @flow
import API, {APIResponse} from 'util/API';
import type { CommentForm } from "../../User/modules/Comment/CommentFormModule";

/**
 * API routes for the functions below
 * @type {{fetchComment: string, saveComment: string}}
 */
const routes = {
  fetchComment: 'https://randomapi.com/api/a88f91f2a2b9b3350d40703d734be33d?noinfo&fmt=raw&sole&cnt=10',
  saveComment: '',
};

/**
 * Executes auth calls against the backend API.
 */
export default class CommentAPI extends API {


  /**
   * Fetches comments from server
   *
   * @param threadID the comment threadID
   * @param index the page Index
   * @param page pagination page size
   * @returns {Promise.<void>}
   */
  async fetchComments ({threadID, index, page }: data): Promise<APIResponse> {
    //const response = await this.request(`${routes.fetchComment}/${threadID}`);
    const response = await fetch(`${routes.fetchComment}&threadID=${threadID}`);

    return response.json();
  }

  /**
   * Pushes comment to server
   *
   * @param data Comment data
   * @returns {Promise.<void>}
   */
  async submitComment (data: CommentForm ): Promise<APIResponse> {
    const response = await this.jsonRequest(routes.saveComment, data);

    return response.json();
  }

}