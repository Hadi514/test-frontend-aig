import { Col, Container, Row } from "react-bootstrap";

function PrivacyPolicy() {
  return (
    <>
      <section className="job-head">
        <div className="page-head-overlay">
          <Container>
            <Row className="justify-content-center align-items-center py-6">
              <Col md={9}>
                <h2 className="text-center text-white fw-bold">
                  Privacy Policy
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
                <h2 className="text-primary">Privacy Policy</h2>
                <p>
                  At AIG Jobs, your privacy is our priority. This Privacy Policy
                  outlines how we collect, use, and protect your personal
                  information when you interact with our website and services.
                  By using AIG Jobs, you agree to the terms of this policy.
                </p>
              </div>
              <div className="">
                <h2 className="">1. Information We Collect</h2>
                <p>
                  We collect personal information to provide you with better
                  services and an improved experience. This may include:
                </p>
              </div>
              <ul style={{ lineHeight: "2" }}>
                <li>
                  Account Information: Name, email address, phone number, and
                  other details you provide during registration.
                </li>
                <li>
                  Job Preferences: Skills, career goals, and employment
                  preferences.
                </li>
                <li>
                  Usage Data: Information about your interactions with our
                  platform, such as the pages you visit and the jobs you apply
                  for.
                </li>
              </ul>
              <div className="">
                <h2 className="">2. How We Use Your Information</h2>
                <p>
                  Your information helps us deliver personalized services and
                  improve your experience. We use it to:
                </p>
              </div>
              <ul style={{ lineHeight: "2" }}>
                <li>Connect job seekers with relevant opportunities.</li>
                <li>Notify users about new job postings and updates.</li>
                <li>Enhance website functionality and performance.</li>
                <li>Prevent fraud and ensure the security of your data.</li>
              </ul>

              <div className="">
                <h2 className="">3. Sharing Your Information</h2>
                <p>
                  We do not sell or share your personal information with third
                  parties without your consent. However, we may share data with
                  trusted partners for:
                </p>
              </div>
              <ul style={{ lineHeight: "2" }}>
                <li>Matching job seekers with employers.</li>
                <li>Complying with legal obligations.</li>
                <li>Improving our services through analytics and feedback.</li>
              </ul>
              <div className="">
                <h2 className="">4. Cookies And Tracking</h2>
                <p>
                  We take data protection seriously. AIG Jobs employs advanced
                  security measures to safeguard your information from
                  unauthorized access, alteration, or disclosure.
                </p>
              </div>
              <div className="">
                <h2 className="">5. Data Security</h2>
                <p>
                  AIG Jobs uses cookies to enhance your browsing experience.
                  Cookies help us understand how you interact with our site and
                  provide personalized recommendations. You can manage or
                  disable cookies through your browser settings.
                </p>
              </div>

              <div className="">
                <h2 className="">6. Your Rights</h2>
                <p>You have the right to:</p>
              </div>
              <ul style={{ lineHeight: "2" }}>
                <li>Access and update your personal information.</li>
                <li>Request the deletion of your account and data.</li>
                <li>Opt out of marketing communications at any time.</li>
              </ul>

              <div className="">
                <h2 className="">7. Updates To This Policy</h2>
                <p>
                  We may update this Privacy Policy periodically to reflect
                  changes in our practices or legal requirements. Please review
                  this page regularly to stay informed.
                </p>
              </div>
              <div className="">
                <h2 className="">8. Contact Us</h2>
                <p>
                  If you have any questions or concerns about your privacy, feel
                  free to contact us at support@aigjobs.com. Your trust is
                  important to us, and we are committed to protecting your
                  privacy at every step of your journey with AIG Jobs.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default PrivacyPolicy;
