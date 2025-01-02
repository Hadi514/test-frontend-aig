import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Container, Row } from "react-bootstrap";
import textResume from "../../assets/Images/text-resume-writing.avif";
import ResumeWriting2 from "../../assets/Images/resume-writing-img-2.png";

function TextResume() {
  return (
    <>
      <section className="job-head">
        <div className="page-head-overlay">
          <Container>
            <Row className="justify-content-center align-items-center py-6">
              <Col md={9}>
                <h2 className="text-center text-white fw-bold">
                  Text Resume Writing
                </h2>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      <section className="py-5" style={{ backgroundColor: "#f1f3f5" }}>
        <Container>
          <Row className="align-items-start ">
            <Col md={6}>
              <div className="section-head">
                <h2 className="text-primary">Craft a Resume That Stands Out</h2>
              </div>
              <p>
                Our upcoming Text Resume Writing service will make creating a
                professional resume easier than ever. Whether you are a recent
                graduate or a seasoned professional, this feature will guide you
                through each step to help you craft a polished resume tailored
                to your career goals. With user-friendly tools, helpful prompts,
                and examples to inspire you, you’ll be able to showcase your
                skills, experience, and achievements in a clear, concise format.
              </p>
            </Col>
            <Col md={6}>
              <img
                src={textResume}
                alt="text-resume-writing"
                className="img-fluid site-img"
                style={{height: '250px'}}
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-4">
        <Container>
          <Row className="align-items-center ">
            <Col md={5}>
              <img
                src={ResumeWriting2}
                alt="text-resume-writing"
                className="img-fluid site-img"
              />
            </Col>
            <Col md={7}>
              <div className="section-head">
                <h2 className="text-primary">
                  What to Expect From Our Text Resume Writing Service
                </h2>
              </div>
              <ul
                style={{
                  listStyle: "none",
                  padding: "0",
                  margin: "0",
                  lineHeight: "2",
                }}
              >
                <li>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    style={{ color: "var(--primary-color)" }}
                  />
                  &nbsp;Step-by-step guidance through each section, from contact
                  details to work experience and skills.
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    style={{ color: "var(--primary-color)" }}
                  />
                  &nbsp;Clean, modern templates designed to highlight your
                  strengths and make a lasting impression.
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    style={{ color: "var(--primary-color)" }}
                  />
                  &nbsp;Personalized recommendations based on your industry,
                  career level, and job goals to help you stand out.
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    style={{ color: "var(--primary-color)" }}
                  />
                  &nbsp;In-app advice and sample content to help you present
                  your background effectively.
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-4" style={{backgroundColor: '#f1f3f5'}}>
        <Container>
            <Row>
                <Col>
                <div className="section-head">
                    <h2 className="text-primary">Looking Forward to Empowering Your Career</h2>
                </div>
                <p>Our Text Resume Writing feature is coming soon, designed to make resume building both simple and impactful. This tool will help you craft a professional, polished resume that showcases your strengths, experiences, and career goals, giving you an edge in today’s competitive job market. We’re excited to bring you a user-friendly experience that streamlines the entire resume-writing process. Stay tuned as we prepare to launch this new service and get ready to take a confident step toward your next big opportunity!</p>
                </Col>
            </Row>
        </Container>
      </section>
    </>
  );
}

export default TextResume;
