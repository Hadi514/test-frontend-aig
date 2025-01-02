import { faBan, faBookmark, faBriefcase, faDashboard, faFileAlt, faFileArchive, faHourglassHalf, faPlus, faUserTie } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Col, Container, Row } from "react-bootstrap"
import { Link, Outlet } from "react-router-dom"


function Userdashboard() {
  const userPanelMenu = [
    // {title: "Dashboard", path: ''},
    {title: "Dashboard", path: 'dashboard', icon: faDashboard},
    {title: "My Profile", path: 'my-profile', icon: faUserTie},
    {title: "Applied Jobs", path: 'applied-jobs', icon: faBriefcase},
    {title: "Saved Jobs", path: 'saved-jobs', icon: faBookmark},
    {title: "Resume Maker", path: 'create-resume', icon: faFileAlt},
    {title: "My Resume", path: 'my-resume', icon: faFileArchive},
    {title: "Post As Job Seeker", path: 'job-seeker-post', icon: faPlus},
    {title: "Job Seeker Posts List", path: 'pending-posts', icon: faHourglassHalf},
    {title: "Job Seeker Approved Posts", path: 'manage-job-seeker-posts', icon: faUserTie},
    {title: "Job Seeker Rejected Posts", path: 'rejected-posts', icon: faBan},
  ] 
  return (
    <>
      <section className="" style={{backgroundColor: '#f2f5f8'}}>
        <Container fluid>
            <Row className="admin-links justify-content-betwen ">
                <Col md={3} className="bg-white ">
                {userPanelMenu && userPanelMenu.map((userLink, index) => {
                  return <div key={index} className="admin-sidebar pt-4">
                    <div className="d-flex" style={{borderBottom: '1px solid #ccc'}}>
                    <FontAwesomeIcon icon={userLink.icon} className="mt-2 admin-icons"/>
                    <Button as={Link} to={userLink.path} className="admin-btn" style={{fontSize: '1rem'}}>{userLink.title}</Button>
                    </div>
                  </div>
                })}
                </Col>
                <Col md={9} className="content-col-admin py-5">
                <Outlet />
                </Col>
            </Row>
        </Container>
      </section>
    </>
  )
}

export default Userdashboard
