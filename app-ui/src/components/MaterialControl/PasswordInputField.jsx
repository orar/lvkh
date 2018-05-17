// @flow

import React from 'react';
import { withI18n, Trans } from 'lingui-react';
import {withStyles } from 'material-ui/styles';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { Control, Errors } from 'react-redux-form';
import {ErrorWrapper} from "../../util/Form";
import purple from 'material-ui/colors/purple';
import { Visibility, VisibilityOff } from 'material-ui-icons';
import IconButton from 'material-ui/IconButton';

type Props = {
  id: string,
  label: string,
  disabled: boolean,
  formProps: Object,
  helperText: string,
  classes: {[string]: Object},
  showErrors: boolean,
  showHelperText: boolean,
  required: boolean,
  readOnly: boolean,
  adorn: booelean,
  i18n: Object,
  validators: { [string]: (string) => boolean },
  messages: { [string]: string },

  onChange?: (evt: Object) => any,

};

type State = {
  showPassword: boolean,
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%'
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


export class PasswordInputFieldComponent extends React.Component<Props, State> {
  state: State = { showPassword: false };

  props: Props;

  toggleView = (event: Object) => {
    event.stopPropagation();
    event.preventDefault();
    this.setState({ showPassword: !this.state.showPassword });
  };

  renderAdornment = () => (
    <InputAdornment position="end">
      <IconButton
        onClick={this.toggleView}
        onMouseDown={this.toggleView}
      >
        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

  render() {
    return (
      <FormControl
        className={this.props.classes.formControl}
        error={!this.props.formProps.valid && this.props.formProps.touched}
        disabled={this.props.disabled}
        required={this.props.required}
      >

        <InputLabel htmlFor={`.${this.props.id}`}><Trans>{this.props.label}</Trans></InputLabel>

        <Control
          model={`.${this.props.id}`}
          type={this.state.showPassword ? 'text' : 'password' }
          component={Input}
          validators={this.props.validators}
          controlProps={{
            readOnly: this.props.readOnly,
            endAdornment: this.props.adorn ? this.renderAdornment() : ''
          }}
          onChange={this.props.onChange}
        />

        {this.props.showHelperText &&
         this.props.formProps.pristine &&
        !this.props.formProps.touched &&
        <FormHelperText>{this.props.helperText}</FormHelperText>
        }

        <Errors
          show={field => field.touched && this.props.showErrors}
          model={`.${this.props.id}`}
          wrapper={ErrorWrapper}
          messages={{
            //...defaultMessages(i18n),
            ...this.props.messages,
          }}
        />

      </FormControl>
    );
  }
}

PasswordInputFieldComponent.defaultProps = {
  messages: {},
  showErrors: true,
  showHelperText: true,
  readOnly: false,
  required: true,
};

//const translated = withI18n()();

export default withStyles(styles)(PasswordInputFieldComponent);