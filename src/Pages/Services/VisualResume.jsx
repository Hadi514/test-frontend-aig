import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Col, Container, Row } from "react-bootstrap"
import visualResume from '../../assets/Images/visual-resume-writing.jpg'

function VisualResume() {
  return (
    <>
      <section className="job-head">
        <div className="page-head-overlay">
          <Container>
            <Row className="justify-content-center align-items-center py-6">
              <Col md={9}>
                <h2 className="text-center text-white fw-bold">
                  Visual Resume Writing
                </h2>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      <section className="py-5" style={{backgroundColor: '#f1f3f5'}}>
        <Container>
            <Row>
                <Col className="text-center">
                <div className="section-head">
                    <h2 className="text-primary">Transform Your Resume with Visual Impact</h2>
                </div>
                <p>Our Visual Resume Writing service is designed to help you stand out by presenting your skills, experience, and achievements in a visually appealing, professional format. Unlike traditional text-only resumes, a visual resume combines structure and style, allowing you to showcase your strengths with eye-catching design elements that captivate employers and leave a lasting impression. Perfect for professionals in creative industries or anyone looking to make a memorable impact, our Visual Resume Writing service enhances the presentation of your career story.</p>
                </Col>
            </Row>
        </Container>
      </section>

      <section className="py-4">
        <Container>
          <Row className="align-items-center ">
            <Col md={5}>
              <img
                src={visualResume}
                alt="text-resume-writing"
                className="img-fluid site-img"
              />
            </Col>
            <Col md={7}>
              <div className="section-head">
                <h2 className="text-primary">
                Why Choose a Visual Resume?
                </h2>
              </div>
              <p>In a competitive job market, a visually striking resume can make all the difference. With thoughtfully designed layouts and unique elements, a visual resume not only grabs attention but also emphasizes your qualifications effectively. Here’s why our Visual Resume Writing service can be a game-changer for your career:</p>
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
                  &nbsp;Stand out with a resume crafted by experts to reflect your style while maintaining professionalism.
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    style={{ color: "var(--primary-color)" }}
                  />
                  &nbsp;Choose from a variety of industry-tailored templates that highlight your key strengths.
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    style={{ color: "var(--primary-color)" }}
                  />
                  &nbsp;Organized sections ensure important details are easy to find, so your qualifications shine.
                </li>
                <li>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    style={{ color: "var(--primary-color)" }}
                  />
                  &nbsp;Use graphics and unique colors to present your skills and experience with clarity and impact.
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5" style={{backgroundColor: '#f1f3f5'}}>
        <Container>
            <Row>
                <Col className="text-center">
                <div className="section-head">
                    <h2 className="text-primary">Get Noticed with a Visual Resume</h2>
                </div>
                <p>A visual resume helps you capture attention right from the start, setting you apart in a way that’s both professional and memorable. Whether you’re looking to make a career shift, apply for a creative role, or simply add a touch of modernity to your application, our Visual Resume Writing service will equip you with a standout resume that speaks to your talents. Ready to elevate your resume? Contact us today to get started!</p>
                </Col>
            </Row>
        </Container>
      </section>
    </>
  )
}

export default VisualResume
