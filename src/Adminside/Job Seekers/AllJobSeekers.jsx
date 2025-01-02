import { useContext, useState } from "react"
import JobSeekerContext from "../../ContextApi/JobSeekerContext"
import ViewJobSeeker from "./ViewJobSeeker"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAnglesLeft, faAnglesRight, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Button } from "react-bootstrap"
import JobCountriesContext from "../../ContextApi/JobCountryContext"

function AllJobSeekers() {
  const { jobSeekers, delSeekerId } = useContext(JobSeekerContext)
  const { jobCountries } = useContext(JobCountriesContext)
  const [searchIndustry, setSearchIndustry] = useState("")
  const [searchTitle, setSearchTitle] = useState("")
  const [country, setCountry] = useState("")
  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const jobSeekersPerPage = itemsPerPage

  const lastUserIndex = currentPage * jobSeekersPerPage
  const firstJobSeekersIndex = lastUserIndex - jobSeekersPerPage
  const currentJobSeekers = jobSeekers?.slice(firstJobSeekersIndex, lastUserIndex).filter(seekerPost => seekerPost.status !== "Pending").filter(seekerPost => seekerPost.status !== "N")

  const totalPages = Math.ceil(jobSeekers.length / jobSeekersPerPage)

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
  }

  return (
    <>
      <h2>Approved Job Seeker Posts List</h2>

      <div className="row mb-4 find d-flex">

        <div className="col-md-4 mt-4">
          <input
            type="text"
            className="form-control schoo-search"
            placeholder="Search Job By Title"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </div>
        <div className="col-md-4 mt-4">
          <select onChange={(e) => setCountry(e.target.value)}>
            <option value="">Search Job By Country</option>
            {jobCountries?.map((data, index) => (
              <option key={index} value={data.isoCode}>
                {data.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mt-4">
          <select onChange={(e) => setSearchIndustry(e.target.value)}>
            <option value="">Search Job By Industry</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Retail & E - commerce">Retail & E - commerce</option>
            <option value="Construction">Construction</option>
            <option value="Hospitality & Tourism">Hospitality & Tourism</option>
            <option value="Transportation & Logistics">Transportation & Logistics</option>
            <option value="Media & Entertainment">Media & Entertainment</option>
            <option value="Telecommunications">Telecommunications</option>
            <option value="Government & Public Services">Government & Public Services</option>
            <option value="Legal Services">Legal Services</option>
            <option value="Nonprofit & NGOs">Nonprofit & NGOs</option>
            <option value="Energy & Utilities">Energy & Utilities</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Consulting">Consulting</option>
            <option value="Marketing & Advertising">Marketing & Advertising</option>
            <option value="Pharmaceuticals & Biotechnology">Pharmaceuticals & Biotechnology</option>

          </select>
        </div>
      </div>

      <div>
        <p>Show <select name="" id="" onChange={(e) => setItemsPerPage(e.target.value)}>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select> Entries</p>
      </div>

      <div className="table-responsive-sm">
        <table className="admin-table">
          <thead>
            <tr className="form-title">
              <th>#</th>
              <th>Title</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Location</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {currentJobSeekers?.filter(job => job.country.includes(country)).filter(job => job.title.toLowerCase().includes(searchTitle.toLocaleLowerCase())).filter(job => job.industry.includes(searchIndustry)).reverse().map((seekerPost, index) => {
              return <tr key={index}>
                <td>{firstJobSeekersIndex + index + 1}</td>
                <td>{seekerPost.title}</td>
                <td>{seekerPost.email}</td>
                <td>{seekerPost.contact}</td>
                <td>{seekerPost.city}</td>
                <td className="">
                  <ViewJobSeeker seekerPostId={seekerPost._id} />
                  <FontAwesomeIcon icon={faTrash} onClick={() => delSeekerId(seekerPost._id)} />
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
      {jobSeekers?.length > jobSeekersPerPage && (
        <div className="pagination-controls mt-3">
          <Button onClick={goToPreviousPage} disabled={currentPage === 1}>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </Button>
          <span className="me-2 ms-2">Page {currentPage} of {totalPages}</span>
          <Button onClick={goToNextPage} disabled={currentPage === totalPages}>
            <FontAwesomeIcon icon={faAnglesRight} />
          </Button>
        </div>
      )}
    </>
  )
}

export default AllJobSeekers
