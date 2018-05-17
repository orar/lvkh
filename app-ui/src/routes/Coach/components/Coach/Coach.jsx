// @flow
import React from 'react';
import './Coach.scss';
import { Parallax, Background } from 'react-parallax';
import WCBrand from '../../../../static/brand/wc2018_banner.png';
import CoachAppContainer from '../../containers/Coach/CoachAppContainer';
import UserProfileWidgetContainer from '../../../User/containers/UserProfileWidgetContainer';
import { Modal } from 'antd';
import SignInContainer from '../../../Auth/containers/SignInContainer';
import TeamFormContainer from '../../containers/Game/TeamFormContainer';
import MediaQuery from 'react-responsive';
type Props = {
  params: { username: string },
  isGuest: boolean,

}

/**
 * CoachContainer takes a username as a module
 */
export const CoachComponent = (props: Props) => {

  const { params, isGuest } = props;
  let ref = null;
  if(!isGuest && ref){
    ref.destroy();
  }
  return (
    <div className="seasonContainer">

      {/** Timeline bar*/}
      <div className="coverBar">
        <Parallax  blur={{ min: -30, max: 30 }} strength={300}>
          <div style={{height: 360, width: '100%'}}/>
          <Background className="custom-bg">
            <img src={WCBrand} alt="russia wc 2018" />
          </Background>
        </Parallax>
      </div>

      <Modal
        wrapClassName="vertical-center-modal"
        width={300}
        visible={isGuest}
        footer={null}
        maskClosable={false}
        destroyOnClose
        closable={!isGuest}
      >
        <SignInContainer/>
      </Modal>


      <div className="seasonContent">

        {/** the left user profile component */}
        <div className="rightContent">
          <UserProfileWidgetContainer username={params.username}/>
          {/* <div className="adContentRight">
              <h2>Ad Component</h2>
            </div>*/}
        </div>

        {/** The teams list application container */}
        <div className="appContent">
          <CoachAppContainer username={params.username} />
        </div>

        {/* <div className="adPane">
           <div className="adContent">
              <h2>Ad Here</h2>
            </div>

          </div>*/}

      </div>
    </div>
  );
};

export default CoachComponent;