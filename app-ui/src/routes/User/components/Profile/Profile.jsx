// @flow
import React from 'react';
import type { Node } from 'react';
import { Card, Icon, Grid, Tooltip, Divider, Form, Button, Input, Radio, InputNumber, Select, Checkbox } from 'antd';
import type { Form as FormType } from 'antd';
import Edit from './Edit';
import type {UserProfile} from "../../modules/Profile/ProfileModule";
import isEmpty from 'lodash/isEmpty';
import theme from '../../../../util/Theme';
import './Profile.scss';

const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

type Props = {
  data: UserProfile,
  form: FormType,
  request: Object,
  onGetProfile: () => any,
  onCommitProfile: (data: UserProfile) => any,
  onResetRequest: () => any,
}

type State = {
  edit: boolean,
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

export class ProfileComponent extends React.Component<Props, State>  {

  props: Props;

  state: State = { edit: false };

  componentDidMount(){
    if(isEmpty(this.props.data)) {
      this.props.onGetProfile();
    }
  }

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
    this.props.onResetRequest();
  };

  handleSubmit = (e: SyntheticEvent<*>) => {
    e.preventDefault();
    this.props.form.validateFields((error, values) => {
      if (!error) {
       console.log(values);
        this.props.onCommitProfile(values);
        this.toggleEdit();

      }
    });
  };


  render(){
    const { getFieldDecorator } = this.props.form;
    const { data, request } = this.props;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
    };

    const border = this.state.edit ? '1px solid #d9d9d9' : 'none';
    const readOnly = !this.state.edit;

    return (
      <div className="profileContainer">
        <Card
          className="profileCard"
          extra={ <span onClick={this.toggleEdit}  style={{ cursor: 'pointer', color: theme.linkBlue}} >
                <Tooltip title="Edit Profile">
                  Edit <Icon style={{ cursor: 'pointer' }}type="edit"/>
                </Tooltip>
              </span>}
          title={
            <div style={{fontSize: 20, textAlign: 'center'}}>
              Profile
            </div>
          } >
          <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem {...formItemLayout} label="First Name" >
                  {getFieldDecorator('fistName', { initialValue: data.firstName,
                    rules: [{ required: true, message: 'Please enter your first name!' }],
                  })(
                    <Input readOnly={readOnly} style={{ border: border }} placeholder="First Name" />
                  )}
                </FormItem>

                <FormItem {...formItemLayout} label="Last Name">
                  {getFieldDecorator('lastName', { initialValue: data.lastName,
                    rules: [{ required: true, message: 'Please enter your last name!' }],
                  })(
                    <Input readOnly={readOnly} style={{ border: border }} placeholder="Last Name" />
                  )}
                </FormItem>

                <FormItem {...formItemLayout} label="Middle Name">
                  {getFieldDecorator('midName', { initialValue: data.midName,
                    rules: [{ required: false, message: 'If you have any middle name?' }],
                  })(
                    <Input readOnly={readOnly} style={{ border: border }} placeholder="Middle Name" />
                  )}
                </FormItem>

            <Divider />

              <FormItem {...formItemLayout} label="Alias">
                {getFieldDecorator('alias', { initialValue: data.alias,
                  rules: [{ required: false, message: 'If you have any alias?' }],
                })(
                  <Input readOnly={readOnly} style={{ border: border }} placeholder="Alias" />
                )}
              </FormItem>


              <FormItem {...formItemLayout} label="Status Message">
                {getFieldDecorator('statusMsg', { initialValue: data.statusMsg,
                  rules: [{ required: false }],
                })(
                  <Input.TextArea readOnly={readOnly} style={{ border: border }} placeholder="Status today?" />
                )}
              </FormItem>

            <Divider />

              <FormItem {...formItemLayout} label="Age">
                {getFieldDecorator('age', { initialValue: data.age,
                  rules: [{ required: false, message: 'Please enter your age?' }],
                })(
                  <InputNumber readOnly={readOnly} style={{ border: border }} placeholder="Age" />
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="Gender" >
                {getFieldDecorator('gender', {initialValue: data.gender || 'male',
                  rules: [{ required: false, message: 'Please select your gender?' }],
                })(
                  <RadioGroup readOnly={readOnly}>
                    <RadioButton value="male">Male</RadioButton>
                    <RadioButton value="female">Female</RadioButton>
                  </RadioGroup>
                )}
              </FormItem>

            <Divider />

             {/*<FormItem>
              {getFieldDecorator('phone')(
                 <Phone
              placeholder="Phone number"
              value={ this.state.value }
              />
              )}
            </FormItem>*/}

            <FormItem  {...formItemLayout} label="Identification">
              {getFieldDecorator('nationalID', { initialValue: data.nationalID,
                rules: [{ required: false, message: 'Please enter your national identity' }],
              })(
                <Input readOnly={readOnly} style={{ border: border }} placeholder="Identification Number" />
              )}
            </FormItem>

            <Divider />


              <FormItem  {...formItemLayout} label="Address">
                {getFieldDecorator('address', { initialValue: data.address,
                  rules: [{ required: false, message: 'Please enter your address?' }],
                })(
                  <Input readOnly={readOnly} style={{ border: border }} placeholder="Address" />
                )}
              </FormItem>



              <FormItem {...formItemLayout} label="City">
                {getFieldDecorator('city', { initialValue: data.city,
                  rules: [{ required: true, message: 'Please enter your city?' }],
                })(
                  <Input readOnly={readOnly} style={{ border: border }} placeholder="City" />
                )}
              </FormItem>

              <FormItem {...formItemLayout}  label="Country">
                {getFieldDecorator('country', { initialValue: data.country,
                  rules: [{ required: true, message: 'Please enter your country?' }],
                })(
                  <Input readOnly={readOnly} style={{ border: border }} placeholder="Country" />
                )}
              </FormItem>


            {this.state.edit &&
            <Button
              htmlType="submit"
              type="primary"
              style={{ width: '100%' }}
              loading={request.isPending}
              icon={request.isSuccess ? <Icon type="check" /> : request.isComplete ?  <Icon type="close" /> : null}
            >
              Save Profile
            </Button>
            }
          </Form>
        </Card>
      </div>
    )
  }
}


export default Form.create()(ProfileComponent);