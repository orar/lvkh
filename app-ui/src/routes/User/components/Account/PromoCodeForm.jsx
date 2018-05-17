// @flow
import React from 'react';
import { Input, Button, Icon, message, Tooltip } from 'antd';
import type {RequestState as PromoRequest, Promo } from '../../modules/Promo/PromoCodeFormModule';
import isEmpty from 'lodash/isEmpty';
const InputGroup = Input.Group;

type Props = {
  referrer: string,
  referred: boolean,
  request: PromoRequest,
  onVerifyCode: ({code: string}) => any,
  onGetPromoData: () => any,
  style: Object,
  data: Promo,
}

type State = {
  code: string,
}

export class PromoCodeFormComponent extends React.Component<Props, State> {
  props: Props;

  state: State = {code: ''};

  componentDidMount(){
    if(isEmpty(this.props.data)){
      this.props.onGetPromoData();
    }
  }
  onVerifyCode =  (e: SyntheticEvent<*>) => {
    e.preventDefault();
    if(this.state.code){
      this.props.onVerifyCode({
        code: this.state.code,
        referred: !!this.props.referred,
        referrer: this.props.referrer,
      });
    } else {
      message.error('Enter code to recharge');
    }
  };

  onChange = (e: SyntheticEvent<*>) => {
    this.setState({code: e.target.value});
    e.preventDefault();
  };

  onClearCode = (e: SyntheticEvent<*>) => {
    this.setState({ code: ''});
  };


  render(){
    console.log(this.props);
    const brandAddonBefore = () => {
      const { data } = this.props;//data.logo
      return !isEmpty(data) ? <span><img style={{ height: 20}} src={'/static/brand/vodac.png'} /></span> : null;
    };

    const clearAddonAfter = () => {
      return (
        <Tooltip title="Reset">
          <span style={{ cursor: 'pointer'}} onClick={this.onClearCode}>
            <Icon type="close"/>
          </span>
        </Tooltip>
      )
    };

    const style = Object.assign({
      wrapper: {
        width: 300
      },
      buttons: {
        marginLeft: 8,
        display: 'flex',
        justifyContent: 'flex-end'
      },
      input: {
        margin: 8,
        width: '100%'
      },
      reset: {},
      verify: {},
    }, this.props.style || {});

    return (
      <div className="promoCodeContainer">
        <div style={style.wrapper}>
          <div className="promoCodeHeader" style={{display: 'flex', flexFlow: 'column nowrap', alignItems: 'center'}}>
            <p style={{ margin: 0, textAlign: 'center'}}>Activate Code</p>
            <small>Activate code to top up your Live Funds</small>
          </div>
            <Input
              className="promoCodeInput"
              style={style.input}
              maxLength="32"
              value={this.state.code}
              addonBefore={brandAddonBefore()}
              //addonAfter={clearAddonAfter()}
              onPressEnter={this.onVerifyCode}
              onChange={this.onChange}
            />
          <InputGroup style={style.buttons} compact>
            <Button
              style={style.reset}
              ghost
              type="primary"
              disabled={!this.state.code}
              onClick={this.onClearCode}
            >Reset
            </Button>
            <Button
              style={style.verify}
              type="primary"
              disabled={!this.state.code}
              loading={this.props.request.isPending}
              htmlType="submit"
              onClick={this.onVerifyCode}
            >Verify
            </Button>
          </InputGroup>
        </div>
      </div>
    );
  }
}


export default PromoCodeFormComponent;