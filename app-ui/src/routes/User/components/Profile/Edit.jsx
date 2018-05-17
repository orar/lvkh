// @flow
import React from 'react';
import type { Node } from 'react';
import { Icon, Tooltip } from 'antd';


type Props = {
  title: string,
  children: Array<Node>,
}

type State = {
  edit: boolean,
}


export class EditComponent extends React.Component<Props, State>  {
  props: Props;

  state: State = { edit: false };

  toggleEdit = () => this.setState({ edit: !this.state.edit });

  render() {
    const { children, title } = this.props;
    if(children.length < 2) { return null; }

    const [firstChild, ...restChildren ] = children;

    const styles = {
      editContainer: {
        width: '100%',
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        justifyContent: 'center'
      },
      firstChild: {
        display: !this.state.edit ? 'flex' : 'none',
        width: '100%',
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
        justifyContent: 'center'
      },
      restChildren: {
        display: this.state.edit ? 'flex' : 'none',
        width: '100%',
        flexFlow: 'column nowrap',
        alignItems: 'center',
        justifyContent: 'center'
      }
    };

    return(
      <div style={styles.editContainer} >
        <div style={styles.firstChild} >
          <span>{firstChild}</span>
          <span style={{ position: 'relative', float: 'right', alignSelf: 'flex-start', cursor: 'pointer'}}>
            <Tooltip title={title ? `Edit ${title}` : 'Edit'} >
              <Icon onClick={this.toggleEdit} type="edit" />
            </Tooltip>
          </span>
        </div>
        <div style={styles.restChildren}>
          { restChildren }
        </div>
      </div>
    );
  }
}


export default EditComponent;