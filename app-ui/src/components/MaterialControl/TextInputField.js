// @flow

import React from 'react';
import { withI18n, Trans } from 'lingui-react';
import {withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { Control, Errors } from 'react-redux-form';
import {ErrorWrapper} from "../../util/Form";
import purple from 'material-ui/colors/purple';

type Props = {
  id: string,
  label: string,
  placeHolder: string,
  disabled: boolean,
  formProps: Object,
  helperText: string,
  classes: {[string]: Object},
  showErrors: boolean,
  showHelperText: boolean,
  required: boolean,
  readOnly: boolean,
  multiline: boolean,
  i18n: Object,
  validators: { [string]: (string) => boolean },
  messages: { [string]: string },

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


export const defaultMessages: (i18n: Object) => { [string]: string } = i18n => ({
  isRequired: i18n.t`This field is required`,
  isEmail: i18n.t`Valid email required`,
  isEmailOrPhone: i18n.t`Valid email or phone number required`,
  providerRequired: i18n.t`Select provider to top up your balance`,
  allowance: i18n.t`You can't buy more`
});


export const TextInputFieldComponent = ({
                                          id,
                                          label,
                                          placeHolder,
                                          formProps,
                                          helperText,
                                          disabled,
                                          validators,
                                          classes,
                                          showErrors,
                                          showHelperText,
                                          required,
                                          readOnly,
                                          multiline,
                                          i18n,
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
      type="text"
      placeholder={placeHolder}
      component={Input}
      validators={validators}
      mapProps={{fullWidth: true }}
      controlProps={{ multiline }}
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

TextInputFieldComponent.defaultProps = {
  messages: {},
  showErrors: true,
  showHelperText: true,
  readOnly: false,
  multiline: false
};

//const translated = withI18n()();

export default withStyles(styles)(TextInputFieldComponent);