import { useContext, useState } from "react";
import UserContext from "../ContextApi/UserContext";
import { Form, Button, Container, Row, Col, FloatingLabel } from "react-bootstrap";
import Swal from 'sweetalert2'
import ResumeContext from "../ContextApi/ResumeContext";

const CreateResume = () => {
    const { signUser } = useContext(UserContext);
    const { allResumes } = useContext(ResumeContext)
    const apiUrl = import.meta.env.VITE_API_URL;
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        number: "",
        profession: "",
        totalWorkExp: "",
        resumeHeadline: "",
        description: "",
        skills: [],
        employmentDetails: [{ companyName: "", position: "", startDate: "", endDate: "", description: "" }],
        educationDetails: [{ institutionName: "", degree: "", startDate: "", endDate: "", fieldOfStudy: "", description: "" }],
        image: null,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const resumeData = new FormData();
        resumeData.append("userId", signUser?._id);
        resumeData.append("name", signUser?.name);
        resumeData.append("email", signUser?.email);
        resumeData.append("number", signUser?.number);
        resumeData.append("totalWorkExp", formData.totalWorkExp);
        resumeData.append("profession", formData.profession);
        resumeData.append("resumeHeadline", formData.resumeHeadline);
        resumeData.append("description", formData.description);

        if (Array.isArray(formData.skills)) {
            resumeData.append("skills", JSON.stringify(formData.skills));
        } else {
            resumeData.append("skills", JSON.stringify([]));
        }

        resumeData.append("employmentDetails", JSON.stringify(formData.employmentDetails));
        resumeData.append("educationDetails", JSON.stringify(formData.educationDetails));

        if (formData.image) {
            resumeData.append("image", formData.image);
        }

        const res = await fetch(`${apiUrl}/api/resume/uploadResume`, {
            method: "POST",
            body: resumeData,
        });
        const data = await res.json();
        console.log(data.message);

        const userFormError = document.getElementById("userFormError")
        data.message !== undefined ? userFormError.innerText = data.message : userFormError.innerText = ""
        if (res.ok) {
            Swal.fire({
                title: "Good job!",
                text: "Resume created successfully!",
                icon: "success"
            });
            allResumes()
            setFormData({
                name: "",
                email: "",
                number: "",
                totalWorkExp: "",
                resumeHeadline: "",
                profession: "",
                description: "",
                skills: [],
                employmentDetails: [{ companyName: "", position: "", startDate: "", endDate: "", description: "" }],
                educationDetails: [{ institutionName: "", degree: "", startDate: "", endDate: "", fieldOfStudy: "", description: "" }],
                image: null,
            })
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

    return (
        <Container>
            <Form onSubmit={handleSubmit} className="admin-form">
                <div className="form-title">
                    <h2>Create Your Resume</h2>
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
                                value={signUser?.name}
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
                                mailto:placeholder="name@example.com"
                                value={signUser?.email}
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
                                value={signUser?.number}
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
                            label={<span>Profession <span style={{ color: "red" }}>*</span></span>}
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
                                        value={detail.startDate}
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
                                        value={detail.endDate}
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
                            {/* <Button variant="primary" onClick={handleAddEducation}>
                                Add Education
                            </Button> */}
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
                            {index === 0 ? <h5 className="text-primary mb-4 mt-4"> Education Details </h5> : <h5 className="text-primary mb-4 mt-4"> Education Record {index + 1} </h5>}

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
                                        value={detail.startDate}
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
                                        value={detail.endDate}
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
                        Submit Resume
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default CreateResume;
