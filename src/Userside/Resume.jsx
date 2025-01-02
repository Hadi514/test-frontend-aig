import { useContext, useState } from "react";
import ResumeContext from "../ContextApi/ResumeContext";
import UserContext from "../ContextApi/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import ViewResumeModal from "./ViewResumeModal";
import { Button } from "react-bootstrap";
import EditResume from "./EditResume";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import LOGO from "../../src/assets/Images/Latest-Logo.png";

function Resume() {
  const { getAllResume, delResumeById } = useContext(ResumeContext);

  const { signUser } = useContext(UserContext);
  const [searchName, setSearchName] = useState("")
  const [searchProfession, setSearchProfession] = useState("")
  const filteredResume = signUser?.role === "Admin" ? getAllResume : getAllResume?.filter(resume => resume.email === signUser.email);

  // Pagination 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const resumePerPage = itemsPerPage;

  const lastIndex = currentPage * resumePerPage;
  const firstIndex = lastIndex - resumePerPage;
  const currentItems = filteredResume.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(filteredResume.length / resumePerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const generatePDF = async () => {
    const doc = new jsPDF();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    try {
        // Directly use LOGO if it is a base64 string
        doc.addImage(LOGO, 'PNG', 10, 10, 50, 30); // Adjust position and size as needed

        // Add text
        doc.setFontSize(13);
        doc.text('Resume Report', doc.internal.pageSize.getWidth() / 2, 50, { align: 'center' });

        doc.text(`Generated On: ${formattedDate}`, 14, 60);

        // Add table
        doc.autoTable({
            head: [["Name", "Email", "Contact", "Profession", "Total Work Experience"]],
            body: currentItems.map(resume => [
                resume.name,
                resume.email,
                resume.number,
                resume.profession,
                resume.totalWorkExp,
            ]),
            startY: 70,
            headStyles: { fontSize: 8 },
            bodyStyles: { fontSize: 8 },
        });

        doc.save('jobs_report.pdf');
    } catch (error) {
        console.error("Error generating PDF:", error);
    }
};

  return (
    <>
      <div className="row mb-4 find d-flex">
<h2>All Resumes List</h2>
        <div className="col-md-4 mt-4">
          <input
            type="text"
            className="form-control schoo-search"
            placeholder="Search Resume By Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="col-md-4 mt-4">
          <input
            type="text"
            className="form-control schoo-search"
            placeholder="Search Resume By Profession"
            value={searchProfession}
            onChange={(e) => setSearchProfession(e.target.value)}
          />
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
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Profession</th>
              <th>Total Work Experience</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {currentItems?.filter(resume => resume.name.toLowerCase().includes(searchName.toLowerCase())).filter(resume => resume.profession?.toLowerCase().includes(searchProfession.toLowerCase())).map((resume, index) => {
              return (
                <tr key={index}>
                  <td>{firstIndex + index + 1}</td>
                  <td>{resume.name}</td>
                  <td>{resume.email}</td>
                  <td>{resume.number}</td>
                  <td>{resume.profession}</td>
                  <td>{resume.totalWorkExp}</td>
                  <td>
                    <ViewResumeModal resId={resume._id} />
                    <EditResume resId={resume._id} />
                    <FontAwesomeIcon icon={faTrash} onClick={() => delResumeById(resume._id)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Button onClick={generatePDF} variant="primary" className="mt-3">Download Job Report</Button>
      </div>

      {/* {/ Pagination Controls /} */}
      {getAllResume?.length > resumePerPage && (
        <div className="pagination-controls mt-3">
          <Button onClick={goToPrevPage} disabled={currentPage === 1}>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </Button>
          <span className="me-2 ms-2">Page {currentPage} of {totalPages}</span>
          <Button onClick={goToNextPage} disabled={currentPage === totalPages}>
            <FontAwesomeIcon icon={faAnglesRight} />
          </Button>
        </div>
      )}
    </>
  );
}

export default Resume;
