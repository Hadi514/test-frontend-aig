import { useContext } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import jobContext from "../../ContextApi/JobContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import jobConContext from "../../ContextApi/JobConContext";

function JobsByCountry() {
  const { postedJobs } = useContext(jobContext);
  const { setCountry } = useContext(jobConContext);

  // Create a map to store job counts by country
  const jobCount = (con) => {
    const countJob = postedJobs?.filter(job => job.country?.country === con)
    return countJob.length
  }

  // Filter postedJobs to only include one job per unique country
  const uniqueCountries = Array.from(
    new Map(
      postedJobs
        .filter(job => job.country)
        .map(job => [job.country.country, job.country])
    ).values()
  );

  return (
    <section
      className="jobs-by-countries px-lg-4 py-4"
      style={{ backgroundColor: "#f2f2f2" }}
    >
      <Container fluid>
        <h2
          className="py-3 section-title text-center"
          style={{ color: "black" }}
        >
          Search Jobs By Country
        </h2>
        <Row className="g-4">
          {uniqueCountries &&
            uniqueCountries.slice(0, 8).map((job, index) => {

              return (
                <Col
                  md={3}
                  key={index}
                  as={Link}
                  to="/jobs-by-country"
                  onClick={() => setCountry(job.country)}
                >
                  <Card
                    className="text-white"
                    style={{ borderRadius: "50px 0" }}
                  >
                    <div className="country-img">
                      <img
                        src={job.image}
                        alt="jobs-by-country"
                        className="img-fluid"
                        style={{ borderRadius: "50px 0" }}
                      />
                      <div
                        className="overlay"
                        style={{ borderRadius: "50px 0" }}
                      ></div>
                      <div className="country-text text-center">
                        <h3>{job.country}</h3>
                        <p className="text-white">{jobCount(job.country)} Jobs</p>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
        </Row>
        <div className="d-flex justify-content-center mt-4">
          <Button as={Link} to="/jobs-by-country">
            See More&nbsp;
            <FontAwesomeIcon icon={faAnglesRight} />
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default JobsByCountry;
