// @flow
import groupBy from 'lodash/groupBy';
import { connect } from "react-redux";
import type {Dispatch} from 'redux';
import {fetchCountries} from "../../modules/CountryList/CountryListModule";
import CountryList from '../../components/CountryList';



const mapStateToProps = (state, props ) => ({
  data: state.coach.country.data,
});



const mapDispatchToProps = (dispatch: Dispatch<*>) => ({
  onFetchCountries: data => dispatch(fetchCountries(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(CountryList);