import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Swal from "sweetalert2"
import JobIndContext from "./JobIndContext"

function JobIndProvider({ children }) {
    const [jobInd, setJobInd] = useState([])
    const [jobIndId, setJobIndId] = useState([])
    const apiUrl = import.meta.env.VITE_API_URL;
    
    const alljobInd = async () => {
        const res = await fetch(`${apiUrl}/api/jobInd/getIndustries`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setJobInd(data)
    }
 
    const getjobIndId = async (id) => {
        const res = await fetch(`${apiUrl}/api/jobInd/getIndustry/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setJobIndId(data)
    }

    const deljobIndId = async (id) => {
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
                    text: "Job industry deleted successfully.",
                    icon: "success",
                });
            }
            return result;
        });
        if (isConfirmed) {
            const res = await fetch(`${apiUrl}/api/jobInd/delIndustry/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (res.ok) {
                alljobInd()
            }
        }
    }

    useEffect(() => {
        alljobInd()
    }, [])
    return (
        <JobIndContext.Provider value={{ jobInd, jobIndId, getjobIndId, deljobIndId, setJobIndId, alljobInd }}>
            {children}
        </JobIndContext.Provider>
    )
}

export default JobIndProvider

JobIndProvider.propTypes = {
    children: PropTypes.node.isRequired
}