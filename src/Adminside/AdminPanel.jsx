import {
  Button,
  Col,
  Container,
  Accordion,
  Row,
} from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faBlog,
  faBook,
  faBriefcase,
  faBuilding,
  faCheck,
  faFile,
  faFilePdf,
  faHourglassHalf,
  faLayerGroup,
  faMicrophone,
  faPlus,
  faTachometerAlt,
  faTags,
  faToolbox,
  faTools,
  faUser,
  faUserPlus,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

export default function AdminPanel() {
  const adminBar = [
    {
      path: "dashboard",
      title: "Dashboard",
      type: "adminLinks",
      icon: faTachometerAlt,
    },
    {
      title: "Manage Users",
      type: "AdminAccordion",
      icon: faUser,
      dropDownList: [
        { path: "add-user", title: "Add User", icon: faUserPlus },
        { path: "employers", title: "Employers", icon: faUser },
        { path: "job-seeker", title: "Job Seeker", icon: faUser },
        { path: "system-users", title: "System Users", icon: faUser },
      ],
    },
    {
      title: "Manage Jobs",
      type: "AdminAccordion",
      icon: faBriefcase,
      dropDownList: [
        { path: "all-job-categories", title: "Job Categories", icon: faTags },
        { path: "all-job-industries", title: "Job Industries", icon: faBuilding },
        { path: "all-job-countries", title: "Job Countries", icon: faBuilding },
        { path: "all-job-cities", title: "Job Cities", icon: faBuilding },
        { path: "add-jobs", title: "Add A Job", icon: faPlus },
        { path: "job-requests", title: "Job Requests", icon: faHourglassHalf },
        { path: "posted-jobs", title: "Posted Jobs", icon: faCheck },
        { path: "rejected-jobs", title: "Rejected Jobs", icon: faBan },
      ],
    },
    {
      title: "Manage Courses",
      type: "AdminAccordion",
      icon: faBook,
      dropDownList: [
        {
          path: "course-category",
          title: "Add Course Category",
          icon: faLayerGroup,
        },
        { path: "add-course", title: "Courses", icon: faPlus },
      ],
    },
    {
      title: "Manage Blogs",
      type: "AdminDropdown",
      icon: faBlog,
      dropDownList: [
        // { path: "add-blog-category", title: "Add Blog Category", icon: faTag},
        { path: "all-blog-category", title: "Blog Categories", icon: faTags },
        { path: "add-blog", title: "Add Blog", icon: faPlus },
        { path: "all-blog-posts", title: "All Blog Posts", icon: faCheck },
      ],
    },
    {
      title: "Manage Resources",
      type: "AdminDropdown",
      icon: faToolbox,
      dropDownList: [
        // { path: "add-resource-category", title: "Add Resource Category" },
        { path: "all-resources-categories", title: "Resource Categories", icon: faTags },
        { path: "add-resource", title: "Add A Resource", icon: faPlus },
        { path: "all-resources", title: "All Resources", icon: faFile },
      ],
    },
    {
      title: "Manage Interviews",
      type: "AdminDropdown",
      icon: faToolbox,
      dropDownList: [
        // { path: "add-interview-category", title: "Add Interview Category" },
        { path: "all-interview-categories", title: "Interview Categories", icon: faTags },
        { path: "add-interview-item", title: "Add Interview Item", icon: faPlus },
        { path: "all-interview-items", title: "All Interview Items", icon: faMicrophone },
      ],
    },
    {
      title: "Manage Services",
      type: "AdminDropdown",
      icon: faTools,
      dropDownList: [
        // { path: "add-services-category", title: "Add Services Category" },
        { path: "all-service-categories", title: "Service Categories", icon: faTags },
        { path: "add-service-item", title: "Add Service Item", icon: faPlus },
        { path: "all-service-items", title: "All Service Items", icon: faTools },
      ],
    },
    {
      title: "Manage Reviews",
      type: "AdminDropdown",
      icon: faTachometerAlt,
      dropDownList: [
        // { path: "add-review", title: "Add Review", icon: faPlus },
        { path: "all-reviews", title: "Reviews", icon: faTachometerAlt },
      ],
    },
    {
      path: "interview-advices",
      title: "Interview Advices",
      type: "adminLinks",
      icon: faTachometerAlt,
    },
    {
      path: "pending-job-seekers",
      title: "Job Seeeker Requests",
      type: "adminLinks",
      icon: faHourglassHalf,
    },
    {
      path: "job-seeker-posts",
      title: "Job Seeker Posts",
      type: "adminLinks",
      icon: faTachometerAlt,
    },
    {
      title: "Manage Job Applications",
      type: "AdminDropdown",
      icon: faUserTie,
      dropDownList: [
        { path: "job-applications", title: "Job Applications", icon: faUserTie },
        { path: "pending-job-applications", title: "Pending Job Applications", icon: faUserTie },
      ],
    },
    {
      path: "all-resumes",
      title: "All Resumes",
      type: "adminLinks",
      icon: faTachometerAlt,
    },
    {
      path: "uploaded-cv",
      title: "Uploaded PDF CVs",
      type: "adminLinks",
      icon: faFilePdf,
    },
  ];

  return (
    <>
      <Container fluid className="" style={{ backgroundColor: "#f2f5f8" }}>
        <Row className="admin-links ">
          <Col md={3} className="bg-white pt-5" >
            {adminBar &&
              adminBar.map((admin, index) => {
                return (
                  <div key={index} className="admin-sidebar">
                    {admin.type === "adminLinks" ? (
                      <div className="d-flex" style={{ borderBottom: '1px solid #ccc' }}>
                        <FontAwesomeIcon icon={admin.icon} className="mt-2 admin-icons" />
                        <Button className="mb-3 admin-btn" as={Link} to={admin.path} style={{ fontSize: '1rem' }}>
                          {admin.title}
                        </Button>
                      </div>
                    ) : (
                      <Accordion defaultActiveKey={null} alwaysOpen style={{ borderBottom: '1px solid #ccc' }}>
                        <Accordion.Item eventKey={index} className="mb-3 all-accordions" >
                          <Accordion.Header>
                            <FontAwesomeIcon icon={admin.icon} className="mt-2 admin-icons" />&nbsp; {admin.title}
                          </Accordion.Header>
                          <Accordion.Body>
                            {admin.dropDownList.map((dropdown, subIndex) => (
                              <div key={subIndex} className="d-flex" style={{ borderBottom: '1px solid #ccc' }}>
                                <FontAwesomeIcon icon={dropdown.icon} className="mt-2 admin-icons" />
                                <Button as={Link} to={dropdown.path} className="mb-3 admin-btn">
                                  {dropdown.title}
                                </Button>
                              </div>
                            ))}
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    )}
                  </div>
                );
              })}
          </Col>
          <Col md={9} className="content-col-admin py-5">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
}
