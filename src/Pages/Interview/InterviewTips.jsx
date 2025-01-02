import { Card, Col, Container, Row } from "react-bootstrap";
import iterviewPrep from '../../assets/Images/interview-prep-page.avif'
import preInterview from '../../assets/Images/pre-interview-tips.avif'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';


function InterviewTips() {

  const interviewTypes = [
    {title: "Phone Screening", description: 'Typically the first step, a phone interview assesses your basic fit for the role. Be prepared with concise answers and avoid distractions.'},
    {title: "One-on-One Interview", description: 'A direct interview with a hiring manager or HR representative, focusing on your skills and experience.'},
    {title: "Panel Interview", description: 'Involves multiple interviewers; it’s crucial to make eye contact with each person and engage them equally.'},
    {title: "Techical Interview", description: 'Often includes problem-solving tasks or coding challenges; practice is essential.'}
  ]

  return (
    <>
      <section className="interview-head" style={{backgroundColor: '#f1f3f5'}}>
        <div className="page-head-overlay">
          <Container>
            <Row className="justify-content-center align-items-center py-6">
              <Col md={9}>
                <h2 className="text-center text-white fw-bold">
                  Interviwe Tips & Tricks
                </h2>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      <section className="py-5">
        <Container>
          <Row>
            <Col md={7}>
              <div className="section-head">
                <h2 className="text-primary">Why Interview Preparation Matters?</h2>
              </div>
              <p>Interviewing can be both exciting and nerve-wracking. It’s a crucial step in landing your dream job, but it also demands thorough preparation to make a strong impression. Preparing effectively for an interview can significantly increase your confidence and help you present your skills in the best possible light. In this guide, we’ll walk you through essential tips and strategies to set you up for interview success, covering everything from preparation to follow-up.</p>
            </Col>
            <Col md={5}>
            <img src={iterviewPrep} alt="" className="img-fluid site-img" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="process py-5" >
        <Container>
        <Row className="justify-content-center ">
          <Col className="text-center">
          <div className="section-head text-primary">
            <h2>Understanding the Interview Process</h2>
          </div>
          <p className="">One of the most important parts of interview preparation is researching the company and the specific role you’re applying for. This shows your interest and dedication to the position. Start by visiting the company’s website, reading through their mission, values, and recent news. Understand what the company stands for and how your role fits into its bigger picture. Look closely at the job description to identify key skills and responsibilities that you can highlight in your responses. The more you know about the company and role, the better you’ll be able to position yourself as the ideal candidate.</p>
          <Row className="justify-content-center interview-types">
            {interviewTypes && interviewTypes.map((types, index) =>{
              return <Col md={3} key={index}>
                <Card className="types-card">
                  <h5>{types.title}</h5>
                  <p>{types.description}</p>
                </Card>
            </Col>
            })}
            
          </Row>
          </Col>
        </Row>
        </Container>
      </section>

      <section className="py-5" style={{backgroundColor: '#f1f3f5'}}>
        <Container>
          <Row className="align-items-center">
            <Col md={7}>
              <div className="section-head">
                <h2 className="text-primary">Pre-Interview Preparation Tips</h2>
              </div>
              <p>Your resume is often the first impression you make, so ensure it’s updated and aligned with the job you’re applying for. Highlight relevant experiences, skills, and achievements, tailoring each to the job description. If you have a portfolio (especially for creative or technical roles), select a few key pieces that best showcase your abilities and bring these to the interview. Organize your resume and portfolio in a way that allows for easy reference during the conversation.</p>
              <h6 className="mb-3">Practice Common Interview Questions</h6>
              <p>Prepare and practice answers to common interview questions. These often include:</p>
              <ul style={{listStyle: 'none', padding: '0', margin: '0', lineHeight: '2.5'}}>
                <li><FontAwesomeIcon icon={faCheckCircle} style={{color: 'var(--primary-color)'}}/>&nbsp;Tell me about yourself.</li>
                <li><FontAwesomeIcon icon={faCheckCircle} style={{color: 'var(--primary-color)'}}/>&nbsp;What are your greatest strengths and weaknesses?</li>
                <li><FontAwesomeIcon icon={faCheckCircle} style={{color: 'var(--primary-color)'}}/>&nbsp;Why do you want to work here?</li>
                <li><FontAwesomeIcon icon={faCheckCircle} style={{color: 'var(--primary-color)'}}/>&nbsp;Describe a challenging work situation and how you handled it.</li>
              </ul>
            </Col>
            <Col md={5}>
            <img src={preInterview} alt="" className="img-fluid site-img" />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default InterviewTips;
