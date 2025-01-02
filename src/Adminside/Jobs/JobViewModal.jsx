import { useContext, useState } from "react";
import { Col, Container, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import PropTypes from "prop-types"
import jobContext from "../../ContextApi/JobContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import ReactQuill from "react-quill";
export default function JobViewModal({ postedJobId }) {
    const [lgShow, setLgShow] = useState(false);
    const { postedJobById, jobById } = useContext(jobContext)

    const viewAndShowModal = () => {
        jobById(postedJobId);
        setLgShow(true)
    }

    const jobPostForm = [
        { val: postedJobById?.title, type: "text", lab: "Job Title", },
        { val: postedJobById.country?.country, type: "select", lab: "Country", },
        { val: postedJobById.city?.city, type: "text", lab: "City", },
        { val: postedJobById?.email, type: "text", lab: "Company Email", },
        { val: postedJobById?.industryId?.industry, type: "text", lab: "Industry", },
        { val: postedJobById?.companyName, type: "text", lab: "Company Name", },
        { val: postedJobById?.jobImage, type: "File", lab: "Job Image", },
        { val: postedJobById?.whatsApp, type: "text", lab: "WhatsApp", },
        { val: postedJobById?.description, type: "textArea", lab: "Job Description", },
        { val: postedJobById?.requirements, type: "textArea", lab: "Requirements", },
        { val: postedJobById?.perks, type: "textArea", lab: "Perks & Benefits", },
        { val: postedJobById?.aboutCompany, type: "textArea", lab: "About Company", },
        { val: postedJobById?.jobType, type: "text", lab: "Job Type", },
        { val: postedJobById?.jobLocaType, type: "text", lab: "Job Location Type", },
        { val: postedJobById?.categoryId?.category, type: "text", lab: "Category", },
        { val: postedJobById?.salary, type: "text", lab: "Salary", }
    ]

    return (
        <>
            <FontAwesomeIcon
                className="me-3"
                icon={faEye}
                onClick={() => viewAndShowModal()}
                style={{ cursor: "pointer" }}
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
                            <Row className="">
                                {jobPostForm && jobPostForm.map((job, index) => {
                                    return <Col key={index} md={job.type === "textArea" ? 12 : 6}>
                                        <div>
                                            {job.type === "textArea" ? (
                                                <div>
                                                    <h6>{job.lab}</h6>
                                                    < ReactQuill className="mb-3" value={job.val} readOnly />
                                                </div>
                                            ) : job.type === "File" ? (
                                                job.lab === "Job Image" ? (
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <h6>Company Logo:</h6>
                                                        <img src={job.val} alt="Company Logo Missing" className="img-fluid" style={{ width: "60px", height: "60px" }} />
                                                    </div>
                                                ) : (
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <h6>Country Image:</h6>
                                                        <img src={job.val} alt="Country Image Missing" className="img-fluid" style={{ width: "60px", height: "60px" }} />
                                                    </div>
                                                )
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

JobViewModal.propTypes = {
    postedJobId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

JobViewModal.defaultProps = {
    postedJobId: null,
};