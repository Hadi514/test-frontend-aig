import { useEffect, useState } from "react";
import JobSeekerContext from "./JobSeekerContext"
import PropTypes from "prop-types";
import Swal from "sweetalert2";


function JobSeekerProvider({children}) {
    const [jobSeekers, setJobSeekers] = useState([])
    const [seekerById, setSeekerById] = useState([])
    const apiUrl = import.meta.env.VITE_API_URL;

    const allJobSeekers = async () => {
        const res = await fetch(`${apiUrl}/api/jobSeaker/getJobsBySeaker`, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            }
        })
        const data = await res.json()
        setJobSeekers(data)
    }
 
    const getSeekerById = async (id) => {
        const res = await fetch(`${apiUrl}/api/jobSeaker/getJobByIdSeaker/${id}`, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            }
        })
        const data = await res.json()
        setSeekerById(data)
    }

    const jobSeekerApproval = async (id) => {
        try {
            const res = await fetch(`${apiUrl}/api/jobSeaker/acceptStatus/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (res.ok) {
                Swal.fire("Post approved successfully!");
                
                // Re-fetch jobs to ensure UI reflects the updated status
                await allJobSeekers();
            } else {
                const errorData = await res.json();
                Swal.fire("Error", errorData.error || "Something went wrong!", "error");
            }
        } catch (error) {
            console.error("Error approving job:", error);
            Swal.fire("Error", "Unable to approve job. Please try again later.", "error");
        }
    };

    const jobSeekerRejection = async (id) => {
        try {
            const res = await fetch(`${apiUrl}/api/jobSeaker/rejectStatus/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (res.ok) {
                Swal.fire("Job rejected successfully!");
    
                // Re-fetch jobs to ensure the updated status is reflected
                await allJobSeekers();
            } else {
                const errorData = await res.json();
                Swal.fire("Error", errorData.error || "Something went wrong!", "error");
            }
        } catch (error) {
            console.error("Error rejecting job:", error);
            Swal.fire("Error", "Unable to reject job. Please try again later.", "error");
        }
    };
    

    const delSeekerId = async (id) => {
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
                    text: "Job Seeker deleted successfully.",
                    icon: "success",
                });
            }
            return result;
        }); 
        if (isConfirmed){
            const res = await fetch (`${apiUrl}/api/jobSeaker/delJobBySeaker/${id}`, {
                method: "DELETE", 
                headers: {
                    "Content-Type" : "application/json"
                }
            })
            if(res.ok){
                allJobSeekers()
            }
        }
    }

    useEffect(() => {
        allJobSeekers()
    },[])

  return (
    <JobSeekerContext.Provider value={{jobSeekers, getSeekerById, seekerById, delSeekerId, jobSeekerApproval, jobSeekerRejection}}>
      {children}
    </JobSeekerContext.Provider>
  )
}

export default JobSeekerProvider

JobSeekerProvider.propTypes = {
    children: PropTypes.node.isRequired
}