import { Button, Col, DatePicker, Form, Row, Select } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import branchActions from "../../../_actions/branch";
import branchSelectors from "../../../_selectors/branch";
import FilterWrapper, {
    formItemLayout
} from "../../shared/styles/FilterWrapper";
import actions from "../../../_actions/ledgerPublic";
import selectors from "../../../_selectors/ledgerPublic";

const { Option } = Select;
const dayFormat = "YYYY/MM/DD";
const ListFilter = ({ form }) => {
  const dispatch = useDispatch();
  const branchs = useSelector(branchSelectors.selectBranchs);
  const dataLoading = useSelector(selectors.selectDataLoading);

  let doSubmit = (values) => {
    dispatch(
      actions.list(
        { ...values, date: moment(values.date).format("x") },
        branchs,
      ),
    );
  };

  let disabledDate = (current) => {
    // Can not select days last month and next month
    return (
      (current && current > moment().endOf("month").subtract(1, "day")) ||
      (current && current < moment().startOf("month"))
    );
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
                initialValue: moment(new Date(), dayFormat),
                rules: [
                  {
                    required: true,
                    message: "Vui lòng chọn thời gian",
                  },
                ],
              })(
                <DatePicker
                  disabledDate={disabledDate}
                  style={{ width: "100%" }}
                  placeholder="Chọn ngày"
                  allowClear={false}
                />,
              )}
            </Form.Item>
          </Col>
          <Col md={24} lg={12}>
            <Form.Item label="Chi nhánh">
              {form.getFieldDecorator("branch", {
                initialValue: null,
                rules: [
                  {
                    required: true,
                    message: "Vui lòng chọn chi nhánh",
                  },
                ],
                // branchs && branchs[0] ? branchs[0].id : null
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
          <Col className="filter-buttons" span={24}>
            <Button
              loading={dataLoading}
              icon="search"
              type="primary"
              htmlType="submit"
            >
              Tìm kiếm
            </Button>
          </Col>
        </Row>
      </Form>
    </FilterWrapper>
  );
};

export default Form.create()(ListFilter);
