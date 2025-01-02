import { useEffect, useState } from "react";
import PdfCvContext from "./PdfCvContext";
import PropTypes from "prop-types";
import Swal from 'sweetalert2'

export default function PdfCvProvider({ children }) {
    const [allPdfCvs, setAllPdfCvs] = useState([])
    const apiUrl = import.meta.env.VITE_API_URL;
    const getALlPdfCvs = async () => {
        const res = await fetch(`${apiUrl}/api/pdfCv/getPdfCv`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        setAllPdfCvs(data)
    }

    const delPdfCV = async (id) => {
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
              text: "CV deleted successfully.",
              icon: "success",
            });
          }
          return result;
        });
        if (isConfirmed) {
    
          const res = await fetch(`${apiUrl}/api/pdfCv/deletePdfCv/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "applicatoin/json"
            }
          })
          if (res.ok) {
            getALlPdfCvs()
          }
        }
      }

    useEffect(() => {
        getALlPdfCvs()
    }, [])

    return (
        <PdfCvContext.Provider value={{ getALlPdfCvs, allPdfCvs, delPdfCV }}>
            {children}
        </PdfCvContext.Provider>
    )
}

PdfCvProvider.propTypes = {
    children: PropTypes.node.isRequired,
};