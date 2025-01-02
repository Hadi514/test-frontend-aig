import { useContext, useState } from "react";
import UserContext from "../../ContextApi/UserContext";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Employers() {
  const { addedUsers } = useContext(UserContext);

  // State for search input
  const [nameSearch, setNameSearch] = useState("");

  // Filter logic: Search by name
  const filteredEmployers = addedUsers?.filter((user => user.role === "Employer")).filter((user) =>
    user.name?.toLowerCase().includes(nameSearch.toLowerCase())
  );

  return (
    <>
      <section className="job-head">
        <div className="page-head-overlay">
          <Container>
            <Row className="justify-content-center align-items-center py-6">
              <Col md={9}>
                <h2 className="text-center text-white fw-bold">Meet The Employers</h2>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      <section className="py-5" style={{backgroundColor: '#f9f9f9'}}>
        <Container>
          <div className="row mb-4 find d-flex">
            {/* Search by Employer Name */}
            <div className="col-md-4 mt-4">
              <input
                type="text"
                className="form-control schoo-search"
                placeholder="Search Employer By Name"
                value={nameSearch}
                onChange={(e) => setNameSearch(e.target.value)}
              />
            </div>
          </div>

          <Row className="g-5 justify-content-center">
            <Col md={12}>
              <Row>
                {filteredEmployers.length > 0 ? (
                  filteredEmployers.map((user, index) => (
                    <Col md={4} key={index}>
                      <Card className="job-card p-3 mb-3" style={{ border: "none", boxShadow: '0 4px 18px 4px rgba(204,204,204,0.4)'}}>
                        <div style={{ backgroundColor: "var(--primary-color)", padding: "6px" }}>
                          <h5 className="text-white">{user.name}</h5>
                          
                        </div>
                        <span className="m-0 mb-3 mt-3">
                          <FontAwesomeIcon icon={faEnvelope} />
                          &nbsp;{user.email}
                        </span>
                        <span
                          style={{
                            marginTop: "-10px",
                            marginBottom: "15px",
                            color: "#a9a9a9",
                            fontSize: "13px",
                            fontWeight: "bold",
                          }}
                        >
                          {user.city}
                        </span>
                        <p className=" m-0">
                          <FontAwesomeIcon icon={faPhone} />
                          &nbsp;{user.number}
                        </p>
                        <div className="d-flex mt-3 justify-content-between">
                          <Button as={Link} to={`/employer-details/${user.name?.replace(/ /g, "_")}`}>
                            View Details
                          </Button>
                        </div>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <Col>
                    <p className="text-center">No employers match your search criteria.</p>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Employers;
