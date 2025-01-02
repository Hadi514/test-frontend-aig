import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import jobContext from "../../ContextApi/JobContext";
import PropTypes from "prop-types"
import ReactQuill from "react-quill";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import JobCatContext from "../../ContextApi/JobCatContext";
import JobIndContext from "../../ContextApi/JobIndContext";
import jobConContext from "../../ContextApi/JobConContext";
import JobCityContext from "../../ContextApi/JobCityContext";

export default function AddDuplicateJob({ postedJobId }) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { postedJobById, jobById, setPostedJobById, allJobPosts } = useContext(jobContext)
    const { jobCat } = useContext(JobCatContext)
    const [countryCity, setCountryCity] = useState("")
    const { jobInd } = useContext(JobIndContext)
    const { jobCon } = useContext(jobConContext)
    const { jobCity } = useContext(JobCityContext)
    const [jobTitle, setJobTitle] = useState("")

    const handleDescChange = (html) => {
        setPostedJobById({ ...postedJobById, description: html });
    };
    const handleReqcChange = (html) => {
        setPostedJobById({ ...postedJobById, requirements: html });
    };
    const handleComcChange = (html) => {
        setPostedJobById({ ...postedJobById, aboutCompany: html });
    };
    const handlePerksChange = (html) => {
        setPostedJobById({ ...postedJobById, perks: html });
    };

    const [lgShow, setLgShow] = useState(false);

    const editAndShowModal = () => {
        jobById(postedJobId);
        setLgShow(true)
    }

    useEffect(() => {
        if (postedJobById.country?._id) {
            setCountryCity(postedJobById.country._id);
        }
    }, [postedJobById.country]);

    const allIndustries = jobInd?.map(ind => {
        return { value: ind._id, label: ind.industry }
    })

    const allCountries =
        jobCon?.map((data) => {
            return { value: data?._id, label: data.country };
        });
    const allCities =
        jobCity?.filter(data => data.countryId?._id === countryCity).map((data) => {
            return { value: data?._id, label: data.city };
        });

    const allCategories = jobCat?.map(cat => {
        return { value: cat._id, label: cat.category }
    })

    const jobPostForm = postedJobById && [
        { name: "title", val: jobTitle.title, type: "text", placeH: "User Name", conId: "floatingInput", lab: "Job Title", star: "*" },
        {
            name: "country", val: postedJobById.country?._id, type: "select", placeH: "Country", conId: "floatingSelect", lab: "Country", options: [
                { value: "", label: "Select Country" },
                ...allCountries
            ]
        },
        {
            name: "city", val: postedJobById.city?._id, type: "select", placeH: "City", conId: "floatingInput", lab: "City", star: "*", options: [
                { value: "", label: "Select City" },
                ...allCities
            ]
        },
        { name: "email", val: postedJobById.email, type: "email", placeH: "Company Email", conId: "floatingInput", lab: "Company Email", star: "*" },
        {
            name: "industryId", val: postedJobById.industryId?._id, type: "select", placeH: "Industry", conId: "floatingInput", lab: "Industry", star: "*", options: [
                ...allIndustries
            ]
        },
        { name: "description", val: postedJobById.description, type: "textarea", placeH: "Job Description", conId: "floatingInput", lab: "Job Description", star: "*" },
        { name: "requirements", val: postedJobById.requirements, type: "textarea", placeH: "Requirements", conId: "floatingInput", lab: "Requirements", star: "*" },
        { name: "jobImage", type: "File", placeH: "Choose Job Image", conId: "formFile", lab: "Choose Job Image" },
        { name: "perks", val: postedJobById.perks, type: "textarea", placeH: "Perks & Benefits", conId: "floatingInput", lab: "Perks & Benefits" },
        { name: "companyName", val: postedJobById.companyName, type: "text", placeH: "Company Name", conId: "floatingInput", lab: "Company Name", star: "*" },
        { name: "whatsApp", val: postedJobById.whatsApp, type: "text", placeH: "WhatsApp", conId: "floatingInput", lab: "WhatsApp" },
        {
            name: "jobType", val: postedJobById.jobType, type: "select", placeH: "Job Type", conId: "floatingSelect", lab: "Job Type", options: [
                { value: "", label: "Select An Option" },
                { value: "Full Time", label: "Full Time" },
                { value: "Part Time", label: "Part Time" }
            ]
        },
        {
            name: "jobLocaType", val: postedJobById.jobLocaType, type: "select", placeH: "Job Location Type", conId: "floatingSelect", lab: "Job Location Type", options: [
                { value: "", label: "Select An Option" },
                { value: "On Site", label: "On Site" },
                { value: "Remote", label: "Remote" },
                { value: "Hybrid", label: "Hybrid" }
            ]
        },
        {
            name: "categoryId", val: postedJobById.categoryId?._id, type: "select", placeH: "Category", conId: "floatingInput", lab: "Category", star: "*", options: [
                ...allCategories
            ]
        },
        { name: "salary", val: postedJobById.salary, type: "text", placeH: "Salary", conId: "floatingInput", lab: "Salary" },
        { name: "aboutCompany", val: postedJobById.aboutCompany, type: "textarea", placeH: "About Company", conId: "floatingInput", lab: "About Company", star: "*" },
    ]

    const addDuplicateJob = async (e) => {
        e.preventDefault()
        const { country, city, email, industryId, companyName, jobType, categoryId, jobLocaType, salary, requirements, description, jobImage, countryImage, aboutCompany, whatsApp, perks } = postedJobById

        const formData = new FormData();
        formData.append("title", jobTitle);
        if (Array.isArray(country)) {
            formData.append("country", country[0]);
        } else if (typeof country === "object") {
            formData.append("country", country._id);
        } else {
            formData.append("country", country);
        }

        // Check if city is an array, if yes, take the first ID
        if (Array.isArray(city)) {
            formData.append("city", city[0]);
        } else if (city && typeof city === "object") {
            formData.append("city", city._id);
        } else {
            formData.append("city", city);
        }

        formData.append("email", email);
        formData.append("description", description);
        formData.append("requirements", requirements);
        formData.append("perks", perks);
        formData.append("whatsApp", whatsApp);
        formData.append("aboutCompany", aboutCompany);
        formData.append("jobImage", jobImage);
        formData.append("countryImage", countryImage);
        formData.append("companyName", companyName);
        formData.append("jobType", jobType);
        if (industryId && typeof industryId === "object") {
            formData.append("industryId", industryId._id);
        } else {
            formData.append("industryId", industryId);
        }
        if (categoryId && typeof categoryId === "object") {
            formData.append("categoryId", categoryId._id);
        } else {
            formData.append("categoryId", categoryId);
        }
        formData.append("jobLocaType", jobLocaType);
        formData.append("salary", salary);
        const res = await fetch(`${apiUrl}/api/jobPost/addJob`, {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        console.log(data);

        const userFormError = document.getElementById("userFormError");
        data.message !== undefined ? (userFormError.innerText = data.message) : (userFormError.innerText = "");

        if (res.ok) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Job added successfully!",
                showConfirmButton: false,
                timer: 1500,
            });
            allJobPosts()
        }
    }

    const valueChanged = (e) => {
        if (e.target.files) {
            setPostedJobById({ ...postedJobById, [e.target.name]: e.target.files[0] })
        } else if (e.target.name === "title") {
            setJobTitle(e.target.value)

        } else {
            setPostedJobById({ ...postedJobById, [e.target.name]: e.target.value })
        }
        if (e.target.name === "country") {
            setCountryCity(e.target.value)
        }
    }

    return (
        <>
            <FontAwesomeIcon
                className="me-3"
                icon={faCopy}
                onClick={() => editAndShowModal()}
                style={{ cursor: "pointer" }}
            />
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton onHide={() => setPostedJobById([])}>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Post Multiple Jobs
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form onSubmit={addDuplicateJob}>
                            <div id="userFormError" className="text-danger"></div>
                            <Row className="justify-content-center">
                                {jobPostForm && jobPostForm.map((job, index) => {
                                    return <Col key={index} md={job.name === "jobImage" || job.name === "countryImage" || job.name === "description" || job.name === "requirements" || job.name === "aboutCompany" || job.name === "title" || job.name === "perks" || job.name === "companyName" ? 12 : job.name === "email" || job.name === "industryId" || job.name === "categoryId" || job.name === "salary" || job.name === "country" || job.name === "city" ? 6 : 4}>
                                        <div>
                                            {job.type === "textarea" ? (
                                                job.name === "description" ? < ReactQuill className="mb-3" theme="snow" name={job.name} value={job.val} onChange={handleDescChange} /> : job.name === "aboutCompany" ? (
                                                    < ReactQuill className="mb-3" theme="snow" name={job.name} value={job.val} onChange={handleComcChange} />
                                                ) : job.name !== "perks" ? (
                                                    < ReactQuill className="mb-3" theme="snow" name={job.name} value={job.val} onChange={handleReqcChange} />
                                                ) : (
                                                    < ReactQuill className="mb-3" theme="snow" name={job.name} value={job.val} onChange={handlePerksChange} />
                                                )

                                            ) : job.type === "select" ? (
                                                <FloatingLabel
                                                    className="mb-3"
                                                    controlId={job.conId}
                                                    label={job.lab}
                                                >
                                                    <Form.Select name={job.name} onChange={valueChanged} value={job.val} aria-label="Floating label select example">
                                                        {job.options.map((opt, index) => {
                                                            return <option key={index} value={opt.value}>{opt.label}</option>
                                                        })}

                                                    </Form.Select>
                                                </FloatingLabel>
                                            ) : job.name === "jobImage" ? (
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <FloatingLabel
                                                        controlId={job.conId}
                                                        label={job.lab}
                                                        className="mb-3"
                                                        style={{ width: "70%" }}
                                                    >
                                                        <Form.Control
                                                            type={job.type}
                                                            name={job.name}
                                                            value={job.val}
                                                            onChange={valueChanged}
                                                            placeholder={job.placeH}
                                                        />
                                                    </FloatingLabel>
                                                    <img className="mb-2" src={postedJobById.jobImage} alt="" style={{ width: "10%" }} />
                                                </div>
                                            ) : job.name === "countryImage" ? (
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <FloatingLabel
                                                        controlId={job.conId}
                                                        label={job.lab}
                                                        className="mb-3"
                                                        style={{ width: "70%" }}
                                                    >
                                                        <Form.Control
                                                            type={job.type}
                                                            name={job.name}
                                                            value={job.val}
                                                            onChange={valueChanged}
                                                            placeholder={job.placeH}
                                                        />
                                                    </FloatingLabel>
                                                    <img className="mb-2" src={postedJobById.countryImage} alt="" style={{ width: "10%" }} />
                                                </div>
                                            ) : (
                                                <FloatingLabel
                                                    controlId={job.conId}
                                                    label={job.lab}
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
                                            )}

                                        </div>
                                    </Col>
                                })}
                            </Row>
                            <div className="d-flex justify-content-center">
                                <Button type="submit" className="first-button">Submit</Button>
                            </div>
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}

AddDuplicateJob.propTypes = {
    postedJobId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

AddDuplicateJob.defaultProps = {
    postedJobId: null,
};