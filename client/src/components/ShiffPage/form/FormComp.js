import { Button, DatePicker, Form, InputNumber, Select } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../routes/CustomLoader/Spinner";
import branchActions from "../../../_actions/branch";
import actions from "../../../_actions/shift";
import branchSelectors from "../../../_selectors/branch";
import selectors from "../../../_selectors/shift";
import FormWrapper, {
  formItemLayout,
  tailFormItemLayout,
} from "../../shared/styles/FormWrapper";
import { getHistory } from "../../../configs/configureStore";

const { Option } = Select;

const FormComp = ({ match, form }) => {
  const dispatch = useDispatch();
  const branchs = useSelector(branchSelectors.selectBranchs);

  const saveLoading = useSelector(selectors.selectSaveLoading);
  const dataLoading = useSelector(selectors.selectDataLoading);
  const record = useSelector(selectors.selectRecord);
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
    return getHistory().goBack();
  };

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
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                {record["id"]}
              </span>
            </Form.Item>
          )}
          <Form.Item label="Thời gian">
            {form.getFieldDecorator("date", {
              initialValue:
                isEditing() && record
                  ? moment(record["date"])
                  : moment(new Date()),
              rules: [
                {
                  required: true,
                  message: "Vui lòng chọn thời gian",
                },
              ],
            })(
              <DatePicker
                style={{ width: "100%" }}
                placeholder="Chọn thời gian"
                allowClear={false}
              />,
            )}
          </Form.Item>
          <Form.Item label="Chi nhánh">
            {form.getFieldDecorator("branch", {
              initialValue: isEditing() && record ? record["branch"]._id : null,
              rules: [
                {
                  required: true,
                  message: "Vui lòng chọn chi nhánh",
                },
              ],
            })(
              <Select placeholder="Chọn chi nhánh">
                {branchs.map((branch, key) => (
                  <Option key={branch.id} value={branch.id}>
                    {branch.name}
                  </Option>
                ))}
              </Select>,
            )}
          </Form.Item>
          {isEditing() && record && (
            <>
              <Form.Item label="Tiền mặt (admin)">
                {form.getFieldDecorator("adminCash", {
                  initialValue:
                    isEditing() && record ? record["adminCash"] : null,
                })(
                  <InputNumber
                    placeholder="Tiền mặt"
                    style={{ width: "100%" }}
                  />,
                )}
              </Form.Item>
              <Form.Item label="Certificate (admin)">
                {form.getFieldDecorator("adminCertificate", {
                  initialValue:
                    isEditing() && record ? record["adminCertificate"] : null,
                })(
                  <InputNumber
                    placeholder="Certificate"
                    style={{ width: "100%" }}
                  />,
                )}
              </Form.Item>
            </>
          )}
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
