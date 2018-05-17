// @flow
import React from 'react';
import Menu from 'react-burger-menu/lib/menus/stack';
import { Divider } from 'antd';
import { Link } from 'react-router';
import config from 'config/index';
import theme from '../../util/Theme';
import isEmpty from 'lodash/isEmpty';
import './Sider.scss';



//const mql = window.matchMedia(`(min-width: 800px)`);


type Props = {
  user: Object,
  sidebarOpen: boolean,
  onSetSidebarOpen: () => any,
  onSignOut: () => any,
}

type State = {
  //mql: Object,
  open: boolean,
  sidebarOpen: boolean,
}

export class SideBarComponent extends React.Component<Props, State> {
  props: Props;

/*
  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql: mql, sidebarDocked: mql.matches});
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged = () => {
    this.setState({sidebarDocked: this.state.mql.matches});
  };
*/


  handleSignOut = (evt: Object) => {
    evt.preventDefault();
    this.props.onSignOut();
  };

  render() {


    const divider = (
      <Divider style={{ backgroundColor: '#9c9c9c', margin: '8px auto'}} />
    );


    return (
      <Menu

        onStateChange={this.props.onSetSidebarOpen}
        isOpen={this.props.sidebarOpen}
        customBurgerIcon={ false }
        customCrossIcon={ false }
      >
        {isEmpty(this.props.user) &&
        <div style={{ marginLeft: 0, paddingLeft: 0}}>
          <div>
            <Link to={config.route.auth.signIn}>
              Sign In
            </Link>
          </div>
          <div>
            <Link to={config.route.auth.signUp}>Sign Up</Link>
          </div>
        </div>
        }
        {isEmpty(this.props.user) ? divider : null}
        {!isEmpty(this.props.user) &&
        <div style={{ marginLeft: 0, paddingLeft: 0}}>
          <div>
            <Link to={`${config.route.coach.appRaw}/${this.props.user.username}`}>
              Coach
            </Link>
          </div>
          <div>
            <Link to={config.route.user.account}>Live Funds: $0.00</Link>
          </div>
        </div>
        }
        {!isEmpty(this.props.user) ? divider : null}
        {!isEmpty(this.props.user) &&
        <div style={{ marginLeft: 0, paddingLeft: 0}}>
          <div>
            <Link to={config.route.user.profile}>Profile</Link>
          </div>
          <div>
            <a className="menu-item--small" href="">Settings</a>
          </div>
        </div>
        }
        {!isEmpty(this.props.user) ? divider : null}

        <div>
          <a id="about" className="menu-item" href="#">About</a>
        </div>
        <div>
          <a id="contact" className="menu-item" href="#">Support</a>
        </div>
        {divider}
        <div>
          <a id="contact" className="menu-item" href="#">Privacy</a>
        </div>
        {divider}
        {!isEmpty(this.props.user) &&
        <div >
          <span style={{color: theme.redFade, cursor: 'pointer', marginLeft: 0}} onClick={this.handleSignOut}>Sign Out</span>
        </div>
        }
      </Menu>
    )
  }
}

export default SideBarComponent;