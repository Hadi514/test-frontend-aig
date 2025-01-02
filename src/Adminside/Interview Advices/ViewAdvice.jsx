import { useContext, useState } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import AdviceContext from "../../ContextApi/AdviceContext";

function ViewAdvice({ idAdvice }) {
  const [lgShow, setLgShow] = useState(false);
  const {adviceId, adviceById } = useContext(AdviceContext);

  const viewOpenReview = () => {
    adviceById(idAdvice)
    setLgShow(true)
  }

  return (
    <>
      <FontAwesomeIcon
        className="me-3"
        icon={faEye}
        onClick={() => viewOpenReview()}
        style={{cursor: 'pointer'}}
      />

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            View Advice
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4 className="text-underline">User Information</h4>
          <p className="m-0">{adviceId.name}</p>
          <p className="m-0">{adviceId.email}</p>
          <hr />
          <h4 className="text-underline">Advice</h4>
          <p className="m-0">{adviceId.advice}</p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ViewAdvice;

ViewAdvice.propTypes = {
  idAdvice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ViewAdvice.defaultProps = {
  idAdvice: null,
};
