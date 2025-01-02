import { useContext, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import JobSeekerContext from '../../ContextApi/JobSeekerContext'

function JobSeeker() {
    const {jobSeekers} = useContext(JobSeekerContext)
    const [titleSearch, setTitleSearch] = useState("")
  const [industrySearch, setIndustrySearch] = useState("")
  const [nameSearch, setNameSearch] = useState("")

  const filterJobSeeker = jobSeekers?.filter(job =>
    job.title.toLowerCase().includes(titleSearch.toLowerCase())).filter(job => job.industry.toLowerCase().includes(industrySearch.toLowerCase())).filter(job =>
      job.name.toLowerCase().includes(nameSearch.toLowerCase()))

    const industries = [
      { value: "", label: "Select Industry" },
      { value: "Information Technology", label: "Information Technology" },
      { value: "Healthcare", label: "Healthcare" },
      { value: "Finance", label: "Finance" },
      { value: "Education", label: "Education" },
      { value: "Manufacturing", label: "Manufacturing" },
      { value: "Retail & E - commerce", label: "Retail & E - commerce" },
      { value: "Construction", label: "Construction" },
      { value: "Hospitality & Tourism", label: "Hospitality & Tourism" },
      { value: "Transportation & Logistics", label: "Transportation & Logistics" },
      { value: "Media & Entertainment", label: "Media & Entertainment" },
      { value: "Telecommunications", label: "Telecommunications" },
      { value: "Government & Public Services", label: "Government & Public Services" },
      { value: "Legal Services", label: "Legal Services" },
      { value: "Nonprofit & NGOs", label: "Nonprofit & NGOs" },
      { value: "Energy & Utilities", label: "Energy & Utilities" },
      { value: "Agriculture", label: "Agriculture" },
      { value: "Real Estate", label: "Real Estate" },
      { value: "Consulting", label: "Consulting" },
      { value: "Marketing & Advertising", label: "Marketing & Advertising" },
      { value: "Pharmaceuticals & Biotechnology", label: "Pharmaceuticals & Biotechnology" }
    ]
    
  return (
    <>
      <section className="job-head">
        <div className="page-head-overlay">
          <Container>
            <Row className="justify-content-center align-items-center py-6">
              <Col md={9}>
                <h2 className="text-center text-white fw-bold">
                  Find Potential Employees
                </h2>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      <section className="job-seekers py-5">
        <Container>
        <div className="row mb-4 find d-flex justify-content-between">
              <div className="col-md-4 mt-4">
                <input
                  type="text"
                  className="form-control schoo-search"
                  placeholder="Search By Job Title"
                  onChange={(e) => setTitleSearch(e.target.value)}
                  // value={searchName}
                  // onChange={(e) => setSearchName(e.target.value)}
                />
              </div>
              <div className="col-md-4 mt-4">
                <input
                  type="text"
                  className="form-control schoo-search"
                  placeholder="Search By Job Seeker Name"
                  onChange={(e) => setNameSearch(e.target.value)}
                />
              </div>
              <div className="col-md-4 mt-4">
                <select
                  type="text"
                  className="form-control schoo-search"
                  onChange={(e) => setIndustrySearch(e.target.value)}
                >
                  {industries.map((ind, index) => (
                    <option key={index} value={ind.value}>{ind.label}</option>
                  ))}
                </select>
              </div>
              
            </div>
        <Row className="g-5 justify-content-center">
            <Col md={12} className="">
              <Row>
                {filterJobSeeker &&
                  filterJobSeeker.filter(seekerPost => seekerPost.status !=="Pending").filter(seekerPost => seekerPost.status !=="N").map((alljobs, index) => {
                    return (
                      <Col md={4} key={index} >
                        <Card className="job-card p-3 mb-3" style={{border: '1px solid #ccc'}}>
                          <div style={{backgroundColor: '#f1f3fb', padding: '6px'}}>
                          <h5 className="" >{alljobs.title.length> 30? alljobs.title.slice(0,30) + "..": alljobs.title }</h5>
                          <p className="m-0" style={{fontSize: '14px'}}>By: {alljobs.name}</p>
                          {/* <FontAwesomeIcon icon={faBookmark} onClick={() => saveJob(alljobs)} className="m-3" style={{cursor: 'pointer'}}/> */}
                          </div>
                          <span className="m-0 mb-3 mt-3"><FontAwesomeIcon icon={faEnvelope} />&nbsp;{alljobs.email}</span>
                          <span style={{marginTop: "-10px", marginBottom: "15px", color: '#a9a9a9', fontSize: '13px', fontWeight: 'bold'}}>{alljobs.city}</span>
                          
                            <p className="mt-3 m-0"><FontAwesomeIcon icon={faBriefcase} />&nbsp;{alljobs.industry}</p>
                            <div className="d-flex mt-3 justify-content-between">
                              {/* <span style={{color: "#a9a9a9", fontWeight: 'bold'}}>Posted {getPostedJobDaysFn(alljobs.createdAt)} days ago</span> */}
                            <Button as={Link} to={`/job-seeker-detail/${alljobs.title.replace(/ /g,"_")}`}>View Details</Button>
                            </div>
                        </Card>
                      </Col>
                    );
                  })}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default JobSeeker


