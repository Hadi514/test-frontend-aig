import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Modal } from "react-bootstrap"
import PropTypes from "prop-types";
import InterviewContext from "../../ContextApi/InterviewContext";

export default function ShowInterviewModal({ interviewId }) {
    const [lgShow, setLgShow] = useState(false);
    const { getInterviewId, interviewById } = useContext(InterviewContext)

    const openViewModal = () => {
        setLgShow(true)
        getInterviewId(interviewId)
    }
    return (
        <>
            <FontAwesomeIcon
                className="me-3"
                icon={faEye}
                onClick={() => openViewModal()}
                style={{cursor: "pointer"}}
            />
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        View Interview Item
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <label className="form-lable">Title</label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            value={interviewById.title}
                        />
                        <label className="form-lable">Category</label>
                        <input
                            className="form-control"
                            type="name"
                            name="email"
                            value={interviewById.category}
                        />
                        <label className="form-lable">Content</label>
                        <div
                            className="form-control"
                            dangerouslySetInnerHTML={{ __html: interviewById.content }}
                            type="text"
                            rows={10}
                        />
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

ShowInterviewModal.propTypes = {
    interviewId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

ShowInterviewModal.defaultProps = {
    interviewId: null,
};