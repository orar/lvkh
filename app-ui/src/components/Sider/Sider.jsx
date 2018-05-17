// @flow
import React from 'react';
import type { Node } from 'react';
import { Layout, Menu, Icon } from 'antd';
import './Sider.scss';

const { Sider: SideBar} = Layout;
const { SubMenu } = Menu;


type Props = {
  current: string,
  user: Object,
  route: Object,
  children: Node | Array<Node>,
  onSignOut: () => void,
}

type State = {
  collapsed: boolean,
}

export class SiderComponent extends React.Component<Props, State> {
  props: Props;

  state: State = { collapsed: true };

  render() {
    // { children } = this.props;

    return (
      <SideBar
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>Option 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>Option 2</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={<span><Icon type="user" /><span>User</span></span>}
          >
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
        </Menu>
      </SideBar>
    );
  }
}

export default SiderComponent;