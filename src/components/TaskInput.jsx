import React from "react";
import InputModal from "./InputModal";

const TaskInput = (props) => {
  return (
    <div>
      <InputModal
        show={props.show}
        onHide={props.onHide}
        data={props.edit ? props.data : null}
        edit={props.edit}
        index={props.index}
      />
    </div>
  );
};

export default TaskInput;
