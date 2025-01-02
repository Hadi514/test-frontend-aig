import { useCallback, useContext, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  DropdownButton,
  Dropdown,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import jobContext from "../ContextApi/JobContext";
import NEWLOGO from "../../src/assets/Images/AIG-Logo.png";
import UserImg from "../../src/assets/Images/user-img.avif";
import UserContext from "../ContextApi/UserContext";
import CourseContext from "../ContextApi/CourseContext";
import MyContext from "../ContextApi/MyContext";
import ResourcesContext from "../ContextApi/ResourcesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import InterviewContext from "../ContextApi/InterviewContext";
import ServicesContext from "../ContextApi/ServicesContext";

function UserNav() {
  const { allJobPosts } = useContext(jobContext);
  const { signUser, setSignUser } = useContext(UserContext);
  const { uniqueCategory, setCategory } = useContext(MyContext)
  const { uniqueCourseCategory, setCourseCategory } = useContext(CourseContext)
  const { allResources } = useContext(ResourcesContext)
  const { allInterviews } = useContext(InterviewContext)
  const { allServices } = useContext(ServicesContext)



  const navigate = useNavigate()

  const categorySetHere = uniqueCategory && [...uniqueCategory].slice(0, 5).map((category) => {
    return { text: category }
  })

  const getCourseCategory = uniqueCourseCategory?.map((cat) => (
    { text: cat.category }
  ))

  const resourceFilter = allResources?.map(res => {
    return { path: `/resource-detail/${res.slug}`, text: res.category }
  })

  const interviewFilter = allInterviews?.map(res => {
    return { path: `/interviews/${res.slug}`, text: res.category }
  })

  const servicesFilter = allServices?.map(res => {
    return { path: `/services/${res.slug}`, text: res.category }
  })
  const onLinkClick = () => {
    allJobPosts();
  };

  const logOutButton = () => {
    sessionStorage.removeItem("userData");
    setSignUser("");
    navigate("/");
  };

  const navBarLinks = [
    { path: "/", text: "Home" },
    {
      text: "Find Jobs",
      type: "dropLinks",
      jobsMenu: [
        { path: "/jobs", text: "All Jobs" },
        { path: "/jobs-by-industry", text: "Jobs By Industry" },
        { path: "/jobs-by-country", text: "Jobs By Country" },
        { path: "/jobs-by-city", text: "Jobs By City" },
        { path: "/jobs-by-category", text: "Jobs By Category" },
        { path: "/remote-jobs", text: "Work From Home Jobs" },
      ],
    },
    {
      text: "Courses",
      type: "coursesDropLinks",
      coursesMenu: [
        // { path: "/courses", text: "Courses" },
        ...getCourseCategory,
      ],
    },
    {
      text: "Resources",
      type: "resourcesDropLinks",
      jobsMenu: [
        ...resourceFilter,
      ],
    },
    {
      text: "Interviews",
      type: "interviewDropLinks",
      jobsMenu: [
        // { path: "/interviews", text: "Interviews" },
        // { path: "/interview-tips-and-tricks", text: "Interview Tips & Tricks" },
        // { path: "/interview-scheduler", text: "Interview Scheduler" },
        ...interviewFilter
      ],
    },
    {
      text: "Services",
      type: "servicesDropLinks",
      jobsMenu: [
        // { path: "/text-resume-writing", text: "Text Resume Writing" },
        // { path: "/visual-resume-writing", text: "Visual Resume Writing" },
        ...servicesFilter,
        { upgradeBtn: [{ btn: "Upgrade To Premium" }], path: "/upgrade", text: "" },
      ],
    },
    {
      text: "Blogs",
      type: "blogDropLinks",
      jobsMenu: [
        { path: "/blog", text: "All Blogs" },
        ...categorySetHere
      ],
    },
    { path: "/job-seekers", text: "Find Employees" },
  ];

  const signUserPanelLinks = (() => {
    if (signUser && signUser.role === "Job Seaker") {
      return [
        { path: "/user-panel/dashboard", text: "Dashboard" },
        { path: "/user-panel/my-profile", text: "My Profile" },
        { path: "/user-panel/applied-jobs", text: "Applied Jobs" },
      ];
    } else if (signUser && signUser.role === "Employer") {
      return [
        { path: "/employer-panel/dashboard", text: "Dashboard" },
        { path: "/employer-panel/employer-profile", text: "My Profile" },
        { path: "/employer-panel/employer-job-post", text: "Post A Job" },
        { path: "/employer-panel/employer-posted-jobs", text: "Posted Jobs" },
      ];
    } else if (signUser && signUser.role === "Admin") {
      return [
        { path: "/adminPanel/dashboard", text: "Dashboard" },
        { path: "/adminPanel/add-user", text: "Manage Users" },
        { path: "/adminPanel/add-course", text: "Manage Courses" },
        { path: "/adminPanel/job-applications", text: "Job Applicatons" },
        { path: "/adminPanel/posted-jobs", text: "Posted Jobs" },
      ];
    } else {
      return [
        { path: "/editor-panel/dashboard", text: "Dashboard" },
        { path: "/editor-panel/my-profile", text: "My Profile" },
        { path: "/editor-panel/add-job", text: "Add A Job" },
        { path: "/editor-panel/editor-posted-jobs", text: "Posted Jobs" },
      ];
    }
  })();

  const [isOpen, setIsOpen] = useState({});

  const showDropdown = useCallback(
    (type) => setIsOpen((prevState) => ({ ...prevState, [type]: true })),
    []
  );

  const hideDropdown = useCallback(
    (type) => setIsOpen((prevState) => ({ ...prevState, [type]: false })),
    []
  );
  const openCourseByCategory = (cat) => {
    if (cat === "Courses") {
      navigate("/all-courses")
    } else {
      setCourseCategory(cat)
      navigate("/courses")
    }
  }
  const openBlogAndCategory = (cat) => {
    if (cat === "All Blogs") {
      navigate("/all-blogs")
    } else {
      setCategory(cat)
      navigate("/blog")
    }
  }


  return (
    <Navbar expand="lg" className=" main-nav py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={() => onLinkClick()}>
          <img
            src={NEWLOGO}
            alt="find-your-dream-job"
            className="img-fluid"
            style={{ width: "160px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto mx-auto">
            {navBarLinks.map((nav, index) => (
              <div key={index}>
                {["dropLinks", "interviewDropLinks", "servicesDropLinks", "resourcesDropLinks", "coursesDropLinks"].includes(nav.type) ? (
                  <Dropdown
                    onMouseEnter={() => showDropdown(nav.type)}
                    onMouseLeave={() => hideDropdown(nav.type)}
                    show={isOpen[nav.type]}
                    className="mt-1"
                  >
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      style={{ backgroundColor: "transparent", border: "none" }}
                    >
                      {nav.text}
                    </Dropdown.Toggle>

                    {nav.type === "resourcesDropLinks" ? (
                      <Dropdown.Menu>
                        <div className="d-flex flex-md-row flex-column">
                          <div className="me-2 w-50">
                            <h6 className="fw-bold" style={{ marginLeft: "9%" }}>Labour Laws</h6>
                            {nav.jobsMenu.slice(0, 5).map((sublink, subIndex) => (
                              <div key={subIndex}>
                                <Dropdown.Item key={subIndex} as={Link} to={sublink.path}>
                                  {sublink.text}
                                </Dropdown.Item>
                              </div>
                            ))}
                          </div>
                          <div className="w-50">
                            <h6 className="fw-bold" style={{ marginLeft: "8%" }}>Other Resources</h6>
                            {nav.jobsMenu.slice(5).map((sublink, subIndex) => (
                              <div key={subIndex}>
                                <Dropdown.Item key={subIndex} as={Link} to={sublink.path} style={{ marginRight: "25px" }}>
                                  {sublink.text}
                                </Dropdown.Item>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Dropdown.Menu>
                    ) : nav.type === "coursesDropLinks" ? (
                      // 3-column dropdown for Courses
                      <Dropdown.Menu>
                        <div className="d-flex flex-md-row flex-column">
                          <div className="me-2 w-33 mob-cou-nav">
                            <h6 className="fw-bold" style={{ marginLeft: "10%" }}>Courses</h6>
                            {nav.coursesMenu.slice(0, 3).map((sublink, subIndex) => (
                              <div key={subIndex}>
                                <Dropdown.Item onClick={() => openCourseByCategory(sublink.text)}>
                                  {sublink.text}
                                </Dropdown.Item>
                              </div>
                            ))}
                          </div>
                          <div className="me-2 w-33">
                            {nav.coursesMenu.slice(3, 6).map((sublink, subIndex) => (
                              <div key={subIndex}>
                                <h6>{sublink.name}</h6>
                                <Dropdown.Item onClick={() => openCourseByCategory(sublink.text)}>
                                  {sublink.text}
                                </Dropdown.Item>
                              </div>
                            ))}
                          </div>
                          <div className="w-33">
                            {nav.coursesMenu.slice(6).map((sublink, subIndex) => (
                              <div key={subIndex}>
                                <h6>{sublink.name}</h6>
                                <Dropdown.Item onClick={() => openCourseByCategory(sublink.text)}>
                                  {sublink.text}
                                </Dropdown.Item>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Dropdown.Menu>
                    ) : (
                      // Single column dropdown for other menus
                      <Dropdown.Menu>
                        {nav.jobsMenu.map((sublink, subIndex) => (
                          <div key={subIndex}>
                            <Dropdown.Item as={Link} to={sublink.path}>
                              {sublink.text} <br />
                              {sublink.upgradeBtn?.map((button, index) => (
                                <Button key={index} className="" style={{ backgroundColor: 'green', border: 'none', marginLeft: "-5px" }}><FontAwesomeIcon icon={faCrown} />&nbsp;{button.btn}</Button>))}
                            </Dropdown.Item>
                          </div>
                        ))}
                      </Dropdown.Menu>
                    )}
                  </Dropdown>
                ) : ["blogDropLinks"].includes(nav.type) ? (
                  <Dropdown
                    onMouseEnter={() => showDropdown(nav.type)}
                    onMouseLeave={() => hideDropdown(nav.type)}
                    show={isOpen[nav.type]}
                    className="mt-1"
                  >
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      style={{ backgroundColor: "transparent", border: "none" }}
                    >
                      {nav.text}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {nav.jobsMenu.map((sublink, subIndex) => (
                        <Dropdown.Item key={subIndex} onClick={() => openBlogAndCategory(sublink.text)}>
                          {sublink.text}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <Nav.Link as={Link} to={nav.path} onClick={onLinkClick}>
                    {nav.text}
                  </Nav.Link>
                )}
              </div>
            ))}
          </Nav>

          <div className="profile d-flex align-items-center">
            {signUser && signUser.userImage ? (
              <img
                src={signUser.userImage}
                alt=""
                className="img-fluid me-2"
                style={{ width: "50px", height: '50px', borderRadius: "100px" }}
              />
            ) : (
              <img
                src={UserImg}
                alt=""
                className="img-fluid me-2"
                style={{ width: "50px", borderRadius: "100px" }}
              />
            )}
            <DropdownButton
              id="dropdown-basic-button"
              className="user-drop"
              align="start"
              title={signUser && signUser.name.slice(0, 10)}
              style={{ backgroundColor: "transparent", color: "#fff", border: "none" }}
            >
              {signUserPanelLinks.map((panelLinks, index) => (
                <Dropdown.Item key={index} as={Link} to={panelLinks.path}>
                  {panelLinks.text}
                </Dropdown.Item>
              ))}
              <Dropdown.Item onClick={logOutButton}>Logout</Dropdown.Item>
            </DropdownButton>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UserNav;
