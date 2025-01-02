import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, Container, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import ResumeContext from "../ContextApi/ResumeContext";
import Swal from "sweetalert2";

export default function EditResume({ resId }) {
    const [lgShow, setLgShow] = useState(false);
    const { allResumes } = useContext(ResumeContext)
    const apiUrl = import.meta.env.VITE_API_URL;
    const [formData, setFormData] = useState({ name: "", profession: "", email: "", number: "", totalWorkExp: "", resumeHeadline: "", description: "", skills: [], employmentDetails: [{ companyName: "", position: "", startDate: "", endDate: "", description: "" }], educationDetails: [{ institutionName: "", degree: "", startDate: "", endDate: "", fieldOfStudy: "", description: "" }], image: null, });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resumeData = new FormData();
        resumeData.append("name", formData.name);
        resumeData.append("email", formData.email);
        resumeData.append("number", formData.number);
        resumeData.append("profession", formData.profession);
        resumeData.append("totalWorkExp", formData.totalWorkExp);
        resumeData.append("resumeHeadline", formData.resumeHeadline);
        resumeData.append("description", formData.description);
        resumeData.append("skills", JSON.stringify(formData.skills));
        resumeData.append("employmentDetails", JSON.stringify(formData.employmentDetails));
        resumeData.append("educationDetails", JSON.stringify(formData.educationDetails));

        if (formData.image) {
            resumeData.append("image", formData.image);
        }

        const res = await fetch(`${apiUrl}/api/resume/editResume/${formData._id}`, {
            method: "PUT",
            body: resumeData,
        });
        const data = await res.json();
        console.log(data.message);

        const userFormError = document.getElementById("userFormError");
        data.message !== undefined ? userFormError.innerText = data.message : userFormError.innerText = "";
        if (res.ok) {
            Swal.fire({
                title: "Good job!",
                text: "Updated resume successfully",
                icon: "success"
            });
            allResumes();
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleEmploymentChange = (index, e) => {
        const { name, value } = e.target;
        const updatedEmploymentDetails = formData.employmentDetails.map((detail, i) =>
            i === index ? { ...detail, [name]: value } : detail
        );
        setFormData({ ...formData, employmentDetails: updatedEmploymentDetails });
    };

    const handleEducationChange = (index, e) => {
        const { name, value } = e.target;
        const updatedEducationDetails = formData.educationDetails.map((detail, i) =>
            i === index ? { ...detail, [name]: value } : detail
        );
        setFormData({ ...formData, educationDetails: updatedEducationDetails });
    };

    const handleAddEmployment = () => {
        setFormData({
            ...formData,
            employmentDetails: [...formData.employmentDetails, { companyName: "", position: "", startDate: "", endDate: "", description: "" }],
        });
    };

    const handleAddEducation = () => {
        setFormData({
            ...formData,
            educationDetails: [...formData.educationDetails, { institutionName: "", degree: "", startDate: "", endDate: "", fieldOfStudy: "", description: "" }],
        });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const fetchResume = async () => {
        const res = await fetch(`${apiUrl}/api/resume/getResumeById/${resId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setFormData(data);
    };

    const editAndShowModal = () => {
        fetchResume();
        setLgShow(true);
    };

    const formatDate = (date) => {
        if (date) {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const day = String(d.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
    };

    return (
        <>
            <FontAwesomeIcon
                className="me-3"
                icon={faPen}
                onClick={() => editAndShowModal(true)}
                style={{ cursor: "pointer" }}
            />
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form onSubmit={handleSubmit} className="admin-form" style={{ boxShadow: "none" }}>
                            <div className="form-title">
                                <h2>Edit Your Resume</h2>
                            </div>
                            <Row>
                                <h5 className="text-primary mb-4 mt-4">Personal Details</h5>
                                <div id="userFormError" className="text-danger"></div>
                                <Col md={6}>
                                    <FloatingLabel
                                        controlId="floatingName"
                                        label={<span>Full Name <span style={{ color: "red" }}>*</span></span>}
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col md={6}>
                                    <FloatingLabel
                                        controlId="floatingEmail"
                                        label={<span>Email <span style={{ color: "red" }}>*</span></span>}
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            placeholder="name@example.com"
                                            value={formData.email}
                                            readOnly
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FloatingLabel
                                        controlId="floatingNumber"
                                        label="Phone Number"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="text"
                                            name="number"
                                            placeholder="Phone Number"
                                            value={formData.number}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col md={6}>
                                    <FloatingLabel
                                        controlId="floatingNumber"
                                        label="Total Work Experience"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type="text"
                                            name="totalWorkExp"
                                            placeholder="Total Work Experience"
                                            value={formData.totalWorkExp}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </FloatingLabel>
                                </Col>
                                <FloatingLabel
                                    controlId="floatingNumber"
                                    label="profession"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="text"
                                        name="profession"
                                        placeholder="profession"
                                        value={formData.profession}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingImage"
                                    label="Upload Image"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingResumeHeadline"
                                    label={<span>Resume Headline <span style={{ color: "red" }}>*</span></span>}
                                    className="mb-3"
                                >
                                    <Form.Control
                                        as="textarea"
                                        name="resumeHeadline"
                                        placeholder="Resume Headline"
                                        value={formData.resumeHeadline}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingDescription"
                                    label={<span>Description <span style={{ color: "red" }}>*</span></span>}
                                    className="mb-3"
                                >
                                    <Form.Control
                                        as="textarea"
                                        name="description"
                                        placeholder="Description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </FloatingLabel>
                            </Row>


                            {formData.employmentDetails.map((detail, index) => (
                                <div key={index}>
                                    <Row>
                                        {index === 0 ? <h5 className="text-primary mb-4 mt-4">Employment Details</h5> : <h5 className="text-primary mb-4 mt-4">Employment Record {index + 1}</h5>}
                                        <Col md={6}>
                                            <FloatingLabel
                                                controlId={`floatingCompanyName${index}`}
                                                label={<span>Company Name <span style={{ color: "red" }}>*</span></span>}
                                                className="mb-3"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="companyName"
                                                    placeholder="Company Name"
                                                    value={detail.companyName}
                                                    onChange={(e) => handleEmploymentChange(index, e)}
                                                />
                                            </FloatingLabel>
                                        </Col>
                                        <Col md={6}>
                                            <FloatingLabel
                                                controlId={`floatingPosition${index}`}
                                                label={<span>Position <span style={{ color: "red" }}>*</span></span>}
                                                className="mb-3"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="position"
                                                    placeholder="Position"
                                                    value={detail.position}
                                                    onChange={(e) => handleEmploymentChange(index, e)}
                                                />
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <FloatingLabel
                                                controlId={`floatingStartDate${index}`}
                                                label={<span>Start Date <span style={{ color: "red" }}>*</span></span>}
                                                className="mb-3"
                                            >
                                                <Form.Control
                                                    type="date"
                                                    name="startDate"
                                                    value={formatDate(detail.startDate)}
                                                    onChange={(e) => handleEmploymentChange(index, e)}
                                                />
                                            </FloatingLabel>
                                        </Col>
                                        <Col md={6}>
                                            <FloatingLabel
                                                controlId={`floatingEndDate${index}`}
                                                label="End Date"
                                                className="mb-3"
                                            >
                                                <Form.Control
                                                    type="date"
                                                    name="endDate"
                                                    value={formatDate(detail.endDate)}
                                                    onChange={(e) => handleEmploymentChange(index, e)}
                                                />
                                            </FloatingLabel>
                                        </Col>
                                        <FloatingLabel
                                            controlId={`floatingJobDescription${index}`}
                                            label="Job Description"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                as="textarea"
                                                name="description"
                                                placeholder="Job Description"
                                                value={detail.description}
                                                onChange={(e) => handleEmploymentChange(index, e)}
                                            />
                                        </FloatingLabel>
                                    </Row>
                                </div>
                            ))}
                            <Row>
                                <div>
                                    <button type="button" className="add-experience" onClick={handleAddEmployment}>
                                        + Add another employment
                                    </button>
                                </div>
                            </Row>

                            {formData.educationDetails.map((detail, index) => (
                                <div key={index}>
                                    <Row>
                                        {index === 0 ? <h5 className="text-primary mb-4 mt-4">Education Details</h5> : <h5 className="text-primary mb-4 mt-4">Education Record {index + 1}</h5>}
                                        <Col md={6}>
                                            <FloatingLabel
                                                controlId={`floatingInstitutionName${index}`}
                                                label={<span>Institution Name <span style={{ color: "red" }}>*</span></span>}
                                                className="mb-3"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="institutionName"
                                                    placeholder="Institution Name"
                                                    value={detail.institutionName}
                                                    onChange={(e) => handleEducationChange(index, e)}
                                                />
                                            </FloatingLabel>
                                        </Col>
                                        <Col md={6}>
                                            <FloatingLabel
                                                controlId={`floatingDegree${index}`}
                                                label={<span>Degree <span style={{ color: "red" }}>*</span></span>}
                                                className="mb-3"
                                            >
                                                <Form.Control
                                                    type="text"
                                                    name="degree"
                                                    placeholder="Degree"
                                                    value={detail.degree}
                                                    onChange={(e) => handleEducationChange(index, e)}
                                                />
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <FloatingLabel
                                                controlId={`floatingStartDate${index}`}
                                                label={<span>Start Date <span style={{ color: "red" }}>*</span></span>}
                                                className="mb-3"
                                            >
                                                <Form.Control
                                                    type="date"
                                                    name="startDate"
                                                    value={formatDate(detail.startDate)}
                                                    onChange={(e) => handleEducationChange(index, e)}
                                                />
                                            </FloatingLabel>
                                        </Col>
                                        <Col md={6}>
                                            <FloatingLabel
                                                controlId={`floatingEndDate${index}`}
                                                label="End Date"
                                                className="mb-3"
                                            >
                                                <Form.Control
                                                    type="date"
                                                    name="endDate"
                                                    value={formatDate(detail.endDate)}
                                                    onChange={(e) => handleEducationChange(index, e)}
                                                />
                                            </FloatingLabel>
                                        </Col>
                                        <FloatingLabel
                                            controlId={`floatingFieldOfStudy${index}`}
                                            label="Field of Study"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type="text"
                                                name="fieldOfStudy"
                                                placeholder="Field of Study"
                                                value={detail.fieldOfStudy}
                                                onChange={(e) => handleEducationChange(index, e)}
                                            />
                                        </FloatingLabel>
                                        <FloatingLabel
                                            controlId={`floatingEduDescription${index}`}
                                            label="Description"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                as="textarea"
                                                name="description"
                                                placeholder="Description"
                                                value={detail.description}
                                                onChange={(e) => handleEducationChange(index, e)}
                                            />
                                        </FloatingLabel>
                                    </Row>
                                </div>
                            ))}
                            <Row>
                                <div>
                                    <button type="button" className="add-experience" onClick={handleAddEducation}>
                                        + Add another education record
                                    </button>
                                </div>
                            </Row>

                            <div className="text-center pb-3">
                                <Button variant="primary" type="submit">
                                    Updated Resume
                                </Button>
                            </div>
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
}

EditResume.propTypes = {
    resId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

EditResume.defaultProps = {
    resId: null,
};