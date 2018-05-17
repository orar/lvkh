// @flow
import React from 'react';
import { Input, Tooltip, Icon, Button} from 'antd';
import { UnmountClosed as Collapse } from 'react-collapse';
import { List } from 'react-virtualized';
import { List as AntList, Avatar } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import type { Comment } from "../../modules/Comment/CommentDataModule";
import { Icon as FaIcon } from 'react-fa';
import Moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import theme from '../../../../util/Theme';
import { Link } from 'react-router';
import config from 'config/index';
import './Comment.scss';


const Panel = Collapse.Panel;
const TextArea = Input.TextArea;


type Props = {
  isPending: boolean,
  isSuccess: boolean,
  isComplete: boolean,
  threadID: string,
  teamID: string,
  roundID: string,
  count: number,
  data: Array<Comment>,
  onFetchThread: (a: any) => any,
  onSubmitComment: ({teamID: string, roundID: string}) => any
}

type State = {
  collapse: boolean,
  hasMore: boolean,
  comment: string,
}


export class InCommentComponent extends React.Component<Props, State> {
  props: Props;

  state: State = {collapse: false, hasMore: true, comment: '' };

  componentDidMount() {
    const {threadID, data} = this.props;
    if (isEmpty(data)) {
      this.props.onFetchThread({threadID, index: 0, page: 5});
    }
  }

  /**
   * Sets the value of comment box to State.comment
   * @param evt a SyntheticEvent
   */
  onWriteChange = (evt: Object) => {
    this.setState({comment: evt.target.value});
  };

  /**
   * Submits a comment on team in a context of a round [RoundScore].
   * @param evt a SyntheticEvent
   */
  submitComment = (evt: SyntheticEvent<*>) => {
    evt.preventDefault();
    const { teamID, roundID } = this.props;
    this.props.onSubmitComment({teamID, roundID, comment: this.state.comment});
  };


  toggleCollapse = (evt: SyntheticEvent<*>) => {
    this.setState({ collapse: !this.state.collapse });
    evt.preventDefault();
  };


  rowItem = ({user, comment, username, userAvatar, dateTime }: data) => {
    console.log(dateTime);
    return (
      <div className="itemComment">
        <Avatar className="itemComment--avatar" size="small" src={userAvatar} />
        <div className="itemComment--info">
          <div className="itemComment--user">
            <Link to={`${config.route.coach.appRaw}/${username}`}>{user}</Link>
            <span className="itemComment--date">{Moment(Number(dateTime)).local(true).format('MMM Do YY, h:mm a')}</span>
          </div>
          <p className="itemComment--comment">{comment}</p>
        </div>
      </div>
    )
  };

  /**
   * Renders a row of a virtualized list.
   *
   * @param key React index key
   * @param index Index of data in List datasource
   * @param isScrolling State of list whether is scrolling
   * @param isVisible State of row, whether row is modalOpen in scroll window
   * @param style Element style object
   * @returns {React.Node} React.Node
   */
  rowRenderer = ({ key, index, isScrolling, isVisible, style }: Object) => {
    return (
      <div key={key} style={style}>
        {this.rowItem(this.props.data[index])}
      </div>
    )
  };

  /**
   * Fetches data to fill Infinite scroll list on List scroll end
   */
  handleInfiniteOnLoad = () => {
    console.log('Load More requested');
    if(this.props.count < this.props.data.length) {
      const { teamID, roundID } = this.props;
      this.props.onFetchThread({teamID, roundID, index: this.props.data.length, list: 10});
    } else {
      this.setState({ hasMore: false });
    }
  };

  renderListView = () => {
    return (<div style={{ marginTop: 10 }}>
      {this.props.data.length < 50 ?
      (
        <AntList
          itemLayout="horizontal"
          dataSource={this.props.data}
          renderItem={item => this.rowItem(item)}
        />
      ):(
        <List
          width={300}
          height={200}
          rowCount={this.props.data.length}
          rowHeight={20}
          rowRenderer={this.rowRenderer}
        />
      )}
      </div>)
  };

  render(){

    return (
      <div className="inComment">
        <Tooltip title="Comments">
          <span
            onClick={this.toggleCollapse}
            style={{ cursor: 'pointer', marginLeft: 0, color: theme.linkBlue, fontSize: '1.15rem'}}>
            {this.state.collapse ? <span>Close Comments</span> : <span>Comments <Icon type="down"/></span>}
          </span>
        </Tooltip>
        <Collapse isOpened={this.state.collapse}>
          {!isNil(this.props.data) &&
          <div>
            <InfiniteScroll
              initialLoad={false}
              pageStart={0}
              loadMore={this.handleInfiniteOnLoad}
              hasMore={this.state.hasMore}
              useWindow={false}
            >
              {this.renderListView()}
            </InfiniteScroll>
          </div>
          }
          <div className="inCommentForm">
            <div className="inCommentFormTextArea">
              <TextArea onChange={this.onWriteChange} placeholder="Got something to say?" autosize />
            </div>
            {/*TODO: Button loading={this.state.isPending}*/}
           <div className="inCommentFormSend">
             <Tooltip title="Post Comment">
              <Button ghost type="primary" htmlType="submit" onClick={this.submitComment}>
                <FaIcon name="paper-plane-o"/>
              </Button>
            </Tooltip>
           </div>
          </div>
        </Collapse>
      </div>
    )
  }
}


export default InCommentComponent;