import { Button, Checkbox, Divider, Drawer } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../_actions/note";
import selectors from "../../../_selectors/note";
import ListToolbar from "./ListToolbar";
import Spinner from "../../../routes/CustomLoader/Spinner";

const NoteDrawer = () => {
  const dispatch = useDispatch();

  const visible = useSelector(selectors.selectVisible);
  const notes = useSelector(selectors.selectNotes);
  const dataLoading = useSelector(selectors.selectDataLoading);
  const [drawerWidth, setDrawerWidth] = useState("576");

  let toggleMenuOnResize = () => {
    window.innerWidth < 576 ? setDrawerWidth("100%") : setDrawerWidth("576");
  };

  useEffect(() => {
    dispatch(actions.list({ limit: 6, skip: 0 }));
    toggleMenuOnResize();
    window.addEventListener("resize", toggleMenuOnResize);
    return () => {
      window.removeEventListener("resize", toggleMenuOnResize);
    };
  }, []);

  const handleCheckedChange = (note) => {
    dispatch(actions.doUpdate(note.id, { isRead: !note.isRead }));
  };

  const renderNote = (note, key) => {
    return (
      <div key={key}>
        <Checkbox
          style={{
            margin: "0px 5px",
            padding: "0",
            fontSize: "16px",
            width: "100%",
          }}
          checked={note.isRead}
          onChange={() => handleCheckedChange(note)}
        >
          {note.isRead ? (
            <Text delete>{note.content}</Text>
          ) : (
            <Text>{note.content}</Text>
          )}
        </Checkbox>
        <Divider />
      </div>
    );
  };

  return (
    <Drawer
      title="Ghi chú"
      placement="right"
      width={drawerWidth}
      closable={true}
      onClose={() => dispatch(actions.doToggle())}
      visible={visible}
    >
      <ListToolbar />
      {notes.map((note, key) => renderNote(note, key))}
      <div style={{ textAlign: "center" }}>
        <Button
          type="link"
          onClick={() => dispatch(actions.readmore({ skip: notes.length }))}
          loading={dataLoading}
        >
          Xem thêm
        </Button>
      </div>
    </Drawer>
  );
};

export default NoteDrawer;
