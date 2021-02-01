import { Button, Divider, Form, Input, Select } from "antd";
import React, { Children, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../_actions/service";
import selectors from "../../../_selectors/service";
import branchSelectors from "../../../_selectors/branch";
import Spinner from "../../../routes/CustomLoader/Spinner";
import FormWrapper, {
  formItemLayout,
  tailFormItemLayout,
} from "../../shared/styles/FormWrapper";
import { getHistory } from "../../../configs/configureStore";
import DynamicFormItem from "./DynamicFormItem";

const { Option } = Select;

const FormComp = ({ match, form }) => {
  let isEditing = () => {
    return !!match.params.id;
  };
  const dispatch = useDispatch();
  const saveLoading = useSelector(selectors.selectSaveLoading);
  const dataLoading = useSelector(selectors.selectDataLoading);
  const record = useSelector(selectors.selectRecord);
  const branchs = useSelector(branchSelectors.selectBranchs);
  const [serviceItems, setServiceItems] = useState([]);

  let doSubmit = (values) => {
    values.items = serviceItems;
    if (isEditing()) {
      dispatch(actions.doUpdate(record.id, values));
    } else {
      dispatch(actions.doCreate(values));
    }
  };

  const onServiceItemsChange = (values) => {
    setServiceItems(values);
  };

  const back = () => {
    return getHistory().goBack();
  };

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  let renderForm = () => {
    return (
      <FormWrapper>
        <Form
          {...formItemLayout}
          onSubmit={(e) => {
            e.preventDefault();
            form.validateFields((err, values) => {
              if (!err) {
                doSubmit(values);
              }
            });
          }}
        >
          {isEditing() && record && (
            <Form.Item label="ID">
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {record["id"]}
              </span>
            </Form.Item>
          )}
          <Form.Item label="Code dịch vụ">
            {form.getFieldDecorator("code", {
              initialValue: isEditing() && record ? record["code"] : null,
              rules: [
                {
                  min: 1,
                  message: "Ít nhất 3 kí tự",
                },
                {
                  max: 128,
                  message: "Nhiều nhất 128 kí tự",
                },
                {
                  required: true,
                  message: "Vui lòng nhập code dịch vụ",
                },
              ],
            })(<Input type="text" placeholder="Mã dịch vụ" />)}
          </Form.Item>
          <Form.Item label="Tên dịch vụ">
            {form.getFieldDecorator("name", {
              initialValue: isEditing() && record ? record["name"] : null,
              rules: [
                {
                  min: 3,
                  message: "Ít nhất 3 kí tự",
                },
                {
                  max: 128,
                  message: "Nhiều nhất 128 kí tự",
                },
                {
                  required: true,
                  message: "Vui lòng nhập tên dịch vụ",
                },
              ],
            })(<Input type="text" placeholder="Tên dịch vụ" />)}
          </Form.Item>
          <Form.Item label="Chi nhánh" hasFeedback>
            {form.getFieldDecorator("branch", {
              initialValue: isEditing() && record ? record["branch"]._id : null,
              rules: [
                {
                  required: true,
                  message: "Vui lòng chọn chi nhánh",
                },
              ],
            })(
              <Select
                showSearch
                placeholder="Chọn chi nhánh"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                optionFilterProp="children"
              >
                {branchs.map((branch, key) => (
                  <Option key={branch.id} value={branch.id}>
                    {branch.name}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>
          <Divider>Dịch vụ</Divider>

          <DynamicFormItem
            match={match}
            onChange={onServiceItemsChange}
            initialValue={isEditing() ? record.items : null}
          />

          <Divider />

          <Form.Item className="form-buttons" {...tailFormItemLayout}>
            <Button
              loading={saveLoading}
              type="primary"
              htmlType="submit"
              icon="save"
            >
              Lưu
            </Button>

            <Button
              disabled={saveLoading}
              onClick={() => form.resetFields()}
              icon="undo"
            >
              Reset
            </Button>
            <Button onClick={back}>Quay lại</Button>
          </Form.Item>
        </Form>
      </FormWrapper>
    );
  };

  if (dataLoading) {
    return <Spinner />;
  }

  if (isEditing() && !record) {
    return <Spinner />;
  }
  return renderForm();
};

export default Form.create()(FormComp);
