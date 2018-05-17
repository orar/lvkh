// @flow
import { connect } from 'react-redux';
import type { Dispatch } from "redux";
import { fetchSlides } from "../../modules/Slide/SlideModule";
import Home from '../../components/Home/Home';

export const  mapStateToProps = (state, props) => ({
  slides: state.home.slide.data,
});


export const mapDispatchToProps = (dispatch: Dispatch<*> ) => ({
  onFetchSlides: () => dispatch(fetchSlides()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Home)