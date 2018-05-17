// @flow
import React from 'react';
import { Divider, Icon, Tooltip } from 'antd';
import { Collapse } from 'react-collapse';
import {Icon as FaIcon} from 'react-fa';
import type {UserProfile} from "../../modules/Profile/ProfileModule";
import isEmpty from 'lodash/isEmpty';
import FanPlayer from '../Profile/FanPlayers';
import FanCountry from '../Profile/FanCountry'
import './UserProfileWidget.scss';

type Props = {
  username: string,
  data: UserProfile,
  ownProfile: boolean,
  onGetProfile: (userID: string) => any,
}

type State = {
  fanCollapse: boolean,
}


export class UserProfileWidgetComponent extends React.Component<Props, State> {
  props: Props;

  state: State = {fanCollapse: false };

  componentDidMount() {
    if (isEmpty(this.props.data)) {
      this.props.onGetProfile(this.props.username);
    }
  }

  toggleCollapse = () => this.setState({ fanCollapse: !this.state.fanCollapse });

  render(){
    const { data, ownProfile } = this.props;
    console.log(this.props);

    return (
      <div>
        {!isEmpty(data) &&
        <div className="profileWidgetContainer">
          <div className="profileAvatarWrapper">
            <img className="profileAvatar" src={data.avatar} alt={data.firstName} />
          </div>
          <div className="profileDetail">
            <div className="basicDetail">
              <div>
                <p className="basicDetailName">{data.firstName} {data.lastName}</p>
                <div><span>@{data.username}</span></div>
              </div>
              <div>
                <FaIcon style={{ marginRight: 5}} name="map-marker" /><span>{data.city}, {data.country}</span>
              </div>
            </div>
            <div className="statusMsg">
              <p>{data.statusMsg}</p>
            </div>
            <div className="collapseFan" >
          <span className="collapseButton" onClick={this.toggleCollapse}>
            {this.state.fanCollapse ? <Icon type="up"/> : <Icon type="down" /> }
          </span>
            </div>
            <Collapse isOpened={this.state.fanCollapse}>
              <Divider style={{ margin: '5px auto'}}/>
              <div>
                <div>
                  <FanPlayer edit={ownProfile} players={data.fanPlayers} header="Fan Players" />
                </div>
                <Divider style={{ margin: '5px auto'}}/>
                <div>
                  <FanCountry edit={ownProfile} countries={data.fanCountries} header="Fan Countries" />
                </div>
              </div>
            </Collapse>
          </div>
        </div>
        }
      </div>
    )
  }
}

export default UserProfileWidgetComponent;