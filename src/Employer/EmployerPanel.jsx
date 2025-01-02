import { faBan, faBriefcase, faBuilding, faCheck, faHourglassHalf, faPlus, faTags, faUserTie } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Col, Container, Row } from "react-bootstrap"
import { Link, Outlet } from "react-router-dom"


function EmployerPanel() {
  const userPanelMenu = [
    // { title: "Dashboard", path: 'dashboard', icon: faUserTie },
    { title: "Dashboard", path: 'dashboard', icon: faUserTie },
    { title: "My Profile", path: 'employer-profile', icon: faUserTie },
    // { title: "Add Job Category", path: 'add-jobs-category', icon: faPlus },
    // { title: "Add Job Industry", path: 'add-jobs-industry', icon: faPlus },
    { title: "All Job Categories", path: 'all-job-categories', icon: faTags },
    { title: "All Job Industries", path: 'all-job-industries', icon: faBuilding },
    { title: "All Job Countries", path: 'all-job-countries', icon: faBuilding },
    { title: "All Job Cities", path: 'all-job-cities', icon: faBuilding },
    { title: "Add A Job", path: 'employer-job-post', icon: faPlus },
    { title: "ُAdded Jobs List", path: 'pending-jobs', icon: faHourglassHalf },
    { title: "Posted Jobs", path: 'employer-posted-jobs', icon: faCheck },
    { title: "Rejected Jobs", path: 'rejected-jobs', icon: faBan },
    // { title: "Pending Jobs", path: 'pending-jobs', icon: faUser },
    { title: "Job Applications", path: 'job-applications', icon: faBriefcase },
  ]
  return (
    <>
      <section className="" style={{ backgroundColor: '#f2f5f8' }}>
        <Container fluid>
          <Row className="admin-links justify-content-betwen ">
            <Col md={3} className="bg-white ">
              {userPanelMenu && userPanelMenu.map((userLink, index) => {
                return <div key={index} className="admin-sidebar pt-4">
                  <div className="d-flex" style={{ borderBottom: '1px solid #ccc' }}>
                    <FontAwesomeIcon icon={userLink.icon} className="mt-2 admin-icons" />
                    <Button as={Link} to={userLink.path} className="admin-btn" style={{ fontSize: '1rem' }}>{userLink.title}</Button>
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

export default EmployerPanel
