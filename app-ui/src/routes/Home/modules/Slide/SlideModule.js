// @flow
import { createAction, handleActions } from 'redux-actions';


export type Slide = {
  id: string,
  cover: string,
  header: string,
  message: string,
  dateTime: number,
}

type SlideData = {
  data: Array<Slide>,
}

export const initialAccount: SlideData  = {
  data: []
};


export const fetchSlides = createAction('HOME_SLIDE_FETCH');

export const saveSlides = createAction('HOME_SLIDE_SAVE');
export const resetSlides = createAction('HOME_SLIDE_RESET');


export default handleActions({
  [saveSlides]: (state, action) => ({ data: action.payload }),
  [resetSlides]: () => initialAccount,
}, initialAccount);
