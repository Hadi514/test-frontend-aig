import { useEffect, useState } from "react";
import AdviceContext from "./AdviceContext"
import PropTypes from "prop-types";
import Swal from "sweetalert2";

export default function AdviceProvider({children}) {
 const [postedAdvices, setPostedAdvices] = useState([])
 const [adviceId, setAdviceId] = useState([])
 const apiUrl = import.meta.env.VITE_API_URL;

 const allAdvices = async () => {
    const res = await fetch(`${apiUrl}/api/advice/allAdvices`, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json"
        },
    })
    const data = await res.json()
    setPostedAdvices(data)
 }


 const adviceById = async (id) => {
    const res = await fetch(`${apiUrl}/api/advice/getAdvicesId/${id}`, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json"
        },
    }) 
    const data = await res.json()
    setAdviceId(data)
 }

 const deleteAdvice = async (id) => {
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
                text: "Advice successfully deleted!",
                icon: "success",
            });
        }
        return result;
    }); 
    if(isConfirmed){
        const res = await fetch(`${apiUrl}/api/advice/delAdviceById/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json"
            },
        })
        if(res.ok){
            allAdvices()
        }
    }
 } 

 useEffect(() =>{
    allAdvices()
 }, [])

  return (
    <AdviceContext.Provider value={{postedAdvices, adviceId, adviceById, deleteAdvice}}>
      {children}
    </AdviceContext.Provider>
  )
}

AdviceProvider.propTypes = {
    children: PropTypes.node.isRequired
};
