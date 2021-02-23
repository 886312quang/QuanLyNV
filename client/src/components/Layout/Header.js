import { Avatar, Badge, Button, Dropdown, Icon, Layout, Menu } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import noteActions from "../../_actions/note";
import noteSelectors from "../../_selectors/note";
import actions from "../../_actions/layout";
import selectors from "../../_selectors/layout";
import HeaderWrapper from "./styles/HeaderWrapper";
import { getHistory } from "../../configs/configureStore";

const { Header: AntHeader } = Layout;

const Header = () => {
  const ssauth = JSON.parse(window.localStorage.getItem("ssauth"));

  const dispatch = useDispatch();
  const noteUnReadCount = useSelector(noteSelectors.selectUnReadCount);
  let doSignOut = () => {
    window.localStorage.removeItem("ssauth");
    getHistory().push("/signin");
  };

  let doNavigateToProfile = () => {
    let id = ssauth.user.id;
    getHistory().push(`/user/${id}/view`);
  };

  let doToggleMenu = () => {
    dispatch(actions.doToggleMenu());
  };

  let userMenu = (
    <Menu selectedKeys={[]}>
      <Menu.Item onClick={doNavigateToProfile} key="userCenter">
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
          <Badge count={noteUnReadCount}>
            <Button
              icon="edit"
              style={{ border: "0px" }}
              onClick={() => dispatch(noteActions.doToggle())}
            />
          </Badge>
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
