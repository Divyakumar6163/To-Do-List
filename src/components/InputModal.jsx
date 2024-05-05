import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { setTask } from "../store/task-redux";
import { useDispatch } from "react-redux";
import { styles } from "./InputModal.module.css";
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
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{props.edit ? "EDIT" : "ADD"} TASK</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="title"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
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
                onChange={(e) => setTime(e.target.value)}
              />

              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={saveTask}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default InputModal;
