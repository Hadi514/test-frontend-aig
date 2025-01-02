import { Button, Card, Col, Container, Row } from "react-bootstrap";
import aboutImage from "../../assets/Images/about-aig.avif";
import whoWeAre from "../../assets/Images/who-we-are-img.avif";
import { faBriefcase, faCheck, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import whyCooseUs from "../../assets/Images/why-choose-aig.jpg"

function About() {
  return (
    <>
      <section className="job-head">
        <div className="page-head-overlay">
          <Container>
            <Row className="justify-content-center align-items-center py-6">
              <Col md={9}>
                <h2 className="text-center text-white fw-bold">
                  About AIG Jobs
                </h2>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      <section className="py-5 bg-white">
        <Container>
          <Row>
            <Col md={6}>
              <div className="section-head mb-4">
                <h2 className="text-primary">
                  Discover Opportunities with AIG Jobs, Your Career Partner
                </h2>
              </div>
              <p className="lead">
                Welcome to AIG Jobs – your trusted partner in navigating the job
                market and unlocking new career opportunities.
              </p>
              <p>
                At AIG Jobs, we believe that finding the right job is more than
                just submitting applications; it’s about discovering
                opportunities that align with your skills, aspirations, and
                goals. Our mission is to bridge the gap between talented
                individuals and top-tier employers, creating a platform where
                potential meets purpose.
              </p>
            </Col>
            <Col md={6}>
              <div className="about-img">
                <img src={aboutImage} alt="" className="img-fluid" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className=" py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="who-we-are-img">
                <img src={whoWeAre} alt="" className="img-fluid" />
              </div>
            </Col>
            <Col md={6}>
              <div className="section-head mb-4">
                <h2 className="text-primary">Who We Are?</h2>
              </div>
              <p>
                AIG Jobs is a comprehensive jobs portal designed to cater to the
                needs of job seekers and employers alike. With a user-friendly
                interface, advanced search features, and an extensive database
                of opportunities, we empower professionals to take the next step
                in their careers. Our team is driven by a commitment to
                excellence, ensuring that every job listing, career advice, and
                resource we provide meets the highest standards of quality and
                relevance.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className=" bg-white what-we-offer py-5">
        <Container>
          <Row className="justify-content-center">
            <div className="section-head mb-4">
              <h2 className="text-primary text-center">What We Offer?</h2>
            </div>
            <Col md={5}>
              <Card className="about-cards">
                <div className="card-content">
                  <FontAwesomeIcon
                    icon={faBriefcase}
                    style={{
                      fontSize: "35px",
                      color: "#fff",
                      backgroundColor: "var(--primary-color)",
                      padding: "3%",
                      borderRadius: "50px",
                      marginBottom: "15px",
                    }}
                  />
                  <h4 className="mb-3">For Job Seekers</h4>
                  <p>
                    Whether you’re starting your career, looking for a change,
                    or aiming for your dream role, AIG Jobs provides
                    personalized tools to help you succeed. From resume tips to
                    interview preparation, we are with you at every step of your
                    journey.
                  </p>
                  <div className="card-button">
                    <Button
                      as={Link}
                      to="/job-seekers"
                    >
                      Job Seeker
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
            <Col md={5}>
              <Card className="about-cards">
                <div className="card-content">
                  <FontAwesomeIcon
                    icon={faUserTie}
                    style={{
                      fontSize: "35px",
                      color: "#fff",
                      backgroundColor: "var(--primary-color)",
                      padding: "3%",
                      borderRadius: "50px",
                      marginBottom: "15px",
                    }}
                  />
                  <h4 className="mb-3">For Employers</h4>
                  <p>
                    Whether you’re starting your career, looking for a change,
                    or aiming for your dream role, AIG Jobs provides
                    personalized tools to help you succeed. From resume tips to
                    interview preparation, we are with you at every step of your
                    journey.
                  </p>
                  <div className="card-button">
                    <Button as={Link} to="/find-employers">Employers</Button>
                  </div>
                </div>
              </Card>
            </Col>
            <Col md={9} className="mt-5 text-center">
            <h3 className="mb-3">Our Vision</h3>
            <p className="lead">We envision a future where every individual can achieve professional fulfillment and every organization can build teams that drive success. At AIG Jobs, we aim to become the go-to platform for talent discovery and career advancement.</p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 ">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="section-head mb-4">
                <h2 className="text-primary">
                  Why AIG Jobs
                </h2>
              </div>
              <p className="lead">
              AIG Jobs connects you with opportunities that align with your skills and aspirations through a seamless, user-friendly platform. Whether you are a job seeker or an employer, we provide tailored solutions to help you succeed.
              </p>
              <ul className="p-0 m-0" style={{listStyle: "none", lineHeight: "2"}}>
                <li><FontAwesomeIcon icon={faCheck} style={{color: "var(--primary-color)"}}/>&nbsp;Extensive Job Listings: Access opportunities across industries, roles, and experience levels.</li>
                <li><FontAwesomeIcon icon={faCheck} style={{color: "var(--primary-color)"}}/>&nbsp;Innovative Tools: Advanced filtering, real-time updates, and career management resources.</li>
                <li><FontAwesomeIcon icon={faCheck} style={{color: "var(--primary-color)"}}/>&nbsp;Expert Support: Industry insights, career coaching, and personalized advice from our experts.</li>
                <li><FontAwesomeIcon icon={faCheck} style={{color: "var(--primary-color)"}}/>&nbsp;Trust and Reliability: Your growth is our priority, and we are committed to maintaining a platform built on trust and transparency.</li>
              </ul>
            </Col>
            <Col md={6}>
              <div className="about-img">
                <img src={whyCooseUs} alt="" className="img-fluid" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default About;
