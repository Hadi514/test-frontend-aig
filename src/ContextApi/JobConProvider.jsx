import { useEffect, useState } from "react"
import jobConContext from "./JobConContext"
import PropTypes from "prop-types"
import Swal from "sweetalert2"

function JobConProvider({ children }) {
    const [jobCon, setjobCon] = useState([])
    const [jobConId, setJobConId] = useState([])
    const [country, setCountry] = useState("");
    const apiUrl = import.meta.env.VITE_API_URL;

    const alljobCon = async () => {
        const res = await fetch(`${apiUrl}/api/jobCon/getCountries`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setjobCon(data)
    }

    const getJobConId = async (id) => {
        const res = await fetch(`${apiUrl}/api/jobCon/getCountry/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setJobConId(data)
    }

    const delJobConId = async (id) => {
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
                    text: "Country deleted successfully.",
                    icon: "success",
                });
            }
            return result;
        });
        if (isConfirmed) {
            const res = await fetch(`${apiUrl}/api/jobCon/delCountry/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (res.ok) {
                alljobCon()
            }
        }
    }

    useEffect(() => {
        alljobCon()
    }, [])
    return (
        <jobConContext.Provider value={{ jobCon, jobConId, getJobConId, delJobConId, setJobConId, alljobCon, country, setCountry }}>
            {children}
        </jobConContext.Provider>
    )
}

export default JobConProvider

JobConProvider.propTypes = {
    children: PropTypes.node.isRequired
}