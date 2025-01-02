import { useContext, useState } from "react";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import ReviewContext from "../../ContextApi/ReviewContext";

function SeeReview({ reviewId }) {
  const [lgShow, setLgShow] = useState(false);
  const { getReviewById, reviewById } = useContext(ReviewContext);

  const viewOpenReview = () => {
    reviewById(reviewId)
    setLgShow(true)
  }

  return (
    <>
      <FontAwesomeIcon
        className="me-3"
        icon={faEye}
        onClick={() => viewOpenReview()}
        style={{ cursor: 'pointer' }}
      />

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            View Review
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h4 className="text-underline">User Information</h4>
          <img src={getReviewById.image} style={{ width: "20%" }} alt="" />
          <p className="m-0">{getReviewById.name}</p>
          <p className="m-0 text-muted">{getReviewById.designation}</p>
          <p className="m-0">{getReviewById.email}</p>
          <hr />
          <h4 className="text-underline text-start">Review</h4>
          <p className="m-0 text-start">{getReviewById.message}</p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SeeReview;

SeeReview.propTypes = {
  reviewId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SeeReview.defaultProps = {
  reviewId: null,
};
