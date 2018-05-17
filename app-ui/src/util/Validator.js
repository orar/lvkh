// @flow
/* eslint-disable import/prefer-default-export */
import { isEmail as validEmail, isMobilePhone , isEmpty} from 'validator';

/**
 * All functions written are used for RRF control validations with react-bootstrap
 *
 */


export const isRequired = {
  validator: (val: string): boolean => isEmpty(val),
  message: 'This field is required',
};

export const isDefined = {
  validator: (val: string): boolean => !!val,
  message: 'This field is required',
};



export const isNumber = {
  validator: (val: number): boolean => (typeof val === 'number' && Number(val) > 0),
  message: 'Enter a valid number'
};


export const isWithinLength = (low: number, high: number) => ({
  validator: (val: string) => !val || val.length >= low && val.length <= high,
  message: (subject: string) => `${subject} should be within ${low} to ${high} characters`,
});

export const isWithinRange = (low: number, high: number) => ({
  validator: (val: string) => !val || Number(val) >= low && Number(val) <= high,
  message: (subject: string) => `${subject} should be within ${low} to ${high}`,
});

export const isEmail = {
  validator: (val: string) => !val || validEmail(val),
  message: 'Enter a valid email'
};

export const isPhone = {
  validator: (val: string) => !!val && isMobilePhone(val, 'any'),
  message: 'Enter a valid phone number'
};


//TODO: Internationalization of phone number regex
export const isEmailOrPhone = {
  validator: (val: string): boolean => !val || val.match(/^([a-zA-Z0-9\._-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$|^(0(24|54|55|20|50|26|56|27|57|23)[0-9]{7})$/ig),
  message: 'Enter a valid email or phone number'
};


export const isEmailOrFone = ({
  validator: (val: string): boolean => !val || (validEmail(val) || isMobilePhone(val, 'any')),
  message: 'Enter valid email or phone number',
});

export const maxLength = (length: number) => ({
  validator:  (val: string) => !val || val.length <= length,
  message: `Enter less than ${length} characters`
});


export const maxNumber = (max: number) => ({
  validator: (val: number) => !!val && Number(val) <= max,
  message: `Enter maximum of ${max}`,
});

export const minNumber = (min: number) => ({
  validator: (val: number) => !!val && Number(val) <= min,
  message: `Enter a minimum of ${min}`,
});

export const minAmount = (amount: number, currency: string) => ({
  validator: (val: number) => !!val && Number(val) >= amount,
  message: `Enter a minimum of ${currency.toUpperCase()} ${amount}`,
});

/*
export const lessMax = (qty: FormProp) => (val) => {
  return !!val && qty.valid && Number(val) > 0 && Number(val) < parseInt(qty.value)
};
*/

export const providerState = (feild: FormProp) => {
  return !feild.touched ? null : feild.value !== 's' && feild.valid ? 'success' : 'error'
};

export const providerLimit = (qty, price, bal) => {
  return price * Number(qty.value) <= bal
};

export const providerRequired = (qty, price, bal) => (val) => {
  return providerLimit(qty, price, bal) ? true : isRequired(val);
};
