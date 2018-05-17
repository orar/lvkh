// @flow
import React from 'react';
import type { RoundScore } from "../../modules/Scoreboard/ScoreBoardModule";
import { List, Card, Icon, Modal, Tooltip, Divider } from 'antd';
import { Icon as FaIcon } from 'react-fa';
import upperFirst from 'lodash/upperFirst';
import toUpper from 'lodash/toUpper';
import { Collapse } from 'react-collapse';
import RoundScoreDetailContainer from '../../containers/Scoreboard/RoundScoreDetailContainer';
import { modalWidth, windowHeight, positionth } from '../../../../util/HelperUtil';
import './RoundScoreList.scss';


const Meta = Card.Meta;

type Props = {
  round: Array<RoundScore>
}

/*
* score: number,

  globalScore: number,
  globalPosition: number,

  localScore: number,
  localPosition: number,
  startDate: number,
  endDate: number,
* */

/**
 * Renders a list of RoundScores with the current RoundScore appearing first(0)
 *
 * @param round An array of {RoundScore}
 * @returns {React.Node}
 * @constructor
 */
export const RoundScoreListComponent = ({ round = [] }: Props) => {

  return (
    <div className="roundScoreListContainer">
      <div className="roundScoreListWrapper">
        { round.map(r =>
          <div key={r.id}>
            <Card
              className="roundScoreCard"
              hoverable
              style={{ width: 240, cursor: 'auto',/* margin: 8*/ }}
              cover={<img height={200} alt={r.roundName} src={r.roundCoverUrl} />}
            >
              <RoundMeta round={r} />
            </Card>
          </div>
        )}
      </div>
    </div>
  )
};


type MetaProps = {
  round: RoundScore,
}

type MetaState ={
  modalOpen: boolean,
  collapseOpen: boolean,
}


/**
 * Renders a Round score of a team in a game
 */
export class RoundMeta extends React.Component<MetaProps, MetaState> {
  props: MetaProps;

  state: MetaState = {
    modalOpen: false,
    collapseOpen: false
  };



  toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen});

  toggleCollapse = () => this.setState({ collapseOpen: !this.state.collapseOpen});


  configModalRef = (ref: HTMLElement) => {
    //ref.b = windowHeight();

    return ref;
  };

  styles = {
    icon: {
      //marginLeft: 4,
      marginRight: 8,
    }
  };


  render(){
    const { round: r } = this.props;

    return (
      <div>
        <Meta
          style={{ cursor: 'auto'}}
          title={<h4 style={{textAlign: 'center'}}>{r.roundName}</h4>}
          description={
            <div>
              <div onClick={this.toggleModal}  style={{ cursor: 'pointer'}} >
                <span>Score: </span>
                <h3 style={{textAlign: 'center'}}>{r.score.toLocaleString()}</h3>
              </div>
              <Divider>Positions</Divider>
              <div>
                <Tooltip title="World Position" >
                  <h5>
                  <FaIcon name="globe" /> {r.globalPosition.toLocaleString()}<sup>TH</sup>
                </h5>
                </Tooltip>
                <Tooltip title={`${upperFirst(r.localName)} Position`}>
                  <h5>
                     {/* <Icon style={this.styles.icon} type="environment-o" />*/}
                      <FaIcon style={this.styles.icon} name="map-marker" />  {r.localPosition.toLocaleString()}
                    <sup style={{ fontSize: '.9rem'}}>
                      {toUpper(positionth(r.localPosition))}
                    </sup>
                  </h5>
                </Tooltip>
              </div>

              {/** An extensible collapse section to render the top score of the round in context */}
             {/* <Collapse isOpened={this.state.collapseOpen}>
                <Divider/>
                <div >
                  <div><span>Global Top Score: </span><span>{r.globalScore.toLocaleString()}</span></div>
                  <div ><span>Top {upperFirst(r.localName)} Score: </span><span>{r.localScore.toLocaleString()}</span></div>
                </div>
              </Collapse>*/}
            </div>
          }
        />
        <Modal
          width={modalWidth()}
          //getContainer={this.configModalRef}
          bodyStyle={{ maxHeight: windowHeight() * 0.9, paddingRight: 0}}
          visible={this.state.modalOpen}
          title={r.roundName}
          onCancel={() => this.toggleModal()}
          footer={null}
          destroyOnClose
          mask={false}
        >
          <RoundScoreDetailContainer {...r} />
        </Modal>
      </div>
    )
  }

}

export default RoundScoreListComponent;