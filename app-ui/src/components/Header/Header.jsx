import isEmpty from 'lodash/isEmpty';
import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import config from 'config/index';
import { Layout, Menu } from 'antd';

import Logo from './assets/logo.png';
//import './Header.scss';

const { Header } = Layout;


type Props = {
}

type State = {

}

export class HeaderComponent extends React.Component<Props, State> {
  props: Props;

  state: State;

  render(){
    const { current, user, route, onSignOut, children, } = this.props;
    return (
      <Header>

        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>

        </Menu>
      </Header>
    );
  }
}


Header.propTypes = {
  current: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  route: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

Header.defaultProps = {
  children: [],
};

export default Header;
