// @flow
import React from 'react';
import { Icon,Modal, Button, Popover, Popconfirm, Tooltip, Spin, message } from 'antd';
import './Transfer.scss';
import type {Player} from "../../modules/PlayerList/PlayerListModule";
import type { Player as BenchPlayer } from "../../modules/Team/Player";
import {slashNumber} from "../../../../util/HelperUtil";
import { Icon as FaIcon } from 'react-fa';

const confirm = Modal.confirm;


type Props = {
  isPending: boolean,
  teamID: string,
  team: Array<BenchPlayer>,
  max: number,
  key: string,
  player: Player,
  bank: number,
  onTransfer: (t: Object) => any
}

type State = {
  openConfirm: boolean,
}


export class TransferComponent extends React.Component<Props, State> {
  props: Props;

  state: State = {
    openConfirm: false,
  };

  validateDeal = (evt: Object) => {
    evt.preventDefault();

    this.showConfirm();
    return;

    const {team, max, player, bank} = this.props;
    let errorBuffer = [];
    let warningBuffer = [];

    //Should have enough budget
    if (bank < player.price){
      errorBuffer.push(`You don't have enough budget`);
    }

    //Should not exceed max team count
    if (team.length >= max) {
      errorBuffer.push(`You can't exceed ${max} players`);
    }
    //Should not exceed max role count
    if (team.filter(p => p.role === player.role).length >= 5) {
      const roleSize = team.filter(p => p.role === player.role).length;
      warningBuffer.push(`Are you sure you want to have ${roleSize} ${player.role}?`);
    }
    //if player exist in team already
    if (team.some(p => p.id === player.id)) {
      errorBuffer.push(`${player.name} '${player.originJersey} is already part of your team`)
    }

    if (errorBuffer.length > 0) {
      errorBuffer.forEach((err, i) => setTimeout(() => message.error(errorBuffer[0], 4), i * 500));
    } else if (warningBuffer.length > 0) {
      warningBuffer.forEach((err, i) => setTimeout(() => message.error(errorBuffer[0], 4), i * 500));
    } else {
      //this.setState({openConfirm: true});
      this.showConfirm()
    }
  };

  confirmDeal = () => {
    const transfer = {
      seasonID: this.props.player.seasonID,
      teamID: this.props.teamID,
      playerID: this.props.player.id
    };
    this.props.onTransfer(transfer);
    this.setState({openConfirm: false})
  };

  styles = {
    confirmTitle: {
      display: 'inline-flex',
      alignItems: 'baseline'
    },
    confirmTitleP: {
      marginBottom: 3
    },
    confirmTitleIcon: {
      fontSize: 6,
      alignSelf: 'center',
    },
    confirmTitleSpan :{
      color: '#737373',
      opacity: .8,
      fontSize: '1.2rem',
    }
  };

  renderTitle = (player: Player) => (
    <div style={this.styles.confirmTitle}>
      <p style={this.styles.confirmTitleP}>{player.name}</p>
      <FaIcon name="circle-o" style={this.styles.confirmTitleIcon}/>
      <span style={this.styles.confirmTitleSpan}>{player.originName}</span>
    </div>
  );

  showConfirm() {
    const  { player } = this.props;
    confirm({
      title: this.renderTitle(player) ,
      content:  <span style={{ fontSize: '1.5rem'}}>Transfer-In {player.name} for <Icon type="euro"/> {slashNumber(player.price, 1)}</span>,
      okText: "Done Deal",
      cancelText: "Cancel",
      onOk() {
        this.confirmDeal()
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }


  render() {

    const {isPending,  player } = this.props;
    //console.log(this.props);
    return (
      <div className="transferActionContainer">
        <Tooltip placement="top" title={`Transfer ${player.name}`} >
          <Button
            ghost
            size="small"
            style={{ textAlign: 'center', fontSize: 13, width: 70, height: 20}}
            disabled={player.evicted}
            type={player.evicted ? 'default': 'primary'}
            onClick={this.validateDeal}>Transfer</Button>
        </Tooltip>
      </div>
    );
  }
  ;

}




export default TransferComponent;