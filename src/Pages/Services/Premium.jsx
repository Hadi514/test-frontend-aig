import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Card, Col, Container, Row } from "react-bootstrap"

function Premium() {
  return (
    <>
      <section className="job-head">
        <div className="page-head-overlay">
          <Container>
            <Row className="justify-content-center align-items-center py-6">
              <Col md={9}>
                <h2 className="text-center text-white fw-bold">
                  Upgrade To Premium
                </h2>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      <section className="get-premium py-6 text-center">
        <Container>
          <Row className="justify-content-center">
            <div className="section-head">
              <h2 className="text-primary">
                Get Maximum Out of our platform
              </h2>
            </div>
            <p className="lead">Contact us for the premium version</p>
            <Col md={4}>
            <Card className="p-3" style={{boxShadow: "0 2px 4px 4px rgba(204,204,204,0.3)", border: 'none'}}>
              <FontAwesomeIcon icon={faEnvelope} size="2x" className="my-2"/>
              <h4 className="text-primary">Our Email Address:</h4>
              <p className="m-0">aigjobs@gmail.com</p>
            </Card>
            </Col>
            <Col md={4}>
            <Card className="p-3" style={{boxShadow: "0 2px 4px 4px rgba(204,204,204,0.3)", border: 'none'}}>
              <FontAwesomeIcon icon={faPhone} size="2x" className="my-2"/>
              <h4 className="text-primary">Our Contact:</h4>
              <p className="m-0">+923 123 45 67</p>
            </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Premium
