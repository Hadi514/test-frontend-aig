import { useContext, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import jobContext from "../../ContextApi/JobContext";
import Swal from "sweetalert2";
import UserContext from "../../ContextApi/UserContext";
import JobCatContext from "../../ContextApi/JobCatContext";
import JobIndContext from "../../ContextApi/JobIndContext";
import AddCatInJob from "./AddCatInJob";
import AddIndInJob from "./AddIndInJob";
import jobConContext from "../../ContextApi/JobConContext";
import JobCityContext from "../../ContextApi/JobCityContext";
import AddCountryInJob from "./AddCountryInJob";
import AddCityInJob from "./AddCityInJob";

export default function AddJobs() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { jobCat, alljobCat } = useContext(JobCatContext);
  const { jobInd, alljobInd } = useContext(JobIndContext);
  const { allJobPosts } = useContext(jobContext);
  const { signUser } = useContext(UserContext);
  const { jobCon } = useContext(jobConContext)
  const { jobCity } = useContext(JobCityContext)
  const [countryCity, setCountryCity] = useState("")
  const [descHtml, setDescHtml] = useState("");
  const [reqHtml, setReqcHtml] = useState("");
  const [comHtml, setComcHtml] = useState("");
  const [perksHtml, setPerksHtml] = useState("");

  useEffect(() => {
    alljobCat();
    alljobInd();
  }, []);

  const handleDescChange = (html) => {
    setDescHtml(html);
  };
  const handleReqcChange = (html) => {
    setReqcHtml(html);
  };
  const handleComcChange = (html) => {
    setComcHtml(html);
  };
  const handlePerksChange = (html) => {
    setPerksHtml(html);
  };

  // job post state
  const [jobItems, setJobItems] = useState({
    title: "",
    country: "",
    city: "",
    email: "",
    description: "",
    requirements: "",
    industryId: "",
    jobImage: "",
    countryImage: "",
    perks: "",
    companyName: "",
    whatsApp: "",
    jobType: "",
    location: "",
    categoryId: "",
    jobLocaType: "",
    salary: "",
    aboutCompany: "",
  });

  // job post fn
  const addJob = async (e) => {
    e.preventDefault();
    const {
      title,
      country,
      city,
      email,
      industryId,
      jobImage,
      countryImage,
      companyName,
      whatsApp,
      jobType,
      location,
      categoryId,
      jobLocaType,
      salary,
    } = jobItems;

    const description = descHtml;
    const requirements = reqHtml;
    const aboutCompany = comHtml;
    const perks = perksHtml;

    // Determine job status based on user role
    const status =
      signUser &&
      (signUser.role === "Admin"
        ? "Approved"
        : "Pending");

    // Create FormData instance
    const formData = new FormData();
    formData.append("title", title);
    formData.append("country", country);
    formData.append("city", city);
    formData.append("email", email);
    formData.append("description", description);
    formData.append("requirements", requirements);
    formData.append("aboutCompany", aboutCompany);
    formData.append("perks", perks);
    formData.append("industryId", industryId);
    formData.append("jobImage", jobImage);
    formData.append("userId", signUser._id);
    formData.append("countryImage", countryImage);
    formData.append("companyName", companyName);
    formData.append("whatsApp", whatsApp);
    formData.append("jobType", jobType);
    formData.append("location", location);
    formData.append("categoryId", categoryId);
    formData.append("jobLocaType", jobLocaType);
    formData.append("salary", salary);
    formData.append("status", status);

    const res = await fetch(
      `${apiUrl}/api/jobPost/addJob`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    const userFormError = document.getElementById("userFormError");
    data.message !== undefined
      ? (userFormError.innerText = data.message)
      : (userFormError.innerText = "");

    if (res.ok) {
      Swal.fire({
        position: "center",
        icon: "success",
        title:
          signUser.role === "Admin"
            ? "Job added successfully!"
            : "Job is submitted for approval",
        showConfirmButton: true,
        
      });
      setJobItems({
        title: "",
        country: "",
        city: "",
        email: "",
        industryId: "",
        jobImage: "",
        countryImage: "",
        companyName: "",
        whatsApp: "",
        jobType: "",
        location: "",
        categoryId: "",
        jobLocaType: "",
        salary: "",
      });
      setReqcHtml("");
      setDescHtml("");
      setComcHtml("");
      setPerksHtml("");
      allJobPosts();
    }
  };

  const valueChanged = (e) => {
    if (e.target.files) {
      setJobItems({ ...jobItems, [e.target.name]: e.target.files[0] });
    } else {
      setJobItems({ ...jobItems, [e.target.name]: e.target.value });
    }
    if (e.target.name === "country") {
      setCountryCity(e.target.value);
    }
  };

  const allCategories = jobCat?.map((cat) => {
    return { value: cat._id, label: cat.category };
  });

  const allIndustries = jobInd?.map((ind) => {
    return { value: ind._id, label: ind.industry };
  });

  const allCountries =
    jobCon?.map((data) => {
      return { value: data?._id, label: data.country };
    });
  const allCities =
    jobCity?.filter(data => data.countryId?._id === countryCity).map((data) => {
      return { value: data._id, label: data.city };
    });

  // job form data
  const jobPostForm = [
    {
      name: "title",
      val: jobItems.title,
      type: "text",
      placeH: "User Name",
      conId: "floatingInput",
      lab: "Job Title",
      star: "*",
    },
    {
      name: "country",
      val: jobItems.country,
      type: "select",
      placeH: "Country",
      conId: "floatingSelect",
      lab: "Country",
      star: "*",
      options: [{ value: "", label: "Select Country" }, ...allCountries],
    },
    {
      name: "city",
      val: jobItems.city,
      type: "select",
      placeH: "City",
      conId: "floatingInput",
      lab: "City",
      star: "*",
      options: [{ value: "", label: "Select City" }, ...allCities],
    },
    {
      name: "email",
      val: jobItems.email,
      type: "email",
      placeH: "Company Email",
      conId: "floatingInput",
      lab: "Company Email",
    },
    {
      name: "industryId",
      val: jobItems.industryId,
      type: "select",
      placeH: "Industry",
      conId: "floatingInput",
      lab: "Industry",
      star: "*",
      options: [{ value: "", label: "Select Industry" }, ...allIndustries],
    },
    {
      name: "description",
      val: jobItems.description,
      type: "textarea",
      placeH: "Job Description",
      conId: "floatingInput",
      lab: "Job Description",
      star: "*",
    },
    {
      name: "requirements",
      val: jobItems.requirements,
      type: "textarea",
      placeH: "Requirements",
      conId: "floatingInput",
      lab: "Requirements",
      star: "*",
    },
    {
      name: "jobImage",
      type: "File",
      placeH: "Company Logo",
      conId: "formFile",
      lab: "Company Logo",
    },
    {
      name: "perks",
      val: jobItems.perks,
      type: "textarea",
      placeH: "Perks & Benefits",
      conId: "floatingInput",
      lab: "Perks & Benefits",
    },
    {
      name: "companyName",
      val: jobItems.companyName,
      type: "text",
      placeH: "Company Name",
      conId: "floatingInput",
      lab: "Company Name",
    },
    {
      name: "whatsApp",
      val: jobItems.whatsApp,
      type: "text",
      placeH: "WhatsApp",
      conId: "floatingInput",
      lab: "WhatsApp",
    },
    {
      name: "jobType",
      val: jobItems.jobType,
      type: "select",
      placeH: "Job Type",
      conId: "floatingSelect",
      lab: "Job Type",
      star: "*",
      options: [
        { value: "", label: "Select An Option" },
        { value: "Full Time", label: "Full Time" },
        { value: "Part Time", label: "Part Time" },
        { value: "Contract Based", label: "Contract Based" },
      ],
    },
    {
      name: "jobLocaType",
      val: jobItems.jobLocaType,
      type: "select",
      placeH: "Job Location Type",
      conId: "floatingSelect",
      lab: "Job Location Type",
      options: [
        { value: "", label: "Select An Option" },
        { value: "On Site", label: "On Site" },
        { value: "Remote", label: "Remote" },
        { value: "Hybrid", label: "Hybrid" },
      ],
    },
    {
      name: "categoryId",
      val: jobItems.categoryId,
      type: "select",
      placeH: "Category",
      conId: "floatingInput",
      lab: "Category",
      options: [{ value: "", label: "Select Category" }, ...allCategories],
    },
    {
      name: "salary",
      val: jobItems.salary,
      type: "text",
      placeH: "Salary",
      conId: "floatingInput",
      lab: "Salary",
    },
    {
      name: "aboutCompany",
      val: jobItems.aboutCompany,
      type: "textarea",
      placeH: "About Company",
      conId: "floatingInput",
      lab: "About Company",
    },
  ];
  return (
    <>
      <section className="">
        <Container>
          <Form onSubmit={addJob} className="admin-form">
            <div className="form-title">
              <h2> Add A Job</h2>
            </div>
            <div id="userFormError" className="text-danger"></div>
            <Row className="justify-content-center">
              {jobPostForm &&
                jobPostForm.map((job, index) => {
                  return (
                    <Col
                      key={index}
                      md={
                        job.name === "jobImage" ||
                          job.name === "countryImage" ||
                          job.name === "description" ||
                          job.name === "requirements" ||
                          job.name === "aboutCompany" ||
                          job.name === "title" ||
                          job.name === "perks" ||
                          job.name === "companyName"
                          ? 12
                          : job.name === "email" ||
                            job.name === "industryId" ||
                            job.name === "categoryId" ||
                            job.name === "salary" ||
                            job.name === "country" ||
                            job.name === "city"
                            ? 6
                            : 4
                      }
                    >
                      <div>
                        {job.type === "textarea" ? (
                          job.name === "description" ? (
                            <div>
                              <label className="mb-2">
                                Job Description
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <ReactQuill
                                className="mb-3"
                                theme="snow"
                                name={job.name}
                                value={descHtml}
                                onChange={handleDescChange}
                              />
                            </div>
                          ) : job.name === "aboutCompany" ? (
                            <div className="mt-3">
                              <label className="mb-2">About Company</label>
                              <ReactQuill
                                className="mb-3"
                                theme="snow"
                                name={job.name}
                                value={comHtml}
                                onChange={handleComcChange}
                              />
                            </div>
                          ) : job.name !== "perks" ? (
                            <div>
                              <label className="mb-2">
                                Job Requirements
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <ReactQuill
                                className="mb-3"
                                theme="snow"
                                name={job.name}
                                value={reqHtml}
                                onChange={handleReqcChange}
                              />
                            </div>
                          ) : (
                            <div>
                              <label className="mb-2">Perks & Benefits</label>
                              <ReactQuill
                                className="mb-3"
                                theme="snow"
                                name={job.name}
                                value={perksHtml}
                                onChange={handlePerksChange}
                              />
                            </div>
                          )
                        ) : job.type === "select" ? (
                          job.name === "categoryId" ? (
                            <div>
                              <FloatingLabel
                                controlId={job.conId}
                                label={
                                  <span className="custom-label">
                                    {job.lab}
                                    <span className="star">{job.star}</span>
                                  </span>
                                }
                              >
                                <Form.Select
                                  className="mb-1"
                                  name={job.name}
                                  onChange={valueChanged}
                                  value={job.val}
                                  aria-label="Floating label select example"
                                >
                                  {job.options.map((opt, index) => {
                                    return (
                                      <option key={index} value={opt.value}>
                                        {opt.label}
                                      </option>
                                    );
                                  })}
                                </Form.Select>
                                <AddCatInJob />
                              </FloatingLabel>
                            </div>
                          ) : job.name === "industryId" ? (
                            <FloatingLabel
                              controlId={job.conId}
                              label={
                                <span className="custom-label">
                                  {job.lab}
                                  <span className="star">{job.star}</span>
                                </span>
                              }
                            >
                              <Form.Select
                                className="mb-1"
                                name={job.name}
                                onChange={valueChanged}
                                value={job.val}
                                aria-label="Floating label select example"
                              >
                                {job.options.map((opt, index) => {
                                  return (
                                    <option key={index} value={opt.value}>
                                      {opt.label}
                                    </option>
                                  );
                                })}
                              </Form.Select>
                              <AddIndInJob />
                            </FloatingLabel>
                          ) : job.name === "country" ? (
                            <FloatingLabel
                              className="mb-3"
                              controlId={job.conId}
                              label={
                                <span className="custom-label">
                                  {job.lab}
                                  <span className="star">{job.star}</span>
                                </span>
                              }
                            >
                              <Form.Select
                                name={job.name}
                                onChange={valueChanged}
                                value={job.val}
                                aria-label="Floating label select example"
                              >
                                {job.options.map((opt, index) => {
                                  return (
                                    <option key={index} value={opt.value}>
                                      {opt.label}
                                    </option>
                                  );
                                })}
                              </Form.Select>
                              <AddCountryInJob />
                            </FloatingLabel>
                          ) : job.name === "city" ? (
                            <FloatingLabel
                              controlId={job.conId}
                              label={
                                <span className="custom-label">
                                  {job.lab}
                                  <span className="star">{job.star}</span>
                                </span>
                              }
                            >
                              <Form.Select
                                name={job.name}
                                onChange={valueChanged}
                                value={job.val}
                                aria-label="Floating label select example"
                              >
                                {job.options.map((opt, index) => {
                                  return (
                                    <option key={index} value={opt.value}>
                                      {opt.label}
                                    </option>
                                  );
                                })}
                              </Form.Select>
                              <AddCityInJob />
                            </FloatingLabel>
                          ) : (
                            <FloatingLabel
                              controlId={job.conId}
                              label={
                                <span className="custom-label">
                                  {job.lab}
                                  <span className="star">{job.star}</span>
                                </span>
                              }
                            >
                              <Form.Select
                                name={job.name}
                                onChange={valueChanged}
                                value={job.val}
                                aria-label="Floating label select example"
                              >
                                {job.options.map((opt, index) => {
                                  return (
                                    <option key={index} value={opt.value}>
                                      {opt.label}
                                    </option>
                                  );
                                })}
                              </Form.Select>
                            </FloatingLabel>
                          )
                        ) : (
                          <FloatingLabel
                            controlId={job.conId}
                            label={
                              <span className="custom-label">
                                {job.lab}
                                <span className="star">{job.star}</span>
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
                              maxLength={
                                job.name === "title"
                                  ? 60
                                  : job.name === "email"
                                    ? 40
                                    : job.name === "WhatsApp"
                                      ? 15
                                      : job.name === "companyName"
                                        ? 20
                                        : undefined
                              }
                            />
                          </FloatingLabel>
                        )}
                      </div>
                    </Col>
                  );
                })}
            </Row>
            <div className="d-flex justify-content-center pb-3">
              <Button type="submit" className="first-button">
                Add Job
              </Button>
            </div>
          </Form>
        </Container>
      </section>
    </>
  );
}
