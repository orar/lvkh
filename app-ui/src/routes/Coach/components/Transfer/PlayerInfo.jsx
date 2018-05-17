//@flow
import React from 'react';
import { Modal, Popover, Tooltip, Icon } from 'antd';
import type {Player} from "../../modules/PlayerList/PlayerListModule";
import {modalWidth, slashNumber, windowWidth} from "../../../../util/HelperUtil";
import capitalize from 'lodash/capitalize';
import { Icon as FaIcon } from 'react-fa';
import PlayerDetailContainer from '../../containers/PlayerList/PlayerDetailContainer';



type Props = {
  data: Player,
}

type State = {
  visible: boolean
}



export class PlayerInfoComponent extends React.Component<Props, State> {
  props: Props;

  state: State = { visible: false };

  showModal = (evt: Object) => {
    evt.preventDefault();
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  toggleVisible = () => this.setState({ visible: !this.state.visible});

  modalWidth = () => {
    const width = windowWidth();
    return width < 500 ? width * 0.7 : 520;
  };

  render() {
    return (
      <div>
        <Tooltip title="More Info">
          <span onClick={this.showModal} ><Icon type="ellipsis" /></span>
        </Tooltip>
        <Modal
          visible={this.state.visible}
          title={this.props.data.name}
          onCancel={this.handleCancel}
          footer={null}
          destroyOnClose
          mask={false}
          style={{ width: 700}}
          bodyStyle={{ padding: 0}}
        >
          <PlayerDetailContainer playerID={this.props.data.id} />
        </Modal>
      </div>
    );
  }
}

export default PlayerInfoComponent;