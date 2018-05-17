// @flow
import React from 'react';
import type { Node } from 'react';
import { Card, Icon, Grid, Tooltip, Divider, Form, Button, Input, Radio, InputNumber, Select, Checkbox } from 'antd';
import type { Form as FormType } from 'antd';
import Edit from './Edit';
import type {UserProfile} from "../../modules/Profile/ProfileModule";
import isEmpty from 'lodash/isEmpty';
import './Profile.scss';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

type Props = {
  data: UserProfile,
  form: FormType,
  onGetProfile: () => any,
  onCommitProfile: (data: UserProfile) => any,
}


/*
*
*  id: string,
  nationalID?: string,// secure

  firstName: string,
  midName : string,
  lastName: string,
  alias: string,
  age: number,
  gender: string,
  address: string,
  city: string,
  avatar: string,
  cover: string,
  country: string,
  statusMsg: string,
  fanPlayers: Array<FanPlayer>,
  fanCountries: Array<FanCountry>,

* */

export class ProfileComponent extends React.Component<Props>  {

  props: Props;

  componentDidMount(){
    if(isEmpty(this.props.data)) {
      this.props.onGetProfile();
    }
  }

  handleSubmit = (e: SyntheticEvent<*>) => {
    e.preventDefault();
    this.props.form.validateFields((error, values) => {
      if (!error) {
        this.props.onCommitProfile(values);
      }
    });
  };


  render(){
    const { getFieldDecorator } = this.props.form;
    const { data } = this.props;

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };

    return (
      <div className="profileContainer">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Edit title="First Name">
            <div className="defaultSection">
              <span className="defaultLabel">First Name:</span>
              <span className="defaultValue">{data.firstName}</span>
            </div>
            <FormItem label="First Name" >
              {getFieldDecorator('fistName', { initialValue: data.firstName,
                rules: [{ required: true, message: 'Please enter your first name!' }],
              })(
                <Input readOnly={true} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name" />
              )}
            </FormItem>
          </Edit>

          <Edit title="Last Name">
            <div className="defaultSection">
              <span className="defaultLabel">Last Name:</span>
              <span className="defaultValue">{data.lastName}</span>
            </div>
            <FormItem label="Last Name">
              {getFieldDecorator('lastName', { initialValue: data.lastName,
                rules: [{ required: true, message: 'Please enter your last name!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name" />
              )}
            </FormItem>
          </Edit>

          <Edit title="Middle Name">
            <div className="defaultSection">
              <span className="defaultLabel">Middle Name:</span>
              <span className="defaultValue">{data.midName}</span>
            </div>
            <FormItem label="Middle Name">
              {getFieldDecorator('midName', { initialValue: data.midName,
                rules: [{ required: false, message: 'If you have any middle name?' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Middle Name" />
              )}
            </FormItem>
          </Edit>
          <Divider />
          <Edit title="Alias">
            <div className="defaultSection">
              <span className="defaultLabel">Alias:</span>
              <span className="defaultValue">{data.alias}</span>
            </div>
            <FormItem label="Alias">
              {getFieldDecorator('alias', { initialValue: data.alias,
                rules: [{ required: false, message: 'If you have any alias?' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Alias" />
              )}
            </FormItem>
          </Edit>

          <Edit title="Status Message">
            <FormItem
              {...formItemLayout}
              label="Status Message"
            >
              <span className="ant-form-text">{data.statusMsg}</span>
            </FormItem>
            <FormItem label="Status Message">
              {getFieldDecorator('alias', { initialValue: data.statusMsg,
                rules: [{ required: false }],
              })(
                <Input.TextArea placeholder="Status today?" />
              )}
            </FormItem>
          </Edit>

          <Divider />
          <Edit title="Age">
            <FormItem
              {...formItemLayout}
              label="Age"
            >
              <span className="ant-form-text">{data.age}</span>
            </FormItem>
            <FormItem label="Age">
              {getFieldDecorator('alias', { initialValue: data.age,
                rules: [{ required: false, message: 'Please enter your age?' }],
              })(
                <InputNumber prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Age" />
              )}
            </FormItem>
          </Edit>


          <Edit title="Gender">
            <FormItem
              //{...formItemLayout}
              label="Gender"
            >
              <span className="ant-form-text">{data.gender}</span>
            </FormItem>
            <FormItem
              //{...formItemLayout}
              label="Address"
            >
              {getFieldDecorator('gender', {initialValue: data.gender,
                rules: [{ required: false, message: 'Please select your gender?' }],
              })(
                <RadioGroup>
                  <RadioButton value="male">Male</RadioButton>
                  <RadioButton value="female">Female</RadioButton>
                </RadioGroup>
              )}
            </FormItem>
          </Edit>
          <Divider />

          <Edit title="Address">
            <FormItem
              //{...formItemLayout}
              label="Address"
            >
              <span className="ant-form-text">{data.address}</span>
            </FormItem>
            <FormItem  label="Address">
              {getFieldDecorator('address', { initialValue: data.address,
                rules: [{ required: false, message: 'Please enter your address?' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Age" />
              )}
            </FormItem>
          </Edit>

          <Edit title="City">
            <FormItem
              //{...formItemLayout}
              label="City"
            >
              <span className="ant-form-text">{data.city}</span>
            </FormItem>
            <FormItem  label="City">
              {getFieldDecorator('city', { initialValue: data.city,
                rules: [{ required: true, message: 'Please enter your city?' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="City" />
              )}
            </FormItem>
          </Edit>

          <Edit title="Country">
            <FormItem
              //{...formItemLayout}
              label="Country"
            >
              <span className="ant-form-text">{data.country}</span>
            </FormItem>
            <FormItem  label="Country">
              {getFieldDecorator('country', { initialValue: data.country,
                rules: [{ required: true, message: 'Please enter your country?' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Country" />
              )}
            </FormItem>
          </Edit>

          <Edit title="Identity Number">
            <FormItem
              //{...formItemLayout}
              label="Identification"
            >
              <span className="ant-form-text">{data.country}</span>
            </FormItem>
            <FormItem>
              {getFieldDecorator('nationalID', { initialValue: data.nationalID,
                rules: [{ required: true, message: 'Please enter your national identity' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" />
              )}
            </FormItem>
          </Edit>


          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Save Profile
          </Button>
        </Form>
      </div>
    )
  }
}


export default Form.create()(ProfileComponent);