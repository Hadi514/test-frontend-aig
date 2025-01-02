import { useContext, useState } from "react";
import { Col, Container, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import ReactQuill from "react-quill";
import JobApplyContext from "../../ContextApi/JobApplyContext";

export default function JobApplyEditModal({ applyJobId }) {
    const [lgShow, setLgShow] = useState(false);
    const { submittedJobsById, appliedJobById } = useContext(JobApplyContext)

    const editAndShowModal = () => {
        appliedJobById(applyJobId);
        setLgShow(true)
    }

    const jobPostForm = submittedJobsById.jobId && [
        { val: submittedJobsById.name, type: "text", lab: "Name", },
        { val: submittedJobsById.email, type: "text", lab: "Email", },
        { val: submittedJobsById.number, type: "text", lab: "Number", },
        { val: submittedJobsById.jobId.title, type: "text", lab: "Job Title", },
        { val: submittedJobsById.jobId.city, type: "text", lab: "Job City", },
        { val: submittedJobsById.currentSalary, type: "text", lab: "Current Salary", },
        { val: submittedJobsById.expectedSalary, type: "text", lab: "Expected Salary", },
        { val: submittedJobsById.relocation, type: "text", lab: "Relocation", }
    ]

    return (
        <>
            <FontAwesomeIcon
                className="me-3"
                icon={faPen}
                onClick={() => editAndShowModal()}
            />
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        View Job
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form className="admin-form" style={{ boxShadow: 'none' }}>
                            <div id="userFormError" className="text-danger"></div>
                            <Row className="justify-content-center">
                                {jobPostForm && jobPostForm.map((job, index) => {
                                    return <Col key={index} md={job.type === "textArea" ? 12 : 6}>
                                        <div>
                                            {job.type === "textArea" ? (
                                                < ReactQuill className="mb-3" value={job.val} />
                                            ) : (
                                                <FloatingLabel
                                                    controlId={job.conId}
                                                    label={
                                                        <span className="custom-label">
                                                            {job.lab}
                                                        </span>
                                                    }
                                                    className="mb-3"
                                                >
                                                    <Form.Control value={job.val} />
                                                </FloatingLabel>
                                            )}

                                        </div>
                                    </Col>
                                })}
                            </Row>

                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}

JobApplyEditModal.propTypes = {
    applyJobId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

JobApplyEditModal.defaultProps = {
    applyJobId: null,
};
