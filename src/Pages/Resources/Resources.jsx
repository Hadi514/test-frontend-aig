import { Col, Container, Row } from "react-bootstrap";

function Resources() {
  return (
    <>
      <section className="job-head">
        <div className="page-head-overlay">
          <Container>
            <Row className="justify-content-center align-items-center py-6">
              <Col md={9}>
                <h2 className="text-center text-white fw-bold">
                  Our Resources
                </h2>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      <section className="py-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col>
              <div className="section-head">
                <h2 className="text-primary">Your Career Development Toolkit </h2>
              </div>
              <p>
                {" "}
                Our Career Development Toolkit is your all-in-one resource for
                job market success, offering expert advice, practical tools, and
                the latest industry insights to support you at every stage. From
                resume-building templates to interview preparation guides and
                career growth tips, these resources are designed to help you
                stand out, build confidence, and stay competitive. Whether you
                are entering the workforce, advancing in your field, or
                exploring new career paths, this toolkit equips you with the
                knowledge and skills to achieve your goals.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="resources py-4" style={{backgroundColor: "#f1f3f5"}}>
        <Container>
          <Row>
            <Col>
            <div className="section-head text-center">
              <h2 className="text-primary">What You Will Find Here?</h2>
            <p>Our Resources page offers a range of materials designed to boost your confidence and skills in the job market. From interview tips to career-building advice, we provide tools that cater to all stages of your career journey. Here’s an overview of the types of resources we offer:</p>
            </div>
            <Row className="mt-4">
              <Col md={6} className="first-resource">
              <div>
                <h5>1. Interview Preparation Guides</h5>
                <p>Find expert tips, sample questions, and step-by-step guides to help you prepare for various types of interviews. From behavioral questions to technical assessments, these resources ensure you are ready to make a great impression.</p>
              </div>
              <div>
                <h5>2. Resume And Cover Letter Templates</h5>
                <p>Crafting a strong resume and cover letter is essential to standing out to employers. Our templates and formatting guides provide examples and best practices for creating professional documents that highlight your skills effectively.</p>
              </div>
              <div>
                <h5>3. Industry Insights And Job Market Trends</h5>
                <p>Stay up-to-date with the latest trends and insights from different industries. Our articles and reports cover everything from emerging job roles to key skills in demand, giving you an edge in the competitive job market.</p>
              </div>
              </Col>
              <Col md={6} className="">
              <div>
                <h5>4. Career Development Articles</h5>
                <p>Explore topics like networking strategies, personal branding, and skill-building tips to help you grow in your career. Our career development articles are designed to equip you with actionable advice and inspiration for ongoing growth.</p>
              </div>
              <div>
                <h5>5. Job Search Tools And Tips</h5>
                <p>From job boards to networking platforms, knowing where and how to search is crucial. Access our curated list of job search tools and strategies to make your job-hunting process more efficient and effective.</p>
              </div>
              <div>
                <h5>6. Professional Skills Enhancement</h5>
                <p>Our resources include guides and exercises to help you build essential professional skills, like time management, effective communication, and problem-solving, that can set you apart in any role.</p>
              </div>
              </Col>
            </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Resources;
