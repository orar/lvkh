// @flow
import API, {APIResponse} from 'util/API';
import 'whatwg-fetch';

/**
 * API routes for the functions below
 *
 */
const routes = {
  fetchScoreChart: 'https://randomapi.com/api/d9036a890c28de3bbc50b236ce498a63?noinfo&fmt=raw&sole&lim=2',
  fetchRoundScore: 'https://randomapi.com/api/022e3b0c94409a216a7756339539a2bf?noinfo&fmt=raw&sole&lim=2',
  fetchRoundScoreDetail: 'https://randomapi.com/api/2f41a4178227811844cb21a1108256a8?noinfo&fmt=raw&sole&gbl=10&lcl=5&fri=5',
  fetchSeasonScoreChart: 'https://randomapi.com/api/60e1b8729f60d2b691d52af9770bdb04?noinfo&fmt=raw&sole',
};

/**
 * Executes scoreboard calls against the backend API.
 *
 */
export default class ScoreBoardAPI extends API {

  /**
   * Fetch score chart of users by their fantasy teams
   * @param teamID
   * @param seasonID
   * @returns {Promise.<void>}
   */
  async fetchScoreChart ({ teamID, seasonID}: data): Promise<APIResponse> {
    //const response = await this.request(`${routes.fetchScoreChart}/${teamID}`);
    const response = await fetch(`${routes.fetchScoreChart}&teamID=${teamID}`);

    return response.json();
  }

  /**
   * Fetch round scores of a user's team
   * @param teamID
   * @returns {Promise.<void>}
   */
  async fetchRoundScore (teamID: string): Promise<APIResponse> {
    //const response = await this.request(`${routes.fetchRoundScore}/${teamID}`);
    const response = await fetch(`${routes.fetchScoreChart}&teamID=${teamID}`);

    return response.json();
  }

  /**
   * Fetch the details of a particular round score
   * @param teamID
   * @param roundID
   * @returns {Promise.<void>}
   */
  async fetchRoundScoreDetail ({teamID, roundID }: data): Promise<APIResponse> {
    //const response = await this.request(`${routes.fetchRoundScoreDetail}/${data.teamID}`);
    const response = await fetch(`${routes.fetchRoundScoreDetail}&teamID=${teamID}&roundID=${roundID}`);

    return response.json();
  }

  /**
   * Fetch the accumulated season score
   *
   * @param teamID
   * @returns {Promise.<void>}
   */
  async fetchSeasonScoreChart ( teamID: string ): Promise<APIResponse> {
    //const response = await this.request(`${routes.fetchSeasonScoreChart}/${teamID}`);
    const response = await fetch(`${routes.fetchSeasonScoreChart}&teamID=${teamID}`);

    return response.json();
  }

}