import Slider from "react-slick";
import { Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import ReviewContext from "../ContextApi/ReviewContext";

function Testimonials() {
  const {getReviews} = useContext(ReviewContext)
  const publishedReviews = getReviews.filter(reviews => reviews.status === "Y")
  console.log(getReviews);
  
  var settings = {
    className: "test-slider",
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="slider-container">
      <section className="success-stories py-4">
        <Container>
          <h2 className="text-center mb-4">Success Stories</h2>
          <Row className="text-center">
            <Slider {...settings}>
              {publishedReviews &&
                publishedReviews.map((message, index) => (
                  <div style={{padding: "0 400px"}} key={index}>
                    <div className="d-flex justify-content-center">
                    <img
                      src={message.image}
                      alt="success-stories"
                      className="img-fluid mb-3"
                      style={{width: "130px", border: "4px solid var(--primary-color)", borderRadius: '100px'}}
                    />
                    </div>
                    <FontAwesomeIcon icon={faQuoteLeft} size="2x" style={{color: "var(--primary-color)"}} />
                    <p>{message.message}</p>
                    <span className="fw-bold">
                      {message.name} | {message.designation}
                    </span>
                  </div>
                ))}
            </Slider>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Testimonials;
