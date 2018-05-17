// @flow
import React from 'react';
import Alert from 'react-s-alert';
import HeaderContainer from 'containers/HeaderContainer';
import SideBarContainer from '../../containers/SidebarContainer';
import FooterContainer from '../../containers/FooterContainer';
import PropTypes from 'prop-types';
import type { Node } from 'react';
import { message, notification } from 'antd';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

import './CoreLayout.scss';


type Props = {
  children: Node,
  headerNav?: Node,
};

type State = {
  sidebarOpen: boolean,
}



export class CoreLayoutComponent extends React.Component<Props, State> {

  props: Props;
  state: State = {sidebarOpen: false };


  onSetSidebarOpen = (open: {isOpen: boolean}) => {
    this.setState({sidebarOpen: open.isOpen});
  };

  toggleMenu = () => this.setState({ sidebarOpen: !this.state.sidebarOpen });

  render() {
    message.config({duration: 5, top: 150 });
    notification.config({ duration: 5 });

    return (
      <div id="core-layout">
        <HeaderContainer sidebarOpen={this.state.sidebarOpen} toggleMenu={this.toggleMenu}>
          {!!this.props.headerNav && <div>this.props.headerNav</div>}
        </HeaderContainer>

        <SideBarContainer
          sidebarOpen={this.state.sidebarOpen}
          onSetSidebarOpen={this.onSetSidebarOpen}
        />

        <div className="body_layout">
            {this.props.children}
            <Alert
              stack={{limit: 3}}
              html
              effect="stackslide"
              position="bottom-right"
              beep={false}
              timeout={5000}
            />
        </div>
        <FooterContainer/>
      </div>
    );
  }
}

CoreLayoutComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  headerNav: PropTypes.element,
};


CoreLayoutComponent.defaultProps = {
  headerNav: null,
  sideNav: null
};

export default CoreLayoutComponent;
