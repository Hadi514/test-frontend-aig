import { Card, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faFileCircleCheck } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../ContextApi/UserContext";
import { useContext } from "react";
import jobContext from "../ContextApi/JobContext";
import JobApplyContext from "../ContextApi/JobApplyContext";
import CourseContext from "../ContextApi/CourseContext";
import MyContext from "../ContextApi/MyContext";

function Dashboard() {
  const { addedUsers } = useContext(UserContext);
  const { postedJobs, companiesCounting } = useContext(jobContext);
  const { jobApplyCounting, getAppliedJobs } = useContext(JobApplyContext);
  const { allCourse } = useContext(CourseContext);
  const { resumeCounting } = useContext(MyContext)

  const onSiteJobs = postedJobs?.filter(job => job.jobLocaType === "On Site").length
  const remoteJobs = postedJobs?.filter(job => job.jobLocaType === "Remote").length
  const employer = addedUsers?.filter(user => user.role === "Employer").length
  const employee = addedUsers?.filter(user => user.role === "Job Seaker").length

  const approvedTotal = postedJobs?.length

  const dashbaordStats = [
    { title: "Job Seekers", stat: employee },
    { title: "Total Jobs", stat: approvedTotal },
    { title: "Applications", stat: jobApplyCounting },
    { title: "Total Resumes", stat: resumeCounting },
    { title: "Employers", stat: employer },
    { title: "Companies", stat: companiesCounting },
    { title: "On Site Jobs", stat: onSiteJobs },
    { title: "Remote Jobs", stat: remoteJobs },
  ];

  const cardStyle = (title) => {
    if (title === "Job Seekers" || title === "Employers") return "firstCard";
    if (title === "Total Jobs" || title === "Companies") return "secondCard";
    if (title === "Applications" || title === "On Site Jobs") return "thirdCard";
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
                  <Col md={3} key={index}>
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
                {getAppliedJobs && getAppliedJobs.slice(-5).reverse().map((recentApply, index) => {
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
                <h5 className="px-3 pt-3">Recently Added Courses</h5>
                <hr />
                {allCourse && allCourse.slice(-5).reverse().map((recentCourse, index) => {
                  return <div key={index} className="d-flex admin-latest-jobs">
                    <div className="dash-icon me-3">
                      <FontAwesomeIcon icon={faBookOpen} style={{ height: '25px', width: '25px', backgroundColor: '#FB8B2F', padding: '10px', borderRadius: '25px', color: '#fff', fontSize: '14px' }} />
                    </div>
                    <div className="dash-text">
                      <h6>{recentCourse.title}</h6>
                      <p>{recentCourse.categoryId?.category}</p>
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

export default Dashboard;
