// @flow

import React from 'react';
import { Form, Control, Field, Errors, actions } from 'react-redux-form';
import PropTypes from 'prop-types';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { withStyles } from 'material-ui/styles';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

import { ErrorWrapper } from "../../util/Form";
import type { FormProps } from 'util/Form';


type Props = {
  id: string,
  data: Array<Object>,
  label: string,
  helperText: string,
  showHelperText?: boolean,
  showErrors?: boolean,
  selectFirst: boolean,
  disabled?: boolean,
  required?: boolean,
  formProps: FormProps,
  validators: { [string]: (string) => boolean },
  messages?: { [string]: string },

  onChange?: (evt: Object) => any,

  //getRef?: (o: Object) => any,
  getValue: (obj: Object) => any,
  getLabel: (obj: Object) => string,
  classes: {[string]: Object},
}

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    width: '100%'
  },
  label: {
    whiteSpace: 'nowrap'
  }
});

export class SingleSelectFieldComponent extends React.Component<Props> {

  props: Props;

  selectComponent = (selectProps: Object) => {

    let { value, onChange, onFocus, onBlur, onKeyPress } = selectProps;

    /**
     * Set the default select value by the first element of the select data menu if select option is true
     */
    let placeValue = !this.props.selectFirst
      ? ''
      : this.props.data.length
        ? this.props.getValue(this.props.data[0])
        : '';

    return (
      <Select
        value={value || placeValue}
        input={<Input id={this.props.id}/>}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
      >


        { this.props.data ?
          this.props.data.map((c, i) =>
          <MenuItem key={this.props.getValue(c) + i} value={this.props.getValue(c)}>
            {this.props.getLabel(c)}
          </MenuItem>
          ) : (
           <MenuItem value=''>
            {this.props.label}
          </MenuItem>
          )}

      </Select>
    )
  };

  render() {
    let { id, label, formProps, showErrors, showHelperText, helperText, messages, classes } = this.props;

    return (
      <FormControl
        id={id} className={classes.formControl}
        error={!formProps.valid && formProps.touched}
        disabled={this.props.disabled}
        required={this.props.required}
      >
        <InputLabel className={classes.label} htmlFor={id}>{label}</InputLabel>

        <Control
          model={`.${id}`}
          component={this.selectComponent}
          validators={this.props.validators}
          onChange={this.props.onChange}
        />

        {showHelperText &&
        formProps.pristine &&
        !formProps.touched &&
        <FormHelperText>{helperText}</FormHelperText>}

        { showErrors &&
        <Errors
          model={`.${id}`}
          show="touched"
          wrapper={ErrorWrapper}
          messages={{
            ...messages,
          }}
        />}

      </FormControl>
    )
  };
}


SingleSelectFieldComponent.defaultProps = {
  messages: {},
  showErrors: true,
  showHelperText: true,
  disabled: false,
  required: false,
  selectFirst: false,
  data: [],
};


SingleSelectFieldComponent.propTypes = {
  id: PropTypes.string.isRequired,
  //data: PropTypes.arrayOf(PropTypes.object).isRequired,
  getValue: PropTypes.func.isRequired,
  getLabel: PropTypes.func.isRequired,
};



export default withStyles(styles)(SingleSelectFieldComponent);