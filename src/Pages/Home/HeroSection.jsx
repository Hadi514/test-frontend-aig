import { Col, Container, Row } from "react-bootstrap"
import JobSearchForm from "./JobSearchForm"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function HeroSection() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true
  };
  return (
    <>
      <section className="">
        <Slider {...settings}>
          <div>
            <div className="hero-section slide-1">
          <div className="hero-overlay py-7 ">
        <Container>
            <Row className="justify-content-center">
                <Col md={12} className="text-center text-dark">
                <h1 className="mb-3 fw-bold text-white">Unlock New Career Opportunities</h1>
                {/* <p>Browse a wide range of job listings from leading companies. Customize
                your search and land the role that fits your career goals.</p> */}
                  <JobSearchForm />
                </Col>
            </Row>
        </Container> 
        </div>
            </div>
          </div>
          <div>
            <div className="hero-section slide-2">    
          <div className="hero-overlay-2 py-7 ">
        <Container>
            <Row className="justify-content-center">
                <Col md={12} className="text-center text-dark">
                <h1 className="mb-3 fw-bold text-white">Get Your Manpower Within 24Hrs!                </h1>
                {/* <p>Browse a wide range of job listings from leading companies. Customize
                your search and land the role that fits your career goals.</p> */}
                  <JobSearchForm />
                </Col>
            </Row>
        </Container>
        </div>
            </div>
          </div>
          <div>
            <div className="hero-section slide-3">    
          <div className="hero-overlay-2 py-7 ">
        <Container>
            <Row className="justify-content-center">
                <Col md={12} className="text-center text-dark">
                <h1 className="mb-3 fw-bold text-white">Join Us Today!</h1>
                <p className="text-white">Explore career opportunities at AIG Jobs and join a culture of innovation, growth, and excellence.</p>
                  <JobSearchForm />
                </Col>
            </Row>
        </Container>
        </div>
            </div>
          </div>
        </Slider>
      </section>
    </>
  )
}

export default HeroSection
