import React from "react";
import { Button, Form, Input, Typography, Row } from "antd";
import { Eye, Mail, Triangle } from "react-feather";
import { Link } from "react-router-dom";
import styles from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../_actions/signin";
import selectors from "../../_selectors/signin";

const FormItem = Form.Item;
const { Text } = Typography;
const Content = styles.div`    
    max-width: 400px;
    z-index: 2;
    min-width: 300px;
`;

const Signin = ({ form }) => {
  const dispatch = useDispatch();

  const doSubmit = ({ username, password }) => {
    dispatch(actions.doSignin(username, password));
  };
  return (
    <Row
      type="flex"
      align="middle"
      justify="center"
      className="px-3 bg-white mh-page"
      style={{ minHeight: "100vh" }}
    >
      <Content>
        <div className="text-center mb-5">
          <Link to="/signin">
            <span className="brand mr-0">
              <Triangle size={32} strokeWidth={1} />
            </span>
          </Link>
          <h5 className="mb-0 mt-3">Đăng nhập</h5>

          <p className="text-muted">
            Hãy bắt đầu với những điều tuyệt vời nhất
          </p>
        </div>
        .
        <Form
          layout="vertical"
          onSubmit={(e) => {
            e.preventDefault();
            form.validateFields((err, values) => {
              if (!err) {
                doSubmit(values);
              }
            });
          }}
        >
          <FormItem label="Tên người dùng">
            {form.getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  message: "Vui lòng nhập tên người dùng",
                },
              ],
            })(
              <Input
                prefix={
                  <Mail
                    size={16}
                    strokeWidth={1}
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                type="text"
                placeholder="Tên người dùng"
              />,
            )}
          </FormItem>

          <FormItem label="Mật khẩu">
            {form.getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu",
                },
              ],
            })(
              <Input
                prefix={
                  <Eye
                    size={16}
                    strokeWidth={1}
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                type="password"
                placeholder="Mật khẩu"
              />,
            )}
          </FormItem>

          <FormItem>
            <Button
              loading={useSelector(selectors.selectLoading)}
              type="primary"
              htmlType="submit"
              block
              className="mt-3"
            >
              Đăng nhập
            </Button>
          </FormItem>
        </Form>
      </Content>
    </Row>
  );
};

export default Form.create()(Signin);
