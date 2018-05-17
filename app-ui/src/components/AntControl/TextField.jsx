// @flow
import React from 'react';
import { Input } from 'antd';
import type { FormProps } from "../../util/Form";
import { Control, Errors } from 'react-redux-form';
import Label from './Label';
import HelperText from './HelperText';
import ErrorText from './HelperText/ErrorText';
import { Trans } from 'lingui-react';
import {ErrorWrapper} from "../../util/Form";



const InputGroup = Input.Group;

type Props = {
  id: string,
  formProps: FormProps,
  label?: string,
  placeholder: string,
  disabled?: boolean,
  required?: boolean,
  helperText?: string,
  showErrors?: boolean,
  showHelperText?: boolean,
  readOnly?: boolean,
  i18n?: Object,
  validators: { [string]: (string) => boolean },
  messages: { [string]: string },

  compact?: boolean,
  onChange?: (evt: Object) => any,

}

export const TextInputFieldComponent = ({
                                          id,
                                          label,
                                          placeholder,
                                          formProps,
                                          helperText,
                                          disabled,
                                          validators,
                                          messages,
                                          showErrors,
                                          showHelperText,
                                          required,
                                          readOnly,
                                          onChange,
                                          compact }: Props) => (

  <InputGroup
    compact={compact}
  >

    {!!label && <Label htmlFor={`.${id}`}><Trans>{label}{required ? '*' : ''}</Trans></Label>}
    <Control
      model={`.${id}`}
      type="text"
      placeholder={placeholder}
      component={Input}
      validators={validators}
      onChange={onChange}
    />
    { showHelperText &&
    formProps.pristine &&
    !formProps.touched &&
    <HelperText>{helperText}</HelperText>
    }
    <Errors
      show={field => field.touched && showErrors}
      model={`.${id}`}
      wrapper={ErrorWrapper}
      messages={messages}
    />
  </InputGroup>
);

TextInputFieldComponent.defaultProps = {
  messages: {},
  showErrors: true,
  showHelperText: true,
  readOnly: false,
  compact: false,
  required: false,
};


export default TextInputFieldComponent;