import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { setTask } from "../store/task-redux";
import { useDispatch } from "react-redux";
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
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{
        left: "32vw",
        width: "35vw",
        borderRadius: "35px",
        height: "fit-content",
        top: "30vh",
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
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ alignSelf: "center" }}
        >
          {props?.data?.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: "#011936FF",
          height: "10rem",
          color: "white",
        }}
      >
        <p>{props?.data?.description}</p>
      </Modal.Body>
      <Modal.Footer
        style={{
          backgroundColor: "#011936FF",
          color: "white",
          marginBottom: "-28px",
        }}
      >
        <Button
          onClick={deleteConfirmhandler}
          style={{
            width: "3.5rem",
            height: "3.5rem",
            backgroundColor: "#09203F",
            border: "4px solid #0956a9",
            color: "white",
            padding: ".7rem .7rem",
            textAlign: "center",
            textDecoration: "none",
            display: " inline-block",
            fontSize: "1rem",
            margin: "4px 0rem 0rem -3.6vwrem",
            cursor: "pointer",
            borderRadius: " 25px",
            boxShadow: "0px 0px 10px 5px",
          }}
        >
          <MdDelete />
        </Button>
        <Button
          onClick={editHandler}
          style={{
            width: "3.5rem",
            height: "3.5rem",
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
          <FaPencilAlt />
        </Button>
        <Button
          onClick={completedHandler}
          style={{
            width: "13rem",
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
          Mark as Completed
        </Button>
        <Button
          onClick={props.onHide}
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
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default MyVerticallyCenteredModal;
