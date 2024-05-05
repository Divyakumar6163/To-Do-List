import React from "react";
import Button from "react-bootstrap/Button";
import MyVerticallyCenteredModal from "./Modal";
import TaskInput from "./TaskInput";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import style from "./TaskList.module.css";
import { setTask } from "../store/task-redux";
import { useDispatch } from "react-redux";
// let DUMMY_DATA = [
//   {
//     title: "React Project",
//     description: "Create a new project using React",
//     date: "8446590015",
//   },
//   {
//     title: "Angular Project",
//     description: "Create a new project using Angular",
//     date: "8446590015",
//   },
//   {
//     title: "Vue Project",
//     description: "Create a new project using Vue",
//     date: "8446590015",
//   },
//   {
//     title: "Svelte Project",
//     description: "Create a new project using Svelte",
//     date: "8446590015",
//   },
//   {
//     title: "Ember Project",
//     description: "Create a new project using Ember",
//     date: "8446590015",
//   },
//   {
//     title: "Backbone Project",
//     description: "Create a new project using Backbone",
//     date: "8446590015",
//   },
//   {
//     title: "Meteor Project",
//     description: "Create a new project using Meteor",
//     date: "8446590015",
//   },
//   {
//     title: "Aurelia Project",
//     description: "Create a new project using Aurelia",
//     date: "8446590015",
//   },
//   {
//     title: "Polymer Project",
//     description: "Create a new project using Polymer",
//     date: "8446590015",
//   },
//   {
//     title: "Knockout Project",
//     description: "Create a new project using Knockout",
//     date: "8446590015",
//   },
//   {
//     title: "Mithril Project",
//     description: "Create a new project using Mithril",
//     date: "8446590015",
//   },
//   {
//     title: "Preact Project",
//     description: "Create a new project using Preact",
//     date: "8446590015",
//   },
//   {
//     title: "Inferno Project",
//     description: "Create a new project using Inferno",
//     date: "8446590015",
//   },
//   {
//     title: "Elm Project",
//     description: "Create a new project using Elm",
//     date: "8446590015",
//   },
//   {
//     title: "Reason Project",
//     description: "Create a new project using Reason",
//     date: "8446590015",
//   },
//   {
//     title: "Sapper Project",
//     description: "Create a new project using Sapper",
//     date: "8446590015",
//   },
//   {
//     title: "Nuxt Project",
//     description: "Create a new project using Nuxt",
//     date: "8446590015",
//   },
// ];
const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
  const completedTask = tasks.filter((item) => item.completed == true);
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
        <Button className={style.button} onClick={() => handleAddTask()}>
          Add Task +
        </Button>
        {tasks.map((task, index) => {
          const currtaskdate = task.date;
          const currtasktime = task.time;
          const dateTimeString = `${currtaskdate} ${currtasktime}`;
          const timestamp = new Date(dateTimeString).getTime();

          console.log(timestamp);
          if (task.completed) return;
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
                  right: "10px",
                }}
              >
                <Button onClick={() => deleteConfirmhandler(index)}>
                  <MdDelete />
                </Button>
              </div>
              <h1 className={style.h1}>{task.title}</h1>
              <p className={style.p}>{task.description.slice(0, 20)}</p>
              {task?.completed ? (
                <p className={style.p}>Completed</p>
              ) : date < timestamp ? (
                <p className={style.p}>Pending</p>
              ) : (
                <p className={style.p}>Late</p>
              )}
            </div>
          );
        })}
        {/* </div> */}

        <div
          style={{
            color: "white",
            textAlign: "center",
          }}
        >
          Completed Tasks
          {completedTask.map((task, index) => {
            const currtaskdate = task.date;
            const currtasktime = task.time;
            const dateTimeString = `${currtaskdate} ${currtasktime}`;
            const timestamp = new Date(dateTimeString).getTime();

            return (
              <div
                className={style.container}
                key={index}
                //   onClick={() => handleOpenTask(index)}
              >
                <div
                  style={{
                    position: "relative",
                    top: "10px",
                    right: "10px",
                  }}
                >
                  {/* <Button onClick={() => deleteConfirmhandler(index)}>
                  <MdDelete />
                </Button> */}
                </div>
                <h1 className={style.h1}>{task.title}</h1>
                <p className={style.p}>{task.description.slice(0, 20)}</p>
                {task?.completed ? (
                  <p className={style.p}>Completed</p>
                ) : date < timestamp ? (
                  <p className={style.p}>Pending</p>
                ) : (
                  <p className={style.p}>Late</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
