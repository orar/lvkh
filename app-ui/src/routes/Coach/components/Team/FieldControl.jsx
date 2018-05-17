// @flow
import React from 'react';
import { Slider, Icon, Checkbox } from 'antd';
import { Motion, spring, presets } from 'react-motion';
import './FieldControl.scss';


type Props = {
  teamID: string,
  zoomFactor: number,
  zoom: (z: number) => any,
  readOnly: boolean,
  overflow: boolean,
  overflowPitch: (o: boolean) => any
}

type State = { collapse: boolean };

/**
 * Renders a slider to zoom in or out the pitch
 *
 * slider accesses state from stage to zoom the whole stage by large 3d translate-z value
 *
 * @param teamID
 * @returns {XML}
 * @constructor
 */
export class FieldControlComponent extends React.Component<Props, State> {
  props: Props;

  state: State = { collapse: true, };

  /**
   * Collapse the slide
   */
  collapse = (evt: SyntheticEvent<*>) => {
    this.setState({ collapse: !this.state.collapse });
    evt.preventDefault();
  };

  overflowPitch = (evt: Object) => {
    this.props.overflowPitch(evt.target.checked);
  };

  render() {
    const { teamID, zoomFactor, zoom, readOnly, overflow, overflowPitch } = this.props;

    const readOnlyPad = readOnly ? { y: -16 } : { y: 0 };
    const toggleStyle = this.state.collapse ? { x: -90, y: -20, b: 0 } : { x: 0, y: 12, b: 1 };
    const slide = this.state.collapse ? { opacity: 0, height: 0, width: 0, borderRadius: 50 } : {opacity: 1, height: 26, width: 100, borderRadius: 5 };

    return (
      <div className="optionsContainer">
        <Motion
          style={{ z: spring(toggleStyle.x), y: spring(toggleStyle.y + readOnlyPad.y ), b: toggleStyle.b }} >
          {s =>
            <div
              className="collapseToggle"
              style={{transform: `translateY(${s.y}px) rotateZ(${s.z}deg)`,  border: s.b ? '2px solid #91d5ff':'none' }}
              onClick={this.collapse}
            ><Icon type="up" /></div>
          }
        </Motion>
        <Motion
          style={{
            w: spring(slide.width),
            h: spring(slide.height),
            br: spring(slide.borderRadius),
            o: spring(slide.opacity, {...presets.noWobble, precision: 0.1 })
          }}
        >
          {s =>
            <div className="stageOptions" style={{ top: -30 + readOnlyPad.y, opacity: s.o, height: s.h, width: `${s.w}%`, borderRadius: s.br }}>
              <Slider step={0.1} min={0} max={100} onChange={zoom} value={Number(zoomFactor)} tipFormatter={null} />
              {/** OnCheck the full pitch would be rendered overflowing its container */}
              {/*<Checkbox  checked={overflow} onChange={this.overflowPitch}/>*/}
            </div>
          }
        </Motion>
      </div>
    );
  };
}


export default FieldControlComponent;