import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import JobApplyForm from "./JobApplyForm";
import companyDefaultImg from '../../assets/Images/company-default-img.avif'
import Swal from "sweetalert2";
import UserContext from "../../ContextApi/UserContext";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import jobContext from "../../ContextApi/JobContext";

function JobDetail() {
  const { signUser } = useContext(UserContext)
  const { setColAdjust, setPostedJobsById, postedJobsById } = useContext(jobContext)
  const { id } = useParams();

  const apiUrl = import.meta.env.VITE_API_URL;

  const jobByTitle = async () => {
    const res = await fetch(
      `${apiUrl}/api/jobPost/getJobById/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    setPostedJobsById(data);
  };

  useEffect(() => {
    jobByTitle(id)
  }, [id])

  const saveJob = (job) => {
    if (signUser?.role) {

      const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
      const checkJob = savedJobs.some((savjob) => savjob._id === job._id);
      if (!checkJob) {
        savedJobs.push(job);
        localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
        Swal.fire("You saved this job!");
      } else {
        Swal.fire("Job already saved!");
      }
    } else {
      Swal.fire("You have to sign in first!");
    };
  }

  useEffect(() => {
    jobByTitle();
  }, []);

  const formatDate = (jobDate) => {
    const todayDate = new Date();
    const jobPostedDate = new Date(jobDate);
    const differenceInTime = todayDate - jobPostedDate; // Difference in milliseconds
    const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24)); // Convert ms to days
    return differenceInDays === 0 ? "Today" : `${differenceInDays + 1} days ago`;
  };

  const onClosFeClick = () => {
    setColAdjust(12)
    setPostedJobsById([])
    window.history.replaceState(null, "", "/jobs");
  }

  return (
    <>

{postedJobsById && (
        <Helmet>
          <title>{postedJobsById.title} | Job Portal</title>
          <meta name="description" content={postedJobsById.description || "Job details available here"} />
          <meta property="og:title" content={postedJobsById.title} />
          <meta property="og:description" content={postedJobsById.description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={window.location.href} />
          <meta
            property="og:image"
            content={postedJobsById.jobImage || companyDefaultImg}
          />
        </Helmet>
      )}


      <section
        className="job-detail"
        style={{ backgroundColor: "#F2F5F8" }}
      >
        <Card className="detail-head p-4" style={{ overflowY: "auto", height: "100vh" }}>
          <div className="d-flex justify-content-end">
            <FontAwesomeIcon icon={faClose} onClick={() => onClosFeClick()} style={{ fontSize: "25px", color: "#9a9a9a", cursor: "pointer" }}></FontAwesomeIcon>
          </div>
          <div className="detail-wrapper d-flex align-items-center">
            <div
              className="p-3 me-3"
              style={{ backgroundColor: "#f2f5f5" }}
            >
              {postedJobsById.jobImage ? (
                <img src={postedJobsById.jobImage} alt="" className="img-fluid" style={{ height: '40px', width: '40px' }} />
              ) : (
                <img src={companyDefaultImg} alt="" className="img-fluid" style={{ height: '40px', width: '40px' }} />
              )}
            </div>
            <div className="d-flex justify-content-between">
              <div className="section-head">
                <h2 className="" style={{ fontSize: "100%", lineHeight: "1.5rem" }}>
                  {postedJobsById.title}
                </h2>
                <p className="m-0" style={{ color: "#a9a9a9" }}>
                  {postedJobsById.industryId?.industry}
                </p>
                <p className="m-0" style={{ color: "#a9a9a9" }}>
                  {postedJobsById.salary}
                </p>
              </div>

            </div>
          </div>
          <div className="row mt-4 justify-content-between">
            <div className="col-md-12 mb-3">
              <p className="m-0">
                <span className="fw-bold">Location:</span> {postedJobsById.city?.city} | {postedJobsById.country?.country}
              </p>
            </div>
            {postedJobsById.companyName && (
              <div className="col-md-12 mb-3">
                <p className="m-0"><span className="fw-bold">Company Name:</span> {postedJobsById.companyName}</p>
              </div>
            )}
            <div className="col-md-12">
              <p className="m-0"><span className="fw-bold">Job Type:</span> {postedJobsById.jobType}</p>
            </div>
          </div>
          <div className="row mt-4 justify-content-between">
            <div className="col-md-5">
              <p><span className="fw-bold">Posted :</span> {formatDate(postedJobsById.createdAt)}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 d-flex">
              <div className="me-2">
                <JobApplyForm jobApplyId={postedJobsById._id} />
              </div>
              <div className="">
                <Button className="d-flex align-items-center " onClick={() => saveJob(postedJobsById)} style={{ padding: "5px 55px", backgroundColor: "transparent", color: "var(--primary-color)" }}><i className="fa fa-heart"></i>&nbsp;Save</Button>
              </div>
            </div>
          </div>
          <hr />
          <div className="mt-2">
            <h5>Job Description</h5>
            <p
              className="m-0"
              dangerouslySetInnerHTML={{
                __html: postedJobsById.description,
              }}
            ></p>
          </div>
          <div className="mt-3">
            <h5>Job Requirements</h5>
            <p
              className="m-0"
              dangerouslySetInnerHTML={{
                __html: postedJobsById.requirements,
              }}
            ></p>
          </div>

          {postedJobsById.perks ? (
            <div className="mt-3">
              <h5>Perks & Benefits</h5>
              <p
                className="m-0"
                dangerouslySetInnerHTML={{
                  __html: postedJobsById.perks,
                }}
              ></p>
            </div>
          ) : ""}

          {postedJobsById.aboutCompany ? (
            <div className="mt-3">
              <h5>About Company</h5>
              <p
                className="m-0"
                dangerouslySetInnerHTML={{
                  __html: postedJobsById.aboutCompany,
                }}
              ></p>
            </div>
          ) : ""}
        </Card>
      </section>
    </>
  );
}

export default JobDetail;
