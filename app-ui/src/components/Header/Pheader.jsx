// @flow

import _ from 'lodash';
import React from 'react';
import {Link, browserHistory} from 'react-router';
import config from 'config/index';
import './Pheader.scss';
import classNames from 'classnames';
import { Icon as FaIcon } from 'react-fa';
import { Icon, Avatar, Popover, Divider  } from 'antd'

type Props = {
  current: string,
  user: Object,
  route: (path: string) => any,
  onSignOut: () => any,

  sidebarOpen: boolean,
  toggleMenu: () => any,
  children: Array<Node>,

  onSearch: (term: string) => any,
};

type State = {
  accountPop: boolean,

}

export class Pheader extends React.Component<Props, State> {

  props: Props;
  state: State = {accountPop: false};


  componentDidMount(){
    //this.toggleHeaderColor();
  }

  shouldComponentUpdate(){
    //this.toggleHeaderColor();
    return true;
  }

  toggleAccountPop = () => {
    this.setState({accountPop: !this.state.accountPop})
  };

  handleSignOut = (evt: Object) => {
    this.props.onSignOut()
  };


  renderPopMenu = () => {
    const { user } = this.props;
    return (<div style={{ display: 'flex', flexFlow: 'column nowrap'}}>
      <div>
        <Link to={config.route.user.account}>Live Funds: $0.00</Link>
      </div>
      <Divider style={{ margin: '6px 0'}} />
      <div>
        <Link to={config.route.user.profile}>Profile</Link>
      </div>
      <div>
        <Link to={config.route.user.profile}>Settings</Link>
      </div>
      <Divider style={{ margin: '6px 0'}} />
      <div>
        <span style={{ cursor: 'pointer'}} onClick={this.handleSignOut}>Sign Out</span>
      </div>
    </div>)
  };


  render(){
    return (
      <nav
        role="navigation"
        className={classNames('header_container')}
      >
        <ul className="nav_header">
          <li className="nav_header_brand">
            <Link to={config.route.index} >
              LIVEKOACH
            </Link>
          </li>
        </ul>
        <ul className="header_app">
          <li className={classNames('header_app_event', {nav_active: this.props.current === config.route.coach.game})}>
            <Link to={config.route.coach.game} >
              Games
            </Link>
          </li>

          {!_.isEmpty(this.props.user) &&

          <li className={classNames('header_app_event', {nav_active: this.props.current === `${config.route.coach.appRaw}/${this.props.user.username}`})}>
            <Link to={`${config.route.coach.appRaw}/${this.props.user.username}`} >
              Coach
            </Link>
          </li>
          }
          {!_.isEmpty(this.props.user) &&
          <li disabled
              className={classNames('header_app_event', {nav_active: this.props.current === config.route.coach.network})}>
            <Link to={config.route.coach.network}>
              Friends
            </Link>
          </li>
          }
      </ul>
        {_.isEmpty(this.props.user) ?
          (
            <ul className="header_auth">
              <li className="header_auth_signIn">
                <Link to={config.route.auth.signIn} >
                  Sign In
                </Link>
              </li>
              <li className="header_auth_signUp">
                <Link to={config.route.auth.signUp} >
                  Sign Up
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="header_auth">
              <li
                className="header_auth_account"
              >
                <div>
                <Popover
                  placement="bottomLeft"
                  content={this.renderPopMenu()}
                  trigger="click"
                  title={<div><span>{this.props.user.firstName}</span><span style={{fontSize: 16, color: '#bbbbbb'}}>@{this.props.user.username}</span></div>}
                >
                  <span style={{ cursor: 'pointer'}}>
                    <Avatar className="userAccount" size="small">
                      <Icon type="user"/>
                    </Avatar>
                  </span>
                </Popover>
                </div>
              </li>
            </ul>
          )
        }
        <ul className="mobile_menu">
          <li className="mobile_menu_toggle">
            <a onClick={this.props.toggleMenu} href="#">
              {this.props.sidebarOpen ?
                <Icon style={{ fontSize: '1.7rem', marginTop: 6}} type="close" /> :
                <FaIcon spin={this.props.sidebarOpen} name="bars"/>
              }
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}


export default Pheader;