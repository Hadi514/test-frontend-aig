import { useContext, useState } from "react";
import UserContext from "../ContextApi/UserContext";
import Swal from "sweetalert2";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import JobCountriesContext from "../ContextApi/JobCountryContext";
import JobSeekerContext from "../ContextApi/JobSeekerContext";

export default function JobSeekerPostPage() {
    const { signUser } = useContext(UserContext)
    const { allJobSeekers } = useContext(JobSeekerContext)
    const { jobCountries, countryCities, cities } = useContext(JobCountriesContext)
    const [descHtml, setDescHtml] = useState("")
    const [qulaiHtml, setQualiHtml] = useState("")
    const [expeHtml, setExpeHtml] = useState("")
    const apiUrl = import.meta.env.VITE_API_URL;

    const handleDescChange = (html) => {
        setDescHtml(html);
    };
    const handleQualiChange = (html) => {
        setQualiHtml(html);
    };
    const handleExpeChange = (html) => {
        setExpeHtml(html);
    };
    // job post state
    const [jobItems, setJobItems] = useState({
        title: "", country: "", city: "", email: "", description: "", experience: "", industry: "", name: "", contact: "", qualification: "", repositry: "", status: "Pending", resume: ""
    });

    const allCountries = jobCountries && jobCountries.map((data) => {
        return { value: data?.isoCode, label: data.name }
    })
    const allCities = cities && cities.map((data) => {
        return { value: data.name, label: data.name }
    })

    // job form data
    const jobPostForm = [
        { name: "title", val: jobItems.title, type: "text", placeH: "User Name", conId: "floatingInput", lab: "Job Title", star: "*" },
        {
            name: "country", val: jobItems.country, type: "select", placeH: "Country", conId: "floatingSelect", lab: "Country", star: "*", options: [
                { value: "", label: "Select Country" },
                ...allCountries
            ]
        },
        {
            name: "city", val: jobItems.city, type: "select", placeH: "City", conId: "floatingInput", lab: "City", star: "*", options: [
                { value: "", label: "Select City" },
                ...allCities
            ]
        },
        {
            name: "industry", val: jobItems.industry, type: "select", placeH: "Industry", conId: "floatingInput", lab: "Industry", star: "*", options: [
                { value: "", label: "Select Industry" },
                { value: "Information Technology", label: "Information Technology" },
                { value: "Healthcare", label: "Healthcare" },
                { value: "Finance", label: "Finance" },
                { value: "Education", label: "Education" },
                { value: "Manufacturing", label: "Manufacturing" },
                { value: "Retail & E - commerce", label: "Retail & E - commerce" },
                { value: "Construction", label: "Construction" },
                { value: "Hospitality & Tourism", label: "Hospitality & Tourism" },
                { value: "Transportation & Logistics", label: "Transportation & Logistics" },
                { value: "Media & Entertainment", label: "Media & Entertainment" },
                { value: "Telecommunications", label: "Telecommunications" },
                { value: "Government & Public Services", label: "Government & Public Services" },
                { value: "Legal Services", label: "Legal Services" },
                { value: "Nonprofit & NGOs", label: "Nonprofit & NGOs" },
                { value: "Energy & Utilities", label: "Energy & Utilities" },
                { value: "Agriculture", label: "Agriculture" },
                { value: "Real Estate", label: "Real Estate" },
                { value: "Consulting", label: "Consulting" },
                { value: "Marketing & Advertising", label: "Marketing & Advertising" },
                { value: "Pharmaceuticals & Biotechnology", label: "Pharmaceuticals & Biotechnology" },
            ]
        },
        { name: "name", val: signUser?.name, type: "text", placeH: "Job Seeker Name", conId: "floatingInput", lab: "Job Seeker Name" },
        { name: "email", val: signUser?.email, type: "email", placeH: "Email", conId: "floatingInput", lab: "Email", },
        { name: "contact", val: signUser?.number, type: "text", placeH: "Contact", conId: "floatingInput", lab: "Contact", },
        { name: "repositry", val: jobItems.repositry, type: "text", placeH: "Git Repository Link", conId: "floatingInput", lab: "Git Repository Link" },
        { name: "description", val: jobItems.description, type: "textarea", placeH: "Job Description", conId: "floatingInput", lab: "Job Description", star: "*" },
        { name: "qualification", val: jobItems.qualification, type: "textarea", placeH: "qualification", conId: "floatingInput", lab: "qualification", star: "*" },
        { name: "experience", val: jobItems.experience, type: "textarea", placeH: "experience", conId: "floatingInput", lab: "experience", star: "*" },
        { name: "resume", type: "File", placeH: "Resume", conId: "floatingInput", lab: "Resume" },
    ]

    // job post fn
    const addJob = async (e) => {
        e.preventDefault()
        const { title, country, city, industry, repositry, status, resume } = jobItems
        const { name, email } = signUser
        const contact = signUser?.number
        const description = descHtml;
        const qualification = qulaiHtml;
        const experience = expeHtml
        const userId = signUser?._id

        const formData = new FormData()
        formData.append("title", title)
        formData.append("resume", resume)
        formData.append("country", country)
        formData.append("city", city)
        formData.append("email", email)
        formData.append("industry", industry)
        formData.append("name", name)
        formData.append("contact", contact)
        formData.append("repositry", repositry)
        formData.append("status", status)
        formData.append("description", description)
        formData.append("qualification", qualification)
        formData.append("experience", experience)
        formData.append("userId", userId)

        const res = await fetch(`${apiUrl}/api/jobSeaker/addJobBySeaker`, {
            method: "POST",
            body: formData
        })
        const data = await res.json();
        const userFormError = document.getElementById("userFormError")
        data.message !== undefined ? userFormError.innerText = data.message : userFormError.innerText = ""

        if (res.ok) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your post is submitted for approval!",
                showConfirmButton: false,
                timer: 1500
            });
            allJobSeekers()
            setJobItems({
                title: "", country: "", city: "", email: "", industry: "", countryImage: "", name: "", contact: "", resume: "", repositry: "", status: "Pending"
            })
            setQualiHtml("")
            setDescHtml("")
            setExpeHtml("")
        }
    };

    const valueChanged = (e) => {
        if (e.target.name === "country") {
            countryCities(e.target.value)
        }
        if (e.target.files) {
            setJobItems({ ...jobItems, resume: e.target.files[0] })
        } else {
            setJobItems({ ...jobItems, [e.target.name]: e.target.value })
        }
    }

    return (
        <>
            <section className="">
                <Container>
                    <Form onSubmit={addJob} className="admin-form">
                        <div className="form-title">
                            <h2>Job Seeker Post</h2>
                        </div>
                        <div id="userFormError" className="text-danger"></div>
                        <Row className="">
                            {jobPostForm && jobPostForm.map((job, index) => {
                                return <Col key={index} md={job.type === "textarea" || job.type === "File" ? 12 : 6}>
                                    <div>
                                        {job.type === "textarea" ? (
                                            job.name === "description" ?
                                                <div>
                                                    <label className="mb-2">Description<span style={{ color: 'red' }}>*</span></label>
                                                    < ReactQuill className="mb-3" theme="snow" name={job.name} value={descHtml} onChange={handleDescChange} />
                                                </div>
                                                : job.name !== "qualification" ? (
                                                    <div>
                                                        <label className="mb-2">Qualification<span style={{ color: 'red' }}>*</span></label>
                                                        < ReactQuill className="mb-3" theme="snow" name={job.name} value={qulaiHtml} onChange={handleQualiChange} />
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <label className="mb-2">Experience<span style={{ color: 'red' }}>*</span></label>
                                                        < ReactQuill className="mb-3" theme="snow" name={job.name} value={expeHtml} onChange={handleExpeChange} />
                                                    </div>
                                                )

                                        ) : job.type === "select" ? (
                                            <FloatingLabel
                                                controlId={job.conId}
                                                label={
                                                    < span className="custom-label" >
                                                        {job.lab}
                                                        <span span className="star" >{job.star}</span>
                                                    </span>
                                                }
                                                className="mb-3"
                                            >
                                                <Form.Select name={job.name} onChange={valueChanged} value={job.val} aria-label="Floating label select example">
                                                    {job.options.map((opt, index) => {
                                                        return <option key={index} value={opt.value}>{opt.label}</option>
                                                    })}

                                                </Form.Select>
                                            </FloatingLabel>
                                        ) : job.type !== "File" ? (
                                            <FloatingLabel
                                                controlId={job.conId}
                                                label={
                                                    <span className="custom-label">
                                                        {job.lab}<span className="star">{job.star}</span>
                                                    </span>
                                                }
                                                className="mb-3"
                                            >
                                                <Form.Control
                                                    type={job.type}
                                                    name={job.name}
                                                    value={job.val}
                                                    onChange={valueChanged}
                                                    placeholder={job.placeH}
                                                />
                                            </FloatingLabel>
                                        ) : (
                                            <div>
                                                <p className="m-0 text-muted">Note: File should be in PDF format and size should less than 10 MB</p>
                                                <FloatingLabel
                                                    controlId={job.conId}
                                                    label={
                                                        <span className="custom-label">
                                                            {job.lab}<span className="star">{job.star}</span>
                                                        </span>
                                                    }
                                                    className="mb-3"
                                                >
                                                    <Form.Control
                                                        type={job.type}
                                                        name={job.name}
                                                        value={job.val}
                                                        onChange={valueChanged}
                                                        placeholder={job.placeH}
                                                    />
                                                </FloatingLabel>
                                            </div>
                                        )}

                                    </div>
                                </Col>
                            })}
                        </Row>
                        <div className="d-flex justify-content-center pb-3">
                            <Button type="submit" className="first-button">Post Job</Button>
                        </div>
                    </Form>
                </Container>
            </section >
        </>
    )
}


