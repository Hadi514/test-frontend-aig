import { useEffect, useState } from "react";
import ResumeContext from "./ResumeContext"
import PropTypes from "prop-types";
import Swal from "sweetalert2";

function ResumeProvider({children}) {
    const [getAllResume, setGetAllResume] = useState([])
    const [resumeById, setResumeById] = useState([])
    const apiUrl = import.meta.env.VITE_API_URL;

    const allResumes = async () => {
        const res = await fetch(`${apiUrl}/api/resume/allResumes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setGetAllResume(data) 
    }

    const getResumeId = async (id) => {
        const res = await fetch(`${apiUrl}/api/resume/getResumeById/${id}`, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            }
        })
        const data = await res.json()        
        setResumeById(data)
    }

    const delResumeById = async (id) => {        
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
                    text: "Resume deleted successfully!",
                    icon: "success",
                });
            }
            return result;
        });
        if (isConfirmed) {
            const res = await fetch(`${apiUrl}/api/resume/delResumeById/${id}`,{
                method: "DELETE",
                headers: {
                    "Content-Type" : "application/json"
                }
            })
            if(res.ok){
                allResumes()
            }
        }
    }

    useEffect(() => {
        allResumes()
    }, [])

  return (
    <ResumeContext.Provider value={{getAllResume, delResumeById, getResumeId, resumeById, allResumes}}>
      {children}
    </ResumeContext.Provider>
  )
}

export default ResumeProvider

ResumeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};