// @flow
import React from 'react';
import { Divider, List, Avatar } from 'antd';
import './Deal.scss';
import Moment from 'moment';
import type { Deal } from '../../modules/Deal/DealModule';


type Props = {
  teamID: string,
  total: number,
  data: Array<Deal>,
  onGetExpenses: (teamID: string) => void
}

export class DealComponent extends React.Component<Props> {
  props: Props;

  componentDidMount(){
    if(!this.props.total || !(this.props.data || []).length) {
      this.props.onGetExpenses(this.props.teamID)
    }
  }

  totalValue = () => {
    const { data = [] } = this.props;
    if(data.length > 0){
      return data.reduce((acc, cur) => acc + cur.amount, 0);
    }
    return 0.00;
  };

  render() {
    console.log(this.props);
    const { total, data = []} = this.props;
    return (
      <div>
        <div>
          <p><span>Total Deals:  </span> {data.length && <span>&euro; {this.totalValue().toLocaleString()}</span>}</p>
        </div>
        <Divider>Deals ({total})</Divider>
        <List
          data={history}
          className="budgetList"
          itemLayout="horizontal"
          dataSource={data}
          renderItem={d => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar size="large" src={d.playerAvatar} />}
                title={d.playerName}
                description={
                  <div>
                    <div style={{ display: 'flex', flexFlow: 'row', alignItems: 'center' }}>
                      <div><span>{d.out ? 'Sell' : 'Buy'}:</span></div>
                      <h5 style={{margin: 0}}> &euro; {d.amount.toLocaleString()}</h5>
                    </div>
                    <span style={{fontSize: '1.2rem'}}>{Moment(Number(d.dateTime)).local(true).format('MMMM Do YYYY, h:mm a')}</span>
                  </div>
                }
                />
            </List.Item>
          )}
        />
      </div>
    );
  };
}
export default DealComponent;