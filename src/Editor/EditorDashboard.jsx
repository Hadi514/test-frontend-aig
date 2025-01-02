import { Card, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";
import jobContext from "../ContextApi/JobContext";
import { useContext } from "react";
import UserContext from "../ContextApi/UserContext";

function EditorDashboard() {
  const { postedJobs, pendingJobs } = useContext(jobContext)
  const { signUser } = useContext(UserContext)
  const postedJobCount = postedJobs?.filter(job => job.userId?.email === signUser.email)
  const postedJobsByEmp = pendingJobs?.filter(job => job.userId?.email === signUser.email)

  const dashbaordStats = [
    { title: "Posted Jobs", stat: postedJobCount?.length },
    { title: "Pending Jobs", stat: postedJobsByEmp?.length },
  ];

  const cardStyle = (title) => {
    if (title === "Posted Jobs") return "firstCard";
    if (title === "Pending Jobs") return "thirdCard";
  };

  return (
    <>
      <section className="dashboard-stats">
        <Container>
          <Row className="g-4">
            {dashbaordStats &&
              dashbaordStats.map((stats, index) => {
                return (
                  <Col md={6} key={index}>
                    <Card className={`${cardStyle(stats.title)}`}>
                      <div className="text-center">
                        <h6>{stats.title}</h6>
                        <p>{stats.stat}</p>
                      </div>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <Row>
            <Col md={6}>
              <Card className="border-none recent-applied">
                <h5 className="px-3 pt-3">Posted Jobs</h5>
                <hr />
                {postedJobCount && postedJobCount.slice(-5).map((empJob, index) => {
                  return <div key={index} className="d-flex admin-latest-jobs">
                    <div className="dash-icon me-3">
                      <FontAwesomeIcon icon={faFileCircleCheck} style={{ height: '25px', width: '25px', backgroundColor: '#FB8B2F', padding: '10px', borderRadius: '25px', color: '#fff', fontSize: '14px' }} />
                    </div>
                    <div className="dash-text">
                    <h6>{empJob.title}</h6>
                    <p>{empJob.categoryId?.category}</p>
                    </div>
                  </div>
                })}
              </Card>
            </Col>
            <Col md={6}>
              <Card className="border-none recent-applied">
                <h5 className="px-3 pt-3">Pending Jobs</h5>
                <hr />
                {postedJobsByEmp && postedJobsByEmp.slice(-5).reverse().map((empJob, index) => {
                  return <div key={index} className="d-flex admin-latest-jobs">
                    <div className="dash-icon me-3">
                      <FontAwesomeIcon icon={faBookOpen} style={{ height: '25px', width: '25px', backgroundColor: '#FB8B2F', padding: '10px', borderRadius: '25px', color: '#fff', fontSize: '14px' }} />
                    </div>
                    <div className="dash-text">
                      <h6>{empJob.title}</h6>
                      <p>{empJob.categoryId?.category}</p>
                    </div>
                  </div>
                })}
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default EditorDashboard;
