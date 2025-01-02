import { useEffect, useState } from "react";
import ResourcesContext from "./ResourcesContext"
import PropTypes from "prop-types";
import Swal from "sweetalert2";


function ResourcesProvider({ children }) {
  const [allResources, setAllResources] = useState([])
  const [resourceById, setResourceById] = useState([])
  const apiUrl = import.meta.env.VITE_API_URL;

  const showAllResources = async () => {
    const res = await fetch(`${apiUrl}/api/resource/getAllResources`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    
    setAllResources(data)
  }

  const getResourceId = async (id) => {
    const res = await fetch(`${apiUrl}/api/resource/getResourceById/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    console.log(data);
    setResourceById(data)
  }

  const delResourceId = async (id) => {
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

      const res = await fetch(`${apiUrl}/api/resource/delResource/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "applicatoin/json"
        }
      })
      if (res.ok) {
        showAllResources()
      }
    }
  }

  useEffect(() => {
    showAllResources()
  }, [])

  return (
    <ResourcesContext.Provider value={{ allResources, resourceById, getResourceId, delResourceId, setResourceById, showAllResources }}>
      {children}
    </ResourcesContext.Provider>
  )
}

export default ResourcesProvider

ResourcesProvider.propTypes = {
  children: PropTypes.node.isRequired
}