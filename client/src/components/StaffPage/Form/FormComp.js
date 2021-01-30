import { Button, Form, Input, Radio, Select } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import branchActions from "../../../_actions/branch";
import actions from "../../../_actions/staff";
import branchSelectors from "../../../_selectors/branch";
import selectors from "../../../_selectors/staff";
import Spinner from "../../../routes/CustomLoader/Spinner";
import FormWrapper, {
  formItemLayout,
  tailFormItemLayout,
} from "../../shared/styles/FormWrapper";
import { getHistory } from "../../../configs/configureStore";

const { Option } = Select;

const FormComp = ({ match, form }) => {
  const dispatch = useDispatch();
  // Selector
  const saveLoading = useSelector(selectors.selectSaveLoading);
  const dataLoading = useSelector(selectors.selectDataLoading);
  const record = useSelector(selectors.selectRecord);
  const branchs = useSelector(branchSelectors.selectBranchs);

  let isEditing = () => {
    return !!match.params.id;
  };

  let doSubmit = (values) => {
    if (isEditing()) {
      dispatch(actions.doUpdate(record.id, values));
    } else {
      dispatch(actions.doCreate(values));
    }
  };

  const back = () => {
    return getHistory().push("/");
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

  useEffect(() => {
    dispatch(branchActions.list());
    if (isEditing()) {
      dispatch(actions.doFind(match.params.id));
    }
  }, []);

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
              <span style={{ fontWeight: "bold" }}>{record["id"]}</span>
            </Form.Item>
          )}
          <Form.Item label="Tên nhân viên">
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
                  message: "Vui lòng nhập tên nhân viên",
                },
              ],
            })(<Input type="text" placeholder="Tên nhân viên" />)}
          </Form.Item>
          <Form.Item label="Tên nhân viên (tiếng nga)">
            {form.getFieldDecorator("runame", {
              initialValue: isEditing() && record ? record["runame"] : null,
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
                  message: "Vui lòng nhập tên nhân viên (tiếng nga)",
                },
              ],
            })(<Input type="text" placeholder="Tên nhân viên (tiếng nga)" />)}
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
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
              >
                {branchs.map((branch, key) => (
                  <Option key={branch.id} value={branch.id}>
                    {branch.name}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            {form.getFieldDecorator("career", {
              initialValue:
                isEditing() && record ? record["career"] : "masseur",
            })(
              <Radio.Group>
                <Radio value="masseur">Mát xa viên</Radio>
                <Radio value="sauna">Nhân viên phòng xông</Radio>
              </Radio.Group>,
            )}
          </Form.Item>
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
