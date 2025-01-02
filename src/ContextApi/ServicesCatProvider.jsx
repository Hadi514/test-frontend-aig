import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import ServicesCatContext from "./ServicesCatContext";


function ServicesCatProvider({ children }) {
  const [allServicesCat, setAllServicesCat] = useState([])
  const [serviceCatById, setServiceCatById] = useState([])
  const apiUrl = import.meta.env.VITE_API_URL;

  const allServicesCatEntries = async () => {
    const res = await fetch(`${apiUrl}/api/serviceCat/getServiceCategories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    
    setAllServicesCat(data)
  }

  const getServiceCatId = async (id) => {
    const res = await fetch(`${apiUrl}/api/serviceCat/getServiceCategory/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    console.log(data);
    setServiceCatById(data)
  }

  const delServiceCatId = async (id) => {
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

      const res = await fetch(`${apiUrl}/api/serviceCat/delServiceCategory/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "applicatoin/json"
        }
      })
      if (res.ok) {
        allServicesCatEntries()
      }
    }
  }

  useEffect(() => {
    allServicesCatEntries()
  }, [])

  return (
    <ServicesCatContext.Provider value={{ allServicesCat, serviceCatById , getServiceCatId, delServiceCatId, setServiceCatById, allServicesCatEntries }}>
      {children}
    </ServicesCatContext.Provider>
  )
}

export default ServicesCatProvider

ServicesCatProvider.propTypes = {
  children: PropTypes.node.isRequired
}