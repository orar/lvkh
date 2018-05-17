// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withI18n, Trans } from 'lingui-react';
import {withStyles } from 'material-ui/styles';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { Control, Errors } from 'react-redux-form';
import {ErrorWrapper} from "../../util/Form";
import purple from 'material-ui/colors/purple';

type Props = {
  id: string,
  min: number,
  max: number,
  label: string,
  formProps: Object,
  helperText: string,

  disabled: boolean,
  showErrors: boolean,
  showHelperText: boolean,
  required: boolean,
  readOnly: boolean,

  validators: { [string]: (string) => boolean },
  messages: { [string]: string },
  classes: {[string]: Object},

  onChange?: (evt: Object) => any,

}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%',
    //boxSizing: 'border-box',
  },
  inputLabelFocused: {
    color: purple[500],
  },
  inputInkbar: {
    '&:after': {
      backgroundColor: purple[500],
    },
  },
  /* textFieldRoot: {
     padding: 0,
     'label + &': {
       marginTop: theme.spacing.unit * 3,
     },
   },
   textFieldInput: {
     borderRadius: 4,
     background: theme.palette.common.white,
     border: '1px solid #ced4da',
     fontSize: 16,
     padding: '10px 12px',
     width: 'calc(100% - 24px)',
     transition: theme.transitions.create(['border-color', 'box-shadow']),
     '&:focus': {
       borderColor: '#80bdff',
       boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
     },
   },
   textFieldFormLabel: {
     fontSize: 18,
   },*/
});

/*
 //required={required}



 */


export const NumberInputFieldComponent = ({
                                            id,
                                            min,
                                            max,
                                            label,
                                            formProps,
                                            helperText,
                                            disabled,
                                            validators,
                                            classes,
                                            showErrors,
                                            showHelperText,
                                            required,
                                            readOnly,
                                            messages,
                                            onChange }: Props) => (

  <FormControl
    className={classes.formControl}
    error={!formProps.valid && formProps.touched}
    disabled={disabled}
    required={required}
    readOnly={readOnly}
  >
    <InputLabel htmlFor={`.${id}`}><Trans>{label}</Trans></InputLabel>

    <Control
      model={`.${id}`}
      type="number"
      component={Input}
      controlProps={{min, max}}
      validators={validators}
      mapProps={{fullWidth: true}}
      onChange={onChange}
    />

    { showHelperText &&
    formProps.pristine &&
    !formProps.touched &&
    <FormHelperText>{helperText}</FormHelperText>
    }

    <Errors
      show={field => field.touched && showErrors}
      model={`.${id}`}
      wrapper={ErrorWrapper}
      messages={{
        //...defaultMessages(i18n),
        ...messages,
      }}
    />

  </FormControl>
);

NumberInputFieldComponent.defaultProps = {
  messages: {},
  showErrors: true,
  showHelperText: true,
  readOnly: false,
};


NumberInputFieldComponent.propTypes = {
  id: PropTypes.string.isRequired,
  formProps: PropTypes.object.isRequired
};


export default withStyles(styles)(NumberInputFieldComponent);