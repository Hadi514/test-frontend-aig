import { Button, Col, Container, Image, Row } from "react-bootstrap"
import InterviewImg from '../../assets/Images/interview-img.avif'
import { Link } from "react-router-dom"



function InterviwePrep() {
  return (
    <div>
      <section className="interview-prep px-4 py-5">
        <Container fluid className="interview-container py-4">
            <Row>
                <Col md={6} className="text-white">
                <h3>Ace Your Next Interviwe With Confidence</h3>
                <p>Unlock expert tips and strategies to stand out from the competition. Master every
                question and walk into your interview prepared to impress</p>
                <Button as={Link} to="/interview-tips-and-tricks" className="white-button interview-btn">Interview Tips & Tricks</Button>
                </Col>
                <Col md={6}>
                <Image src={InterviewImg} alt="prepare-for-interview" fluid className="interview-img" />
                </Col>
            </Row>
        </Container>
      </section>
    </div>
  )
}

export default InterviwePrep
