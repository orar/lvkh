// @flow
import React from 'react';
import FormationContainer from '../../containers/Team/FormationContainer';
import BenchContainer from '../../containers/Team/BenchContainer';
import FieldControl from './FieldControl';
import RoleContainer from '../../containers/Team/RoleContainer';
import './Stage.scss';

type Props = {
  teamID: string,
  readOnly: boolean,
}


/**
 * Stage state
 */
type State = {
  zoomFactor: number,
  overflow: boolean,
};

/**
 * The default pitch zoom factor
 * Zoom factor should be set in redux to avoid resetting factor to default upon navigating to another tab
 * @type {number}
 */
const ZOOM_ZERO = 77.5;


/**
 * The main entry for Team on TeamCard(SeasonCardComponent)
 *
 * -- todo intend to rename to FieldComponent
 *
 */
export class StageComponent extends React.Component<Props, State> {
  props: Props;

  state: State =  { zoomFactor: ZOOM_ZERO, overflow: false };

  /** Zooms the pitch in and out.
   *
   * Sets the zoom factor to state
   * @param val zoomFactor number
   */
  zoom = (val: number) => {
    if(val >= 0 && val <= 94){
    this.setState({zoomFactor: val});
    }
  };

  /**
   * Toggle pitch overflow value
   */
  overflowPitch = (overflow: boolean) => {
   this.setState({ overflow })
  };

  render(){
    const { zoomFactor, overflow } = this.state;
    const { teamID, readOnly } = this.props;

    //Calculate zoom rendering-style
    const zf = zoomFactor * 4 - 520;
    const yf = zoomFactor >= ZOOM_ZERO ? 0 : (ZOOM_ZERO - zoomFactor) * 2;
    const zoomStyle = { transform: `translate3d(0, ${yf}px, ${zf}px`};

    const pitchStyle = { height: readOnly ? 500 : 600, overflowX: overflow ? '': 'auto' };

    return (
      <div className="stageContainer">
        {/** FormationComponent renders a list of formation provided and the users default*/}
        <FormationContainer teamID={teamID} readOnly={readOnly} />

        {/** Apply Field controller -zoom */}
        <FieldControl
          readOnly={readOnly}
          teamID={teamID} zoom={this.zoom}
          zoomFactor={zoomFactor}
          overflow={overflow}
          overflowPitch={this.overflowPitch}
        />

       {/** Zoomable section */}
        <div className="stagePitch" style={pitchStyle}>
          <div className='stage texture'>
            <div className="world" style={zoomStyle}>

              {/** Apply players on pitch */}
              <RoleContainer teamID={teamID} readOnly={readOnly} zoomFactorY={yf} />

              <div className='terrain'>
                <div className='field field--alt'/>
                <div className='field ground'>
                  <div className='field__texture field__texture--gradient'/>
                  <div className='field__texture field__texture--gradient-b'/>
                  <div className='field__texture field__texture--grass'/>
                  <div className="field__line field__line--goal"/>
                  <div className='field__line field__line--goal field__line--goal--far'/>
                  <div className='field__line field__line--outline'/>
                  <div className='field__line field__line--penalty'/>
                  <div className='field__line field__line--penalty-arc'/>
                  <div className='field__line field__line--penalty-arc field__line--penalty-arc--far'/>
                  <div className='field__line field__line--mid'/>
                  <div className='field__line field__line--circle'/>
                  <div className='field__line field__line--penalty field__line--penalty--far'/>
                </div>
                <div className='field__side field__side--front'/>
                <div className='field__side field__side--left'/>
                <div className='field__side field__side--right'/>
                <div className='field__side field__side--back'/>
              </div>
            </div>
          </div>
          </div>

        {/** Apply bench component */}
        <BenchContainer teamID={teamID} readOnly={readOnly} />
      </div>
    )
  }
}

export default StageComponent;