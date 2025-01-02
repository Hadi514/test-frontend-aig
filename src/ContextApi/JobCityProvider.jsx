import { useEffect, useState } from "react"
import jobCityContext from "./JobCityContext"
import PropTypes from "prop-types"
import Swal from "sweetalert2"

function JobCityProvider({ children }) {
    const [jobCity, setJobCity] = useState([])
    const [jobCityId, setJobCityId] = useState([])
    const apiUrl = import.meta.env.VITE_API_URL;

    const allJobCity = async () => {
        const res = await fetch(`${apiUrl}/api/jobCity/getCities`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setJobCity(data)
    }

    const getJobCityId = async (id) => {
        const res = await fetch(`${apiUrl}/api/jobCity/getCity/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setJobCityId(data)
    }

    const delJobCityId = async (id) => {
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
            const res = await fetch(`${apiUrl}/api/jobCity/delCity/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (res.ok) {
                allJobCity()
            }
        }
    }

    useEffect(() => {
        allJobCity()
    }, [])
    return (
        <jobCityContext.Provider value={{ jobCity, jobCityId, getJobCityId, delJobCityId, setJobCityId, allJobCity }}>
            {children}
        </jobCityContext.Provider>
    )
}

export default JobCityProvider

JobCityProvider.propTypes = {
    children: PropTypes.node.isRequired
}