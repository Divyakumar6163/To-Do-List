import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { setTask } from "../store/task-redux";
import { useDispatch } from "react-redux";
import style from "./InputModal.module.css";
function InputModal(props) {
  console.log(props.data);
  const [title, setTitle] = useState(props?.data?.title || "");
  const [date, setDate] = useState(props?.data?.date || "");
  const [time, setTime] = useState(props?.data?.time || "");
  const [description, setDescription] = useState(
    props?.data?.description || ""
  );

  const dispatch = useDispatch();
  const saveTask = () => {
    if (title === "" || description === "" || date === "" || time === "")
      return;
    if (!props.edit)
      dispatch(setTask.addTask({ title, description, time, date }));
    else
      dispatch(
        setTask.editTask({
          index: props.index,
          task: { title, description, time, date },
        })
      );
    setTitle("");
    setDescription("");
    props.onHide();
  };
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        style={{
          left: "32vw",
          width: "35vw",
          borderRadius: "35px",
          height: "fit-content",
          top: "13vh",
          padding: "*-2rem",
          boxShadow: "white 0px 0px 10px 5px",
          background: "#011936FF",
        }}
      >
        <Modal.Header
          style={{
            backgroundColor: "#011936FF",
            color: "white",
            marginTop: "-28px",
          }}
        >
          <Modal.Title>{props.edit ? "EDIT" : "ADD"} TASK</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: "#011936FF",
            // height: "10rem",
            color: "white",
          }}
        >
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="title"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value.toUpperCase())}
                className={style.input}
              />
            </Form.Group>
            <Form.Group
              controlId="exampleForm.ControlTextarea1"
              placeholder="description"
              value={description}
              // className={style.input}
              onChange={(e) => setDescription(e.target.value)}
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                className={style.input}
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                value={time}
                className={style.input}
                onChange={(e) => setTime(e.target.value)}
              />

              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                className={style.input}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: "#011936FF",
            color: "white",
            marginBottom: "-28px",
          }}
        >
          <Button
            variant="secondary"
            onClick={props.onHide}
            // className={style.button}
            style={{
              width: "6rem",
              border: "4px solid #0956a9",
              backgroundColor: "#09203F",
              color: "white",
              padding: ".7rem .7rem",
              textAlign: "center",
              textDecoration: "none",
              display: " inline-block",
              fontSize: "1rem",
              margin: "4px 0rem 0rem 1.8rem",
              cursor: "pointer",
              borderRadius: " 25px",
              boxShadow: "0px 0px 10px 5px",
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={saveTask}
            // className={style.button}
            style={{
              backgroundColor: "#09203F",
              border: "4px solid #0956a9",
              color: "white",
              padding: ".7rem .7rem",
              textAlign: "center",
              textDecoration: "none",
              display: " inline-block",
              fontSize: "1rem",
              margin: "4px 0rem 0rem 1.8rem",
              cursor: "pointer",
              borderRadius: " 25px",
              boxShadow: "0px 0px 10px 5px",
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InputModal;
