import { useContext, useEffect, useState } from "react"
import JobApplyContext from "./JobApplyContext"
import PropTypes from 'prop-types'
import UserContext from "./UserContext"
import Swal from "sweetalert2"

function JobApplyProvider({ children }) {
    const [jobApplyCounting, setJobApplyCounting] = useState("")
    const [getAppliedJobs, setGetAppliedJobs] = useState()
    const [submittedJobsById, setSubmittedJobsById] = useState([])
    const { signUser } = useContext(UserContext)
    const apiUrl = import.meta.env.VITE_API_URL;

    const appliedJobs = async () => {
        const res = await fetch(`${apiUrl}/api/apply/appliedJobs`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        const JobsData = data?.filter(applyJob => applyJob.jobId?.title)
        setGetAppliedJobs(JobsData)
    }

    const appliedJobById = async (id) => {
        const res = await fetch(`${apiUrl}/api/apply/getAppliedJob/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setSubmittedJobsById(data)
    }

    const jobApproval = async (id) => {
        try {
            const res = await fetch(`${apiUrl}/api/apply/acceptStatus/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.ok) {
                Swal.fire("Job approved successfully!");

                // Re-fetch jobs to ensure UI reflects the updated status
                await appliedJobs();
            } else {
                const errorData = await res.json();
                Swal.fire("Error", errorData.error || "Something went wrong!", "error");
            }
        } catch (error) {
            console.error("Error approving job:", error);
            Swal.fire("Error", "Unable to approve job. Please try again later.", "error");
        }
    };

    const jobRejection = async (id) => {
        try {
            const res = await fetch(`${apiUrl}/api/apply/rejectStatus/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.ok) {
                Swal.fire("Job rejected successfully!");

                // Re-fetch jobs to ensure the updated status is reflected
                await appliedJobs();
            } else {
                const errorData = await res.json();
                Swal.fire("Error", errorData.error || "Something went wrong!", "error");
            }
        } catch (error) {
            console.error("Error rejecting job:", error);
            Swal.fire("Error", "Unable to reject job. Please try again later.", "error");
        }
    };

    const deleteApplicationById = async (id) => {
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
                    text: "Job application is deleted successfully!",
                    icon: "success",
                });
            }
            return result;
        });
        if (isConfirmed) {

            await fetch(`${apiUrl}/api/apply/deleteJob/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            appliedJobs()
        }
    }

    const appliedJobByUser = getAppliedJobs && getAppliedJobs.filter(applyJob => applyJob.email === signUser.email)

    const jobApplyCount = async () => {
        const res = await fetch(`${apiUrl}/api/apply/jobApplyCount`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setJobApplyCounting(data)
    }

    useEffect(() => {
        appliedJobs()
        jobApplyCount()
    }, [])

    return (
        <JobApplyContext.Provider value={{ getAppliedJobs, appliedJobs, appliedJobById, submittedJobsById, deleteApplicationById, jobApplyCounting, appliedJobByUser, jobApproval, jobRejection }}>
            {children}
        </JobApplyContext.Provider>
    )
}

export default JobApplyProvider

JobApplyProvider.propTypes = {
    children: PropTypes.node.isRequired
}