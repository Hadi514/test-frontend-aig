import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import jobContext from "../../ContextApi/JobContext";
import { Link, useNavigate } from "react-router-dom";
import JobCountriesContext from "../../ContextApi/JobCountryContext";
// import latestJobsImage from '../../assets/Images/latest-jobs-img.avif'

function JobByField() {

  const { postedJobs } = useContext(jobContext);
  const navigate = useNavigate()
  const { setIndustry } = useContext(JobCountriesContext);
  const [uniqIndustry, setUniqIndustry] = useState([])
  const setIndustryFn = (industryUrl) => {
    setIndustry(industryUrl)
    navigate("/jobs-by-industry")
  }

  const approvedLatestJobs = postedJobs?.filter(job => job.status !== "Pending").filter((job) => job.status !== "N")

  useEffect(() => {
    // Extract unique industries with their details
    const uniqueIndustry = postedJobs
      ?.reduce((acc, job) => {
        const industry = job.industryId;
        if (industry && !acc.find(item => item._id === industry._id)) {
          acc.push(industry);
        }
        return acc;
      }, []);
    setUniqIndustry(uniqueIndustry);
  }, [postedJobs]);


  return (
    <>
      <section className="latest-jobs-and-category px-lg-4 py-5">
        <Container fluid>
          <Row className="g-4">
            <Col md={5} className="latest-jobs-col">
              <div className="d-flex justify-content-between align-items-center">
                <h2>Latest Jobs</h2>
                <Button
                  as={Link}
                  to="/jobs"
                  className="bg-transparent border-0 fw-bold"
                >
                  View All&nbsp; <FontAwesomeIcon icon={faAnglesRight} />
                </Button>
              </div>
              <hr className="m-0" />
              <Row className="g-3 mt-2">
                {approvedLatestJobs &&
                  approvedLatestJobs
                    .slice(-5)
                    .reverse()
                    .map((job, index) => {
                      return (
                        <Col
                          md={12}
                          key={index}
                          className="d-flex align-items-start"
                          style={{ borderBottom: "1px solid #ccc" }}
                        >
                          <div
                            className="me-3 latest-jobs-title"
                          >
                            <Link
                              to={`/job-detail/${job._id}`}
                            >
                              <h5>
                                {job.title.length > 50
                                  ? job.title.slice(0, 50) + "..."
                                  : job.title}
                              </h5>
                              <p>{job.city?.city} | {job.country?.country} | {job.companyName}</p>
                            </Link>
                          </div>
                        </Col>
                      );
                    })}
              </Row>
            </Col>

            <Col md={7} className="text-center">
              <h2>Find Jobs In Your Field</h2>
              <Row className="g-3">
                {uniqIndustry?.slice(0, 12).map((item, index) => {
                  return (
                    <Col key={index} md={3} onClick={() => setIndustryFn(item.industry)}>
                      <Card className="category-wise-jobs mb-3" style={{ cursor: 'pointer', height: '100%' }}>
                        <Card.Body>
                          <div className="card-content  align-items-center">
                            {item.image ? (
                              <img src={item.image} style={{ width: "30px" }} alt="" />
                            ) : (
                              <FontAwesomeIcon icon={faBriefcase} style={{ fontSize: "25px", color: "var(--primary-color)" }} />
                            )}
                            <h6 className="m-0">{item.industry}</h6>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
              <Button
                as={Link}
                to="/jobs-by-industry"
                className="first-button mt-4"
              >
                Find More&nbsp;
                <FontAwesomeIcon icon={faAnglesRight} />
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default JobByField;