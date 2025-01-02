import { useEffect, useState } from "react"
import ResourceCatContext from "./ResourceCatContext"
import PropTypes from "prop-types"
import Swal from "sweetalert2"

function ResourceCatProvider({ children }) {
    const [resourceCat, setResourceCat] = useState([])
    const [resourceCatId, setResourceCatId] = useState([])
    const apiUrl = import.meta.env.VITE_API_URL;
    
    const allResourceCat = async () => {
        const res = await fetch(`${apiUrl}/api/resourceCat/getcategories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setResourceCat(data)
    }

    const getResourceCatId = async (id) => {
        const res = await fetch(`${apiUrl}/api/resourceCat/getcategory/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setResourceCatId(data)
    }

    const delResourceCatId = async (id) => {
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
                    text: "Resource category deleted successfully.",
                    icon: "success",
                });
            }
            return result;
        });
        if (isConfirmed) {
            const res = await fetch(`${apiUrl}/api/resourceCat/delcategory/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (res.ok) {
                allResourceCat()
            }
        }
    }

    useEffect(() => {
        allResourceCat()
    }, [])
    return (
        <ResourceCatContext.Provider value={{ resourceCat, resourceCatId, getResourceCatId, delResourceCatId, setResourceCatId, allResourceCat }}>
            {children}
        </ResourceCatContext.Provider>
    )
}

export default ResourceCatProvider

ResourceCatProvider.propTypes = {
    children: PropTypes.node.isRequired
}