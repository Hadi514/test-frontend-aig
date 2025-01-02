import {
  faEnvelope,
  faPaperPlane,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import EmplyerImg from "../../assets/Images/employer.avif"

function EmployerDetails() {
  const [getUserByTitle, setGetUserByTitle] = useState();
  const { title } = useParams();
  const formatTitle = title.replace(/_/g, " ");
  const apiUrl = import.meta.env.VITE_API_URL;

  const userByTitle = async () => {
    const res = await fetch(
      `${apiUrl}/api/user/titleUser/${formatTitle}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    setGetUserByTitle(data);
  };

  useEffect(() => {
    userByTitle();
  }, []);

  return (
    <>
      <section className="job-head">
        <div className="page-head-overlay">
          <Container>
            <Row className="justify-content-center align-items-center py-6">
              <Col md={9}>
                <h2 className="text-center text-white fw-bold">
                  Employer Details
                </h2>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      <section className="employer-details py-5" style={{backgroundColor: '#f9f9f9'}}>
        <Container>
          <Row>
            <Col md={12}>
            <Card className="py-3" style={{boxShadow: "0 4px 18px 4px rgba(204,204,204,0.4)", border: "none", borderRadius: "15px"}}>
              <Row className="align-items-start">
                <Col md={4} className="emp-img-col">
                <div className="emp-img">
                {getUserByTitle?.userImage ? (
                  <img
                    src={getUserByTitle?.userImage}
                    alt=""
                    className="img-fluid"
                    style={{height:"190px", width:"190px", borderRadius: "100px", marginLeft: "10px"}}
                  />
                ) : (
                  <img
                    src={EmplyerImg}
                    alt=""
                    className="img-fluid"
                    style={{height:"190px", width:"190px", borderRadius: "100px", marginLeft: "10px"}}
                  />
                )}
              </div>
                </Col>
                <Col md={8}>
                <div>
                <h3 className="text-primary" style={{textDecoration: "underline"}}>
                {getUserByTitle?.name}
                </h3>
                </div>
                <div className="d-flex align-items-center mt-5 justify-content-between">
                  <div className="emp-phone d-flex align-items-center">
                    <FontAwesomeIcon icon={faPhone} style={{backgroundColor: "var(--primary-color)", color: "#fff", padding: "10px", borderRadius: '100px'}}/>&nbsp;Phone: <p className="m-0">{getUserByTitle?.number}</p>
                  </div>
                  <div className="emp-phone d-flex align-items-center me-4">
                    <FontAwesomeIcon icon={faEnvelope} style={{backgroundColor: "var(--primary-color)", color: "#fff", padding: "10px", borderRadius: '100px'}}/>&nbsp;Email: <p className="m-0">{getUserByTitle?.email}</p>
                  </div>
                  <div className="emp-phone d-flex align-items-center me-4">
                    <FontAwesomeIcon icon={faPaperPlane} style={{backgroundColor: "var(--primary-color)", color: "#fff", padding: "10px", borderRadius: '100px'}}/>&nbsp; <Button className="fw-bold" as="a" href={`mailto:${getUserByTitle?.email}?subject=Contact%Employer&body=Hello`} target="blank" style={{backgroundColor: "transparent", color: "var(--primary-color)", border: "none", textDecoration: 'underline'}}><u>Contact This Employer </u></Button>
                  </div>
                </div>
                </Col>
              </Row>
              
              </Card>
              
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default EmployerDetails;
