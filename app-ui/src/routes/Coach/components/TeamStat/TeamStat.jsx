// @flow
import React from 'react';
import type { TeamStat } from "../../modules/Team/TeamStatModule";
import './TeamStat.scss';
import { List, Card, Divider } from 'antd';

type Props = {
  id: string,
  seasonID: string,
  teamID: string,

  size: number,
  prizes: Array<string>,
  substitutes: {count: number},
  cards: List<GameCard>,
  fouls: { count: number, player},
  performance: number,

  requestLock: boolean,
  onGetStat: (seasonID: string) => any
}

type State = { [string]: boolean }

export class TeamStatComponent extends React.Component<Props> {
  props: Props;

  state: State;

  collapse = (name: string) => {
    this.setState({[name]: !this.state[name]});
  };

  render(){
    const { size, prizes, substitutes, cards, fouls, performance } = this.props;
    return (
      <Card>
        <div>
          <p>Team Size: <span>{size}</span></p>
          <p>Performance: <span>{performance}</span></p>
          <p>Awards: <span>{prizes}</span></p>
        </div>

        <Divider onClick={() => this.collapse('substitute')}>Substitutions ({substitutes.count()})</Divider>
        <Collapse in={this.state['substitute']}>
        <List
          size="small"
          dataSource={substitutes}
          renderItem={s =>
            <List.Item>
              <div>
                <span>{s.bench.player}</span>
                <span><Icon type="arrow-right" /></span>
                <span>{s.field.player}</span>
              </div>
            </List.Item>
          }
        />
        </Collapse>

        <Divider onClick={() => this.collapse('foul')}>Game Fouls Cards ({fouls.count()})</Divider>
        <Collapse in={this.state['foul']}>
        <List
          size="small"
          dataSource={substitutes}
          renderItem={item => (<List.Item>{item}</List.Item>)}
        />
        </Collapse>

        <Divider onClick={() => this.collapse('offence')}>Game Offence Cards ({cards.count()})</Divider>
        <Collapse in={this.state['offence']}>
          <List
            size="small"
            dataSource={substitutes}
            renderItem={item => (<List.Item>{item}</List.Item>)}
          />
        </Collapse>
      </Card>
    )
  }
}