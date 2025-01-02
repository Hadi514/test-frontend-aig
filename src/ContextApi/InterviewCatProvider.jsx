import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import Swal from "sweetalert2"
import InterviewCatContext from "./InterviewCatContext"

function InterviewCatProvider({ children }) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [interviewCat, setInterviewCat] = useState([])
    const [interviewCatId, setInterviewCatId] = useState([])
    const allInterviewCat = async () => {
        const res = await fetch(`${apiUrl}/api/interviewCat/getInterviewcategories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setInterviewCat(data)
    }

    const getResourceCatId = async (id) => {
        const res = await fetch(`${apiUrl}/api/interviewCat/getInterviewCategory/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setInterviewCatId(data)
    }

    const delInterviewCatId = async (id) => {
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
                    text: "Interview category deleted successfully.",
                    icon: "success",
                });
            }
            return result;
        });
        if (isConfirmed) {
            const res = await fetch(`${apiUrl}/api/interviewCat/delInterviewCategory/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (res.ok) {
                allInterviewCat()
            }
        }
    }

    useEffect(() => {
        allInterviewCat()
    }, [])
    return (
        <InterviewCatContext.Provider value={{ interviewCat, interviewCatId, getResourceCatId, delInterviewCatId, allInterviewCat }}>
            {children}
        </InterviewCatContext.Provider>
    )
}

export default InterviewCatProvider

InterviewCatProvider.propTypes = {
    children: PropTypes.node.isRequired
}