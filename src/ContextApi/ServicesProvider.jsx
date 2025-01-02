import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import ServicesContext from "./ServicesContext";


function ServicesProvider({ children }) {
  const [allServices, setAllServices] = useState([])
  const [serviceById, setServiceById] = useState([])
  const apiUrl = import.meta.env.VITE_API_URL;

  const allServicesEntries = async () => {
    const res = await fetch(`${apiUrl}/api/service/getAllServices`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    
    setAllServices(data)
  }

  const getServiceId = async (id) => {
    const res = await fetch(`${apiUrl}/api/service/getServiceById/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    console.log(data);
    setServiceById(data)
  }

  const delServiceId = async (id) => {
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
          text: "Services Item deleted successfully.",
          icon: "success",
        });
      }
      return result;
    });
    if (isConfirmed) {

      const res = await fetch(`${apiUrl}/api/service/delService/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "applicatoin/json"
        }
      })
      if (res.ok) {
        allServicesEntries()
      }
    }
  }

  useEffect(() => {
    allServicesEntries()
  }, [])

  return (
    <ServicesContext.Provider value={{ allServices, serviceById , getServiceId, delServiceId, setServiceById, allServicesEntries }}>
      {children}
    </ServicesContext.Provider>
  )
}

export default ServicesProvider

ServicesProvider.propTypes = {
  children: PropTypes.node.isRequired
}