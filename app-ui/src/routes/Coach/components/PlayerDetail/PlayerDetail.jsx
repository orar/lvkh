// @flow
import React from 'react';
import type {PlayerDetail, PlayerPerfHistory} from "../../modules/PlayerList/PlayerDetailModule";
import { Icon, Modal, Divider } from 'antd';
import isEmpty from 'lodash/isEmpty';
import HistoryTable from "./HistoryTable";
import './PlayerDetail.scss';
import {slashNumber} from "../../../../util/HelperUtil";
import { PlayerStatus } from "../PlayerList/Player";

type Props = {
  playerID: string,
  data: PlayerDetail,
  onGetPlayerDetail: (id: string) => any
}

export class PlayerDetailComponent extends React.Component<Props> {

  props: Props;


  componentDidMount(){
    if(isEmpty(this.props.data)){
      this.props.onGetPlayerDetail(this.props.playerID)
    }
  }

  renderInfo = () => {
    const { data: {
      name, age, avatar, coverUrl, role, originName, form, totalPoints, price,
      influence, creativity, threat, tsb, ictIndex, rating, evicted, weight, height}} = this.props;

    return (
      <div className="playerDetailContainer">
        <div className="detailCoverWrap" style={{ backgroundImage: 'url('+ coverUrl + ')'}} />
        <div className="detailAvatarWrap">
          <img className="detailAvatar" src={avatar} />
          <div className="detailStatus">
            <PlayerStatus evicted={evicted}/>
          </div>
        </div>

        <div className="playerDetailInfo">
          <div className="leftDetail">
            <div>
              <p>{originName}</p><span>origin</span>
            </div>
            <div>
              <p>{role}</p><span>role</span>
            </div>
          </div>
          <div className="rightDetail">
            <div>
              <p>{slashNumber(price)}</p><span>price</span>
            </div>
            <div>
              <p>{form}</p><span>form</span>
            </div>
          </div>
        </div>

        <div className="centerDetail">
          <p>{name}</p>
          {/*<span>{age}</span>*/}
        </div>

        <div  className="technicalBar">
          <div><p>{influence}</p><span>influence</span></div>
          <div><p>{creativity}</p><span>creativity</span></div>
          <div><p>{threat}</p><span>threat</span></div>
          <div><p>{tsb}</p><span>selection</span></div>
          <div><p>{rating}</p><span>rating</span></div>
          <div><p>{ictIndex}</p><span>index</span></div>
          <div><p>{weight}</p><span>weight</span></div>
          <div><p>{height}</p><span>height</span></div>
        </div>
        <Divider />
        <div className="detailHistory">
          <HistoryTable history={this.props.data.history}/>
        </div>
      </div>
    );
  };

  render() {
    console.log(this.props);
    const { data } = this.props;
    return (
      <div>
        { !isEmpty(data) && <div>{this.renderInfo()}</div> }
      </div>
    );
  }
}



export default PlayerDetailComponent;