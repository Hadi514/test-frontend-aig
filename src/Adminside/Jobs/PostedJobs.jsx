import { useContext, useState } from "react";
import jobContext from "../../ContextApi/JobContext";
import JobActionModal from "./JobViewModal";
import JobEditModal from "./JobEditModal";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faAnglesRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../ContextApi/UserContext";
import { Button } from "react-bootstrap";
import JobCatContext from "../../ContextApi/JobCatContext";
import JobIndContext from "../../ContextApi/JobIndContext";
import AddDuplicateJob from "./AddDuplicateJob";

export default function PostedJobs() {
  const [searchTitle, setSearchTitle] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [searchIndustry, setSearchIndustry] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const { postedJobs, deleteById } = useContext(jobContext);
  const { signUser } = useContext(UserContext);
  const { jobCat } = useContext(JobCatContext);
  const { jobInd } = useContext(JobIndContext);

  const jobPosted =
    signUser?.role !== "Admin"
      ? postedJobs
        ?.filter((job) => job.userId?.email === signUser?.email)
      : postedJobs
        ?.filter((job) =>
          job.title.toLowerCase().includes(searchTitle.toLowerCase())
        )
        .filter((job) => job.categoryId?.category.includes(searchCategory))
        .filter((job) => job.industryId?.industry.includes(searchIndustry))

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const jobPostPerPage = itemsPerPage;

  const lastPostJobIndex = currentPage * jobPostPerPage;
  const firstUserIndex = lastPostJobIndex - jobPostPerPage;
  const currentPostedJobs = jobPosted?.reverse().slice(firstUserIndex, lastPostJobIndex);

  const totalPages = Math.ceil(jobPosted.length / jobPostPerPage);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  const generatePDF = () => {
    const doc = new jsPDF();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    doc.setFontSize(13);

    doc.text(`Aig Jobs Report`, 14, 10);
    doc.text(`Generated On: ${formattedDate}`, 14, 20);

    doc.autoTable({
      head: [["Job Title", "City", "Industry", "Company Name", "Category"]],
      body: currentPostedJobs.map(job => [
        job.title,
        job.city,
        job.industryId.industry,
        job.companyName,
        job.categoryId.category,
      ]),
      startY: 30,
      headStyles: { fontSize: 8 },
      bodyStyles: { fontSize: 8 },
    });

    doc.save("jobs_report.pdf");
  };

  const formatDate = (jobDate) => {
    return new Date(jobDate).toLocaleDateString();
  };
  return (
    <>
      <h2>Approved Jobs List</h2>
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
          <select onChange={(e) => setSearchCategory(e.target.value)}>
            <option value="">&nbsp;Search Job By Category</option>
            {jobCat?.map((job, index) => (
              <option key={index} value={job.category}>
                {job.category}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4 mt-4">
          <select onChange={(e) => setSearchIndustry(e.target.value)}>
            <option value="">&nbsp;Search Job By Industry</option>
            {jobInd?.map((job, index) => (
              <option key={index} value={job.industry}>
                {job.industry}
              </option>
            ))}
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
              <th>Job Title</th>
              <th>Country</th>
              <th>City</th>
              <th>Industry</th>
              {signUser?.role === "Admin" && (
                <th>Posted By</th>
              )}
              <th>Date</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {currentPostedJobs &&
              [...currentPostedJobs].map((job, index) => {

                return (
                  <tr key={index}>
                    <td>{firstUserIndex + index + 1}</td>
                    <td>{job.title}</td>
                    <td>{job.country?.country}</td>
                    <td>{job.city?.city}</td>
                    <td>{job.industryId.industry}</td>
                    {signUser?.role === "Admin" && (
                      <td>{job.userId ? `${job.userId.role} - ${job.userId.name}` : "Admin"}</td>
                    )}
                    <td>{formatDate(job.createdAt)}</td>
                    <td>
                      <JobActionModal postedJobId={job._id} />
                      {(signUser?.role === "Admin" || signUser.role === "Editor") && (
                        <AddDuplicateJob postedJobId={job._id} />
                      )}
                      {signUser?.role === "Admin" && (
                        <span>
                          <JobEditModal postedJobId={job._id} />
                          <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => deleteById(job._id)}
                          />
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <Button onClick={generatePDF} variant="primary" className="mt-3">Download Job Report</Button>
      </div>
      {jobPosted.length > jobPostPerPage && (
        <div className="pagination-controls text-center mt-3">
          <Button onClick={goToPreviousPage} disabled={currentPage === 1}>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </Button>
          <span className="me-2 ms-2">
            {Math.min(firstUserIndex + 1, jobPosted.length)} to{" "}
            {Math.min(lastPostJobIndex, jobPosted.length)} of {jobPosted.length}
          </span>

          <Button onClick={goToNextPage} disabled={currentPage === totalPages}>
            <FontAwesomeIcon icon={faAnglesRight} />
          </Button>
        </div>
      )}
    </>
  );
}


