import { useContext, useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import jobContext from "../../ContextApi/JobContext";
import defaultCompany from "../../assets/Images/company-default-img.avif"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAnglesRight,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import JobCountriesContext from "../../ContextApi/JobCountryContext";
import Swal from "sweetalert2";
import UserContext from "../../ContextApi/UserContext";
import { Link, Outlet } from "react-router-dom";

function Jobs() {

  const { postedJobs, filterPostedJobs, colAdjust, 
    setColAdjust} = useContext(jobContext);
  const { country, setCountry } = useContext(JobCountriesContext);
  const [uniqueCountry, setUniqueCountry] = useState([]);
  const [uniqueCity, setUniqueCity] = useState([]);
  const [uniqueInd, setUniqueInd] = useState([]);
  const [uniqueCat, setUniqueCat] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedInd, setSelectedInd] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCat, setSelectedCat] = useState("");
  const [city, setCity] = useState("");
  const [ind, setInd] = useState("");
  const [cat, setCat] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  const [expandedCountries, setExpandedCountries] = useState(false);
  const [expandedCities, setExpandedCities] = useState(false);
  const [expandedIndustries, setExpandedIndustries] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState(false);

  const { signUser } = useContext(UserContext);

  const handleChange = (country) => {
    setCountry(country);
    setSelectedCountry(country)
  };

  const handleCityChange = (city) => {
    setCity(city);
    setSelectedCity(city)
  };

  const handleIndChange = (ind) => {
    setInd(ind);
    setSelectedInd(ind)
  };

  const handleCatChange = (cat) => {
    setCat(cat);
    setSelectedCat(cat)
  };

 

  const filteredJobs = filterPostedJobs?.filter((job) => {
    if (country && !job.country?.country.includes(country)) return false;
    if (city && !job.city?.city.includes(city)) return false;
    if (ind && job.industryId?.industry !== ind) return false;
    if (cat && job.categoryId?.category !== cat) return false;

    return true;
  });

  const handleToggle = (type) => {
    if (type === "country") {
      setExpandedCountries(!expandedCountries);
    } else if (type === "city") {
      setExpandedCities(!expandedCities);
    } else if (type === "industry") {
      setExpandedIndustries(!expandedIndustries);
    } else if (type === "category") {
      setExpandedCategories(!expandedCategories);
    }
  };

  useEffect(() => {
    const allUniqueCountry = [...new Set(postedJobs.map((job) => job.country?.country))];
    setUniqueCountry(allUniqueCountry);
    const allUniqueCity = [...new Set(postedJobs.map((job) => job.city?.city))];
    setUniqueCity(allUniqueCity);
    const allUniqueInd = [...new Set(postedJobs.map((job) => job.industryId?.industry))];
    setUniqueInd(allUniqueInd);
    const allUniqueCat = [...new Set(postedJobs.map((job) => job.categoryId?.category))];
    setUniqueCat(allUniqueCat);
  }, [postedJobs]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const jobPostPerPage = 10;

  const lastPostJobIndex = currentPage * jobPostPerPage;
  const firstUserIndex = lastPostJobIndex - jobPostPerPage;
  const currentPostedJobs = filteredJobs?.slice(firstUserIndex, lastPostJobIndex);

  const totalPages = Math.ceil(filteredJobs.length / jobPostPerPage);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  useEffect(() => {
    if (selectedCountry) {
      const citiesForCountry = uniqueCity.filter(city => {
        return postedJobs.some(job => job.country?.country === selectedCountry && job.city?.city === city);
      });
      const uniqueCitiesForCountry = [...new Set(citiesForCountry)];
      setFilteredCities(uniqueCitiesForCountry);
    } else {
      setFilteredCities([]);
    }
  }, [selectedCountry, uniqueCity, postedJobs]);

  const saveJob = (job) => {
    if (signUser?.role) {
      const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
      const checkJob = savedJobs.some((savjob) => savjob._id === job._id);
      if (!checkJob) {
        savedJobs.push(job);
        localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
        Swal.fire("You saved this job!");
      } else {
        Swal.fire("Job already saved!");
      }
    } else {
      Swal.fire("You have to sign In first");
    }
  };


  const formatDate = (jobDate) => {
    const todayDate = new Date();
    const jobPostedDate = new Date(jobDate);
    const differenceInTime = todayDate - jobPostedDate; // Difference in milliseconds
    const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24)); // Convert ms to days
    return differenceInDays === 0 ? "Today" : `${differenceInDays + 1} days ago`;
  };

  const renderItems = (items, type, expanded) => {
    // Ensure items are filtered for uniqueness and empty values
    const filteredItems = items.filter(item => item && item.trim() !== '');

    return filteredItems
      .slice(0, expanded ? filteredItems.length : 5) // Limit items to 5 unless expanded
      .map((item, index) => (
        <div key={index} style={{ display: "flex" }}>
          <Form>
            <Form.Check
              type="checkbox"
              id={`custom-checkbox-${type}-${index}`}
              checked={
                type === "country"
                  ? selectedCountry === item
                  : type === "city"
                    ? selectedCity === item
                    : type === "industry"
                      ? selectedInd === item
                      : selectedCat === item
              }
              onChange={() =>
                type === "country"
                  ? handleChange(item)
                  : type === "city"
                    ? handleCityChange(item)
                    : type === "industry"
                      ? handleIndChange(item)
                      : handleCatChange(item)
              }
              className="countryCheck"
            />
          </Form>
          <span
            style={{
              cursor: "pointer",
              lineHeight: "2.5rem",
              marginTop: "-10px",
              marginLeft: "5px",
              fontWeight: "550",
              fontFamily: "jost",
            }}
          >
             {/* {/ Correctly display the current item /} */}
            {item}
          </span>
        </div>
      ));
  };

  return (
    <>
      <section className="job-head">
        <div className="page-head-overlay">
          <Container>
            <Row className="justify-content-center align-items-center py-6">
              <Col md={9}>
                <h2 className="text-center text-white fw-bold">
                  Explore All Jobs
                </h2>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      <section className="interview-section py-4">
        <Container fluid className="px-lg-4">
          <Row className="mt-5 g-4 justify-content-center">
            <Col md={3}>
              <Card className="jobs-filter-sidebar">
                <Accordion defaultActiveKey="0" className="mb-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Filter By Country</Accordion.Header>
                    <Accordion.Body>
                      {renderItems(uniqueCountry, "country", expandedCountries)}
                      {uniqueCountry.length > 5 && (
                        <button
                          onClick={() => handleToggle("country")}
                          style={{
                            marginTop: "10px",
                            cursor: "pointer",
                            backgroundColor: "transparent",
                            border: "none",
                            color: "var(--primary-color)",
                            fontWeight: '500',
                            textDecoration: "underline"
                          }} 
                        >
                          {expandedCountries ? "Show Less" : "+Show More.."}
                        </button>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

                <Accordion defaultActiveKey="" className="mb-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Filter By City</Accordion.Header>
                    <Accordion.Body>
                      {selectedCountry ? (
                        renderItems(filteredCities, "city", expandedCities)
                      ) : (
                        <p>Please select a country first</p>
                      )}
                      {filteredCities.length > 5 && (
                        <button
                          onClick={() => handleToggle("city")}
                          style={{
                            marginTop: "10px",
                            cursor: "pointer",
                            backgroundColor: "transparent",
                            border: "none",
                            color: "var(--primary-color)",
                            fontWeight: '500',
                            textDecoration: "underline"
                          }}
                        >
                          {expandedCities ? "Show Less" : "+Show More"}
                        </button>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

                <Accordion defaultActiveKey="" className="mb-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Filter By Industry</Accordion.Header>
                    <Accordion.Body>
                      {renderItems(uniqueInd, "industry", expandedIndustries)}
                      {uniqueInd.length > 5 && (
                        <button
                          onClick={() => handleToggle("industry")}
                          style={{
                            marginTop: "10px",
                            cursor: "pointer",
                            backgroundColor: "transparent",
                            border: "none",
                            color: "var(--primary-color)",
                            fontWeight: '500',
                            textDecoration: "underline"
                          }}
                        >
                          {expandedIndustries ? "Show Less" : "+Show More.."}
                        </button>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

                <Accordion defaultActiveKey="" className="mb-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Filter By Category</Accordion.Header>
                    <Accordion.Body>
                      {renderItems(uniqueCat, "category", expandedCategories)}
                      {uniqueCat.length > 5 && (
                        <button
                          onClick={() => handleToggle("category")}
                          style={{
                            marginTop: "10px",
                            cursor: "pointer",
                            backgroundColor: "transparent",
                            border: "none",
                            color: "var(--primary-color)",
                            fontWeight: '500',
                            textDecoration: "underline"
                          }}
                        >
                          {expandedCategories ? "Show Less" : "+Show More.."}
                        </button>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card>
            </Col>
            <Col md={9}>
              <div className="section-head justify-content-between align-items-center">
                <h2 className="mt-2">All Job Vacancies</h2>
                {filteredJobs?.length === 1 ? (
                  <span className="fw-bold">{filteredJobs?.length} job found</span>
                ) : (
                  <span className="fw-bold">{filteredJobs?.length} jobs found</span>
                )}
                <hr />
              </div>
              <Row className="g-3 justify-content-between">
                <Col md={colAdjust}>
                
                
                <div className="alldetails bg-white p-4">
                  {currentPostedJobs?.reverse().map((alljobs, index) => (
                <Link key={index} to={`job-detail/${alljobs._id}`} onClick={() => setColAdjust(6)}>
                    <div className="list-the-jobs px-3" key={index} style={{cursor: "pointer"}}>
                      <div className="d-flex justify-content-between">
                      <span style={{ color: "var(--primary-color)", fontWeight: '550' }} >{alljobs.title}</span>
                      <FontAwesomeIcon
                      icon={faBookmark}
                      onClick={() => saveJob(alljobs._id)}
                      className="m-3"
                      style={{ cursor: 'pointer' }}
                    />
                      </div>
                      <div className="d-flex mt-2">
                        <div className="logo me-2">
                          {alljobs.jobImage ? (

                            <img src={alljobs.jobImage} alt="" className="img-fluid" style={{width: "40px", height: "40px"}} />
                          ) : (
                            <img src={defaultCompany} alt="" className="img-fluid" style={{width: "40px", height: "40px"}} />
                          )}
                        </div>
                        <div className="me-2">
                          <span style={{fontSize: "15px"}}>{alljobs.companyName}</span><br />
                          <span style={{color: "#9a9a9a"}}>{alljobs.city?.city} - {alljobs.country?.country}</span>
                        </div>
                      </div>
                      <p
                            className="m-0 text-muted"
                            dangerouslySetInnerHTML={{
                              __html: alljobs.description.length > 200 ? alljobs.description.slice(0,200) + ".." : alljobs.description,
                            }}
                          ></p>
                          <span style={{color: "green", fontWeight: "550"}}>{formatDate(alljobs.createdAt)}</span>
                          <hr />
                    </div>
                  </Link>
                  ))}
                
                </div>
                </Col>
                {colAdjust === 6 && (
                  <Col md={6}>
                    <Outlet />
                  </Col>
                )}
              </Row>
              {filteredJobs.length > jobPostPerPage && (
                <div className="pagination-controls d-flex justify-content-center my-3">
                  <Button onClick={goToPreviousPage} disabled={currentPage === 1}>
                    <FontAwesomeIcon icon={faAnglesLeft} />
                  </Button>
                  <span className="me-2 ms-2">
                    {Math.min(firstUserIndex + 1, filteredJobs.length)} to{" "}
                    {Math.min(lastPostJobIndex, filteredJobs.length)} of {filteredJobs.length}
                  </span>

                  <Button onClick={goToNextPage} disabled={currentPage === totalPages}>
                    <FontAwesomeIcon icon={faAnglesRight} />
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>

    </>
  );
}

export default Jobs;



