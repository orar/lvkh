// @flow
import { createAction, handleActions } from 'redux-actions';
import { noDupConcat } from "../../../../util/HelperUtil";

export type Country = {
  id: string,
  name: string,
  flag: string,
  continent: string,
  evicted: boolean,
}

export type CountryData = {
  data: Array<Country>,
};

export const initialCountryData: CountryData = {
  data: [],
};


export const fetchCountries = createAction('COACH_LIST_COUNTRY_FETCH');

export const saveCountries = createAction('COACH_COUNTRY_LIST_FETCH');
export const clearCountries = createAction('COACH_COUNTRY_LIST_FETCH');



export default handleActions({
  [saveCountries]: (state, action) => ({data: noDupConcat(state.data, action.payload, (s, p) => s.id === p.id)}),
  [clearCountries]: () => initialCountryData
}, initialCountryData);
