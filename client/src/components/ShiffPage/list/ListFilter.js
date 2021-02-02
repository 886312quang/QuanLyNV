import { Button, Col, DatePicker, Form, Row, Select } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import branchActions from "../../../_actions/branch";
import actions from "../../../_actions/shift";
import branchSelectors from "../../../_selectors/branch";
import selectors from "../../../_selectors/shift";
import FilterWrapper, {
  formItemLayout,
} from "../../shared/styles/FilterWrapper";
import { tailFormItemLayout } from "../../shared/styles/FormWrapper";
const { Option } = Select;
const { MonthPicker } = DatePicker;

const ListFilter = ({ form }) => {
  const dispatch = useDispatch();
  const branchs = useSelector(branchSelectors.selectBranchs);
  const filter = useSelector(selectors.selectFilter);

  let doSubmit = (values) => {
    let start = moment(values.date).startOf("month").format("x");
    let end = moment(values.date).endOf("month").format("x");
    dispatch(actions.doFilterChange(values));
    dispatch(actions.list({ ...values, start, end }));
  };

  useEffect(() => {
    dispatch(branchActions.list());
  }, []);

  return (
    <FilterWrapper>
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
        <Row gutter={24}>
          <Col md={24} lg={12}>
            <Form.Item label="Thời gian">
              {form.getFieldDecorator("date", {
                initialValue: filter && filter.date ? filter.date : null,
                rules: [
                  {
                    required: true,
                    message: "Vui lòng chọn thời gian",
                  },
                ],
              })(<MonthPicker placeholder="Chọn tháng" allowClear={false} />)}
            </Form.Item>
          </Col>
          <Col md={24} lg={12}>
            <Form.Item label="Chi nhánh">
              {form.getFieldDecorator("branch", {
                initialValue: filter && filter.branch ? filter.branch : null,
              })(
                <Select placeholder="Chọn chi nhánh" allowClear={true}>
                  {branchs.map((branch, key) => (
                    <Option key={branch.id} value={branch.id}>
                      {branch.name}
                    </Option>
                  ))}
                </Select>,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item>
            <Col className="filter-buttons" span={24}>
              <Button icon="search" type="primary" htmlType="submit">
                Tìm kiếm
              </Button>
              <Button
                htmlType="reset"
                icon="undo"
                onClick={() => form.resetFields("")}
              >
                Reset
              </Button>
            </Col>
          </Form.Item>
        </Row>
      </Form>
    </FilterWrapper>
  );
};

export default Form.create()(ListFilter);
