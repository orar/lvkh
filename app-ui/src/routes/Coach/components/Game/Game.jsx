// @flow
import React from 'react';
import { Card, Modal } from 'antd';
import type {Game, GamePlan} from "../../modules/Game/GameModule";
import { isObjEmpty } from "../../../../util/HelperUtil";
import SignInContainer from '../../../Auth/containers/SignInContainer';
import CreateTeamFormContainer from '../../containers/Game/TeamFormContainer';
import upperFirst from 'lodash/upperFirst';
import isNil from 'lodash/isNil';
import './Game.scss'

type Props = {
  data: Game,
  onFetchGames: () => any,
  isGuest: boolean,
}

type State = {
  gamePlan: GamePlan,
}


const SignInAd = ({gamePlan}: {gamePlan: GamePlan}) => {
  return (
    <div className="gameSignInAdContainer" style={{backgroundImage: `url(${gamePlan.cover})`}}>
      <h3 className="gameSignInAdHeader">{gamePlan.name}</h3>
      <p className="gameSignInAdHeader">{gamePlan.message}</p>
    </div>
  );
};

export class GameComponent extends React.Component<Props, State> {
  props: Props;
  state: State = { gamePlan: {} };

  componentDidMount(){
    if(isObjEmpty(this.props.data)){
      this.props.onFetchGames();
    }
  }


  chooseGamePlan = (evt: SyntheticEvent<*>, d: GamePlan) => {
    evt.preventDefault();
    if(d.id){
      this.setState({ gamePlan: d});
    }
  };

  resetGameState = () => {
    this.setState({ gamePlan: {} })
  };

  /**
   * Renders a list of games
   * OnClick game, a modal containing team creation form renders to fill for team creation
   * This component is authless. If user is guest, user has to signIn or register
   * else if user is authd, check privileges of user to the game he's trying to access
   *
   * A game is purchasable by token fee
   */
  render(){
    const { isGuest, data: { authMessage, pageHeader, pageSubHeader, plans = [] } } = this.props;

    return (
      <div className="gameContainer">
        <div className="gameHeader">
          <h2 className="gameHeaderText">{pageHeader}</h2>
          <p className="gameHeaderSubText">{pageSubHeader}</p>
        </div>
        <div className="gamePlans">
          {plans.map(d =>
            <Card
              key={d.id}
              onClick={evt => this.chooseGamePlan(evt, d)}
              className="gameCard"
              hoverable
              style={{
                backgroundImage: `url(${d.cover})`,
              }}
            >
              <div className="gameCardContent">
                <div className="gameName">{upperFirst(d.name)}</div>
                <div className="gameMessage">{d.message}</div>
              </div>
            </Card>
          )}
        </div>
        <Modal
          visible={!isNil(this.state.gamePlan.id)}
          wrapClassName='vertical-center-modal'
          width={300}
          footer={null}
          closable
          maskClosable
          destroyOnClose
          onCancel={this.resetGameState}
        >
          <div>
            {isGuest ?
              (<div className="guestGameSignIn">
                  <SignInContainer message={authMessage}/>
                 {/* <div className="ad">
                    <SignInAd gamePlan={this.state.gamePlan}/>
                  </div>*/}

              </div>
              ) :
              <CreateTeamFormContainer gamePlan={this.state.gamePlan} />
            }
          </div>
        </Modal>
      </div>
    );

  }

}

export default GameComponent;