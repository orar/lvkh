// @flow
import React from 'react';
import { Input, Select} from 'antd';
import type { FormProps } from "../../util/Form";
import { Control, Errors } from 'react-redux-form';
import Label from './Label';
import HelperText from './HelperText';
import ErrorText from './HelperText/ErrorText';
import { Trans } from 'lingui-react';
import {HelperWrapper} from "../../util/Form";


const Option = Select.Option;

type Props = {
  id: string,
  formProps: FormProps,
  label: string,
  data: Array<Object>,
  disabled: boolean,
  selectFirst: boolean,
  helperText: string,
  showErrors: boolean,
  showHelperText: boolean,
  readOnly: boolean,
  i18n: Object,
  validators: { [string]: (string) => boolean },
  messages: { [string]: string },

  compact: boolean,
  onChange?: (evt: Object) => any,
  getValue: (o: Object) => any,
  getLabel: (o: Object) => string,
  disableIf: (o: Object) => boolean,
  style: Object
}

export class SelectInputFieldComponent extends React.Component<Props> {
  props: Props;

  //TODO: Apply validation errors on Option element instead of Select element
  renderSelectInput = ({name, value, onChange, onFocus, onKeyPress}) => {
    const { data, selectFirst, disabled, getValue, getLabel, disableIf, style } = this.props;
    const defaultValue = !!value ? value : selectFirst ? getValue(data[0]) : '';
    return (
      <Select
        id={name}
        defaultValue={defaultValue}
        style={style}
        onChange={onChange}
        onFocus={onFocus}
        onKeyPress={onKeyPress}
      >
        { data.map(d =>
          <Option value={getValue(d)} disabled={disableIf(d)} > {getLabel(d)}</Option>
        )}
      </Select>
    );
  };

  render() {

    const {
      id,
      label,
      formProps,
      helperText,
      validators,
      messages,
      showErrors,
      showHelperText,
      onChange,
      compact
    } = this.props;

    return (

      <InputGroup
        compact={compact}
      >
        {!!label && <Label htmlFor={`.${id}`}><Trans>{label}{required ? '*' : ''}</Trans></Label>}
        <Control
          model={`.${id}`}
          component={this.renderSelectInput}
          validators={validators}
          onChange={onChange}
        />
        {showHelperText &&
        formProps.pristine &&
        !formProps.touched &&
        <HelperText>{helperText}</HelperText>
        }
        <Errors
          show={field => field.touched && showErrors}
          model={`.${id}`}
          wrapper={HelperWrapper}
          messages={messages}
        />
      </InputGroup>
    );
  }
}

TextInputFieldComponent.defaultProps = {
  messages: {},
  showErrors: true,
  showHelperText: true,
  readOnly: false,
  compact: false,
  required: false,
};


export default TextInputFieldComponent