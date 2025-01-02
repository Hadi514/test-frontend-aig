import { Col, Container, Row } from "react-bootstrap"

function ResumeMaker() {
  return (
    <>
      <section className="job-head">
        <div className="page-head-overlay">
          <Container>
            <Row className="justify-content-center align-items-center py-6">
              <Col md={9}>
                <h2 className="text-center text-white fw-bold">
                  Design Your Resume In Minutes
                </h2>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      <section className="py-5" style={{backgroundColor: '#f1f3fa'}}>
        <Container>
            <Row>
                <Col>
                <div className="section-head">
                    <h2 className="text-primary">
                    Welcome to Your Ultimate Resume Maker
                    </h2>
                </div>
                    <p className="m-0">Creating a powerful, polished resume has never been easier. Our Resume Maker tool is here to help you stand out in today’s competitive job market by offering a seamless way to build a professional resume that highlights your unique skills, experiences, and achievements. Designed with ease and efficiency in mind, our Resume Maker guides you step-by-step through the process, ensuring that you showcase your best self on paper. Whether you’re just starting out, making a career change, or aiming to advance in your field, we’ve made it simple to create a resume that leaves a lasting impression.</p>
                <div className="section-head mt-3">
                    <h3 className="">
                    Showcase Your Strengths with Ease
                    </h3>
                </div>
                    <p className="m-0">Our Resume Maker is designed to help you emphasize your strengths and key experiences in a way that resonates with recruiters and hiring managers. By following an intuitive structure, you can present the most relevant details for the role you’re targeting, from specialized skills to professional achievements. Here’s what makes our tool effective:</p>
                    <ul style={{lineHeight: '2'}}>
                        <li><span className="fw-bold">Highlight Core Skills:</span> Select specific skills that match the job requirements, from technical abilities to soft skills like leadership and teamwork.</li>
                        <li><span className="fw-bold">Detail Your Achievements:</span> Add sections for certifications, awards, or any notable accomplishments that strengthen your profile.</li>
                        <li><span className="fw-bold">Organize Your Experience:</span> Arrange your professional experience in a way that shows your growth, responsibilities, and contributions over time.</li>
                    </ul>
                <div className="section-head mt-3">
                    <h3 className="">
                    Tailored to Suit Every Role and Industry
                    </h3>
                </div>
                    <p className="m-0">No two careers are the same, and your resume shouldn’t be either. Our Resume Maker allows you to customize each section according to the unique requirements of the position you’re targeting. This flexibility enables you to create a resume that is relevant, visually appealing, and reflective of your personal brand. With our Resume Maker, you can:</p>
                    <ul style={{lineHeight: '2'}}>
                        <li><span className="fw-bold">Adapt for Specific Roles:</span> Tailor each section, from experience to skills, to meet the demands of the job and industry.</li>
                        <li><span className="fw-bold">Choose from Varied Layouts:</span> Select from a range of professional templates that cater to different industries, whether corporate, creative, or technical.</li>
                        <li><span className="fw-bold">Highlight Key Qualities:</span> Customize sections to focus on qualifications that are most aligned with your goals and the role’s expectations.</li>
                    </ul>
                <div className="section-head mt-3">
                    <h3 className="">
                    Effortlessly Save Time and Increase Efficiency
                    </h3>
                </div>
                    <p className="m-0">Building a resume can be time-consuming, but our Resume Maker simplifies the process by providing intuitive formatting and customization options. Save time and focus on what truly matters—the content of your resume. Here’s how our tool enhances efficiency:</p>
                    <ul style={{lineHeight: '2'}}>
                        <li><span className="fw-bold">Quick Customization:</span> Easily update and refine sections without needing to format each element manually.</li>
                        <li><span className="fw-bold">User-Friendly Navigation:</span> Move through each stage of the resume-building process smoothly with clear instructions at every step.</li>
                        <li><span className="fw-bold">Reusable Template:</span> With your resume saved, you can update it whenever you need, ensuring it’s always current and ready for new opportunities.</li>
                    </ul>
                </Col>
            </Row>
        </Container>
      </section>
    </>
  )
}

export default ResumeMaker
