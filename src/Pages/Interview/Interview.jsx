import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Container, Row } from "react-bootstrap";
import interviweGuide from '../../assets/Images/interview-guide.avif'

function Interview() {
  const interviewArray = [
    {
      title: "Tips and Tricks for Interview Success",
      detail:
        "Get actionable advice on preparing for your interviews—from understanding company culture to polishing your resume and mastering first impressions. Our tips and tricks page is packed with step-by-step guidance to ensure you’re well-prepared.",
    },
    {
      title: "Mastering Different Types of Interviews",
      detail:
        "Interviews today come in many forms, from video calls to panel discussions. Each format has its own set of expectations and best practices. Here, you’ll learn about different interview types and how to navigate them with ease.",
    },
    {
      title: "Crafting Strong Responses to Common Questions",
      detail:
        "One of the best ways to prepare is to know what to expect. Review our breakdown of commonly asked interview questions, along with strategies for answering each one effectively. Practice your responses and learn techniques for showcasing your skills and experience in the best light.",
    },
    {
      title: "Essential Soft Skills for Interviews",
      detail:
        "Technical skills may get you an interview, but soft skills often get you the job. Discover how to demonstrate adaptability, communication skills, and teamwork during your interview to stand out as a well-rounded candidate.",
    },
  ];

  return (
    <>
      <section className="job-head">
        <div className="page-head-overlay">
          <Container>
            <Row className="justify-content-center align-items-center py-6">
              <Col md={9}>
                <h2 className="text-center text-white fw-bold">Interview</h2>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      <section className="py-5" style={{backgroundColor: '#f1f3f5'}}>
        <Container>
          <Row className="justify-content-center text-center">
            <Col>
            <div className="section-head">
              <h2 className="text-primary">Mastering the Interview Journey
              </h2>
            </div>
              <p>
                {" "}
                Interviews are a vital part of any job search. They offer a
                chance to showcase your skills, personality, and passion, giving
                you a platform to make a strong impression. This page is your
                starting point for everything you need to excel in interviews.
                We’re here to help you with insights, preparation techniques,
                and the tools you need to approach interviews confidently. 
              </p>
            </Col>
          </Row>
        </Container>
      </section>


      
      <section className="py-4">
        <Container>
          <Row className="align-items-center">
            <Col md={7}>
            <div className="section-head">
              <h2 className="text-primary">
              Preparing for Your Interview: A Step-by-Step Guide
              </h2>
            </div>
            <p>Preparing for an interview involves understanding the company and role, practicing answers to common questions, and organizing essential documents like extra copies of your resume. Wearing professional attire that aligns with the company culture and arriving on time shows professionalism, while a thoughtful thank-you note afterward can leave a positive impression. These steps can boost your confidence and readiness for the interview. Here are a few tips to keep in mind:</p>
            <ul style={{listStyle: 'none', padding: '0', margin: '0', lineHeight: '2.5'}}>
                <li><FontAwesomeIcon icon={faCheckCircle} style={{color: 'var(--primary-color)'}}/>&nbsp;Know the company’s values and the role’s requirements to tailor your answers.</li>
                <li><FontAwesomeIcon icon={faCheckCircle} style={{color: 'var(--primary-color)'}}/>&nbsp;Rehearse responses to common questions to articulate your skills clearly.</li>
                <li><FontAwesomeIcon icon={faCheckCircle} style={{color: 'var(--primary-color)'}}/>&nbsp;Dressing professionally helps make a positive first impression.</li>
                <li><FontAwesomeIcon icon={faCheckCircle} style={{color: 'var(--primary-color)'}}/>&nbsp;A quick follow-up message after the interview can reinforce your interest in the position.</li>
              </ul>
            </Col >
            <Col md={5}>
            <img src={interviweGuide} alt="" className="img-fluid site-img" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-4" style={{backgroundColor: '#f1f3f5'}}>
        <Container>
          <Row className="interview-resources">
          <div className="section-head text-center">
            <h2 className="text-primary">Explore Our Interview Preparation Resources
            </h2>
          </div>
          <p className="text-center"> Here, you’ll find resources designed to make interview
                preparation less intimidating and more strategic. From common
                questions to advanced techniques, each section below introduces
                key aspects of successful interviewing. Dive into the resources,
                explore different types of interviews, and build the confidence
                to make every opportunity count.</p>
            {interviewArray &&
              interviewArray.map((tip, index) => {
                return (
                  <Col md={6} key={index}>
                    <Card>
                      <h6>{tip.title}</h6>
                      <p>{tip.detail}</p>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </Container>
      </section>

    </>
  );
}

export default Interview;
