import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GooglePlay from '../../src/assets/Images/google-play-button.avif'
import AppleStore from '../../src/assets/Images/apple-store-button.avif'
import { Col, Container, Row } from "react-bootstrap";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { Link, useLocation } from "react-router-dom";

function Footer() {
  const { pathname } = useLocation()
  return (
    <div>
      {!pathname.startsWith("/adminPanel") && !pathname.startsWith("/employer-panel") && !pathname.startsWith("/editor-panel") && !pathname.startsWith("/user-panel") ? (

        <div className="chat-icon">
          <a href="https://whatsapp.com/channel/0029VaCLLQY0AgW6lMjU5B0z" target="_blank">
            <FontAwesomeIcon icon={faWhatsapp} style={{ color: "#25D366", fontSize: "65px" }} />
          </a>
        </div>
      ) : ""}
      <section className="footer-section " style={{ backgroundColor: "#fff" }}>

        <Container fluid>
          <Row className=" justify-content-center">
            <Col md={2}>
              <h6 className="footer-title">Jobs</h6>
              <ul className="footer-list">
                <li ><Link to="/jobs" style={{ color: '#000' }}>Find Jobs</Link></li>
                <li><Link to="/jobs-by-industry" style={{ color: '#000' }}>Jobs By Industry</Link></li>
                <li><Link to="/jobs-by-country" style={{ color: '#000' }}>Jobs By Location</Link></li>
                <li><Link to="/jobs-by-city" style={{ color: '#000' }}>Jobs By City</Link></li>
                <li><Link to="/jobs-by-category" style={{ color: '#000' }}>Jobs By Category</Link></li>
                <li><Link to="/remote-jobs" style={{ color: '#000' }}>Remote Jobs</Link></li>
              </ul>
            </Col>

            <Col md={2}>
              <h6 className="footer-title">Interviews</h6>
              <ul className="footer-list">
                <li><Link to="/interviews" style={{ color: '#000' }}>Interviews</Link></li>
                <li><Link to="/interviews/interview-tips-and-tricks" style={{ color: '#000' }}>Interview Tips & Tricks</Link></li>
                <li><Link to="/interviews/interview-scheduler" style={{ color: '#000' }}>Interview Scheduler</Link></li>
              </ul>
            </Col>

            <Col md={2}>
              <h6 className="footer-title">Services</h6>
              <ul className="footer-list">
                <li><Link to="/services/text-resume-writing" style={{ color: '#000' }}>Text Resume Writing</Link></li>
                <li><Link to="/services/visual-resume-writing" style={{ color: '#000' }}>Visual Resume Writing</Link></li>
                <li><Link to="resume-maker-services" style={{ color: '#000' }}>Resume Maker</Link></li>
              </ul>
            </Col>

            <Col md={2}>
              <h6 className="footer-title">Resources</h6>
              <ul className="footer-list">
                <li><Link to="/resource-detail/market-research-reports" style={{ color: '#000' }}>Market Research Reports</Link></li>
                <li><Link to="/resource-detail/qatar-labor-laws" style={{ color: '#000' }}>Qatar Labor Law</Link></li>
                <li><Link to="/resource-detail/protecting-rights-and-ensuring-fair-practices" style={{ color: '#000' }}>Oman Labor Laws</Link></li>
                <li><Link to="/resource-detail/bahrain-labor-laws" style={{ color: '#000' }}>Bahrain Labor Law</Link></li>
                <li><Link to="/resource-detail/key-elements-of-ksa-labor-laws" style={{ color: '#000' }}>KSA Labor Law</Link></li>
                <li><Link to="/resource-detail/kuwait-labor-laws" style={{ color: '#000' }}>Kuwait Labor Law</Link></li>
              </ul>
            </Col>

            <Col md={2}>
              <h6 className="footer-title">AIG Jobs</h6>
              <ul className="footer-list">
                <li><Link to="/about" style={{ color: '#000' }}>About</Link></li>
                <li><Link to="/privacy-policy" style={{ color: '#000' }}>Privacy Policy</Link></li>
                <li><Link to="/terms-and-conditions" style={{ color: '#000' }}>Terms & Conditions</Link></li>
                <li><Link to="/contact" style={{ color: '#000' }}>Contact Us</Link></li>
              </ul>
            </Col>

            <Col md={2}>
              <h6 className="footer-title">Follow Us</h6>
              <ul className="social-links footer-list d-flex">
                <li><a href="https://facebook.com" target="_blank">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    size="2x"
                    className="awesome-icons"
                  />
                </a>
                </li>
                <li>
                  <a href="https://instagram.com" target="_blank">
                    <FontAwesomeIcon
                      icon={faInstagram}
                      size="2x"
                      className="awesome-icons"
                    />
                  </a>
                </li>
                <li>
                  <a href="https://x.com" target="_blank">
                    <FontAwesomeIcon
                      icon={faTwitter}
                      size="2x"
                      className="awesome-icons"
                    />
                  </a>
                </li>
                <li> <a href="https://youtube.com" target="_blank">
                  <FontAwesomeIcon
                    icon={faYoutube}
                    size="2x"
                    className="awesome-icons"
                  />
                </a>
                </li>
              </ul>
              <hr />
              <div className="download-buttons d-flex flex-column">
                <img src={GooglePlay} alt="download-from-google-play" className="img-fluid" style={{ width: '140px' }} />
                <img src={AppleStore} alt="download-from-apple-store" className="img-fluid d-lg-block" style={{ width: '175px', marginLeft: "-18px", marginTop: "-60px" }} />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <div className="text-center " style={{ backgroundColor: "#f1f3f5" }}>

        <p
          className="m-0 py-3"
          style={{ fontFamily: "poppins", fontWeight: "300", fontSize: "13px", marginTop: '-70px' }}
        >
          © copyright <span className="fw-bold">AIG Jobs</span>. All Rights
          Reserved. Developed With Love By{" "}
          <a
            href="https://technicmentors.com"
            className=" fw-bold"
            target="blank"
          >
            Technic Mentors
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default Footer;
