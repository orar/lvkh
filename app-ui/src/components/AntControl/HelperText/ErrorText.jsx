// @flow

import React from 'react';
import type { Node } from 'react';
import type { ChildrenArray } from 'react';
import './HelperText.scss';
import HelperText from './HelperText';

type Props = {
  style: Object,
  children: Array<Node> | Node
}
export const ErrorTextComponent = ({ children, style}: Props) => (
  <HelperText error style={style} > { children } </HelperText>
);

export default ErrorTextComponent;