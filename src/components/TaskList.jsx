import React from "react";
import Button from "react-bootstrap/Button";
import MyVerticallyCenteredModal from "./Modal";
import TaskInput from "./TaskInput";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import style from "./TaskList.module.css";
import { setTask } from "../store/task-redux";
import { useDispatch } from "react-redux";
const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
  const completedTask = tasks.filter((item) => item.completed === true);
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow1, setModalShow1] = React.useState(false);
  const [indexSet, setIndexSet] = React.useState(0);
  const [edit, setEdit] = React.useState(false);
  const date = new Date().getTime();
  const handleOpenTask = (index) => {
    setModalShow(true);
    setIndexSet(index);
  };
  const handleAddTask = () => {
    setEdit(false);
    setModalShow1(true);
  };
  const deleteConfirmhandler = (index) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(setTask.deleteTask(index));
    }
  };
  return (
    <div className={style.mainContainer}>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        data={tasks[indexSet]}
        index={indexSet}
        modal={() => setModalShow1(true)}
        setEdit={setEdit}
      />
      {modalShow1 && (
        <TaskInput
          show={modalShow1}
          onHide={() => setModalShow1(false)}
          data={tasks[indexSet]}
          index={indexSet}
          edit={edit}
        />
      )}
      <div className={style.section}>
        <Button
          onClick={() => handleAddTask()}
          className={style.button}
          style={{
            backgroundColor: "#09203F",
            border: "4px solid #0956a9",
            borderRadius: "25px",
          }}
        >
          Add Task +
        </Button>
        {tasks.map((task, index) => {
          const currtaskdate = task.date;
          const currtasktime = task.time;
          const dateTimeString = `${currtaskdate} ${currtasktime}`;
          const timestamp = new Date(dateTimeString).getTime();

          console.log(timestamp);
          if (task.completed) return null;
          return (
            <div
              className={style.container}
              key={index}
              onClick={() => handleOpenTask(index)}
            >
              <div
                style={{
                  position: "relative",
                  top: "10px",
                  left: "20rem",
                }}
              >
                <Button
                  onClick={() => deleteConfirmhandler(index)}
                  style={{
                    backgroundColor: "#09203F",
                    border: "4px solid #0956a9",
                    borderRadius: "25px",
                    boxShadow: "0px 0px 10px 5px",
                  }}
                >
                  <MdDelete />
                </Button>
              </div>
              <h1 className={style.h1} style={{ marginTop: "-1.5rem" }}>
                {task.title}
              </h1>
              <p className={style.p}>{task.description.slice(0, 20)}</p>
              {date < timestamp ? (
                <p
                  className={style.p}
                  style={{ fontSize: "1.2rem", color: "yellow" }}
                >
                  Pending
                </p>
              ) : (
                <p
                  className={style.p}
                  style={{ color: "red", fontSize: "1.2rem" }}
                >
                  Late
                </p>
              )}
            </div>
          );
        })}
        <div
          style={{
            color: "white",
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "1200",
          }}
        >
          Completed Tasks
          {completedTask.map((task, index) => {
            return (
              <div className={style.container} key={index}>
                <div
                  style={{
                    position: "relative",
                    top: "10px",
                    left: "10rem",
                  }}
                >
                  <Button
                    onClick={() => deleteConfirmhandler(index)}
                    style={{
                      backgroundColor: "#09203F",
                      border: "4px solid #0956a9",
                      borderRadius: "25px",
                      boxShadow: "0px 0px 10px 5px",
                    }}
                  >
                    <MdDelete />
                  </Button>
                </div>
                <h1 className={style.h1} style={{ marginTop: "-1.5rem" }}>
                  {task.title}
                </h1>
                <p className={style.p}>{task.description.slice(0, 20)}</p>
                <p
                  className={style.p}
                  style={{ color: "#26ff26", fontSize: "1.2rem" }}
                >
                  Completed
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
