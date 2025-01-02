import { Col, Container, Row } from "react-bootstrap"

function TermsAndConditions() {
  return (
    <>
      <section className="job-head">
        <div className="page-head-overlay">
          <Container>
            <Row className="justify-content-center align-items-center py-6">
              <Col md={9}>
                <h2 className="text-center text-white fw-bold">
                  Terms And Conditions
                </h2>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      <section
        className="resources py-5"
        style={{ backgroundColor: "#f1f3f5" }}
      >
        <Container>
          <Row>
            <Col>
              <div className="section-head">
                <h2 className="text-primary">Terms And Conditions</h2>
                <p>
                Welcome to AIG Jobs! By accessing or using our platform, you agree to comply with and be bound by the following terms and conditions. Please read them carefully. If you do not agree, you may not use our services.
                </p>
              </div>
              <div className="">
                <h2 className="">1. Use Of The Platform</h2>
              </div>
              <ul style={{ lineHeight: "2" }}>
                <li>
                AIG Jobs provides a platform for job seekers and employers to connect.
                </li>
                <li>
                You must use the platform only for lawful purposes and in compliance with all applicable laws and regulations.
                </li>
                <li>
                Any unauthorized use of the platform, including but not limited to data scraping or reverse engineering, is strictly prohibited.
                </li>
              </ul>
              <div className="">
                <h2 className="">2. Account Responsibilities</h2>
              </div>
              <ul style={{ lineHeight: "2" }}>
                <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                <li>Any activity conducted through your account is your responsibility. Notify us immediately of any unauthorized access.</li>
                <li>AIG Jobs reserves the right to suspend or terminate accounts that violate these terms.</li>
              </ul>

              <div className="">
                <h2 className="">3. Job Postings and Applications</h2>
              </div>
              <ul style={{ lineHeight: "2" }}>
                <li>Employers are responsible for ensuring the accuracy and legality of job postings.</li>
                <li>AIG Jobs does not guarantee job placement or the legitimacy of job listings. We advise users to exercise caution and perform due diligence.</li>
              </ul>
              <div className="">
                <h2 className="">4. User Conduct</h2>
                <p>
                You agree not to:
                </p>
                <ul style={{ lineHeight: "2" }}>
                <li>Post or transmit false, misleading, or inappropriate content.</li>
                <li>Harass, abuse, or harm other users of the platform.</li>
                <li>Upload harmful software, such as viruses or malware, onto the platform.</li>
              </ul>
              </div>
              <div className="">
                <h2 className="">5. Intellectual Property</h2>
              </div>
              <ul style={{ lineHeight: "2" }}>
                <li>All content, design, and materials on AIG Jobs are the intellectual property of AIG Jobs unless otherwise stated.</li>
                <li>Users may not copy, reproduce, or distribute any material without prior permission.</li>
              </ul>
              <div className="">
                <h2 className="">6. Limitation of Liability</h2>
              </div>
              <ul style={{ lineHeight: "2" }}>
                <li>AIG Jobs is not liable for any direct, indirect, or incidental damages arising from the use or inability to use the platform.</li>
                <li>We do not guarantee the accuracy or completeness of information on our platform.
                </li>
              </ul>

              <div className="">
                <h2 className="">7. Third-Party Links</h2>
                <p>
                The platform may include links to third-party websites or services. AIG Jobs is not responsible for the content or practices of these external sites.
                </p>
              </div>
              <div className="">
                <h2 className="">8. Termination</h2>
                <p>
                AIG Jobs reserves the right to terminate or suspend user accounts at our sole discretion, without notice, for violations of these terms or for any other reason.
                </p>
              </div>
              <div className="">
                <h2 className="">9. Changes to Terms</h2>
                <p>
                We may update these Terms and Conditions from time to time. Continued use of the platform after such updates constitutes your acceptance of the revised terms.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default TermsAndConditions
