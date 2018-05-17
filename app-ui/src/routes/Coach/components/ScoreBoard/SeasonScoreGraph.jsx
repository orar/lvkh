// @flow
import React from 'react';
import type {PlayerScore} from "../../modules/Scoreboard/SeasonScoreChartModule";
import isEmpty from 'lodash/isEmpty';
import { LineChart, YAxis, XAxis, Line, Tooltip } from 'recharts';
import isNil from 'lodash/isNil';
import './ScoreBoard.scss';

type Props = {
  teamID: string,
  data: {[string]: {name: string, chart: Array<PlayerScore> }},
  onFetchGraphData: (teamID: string) => any,
}

/**
 * A graph showing the performance chart of a team's players for a particular round
 *
 * @deprecated
 */
export class ScoreGraphComponent extends React.Component<Props> {
  props: Props;

  componentDidMount(){
    if(isEmpty(this.props.data)) {
      this.props.onFetchGraphData(this.props.teamID);
    }
  }


  /**
   * returns {name: string, roundID: string, pts: number}
   * */
  computeGraphPoints = () => {
    const { data } = this.props;
    const points = [];
    for(let val in data){
      const pts = data[val].chart.reduce((acc, cur) => {
        return acc + cur.score;
      }, 0);
      points.push({ name: data[val].name, roundID: val, pts});
    }
    return points;
  };

  styles = {
    container: {
      maxWidth: 650,
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
    },
    seasonToolTip: {
      backgroundColor: '#e4e9f7',
      opacity: .7,
      width: 170,
      color: '#181818',
    },
    tooltip: {
      padding: 'auto 5px',
      fontSize: '1.3rem',

    },
    toolTipName: {
      float: 'left'
    },
    toolTipScore: {
      float: 'right'
    }
  };

  renderTooltipContent = ({ payload }) => {
    if(payload.length > 0 && !isNil(payload[0].payload)){
      const data = this.props.data[payload[0].payload.roundID];
      return (
        <div>
          {!isEmpty(data) &&
          <div>
            {data.chart.map(d =>
              <div style={this.styles.tooltip}>
                {/*<span  className="toolTipImg" ><img className="toolTipImg--img" src={d.avatar} /></span>*/}
                <span style={this.styles.toolTipName} >{d.name}</span>
                <span style={this.styles.toolTipScore} >{d.score}</span>
              </div>
            )}
          </div>
          }
        </div>
      );
    }

  };



  render(){
    console.log(this.props);
    return (
      <div style={this.styles.container}>
        {!isEmpty(this.props.data) &&
        <div>
          <LineChart width={600} height={300} data={this.computeGraphPoints()}>
            <Line type="monotone" dataKey="pts" stroke="#8884d8"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip
              wrapperStyle={this.styles.seasonToolTip}
              content={this.renderTooltipContent}
            />
          </LineChart>
        </div>
        }
      </div>
    )
  }

}

export default ScoreGraphComponent;