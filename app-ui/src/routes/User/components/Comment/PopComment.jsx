// @flow
import React from 'react';



type Props = {
  teamID: string,
  roundID: string,
  data: Array<Comment>
}

type State = {
  flipComment: boolean
}


export class PopCommentComponent extends React.Component<Props, State> {
  props: Props;

  state: State = {flipComment: false};


  render(){

    return (
      <div>

      </div>
    )
  }
}