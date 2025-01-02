import { useEffect, useState } from "react";
import InterviewContext from "./InterviewContext"
import PropTypes from "prop-types";
import Swal from "sweetalert2";


function InterviewProvider({ children }) {
  const [allInterviews, setAllInterviews] = useState([])
  const [interviewById, setInterviewById] = useState([])
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const allInterviewEntries = async () => {
    const res = await fetch(`${apiUrl}/api/interview/getAllInterviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    
    setAllInterviews(data)
  }

  const getInterviewId = async (id) => {
    const res = await fetch(`${apiUrl}/api/interview/getInterviewById/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    console.log(data);
    setInterviewById(data)
  }

  const delInterviewId = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Recource deleted successfully.",
          icon: "success",
        });
      }
      return result;
    });
    if (isConfirmed) {

      const res = await fetch(`${apiUrl}/api/interview/delInterview/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "applicatoin/json"
        }
      })
      if (res.ok) {
        allInterviewEntries()
      }
    }
  }

  useEffect(() => {
    allInterviewEntries()
  }, [])

  return (
    <InterviewContext.Provider value={{ allInterviews, interviewById, getInterviewId, delInterviewId, setInterviewById, allInterviewEntries }}>
      {children}
    </InterviewContext.Provider>
  )
}

export default InterviewProvider

InterviewProvider.propTypes = {
  children: PropTypes.node.isRequired
}