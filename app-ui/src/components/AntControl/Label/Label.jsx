// @flow

import React from 'react';
import type { Node } from 'react';
import './Label.scss';


type Props = {
  htmlFor: string,
  text: string,
  style: Object,
  children: Node,
  i18n: Object,
}

const defaultStyle = {
  float: 'left'

};

export const LabelComponent = ({htmlFor, text, style, children }: Props) => (
  <div className="input-label">
    {!!text ? <label htmlFor={htmlFor} style={style || defaultStyle} > {text} </label>
      : <label htmlFor={htmlFor} style={style || defaultStyle}> {children} </label>}
  </div>

);

export default LabelComponent;