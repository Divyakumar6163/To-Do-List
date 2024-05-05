import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { setTask } from "../store/task-redux";
import { useDispatch } from "react-redux";
import style from "./Modal.module.css";
function MyVerticallyCenteredModal(props) {
  const dispatch = useDispatch();
  const deleteConfirmhandler = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(setTask.deleteTask(props.index));
      props.onHide();
    }
  };
  function editHandler() {
    // dispatch(setTask.editTask(props.index, props.data));
    props.setEdit(true);
    props.onHide();
    props.modal();
  }
  const completedHandler = () => {
    dispatch(
      setTask.editTask({
        index: props.index,
        task: { ...props.data, completed: true },
      })
    );
  };
  return (
    <Modal
      {...props}
      //   style={{ backgroundColor: "#011936FF" }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props?.data?.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props?.data?.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={completedHandler}>Completed</Button>
        <Button onClick={deleteConfirmhandler}>
          <MdDelete />
        </Button>
        <Button onClick={editHandler}>
          <FaPencilAlt />
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default MyVerticallyCenteredModal;
