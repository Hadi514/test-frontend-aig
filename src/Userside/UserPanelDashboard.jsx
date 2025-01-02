import { useContext } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import JobApplyContext from "../ContextApi/JobApplyContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";

function UserPanelDashboard() {
  const { appliedJobByUser } = useContext(JobApplyContext);
  const savedJobs = JSON.parse(localStorage.getItem("savedJobs"));

  const dashbaordStats = [
    {
      title: "Applied Jobs",
      stat: appliedJobByUser && appliedJobByUser.length,
    },
    { title: "Saved Jobs", stat: savedJobs && savedJobs.length },
  ];

  const cardStyle = (title) => {
    if (title === "Applied Jobs") return "firstCard";
    if (title === "Saved Jobs") return "secondCard";
  };

  return (
    <>
      <section className="dashboard-stats">
        <Container>
          <Row>
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
            <h5 className="px-3 pt-3">Applied Jobs</h5>
            <hr />
          {appliedJobByUser && appliedJobByUser.slice(-5).map((appliedByUser, index) => {
            return <div key={index} className="d-flex admin-latest-jobs">
            <div className="dash-icon me-3">
              <FontAwesomeIcon icon={faBriefcase}  style={{height: '25px', width: '25px', backgroundColor: '#FB8B2F', padding: '10px', borderRadius: '25px', color: '#fff', fontSize: '14px'}}/>
            </div>
            <div className="dash-text">
              <h6>{appliedByUser.jobId?.title}</h6>
              <p>{appliedByUser.jobId?.city}</p>
            </div>
          </div>
          })}
          </Card>
          </Col>
            <Col md={6}>
              <Card className="border-none recent-applied">
                <h5 className="px-3 pt-3">Saved Jobs</h5>
                <hr />
                {savedJobs &&
                  savedJobs.slice(-5).reverse().map((recentApply, index) => {
                    return (
                      <div key={index} className="d-flex admin-latest-jobs">
                        <div className="dash-icon me-3">
                          <FontAwesomeIcon
                            icon={faFileCircleCheck}
                            style={{
                              height: "25px",
                              width: "25px",
                              backgroundColor: "#FB8B2F",
                              padding: "10px",
                              borderRadius: "25px",
                              color: "#fff",
                              fontSize: "14px",
                            }}
                          />
                        </div>
                        <div className="dash-text">
                          <h6>{recentApply.title}</h6>
                          <p>{recentApply.city}</p>
                        </div>
                      </div>
                    );
                  })}
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default UserPanelDashboard;
