// @flow
import React from 'react';
//import Plx from 'react-plx';
import { Parallax } from 'react-parallax';

type Props = {
  src: string,
  alt: string,
  cover: boolean,
  parallaxBlur: boolean,
  parallax: boolean,
  contentStyle: Object,
  children: Array<Node>,
};

const styles = {
  inner: {
  display: 'flex',
    width: '100%',
  flexFlow: 'column nowrap',
  alignContent: 'center',
  justifyContent: 'center',
},
  outer: {
    width: '100%',
  }
};

export const CoverComponent = ({src, alt, cover, parallaxBlur, parallax, height, children, contentStyle = {} }: Props ) => {

  return (
    <div style={styles.outer}>
      <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage={src}
        bgImageAlt={alt}
        strength={200}
      >
        <div style={{...styles.inner, ...contentStyle }} >
          {children}
        </div>
      </Parallax>
    </div>
  )
};

export default CoverComponent;