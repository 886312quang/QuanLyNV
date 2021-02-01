import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../routes/CustomLoader/Spinner";
import actions from "../../../_actions/branch";
import selectors from "../../../_selectors/branch";
import FormWrapper, {
  formItemLayout,
  tailFormItemLayout,
} from "../../shared/styles/FormWrapper";
import { getHistory } from "../../../configs/configureStore";

const FormComp = ({ match, form }) => {
  const dispatch = useDispatch();
  //Selectors
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
      form.resetFields();
    }
  };

  const back = () => {
    return getHistory().goBack();
  };

  useEffect(() => {
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
          <Form.Item label="Tên chi nhánh">
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
                  message: "Vui lòng nhập tên chi nhánh",
                },
              ],
            })(<Input type="text" placeholder="Tên chi nhánh" />)}
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
