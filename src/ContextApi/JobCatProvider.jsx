import { useEffect, useState } from "react"
import JobCatContext from "./JobCatContext"
import PropTypes from "prop-types"
import Swal from "sweetalert2"

function JobCatProvider({ children }) {
    const [jobCat, setJobCat] = useState([])
    const [jobCatId, setJobCatId] = useState([])
    const apiUrl = import.meta.env.VITE_API_URL;
    
    const alljobCat = async () => {
        const res = await fetch(`${apiUrl}/api/jobCat/getcategories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setJobCat(data)
    }

    const getjobCatId = async (id) => {
        const res = await fetch(`${apiUrl}/api/jobCat/getcategory/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setJobCatId(data)
    }

    const deljobCatId = async (id) => {
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
                    text: "Job category deleted successfully.",
                    icon: "success",
                });
            }
            return result;
        });
        if (isConfirmed) {
            const res = await fetch(`${apiUrl}/api/jobCat/delcategory/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (res.ok) {
                alljobCat()
            }
        }
    }

    useEffect(() => {
        alljobCat()
    }, [])
    return (
        <JobCatContext.Provider value={{ jobCat, jobCatId, getjobCatId, deljobCatId, setJobCatId, alljobCat }}>
            {children}
        </JobCatContext.Provider>
    )
}

export default JobCatProvider

JobCatProvider.propTypes = {
    children: PropTypes.node.isRequired
}