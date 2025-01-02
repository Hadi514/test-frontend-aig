import { faAnglesLeft, faAnglesRight, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faFileCircleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Container, Row } from "react-bootstrap";
import { faBookmark as farBookmark } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const unsavedJob = (id) => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs"));
    const checkJob = savedJobs && savedJobs.filter((job) => job._id !== id);
    if (checkJob) {
      localStorage.setItem("savedJobs", JSON.stringify(checkJob));
      let savedJobs = JSON.parse(localStorage.getItem("savedJobs"));
      setSavedJobs(savedJobs);
      Swal.fire("Job unsaved");
    }
  };

  useEffect(() => {
    let savedJobs = JSON.parse(localStorage.getItem("savedJobs"));
    setSavedJobs(savedJobs);
  }, []);

  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const saveJobPerPage = itemsPerPage

  const lastUserIndex = currentPage * saveJobPerPage
  const firstApplicationIndex = lastUserIndex - saveJobPerPage
  const currentApplications = savedJobs?.slice(firstApplicationIndex, lastUserIndex)

  const totalPages = Math.ceil(savedJobs?.length / saveJobPerPage)

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
  }
  return (
    <>

      <div>
        <p>Show <select name="" id="" onChange={(e) => setItemsPerPage(e.target.value)}>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select> Entries</p>
      </div>

      <section className="interview-section">
        <div className="table-responsive-sm">
          {savedJobs && savedJobs.length > 0 ? (
            <table className="admin-table">
              <thead>
                <tr className="form-title">
                  <th>#</th>
                  <th>Job Title</th>
                  <th>Comapny Name</th>
                  <th>City</th>
                  <th>Industry</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {currentApplications &&
                  currentApplications.map((job, index) => (
                    <tr key={index}>
                      <td>{firstApplicationIndex + index + 1}</td>
                      <td>{job.title}</td>
                      <td>{job.companyName}</td>
                      <td>{job.city}</td>
                      <td>{job.industryId?.industry}</td>
                      <td>
                        <a href={`/job-detail/${job.title?.replace(/ /g, "_")}`} target="_blank">
                          <FontAwesomeIcon
                            icon={faExternalLinkAlt}
                            style={{
                              color: "blue",
                              marginRight: "10px",
                              cursor: "pointer",
                            }}
                          />
                        </a>
                        <FontAwesomeIcon
                          icon={farBookmark}
                          style={{ color: "orange", cursor: "pointer" }}
                          title="Unsave"
                          onClick={() => unsavedJob(job._id)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <Container>
              <Row className="mt-5 justify-content-center align-items-center">
                <Col
                  className="py-7 text-center bg-white"
                  md={9}
                  style={{ boxShadow: "0 0 8px rgba(204, 204,204, 0.7)" }}
                >
                  <h1>No Saved Job Found!</h1>
                </Col>
              </Row>
            </Container>
          )}
        </div>
      </section>

      {savedJobs?.length > saveJobPerPage && (
        <div className="pagination-controls mt-3">
          <Button onClick={goToPreviousPage} disabled={currentPage === 1}>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </Button>
          <span className="me-2 ms-2">Page {currentPage} of {totalPages}</span>
          <Button onClick={goToNextPage} disabled={currentPage === totalPages}>
            <FontAwesomeIcon icon={faAnglesRight} />
          </Button>
        </div>
      )}
    </>
  );
}

export default SavedJobs;
