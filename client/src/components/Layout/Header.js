import { Icon, Layout, Menu, Dropdown, Avatar, Button, Badge } from "antd";
import React from "react";
import HeaderWrapper from "./styles/HeaderWrapper";
import selectors from "../../_selectors/layout";
import actions from "../../_actions/layout";
import { useDispatch, useSelector } from "react-redux";

const { Header: AntHeader } = Layout;

const Header = () => {
  const ssauth = JSON.parse(window.localStorage.getItem("ssauth"));

  const dispatch = useDispatch();

  let doSignOut = () => {
    actions.doSignOut();
  };

  let doToggleMenu = () => {
    dispatch(actions.doToggleMenu());
  };

  let userMenu = (
    <Menu selectedKeys={[]}>
      <Menu.Item key="userCenter">
        <Icon type="user" />
        Thông tin cá nhân
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={doSignOut} key="logout">
        <Icon type="logout" />
        Thoát
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderWrapper>
      <AntHeader>
        <Icon
          className="trigger"
          type={
            useSelector(selectors.selectMenuVisible)
              ? "menu-fold"
              : "menu-unfold"
          }
          onClick={doToggleMenu}
        />
        <div>
          <Dropdown className="user-dropdown" overlay={userMenu} ssauth>
            <span>
              <Avatar
                className="user-dropdown-avatar"
                size="small"
                src={undefined}
                alt="avatar"
              />
              <span className="user-dropdown-text">
                {ssauth && ssauth.user && ssauth.user.username.toUpperCase()}
              </span>
            </span>
          </Dropdown>
        </div>
      </AntHeader>
    </HeaderWrapper>
  );
};

export default Header;
