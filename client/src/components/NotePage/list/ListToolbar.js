import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Toolbar from "../../shared/styles/Toolbar";
import actions from "../../../_actions/note";
import selectors from "../../../_selectors/note";

const InputGroup = Input.Group;
const ListToolbar = () => {
  // const dataLoading = useSelector(selectors.selectDataLoading);
  const saveLoading = useSelector(selectors.selectSaveLoading);
  const dispatch = useDispatch();
  const [note, setNote] = useState("");

  // const onReload = () => {
  //     dispatch(actions.list());
  // }

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(actions.doCreate({ content: note }));
    setNote("");
  };

  return (
    <Toolbar style={{ marginBottom: "60px" }}>
      <Form onSubmit={onSubmit}>
        <InputGroup compact>
          <Input
            style={{ width: "86%" }}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <Button
            icon="check"
            htmlType="submit"
            style={{ width: "10%" }}
            loading={saveLoading}
          ></Button>
        </InputGroup>
      </Form>
    </Toolbar>
  );
};

export default ListToolbar;
