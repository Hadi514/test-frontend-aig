import { Card, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";
import jobContext from "../ContextApi/JobContext";
import { useContext } from "react";
import UserContext from "../ContextApi/UserContext";
import JobApplyContext from "../ContextApi/JobApplyContext";


function EmployerDashboard() {

  const { postedJobs } = useContext(jobContext)
  const {getAppliedJobs} = useContext(JobApplyContext)
  const {signUser} = useContext(UserContext)
  const postedJobCount = postedJobs.filter(job => job.userId?.email === signUser.email).length
  const postedJobsByEmp = postedJobs.filter(job => job.userId?.email === signUser.email)

  const IdpostedJobs = postedJobs?.filter(job => job.userId?._id === signUser?._id).map(job => job._id)
    const checkApplication = getAppliedJobs?.filter(job => IdpostedJobs?.includes(job.jobId?._id))

  const dashbaordStats = [
    { title: "Posted Jobs", stat: postedJobCount },
    { title: "Job Applications", stat: checkApplication?.length },
  ];

  const cardStyle = (title) => {
    if (title === "Posted Jobs" || title === "Employers") return "firstCard";
    if (title === "Total Jobs" || title === "Companies") return "secondCard";
    if (title === "Job Applications" || title === "On Site Jobs") return "thirdCard";
    if (title === "Total Resumes" || title === "Remote Jobs") return "fourthCard";
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
                <h5 className="px-3 pt-3">Recently Applied Jobs</h5>
                <hr />
                {checkApplication && checkApplication.slice(-5).map((recentApply, index) => {
                  return <div key={index} className="d-flex admin-latest-jobs">
                    <div className="dash-icon me-3">
                      <FontAwesomeIcon icon={faFileCircleCheck} style={{ height: '25px', width: '25px', backgroundColor: '#FB8B2F', padding: '10px', borderRadius: '25px', color: '#fff', fontSize: '14px' }} />
                    </div>
                    <div className="dash-text">
                      <h6>{recentApply.jobId?.title}</h6>
                      <p>{recentApply.jobId?.city}</p>
                    </div>
                  </div>
                })}
              </Card>
            </Col>
            <Col md={6}>
              <Card className="border-none recent-applied">
                <h5 className="px-3 pt-3">Recently Posted Jobs</h5>
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

export default EmployerDashboard;
