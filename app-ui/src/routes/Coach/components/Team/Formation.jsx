// @flow
import React from 'react';
import type {Player} from "../../modules/Team/Player";
import FieldPlayer from '../../components/Team/FieldPlayer';
import type {Formation} from "../../modules/Team/FormationModule";
import Moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import { Icon as FaIcon } from 'react-fa';
import { Select, Button, Tooltip, Input, Divider, Spin, Icon } from 'antd';
import { windowWidth } from "../../../../util/HelperUtil";
import './Formation.scss';

const Option = Select.Option;
const InputGroup = Input.Group;

/**
 * FormationComponent type properties
 */
type Props = {
  isPending: boolean,
  isComplete: boolean,
  readOnly: boolean,
  teamID: string,
  current: Formation,
  lockTime: number,
  data: Array<Formation>,
  onChangeFormation: (a: any) => any,
  onFetchFormation: (a: any) => any,
}

/**
 * Formation State
 * */
type State = {
  formationID: string,
}


/**
 * Renders list of provided formation from redux and formation selection
 */
export class FormationComponent extends React.Component<Props, State> {
  props: Props;

  state: State = {
    formationID: ''
  };

  /**
   * On componentDidMount, if data is empty dispatch fetch data
   */
  componentDidMount(){
    if(isEmpty(this.props.data)) {
      this.props.onFetchFormation(this.props.teamID);
    }
  }

  /**
   * Sets the formationID from select to state
   * @param formationID selected formationID
   */
  setFormation = (formationID: string) => {
    //evt.preventDefault();
    this.setState({ formationID });
  };


  /**
   * dispatches a save formation action to redux to be taken by saga
   * @param evt
   */
  saveFormation = (evt: SyntheticEvent<*>) => {
    evt.preventDefault();
    const formation = this.props.data.find(f => f.id === this.state.formationID);
    //if(!!formation && !this.locked())
      //this.props.onChangeFormation(formation);
  };

  /**
   * determines if formation is lock
   *
   * On real match time, users are not supposed to make any further changes to their team.
   * The lock is determined by the next fixture start time provided from backend
   * If time is after or now, lock is on
   *
   * On game lock, formation is locked to prevent any change
   * This lock disables the Change button or avoids dispatching a save formation
   * @returns {boolean}
   */
  locked = () => {
    return Moment(Number(this.props.lockTime)).local(true).isBefore(Moment().local(true));
  };


  render(){
    const { current, lockTime, data, readOnly } = this.props;
    return (
      <div className="formationContainer">
        <div className="formationInfo">
          {!isEmpty(current) && <div className="formationInfoCurrent">Formation: {current.name}</div> }

          {!readOnly && !isEmpty(data) &&
            <div className="formationSelect">
              <InputGroup compact>
                <Select
                  defaultValue={current.name}
                  size={ windowWidth() > 500 ? 'default' : 'small'}
                  className="formationOption"
                  onChange={this.setFormation}
                  onPressEnter={this.setFormation}
                >
                  {data.map(d =>
                    <Option key={d.id} value={d.id}>{d.name}</Option>
                  )}
                </Select>
                <Button
                  disabled={this.locked()}
                  size={ windowWidth() > 500 ? 'default' : 'small'}
                  className="formationChange"
                  ghost
                  type="primary">
                  Change
                </Button>
              </InputGroup>
            </div>
          }
        </div>
        {!readOnly && !isNil(lockTime) &&
        <div className="formationInfoLock">
          <FaIcon style={{ fontSize: 12, color: this.locked() ? '#dd181a' : '#299f24'}} name="circle" />
          <span>Change Before: {Moment(Number(lockTime)).local(true).format('MMM D, YY, h:mm a')}</span>
        </div>
        }
        {isEmpty(data) && <Spin spinning={true} size="default" indicator={ <Icon type="loading" style={{ fontSize: 24 }} spin />}/>}
        <Divider style={{marginTop: 3}}/>
      </div>
    )
  }
}


export default FormationComponent;