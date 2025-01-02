import { Col, Container, Row } from "react-bootstrap"
// import { Link } from "react-router-dom"
import reviewImg from '../../assets/Images/review-img.avif'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment, faMoneyBill, faPlus } from "@fortawesome/free-solid-svg-icons"
import {Link} from 'react-router-dom'

function ReviewSection() {
  return (
    <>
      <section className="py-4">
        <Container className="review-section py-4">
            <Row className="justify-content-center align-items-center">
                <Col md={8} className="text-white">
                <div className="section-head">
                    <h2>Help Us Improve the Platform For The Job Seekers!</h2>
                </div>
                <p className="text-white">help someone find a job they are dreaming about</p>
                <div className="review-img">
                    <img src={reviewImg} alt="send-your-review" className="img-fluid" style={{height: '250px'}}/>
                </div>
                </Col>
                <Col md={3}>
                <div className="write-revivew">
                  <Link to="/write-your-review">
                    <div className="d-flex mb-3 bg-white p-3 align-items-center">
                    <FontAwesomeIcon icon={faPlus} size="sm" color="#4CAF50" className="me-2" />
                    <span className="text-dark">Write Your Review</span>
                    </div>
                    </Link>
                    <Link to="/interview-advice" style={{color: 'black'}}>
                    <div className="d-flex mb-3 bg-white p-3 align-items-center">
                    <FontAwesomeIcon icon={faComment} size="sm"  className="me-2"/>
                    <span>Share Interview Advice</span>
                    </div>
                    </Link>
                    <Link to="/contribute-salary" style={{color: 'black'}}>
                    <div className="d-flex bg-white p-3 align-items-center">
                    <FontAwesomeIcon icon={faMoneyBill} size="sm" color="#4CAF50" className="me-2" />
                    <span>Contribute Salary</span>
                    </div>
                    </Link> 
                </div>
                </Col>
            </Row>
        </Container>
      </section>
    </>
  )
}

export default ReviewSection
