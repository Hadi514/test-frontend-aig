import { Col, Container, Row } from "react-bootstrap";

function HiringGuide() {
  return (
    <>
      <section className="job-head">
        <div className="page-head-overlay">
          <Container>
            <Row className="justify-content-center align-items-center py-6">
              <Col md={9}>
                <h2 className="text-center text-white fw-bold">
                  Hiring Guides
                </h2>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      <section className="py-5">
        <Container>
          <Row>
            <Col>
              <h2>
              Job Listings and Job Search
                </h2>
             <p>  Our platform hosts thousands of job
              listings, making it easy for job seekers to find the ideal role
              that aligns with their skills and career goals. With advanced
              filtering options for role type, location, and experience level,
              users can narrow down opportunities to find the perfect fit. For
              employers, posting a job is a seamless process, granting instant
              access to a diverse, engaged audience. Companies can also utilize
              powerful search filters to match with qualified candidates,
              speeding up the hiring process and ensuring high-quality
              applicants.
              </p>
              <h2>
              Resume Building and Profile Optimization
                </h2>
             <p>  We know that a well-crafted resume is crucial to standing out in today’s competitive job market. Job seekers can use our resume builder to create a professional resume and optimize their profiles to enhance visibility to employers. With personalized recommendations for improving resumes based on specific job roles, applicants can present their best selves. Employers benefit from enhanced candidate profiles, gaining a clear view of skills, experience, and qualifications, helping them make well-informed hiring decisions.
              </p>
              <h2>
              Skill Assessments and Certifications
                </h2>
             <p>  Showcasing verified skills can make a significant impact. Job seekers can complete skill assessments to prove their expertise and earn certifications that boost their profiles, making them more attractive to potential employers. This feature allows candidates to distinguish themselves, while employers can pre-screen candidates based on certified skills, making the hiring process more effective. Access to verified skills enables employers to make informed, data-driven decisions on candidate suitability.
              </p>
              <h2>
              Employer Branding and Recruitment Marketing
                </h2>
             <p> In today’s market, employer branding is crucial. Our platform enables companies to create a customized employer page where they can highlight their company’s culture, values, and job openings, creating a compelling story for potential candidates. With targeted recruitment marketing strategies, companies can attract high-quality talent, increase brand visibility, and solidify their reputation as employers of choice.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default HiringGuide;
