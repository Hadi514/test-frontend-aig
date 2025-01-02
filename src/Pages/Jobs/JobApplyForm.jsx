import { useContext, useEffect, useState } from "react";
import { Button, Container, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import UserContext from "../../ContextApi/UserContext";
import PropTypes from "prop-types"
import JobApplyContext from "../../ContextApi/JobApplyContext";
import Swal from "sweetalert2";

export default function JobApplyForm({ jobApplyId }) {
    const { appliedJobs, getAppliedJobs } = useContext(JobApplyContext)
    const { signUser } = useContext(UserContext)
    const [lgShow, setLgShow] = useState(false);
    const [disableApply, setDisableApply] = useState(false)

    const [jobApplyCredentails, setJobApplyCredentials] = useState({
        currentSalary: "",
        expectedSalary: "",
        relocation: "",
        profession: "",
        resume: ""
    })

    const jobApplyForm = [
        { name: "name", val: signUser.name, type: "text", placeH: "Name", conId: "floatingInput", lab: "Name", star: "*" },
        { name: "profession", val: jobApplyCredentails.profession, type: "text", placeH: "Profession", conId: "floatingInput", lab: "Profession", star: "*" },
        { name: "email", val: signUser.email, type: "text", placeH: "Email", conId: "floatingInput", lab: "Email", star: "*" },
        { name: "contact", val: signUser.number, type: "text", placeH: "Number", conId: "floatingInput", lab: "Number", star: "*" },
        { name: "resume", type: "File", placeH: "Resume", conId: "floatingInput", lab: "Resume", star: "*" },
        { name: "currentSalary", val: jobApplyCredentails.currentSalary, type: "text", placeH: "Current Salary", conId: "floatingInput", lab: "Current Salary", star: "*" },
        { name: "expectedSalary", val: jobApplyCredentails.expectedSalary, type: "text", placeH: "Expected Salary", conId: "floatingInput", lab: "Expected Salary", star: "*" },
        {
            name: "relocation", val: jobApplyCredentails.relocation, type: "select", placeH: "Job Location Type", conId: "floatingSelect", lab: "Job Location Type", options: [
                { value: "", label: "Are you comfortable with relocation to job city?" },
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" }
            ]
        },
    ]

    const applyNowCLick = () => {
        Swal.fire({
            position: "center",
            icon: "info",
            title: "You need to sign in first!",
            showConfirmButton: false,
            timer: 2500
        });
    }

    const jobApplied = async (e) => {
        e.preventDefault()
        const { name, email, number } = signUser
        const jobId = jobApplyId;
        const { relocation, expectedSalary, currentSalary, resume, profession } = jobApplyCredentails
        const status = "Pending"
        const formData = new FormData()
        formData.append("name", name)
        formData.append("profession", profession)
        formData.append("email", email)
        formData.append("number", number)
        formData.append("jobId", jobId)
        formData.append("relocation", relocation)
        formData.append("expectedSalary", expectedSalary)
        formData.append("currentSalary", currentSalary)
        formData.append("resume", resume)
        formData.append("status", status)

        const res = await fetch("https://job-portal-backend-ji3a.vercel.app/api/apply/applyForJob", {
            method: "POST",
            body: formData
        })
        const data = await res.json()
        const userFormError = document.getElementById("userFormError")
        data.message !== undefined ? userFormError.innerText = data.message : userFormError.innerText = ""
        if (res.ok) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Job application sent successfully!",
                showConfirmButton: true,
            });
            appliedJobs()
            setJobApplyCredentials({
                currentSalary: "",
                expectedSalary: "",
                relocation: "",
                profession: "",
                resume: ""
            })
        }
    }
    const valueChanged = (e) => {
        if (e.target.files) {
            setJobApplyCredentials({ ...jobApplyCredentails, resume: e.target.files[0] })
        } else {
            setJobApplyCredentials({ ...jobApplyCredentails, [e.target.name]: e.target.value })
        }
    }

    useEffect(() => {
        if (jobApplyId) {
            const checkApply = getAppliedJobs?.some(job => job.jobId?._id === jobApplyId && job.email === signUser?.email);
            if (checkApply) {
                setDisableApply(true);
            }
        }
    }, [getAppliedJobs, jobApplyId, signUser]);


    return (
        <>
            {signUser && signUser.name ? (
                <Button onClick={() => setLgShow(true)} disabled={disableApply} style={{padding: "5px 40px"}}>Apply Now</Button>
            ) : (
                <div>
                    <Button onClick={() => applyNowCLick()} style={{padding: "5px 40px"}}>Apply Now</Button>
                </div>
            )}

            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Apply For A Job
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form className="admin-form" onSubmit={jobApplied}>
                            <div className="form-title">
                                <h2> Post A Job</h2>
                            </div>
                            <div id="userFormError" className="text-danger"></div>
                            <Row className="justify-content-center">
                                {jobApplyForm && jobApplyForm.map((jobApply, index) => (
                                    <div key={index}>
                                        {jobApply.type !== "select" ? (
                                            <FloatingLabel
                                                controlId={jobApply.conId}
                                                label={
                                                    <span className="custom-label">
                                                        {jobApply.lab}<span className="star">{jobApply.star}</span>
                                                    </span>
                                                }
                                                className="mb-3"
                                            >
                                                <Form.Control
                                                    type={jobApply.type}
                                                    name={jobApply.name}
                                                    value={jobApply.val}
                                                    onChange={valueChanged}
                                                    placeholder={jobApply.placeH}
                                                />
                                            </FloatingLabel>
                                        ) : (
                                            <Form.Select className="py-3 mb-3" name={jobApply.name} onChange={valueChanged} value={jobApply.val} aria-label="Floating label select example">
                                                {jobApply.options && jobApply.options.map((opt, index) => {
                                                    return <option key={index} value={opt.value}>{opt.label}</option>
                                                })}
                                            </Form.Select>
                                        )}
                                    </div>
                                ))}
                            </Row>
                            <div className="d-flex justify-content-center pb-3">
                                <Button type="submit">Apply</Button>
                            </div>
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}

JobApplyForm.propTypes = {
    jobApplyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};