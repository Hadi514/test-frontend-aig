import { Button, Col, Container, Image, Row } from "react-bootstrap";
import Employer from "../../assets/Images/employer.avif";
import Employee from "../../assets/Images/empolyee.avif";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../ContextApi/UserContext";

function EmployeeAndEmployer() {
  const {signUser} = useContext(UserContext)
  return (
    <>
      <section className="employee-and-employer px-lg-4 py-4">
        <Container fluid>
          <Row className="g-4 align-items-strech">
            <Col md={6}>
              <div className="employer-section h-100">
                <div className="emplyer-overlay h-100">
                  <div className="d-flex p-4">
                    <div className="employer-text text-white">
                      <h3 className="mb-3 fw-bold">Build Your Dream Team</h3>
                      <p className="mb-4">
                        Connect with top talent and grow your business with
                        ease. Job posting to sharing insights, take
                        control of the hiring process and find the perfect fit
                        for your team.
                      </p>
                      {signUser && signUser.role === "Employer" ? (
                        <Button className="white-button mb-md-5" as={Link} to="/employer-panel/employer-profile">
                          Employers
                        </Button>
                      ) : (
                        <Button className="white-button mb-md-5" as={Link} to="/sign-in">
                          Employers
                        </Button>
                      )}
                    </div>
                    <div className="employer-img">
                      <Image src={Employer} alt="become-employer" fluid />
                    </div>
                  </div>
                  <div className="employer-actions px-4">
                    <Button className="white-button me-2" as={Link} to="/job-seekers">
                      Find An Employee
                    </Button>
                    {signUser?.role === "Employer" ? (
                      <Button className="white-button me-2" as={Link} to="/interview-advice">
                      Share Interview Advice
                    </Button>
                    ): (<Button className="white-button me-2" as={Link} to="/sign-in">
                      Share Interview Advice
                    </Button>)}
                    {signUser && signUser.role === "Employer" ? (

                      <Button className="white-button me-2" as={Link} to="/employer-panel/employer-job-post">Post A Job</Button>
                    ) : (
                      <Button className="white-button me-2" as={Link} to="/sign-in">Post A Job</Button>
                    )}
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="employee-section h-100">
                <div className="emplyee-overlay h-100">
                  <div className="d-flex p-4">
                    <div className="employer-text text-white">
                      <h3 className="mb-3 fw-bold">Take A Lead In Your Job Search</h3>
                      <p className="mb-4">
                      Maximize your potential by exploring tailored career
                        opportunities. From submitting your resume to connecting
                        with top employers, find everything you need to advance
                        your career
                      </p>
                      {signUser && signUser.role === "Job Seaker" ? (
                        <Button className="white-button job-seeker-class mb-md-5" as={Link} to="/user-panel/create-resume">
                          Submit Your Resume
                        </Button>
                      ) : (
                        <Button className="white-button job-seeker-class mb-md-5" as={Link} to="/sign-in">
                          Submit Your Resume
                        </Button>
                      )}
                    </div>
                    <div className="employer-img">
                      <Image src={Employee} alt="become-employer" fluid />
                    </div>
                  </div>
                  <div className="employee-actions px-4">
                    {signUser && signUser.role === "Job Seaker" ? (
                      

                    <Button className="white-button me-2" as={Link} to="/user-panel/job-seeker-post">
                    Post As Job Seeker
                    </Button>
                     
                    ): (
                      <Button className="white-button me-2" as={Link} to="/sign-in">
                    Post As Job Seeker
                    </Button>
                    )}

                    <Button className="white-button me-2" as={Link} to="/find-employers">
                    Find An Employer
                    </Button>
                    
                    <Button className="white-button me-2" as={Link} to="/jobs-by-category">Jobs By Category</Button>
                  </div>
                </div>
              </div>
            </Col>
            
          </Row>
        </Container>
      </section>
    </>
  );
}

export default EmployeeAndEmployer;
