// @flow

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import './HelperText.scss';


type Props = {
  style?: Object,
  error?: boolean,
  children: Node,
  i18n?: Object,
}
export const HelperTextComponent = ({error, style, children }: Props) => (
  <div className={classNames('helper-text', { error: error })}>
    <small  style={style} >
      { children }
    </small>
  </div>
);

HelperTextComponent.defaultProps = {
  error: false,
};

export default HelperTextComponent;