import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Col, Container, FloatingLabel, Form, Modal, Row } from "react-bootstrap"
import PropTypes from "prop-types"
import JobSeekerContext from "../../ContextApi/JobSeekerContext";
import ReactQuill from "react-quill";



function ViewJobSeeker({ seekerPostId }) {
    const [lgShow, setLgShow] = useState(false);
    const { getSeekerById, seekerById } = useContext(JobSeekerContext)

    const jobPostForm = [
        { val: seekerById.title, type: "text", lab: "Job Title", },
        { val: seekerById.city, type: "text", lab: "City", },
        { val: seekerById.industry, type: "text", lab: "Industry", },
        { val: seekerById.name, type: "text", lab: "Company Name", },
        { val: seekerById.email, type: "text", lab: "Email", },
        { val: seekerById.contact, type: "text", lab: "Contact", },
        { val: seekerById.repositry, type: "text", lab: "Repository", },
        { val: seekerById.description, type: "textArea", lab: "Description", },
        { val: seekerById.experience, type: "textArea", lab: "Job Type", },
        { val: seekerById.qualification, type: "textArea", lab: "Job Location Type", },
        { val: seekerById.resume, type: "Resume", lab: "Resume", },
    ]

    const viewAndShowModal = () => {
        getSeekerById(seekerPostId);
        setLgShow(true)
    }

    return (
        <>
            <FontAwesomeIcon
                className="me-3"
                icon={faEye}
                onClick={() => viewAndShowModal()}
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
                                    return <Col key={index} md={job.type === "textArea" || job.lab === "Repository" ? 12 : 6}>
                                        <div>
                                            {job.type === "textArea" ? (
                                                < ReactQuill className="mb-3" value={job.val} />
                                            ) : job.type !== "Resume" ? (
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
                                            ) : (
                                                job.val  && (

                                                    <iframe
                                                        src={job.val}
                                                        width="100%"
                                                        height="500px"
                                                        title="PDF Viewer"
                                                    ></iframe>
                                                )
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

export default ViewJobSeeker

ViewJobSeeker.propTypes = {
    seekerPostId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

ViewJobSeeker.defaultProps = {
    seekerPostId: null,
};
