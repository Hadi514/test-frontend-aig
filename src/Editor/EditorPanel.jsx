import { faBan, faBuilding, faCheck, faDashboard, faHourglassHalf, faPlus, faTags, faUserTie } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Col, Container, Row } from "react-bootstrap"
import { Link, Outlet } from "react-router-dom"


function EditorPanel() {
  const userPanelMenu = [
    // { title: "Dashboard", path: 'dashboard', icon: faUserTie },
    { title: "Dashboard", path: 'dashboard', icon: faDashboard },
    { title: "My Profile", path: 'my-profile', icon: faUserTie },
    { title: "All Job Categories", path: 'job-categories', icon: faTags },
    { title: "All Job Industries", path: 'job-industries', icon: faBuilding },
    { title: "All Job Countries", path: 'job-countries', icon: faBuilding },
    { title: "All Job Cities", path: 'job-cities', icon: faBuilding },
    { title: "Add A Job", path: 'add-job', icon: faPlus },
    { title: "Added Jobs List", path: 'editor-pending-jobs', icon: faHourglassHalf },
    { title: "Posted Jobs", path: 'editor-posted-jobs', icon: faCheck },
    { title: "Rejected Jobs", path: 'editor-rejected-jobs', icon: faBan },
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

export default EditorPanel
