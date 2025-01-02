import { useContext, useState } from "react"
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import UserContext from "../ContextApi/UserContext";
import PdfCvContext from "../ContextApi/PdfCvContext";
import Swal from "sweetalert2";

export default function PdfCvUpload() {
    const [pdfCvCred, setPdfCvCred] = useState({
        profession: "",
        cv: ""
    })
    const { signUser } = useContext(UserContext)
    const apiUrl = import.meta.env.VITE_API_URL;
    const {getALlPdfCvs} = useContext(PdfCvContext)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const uploadPdfCv = async (e) => {
        e.preventDefault()
        const { profession, cv } = pdfCvCred
        const formData = new FormData()
        formData.append("profession", profession)
        formData.append("cv", cv)
        formData.append("userId", signUser?._id)
        const res = await fetch(`${apiUrl}/api/pdfCv/pdfCvUpload`, {
            method: "POST",
            body: formData
        })
        const data = await res.json()
        const formError = document.getElementById("formError");
        data.message !== undefined
            ? (formError.innerText = data.message)
            : (formError.innerText = "");

        if (res.ok) {
            Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "CV uploaded successfully!",
                    showConfirmButton: true,
                  });
            getALlPdfCvs();
            setPdfCvCred({
                profession: "",
                cv: ""
            })
        }
    }

    const onchange = (e) => {
        const { name, value, files } = e.target
        if (files) {
            setPdfCvCred({ ...pdfCvCred, cv: files[0] })
        } else {
            setPdfCvCred({ ...pdfCvCred, [name]: value })
        }
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Upload Pdf Cv
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Pdf Cv</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div id="formError" className="text-danger"></div>
                    <Form onSubmit={uploadPdfCv}>
                        <FloatingLabel
                            controlId="floatingInput"
                            label={
                                <span className="custom-label">
                                    Profession
                                    <span className="star">*</span>
                                </span>
                            }
                            className="mb-3"
                        >
                            <Form.Control type="name" placeholder="Profession" name="profession" value={pdfCvCred.profession} onChange={onchange} />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label={
                                <span className="custom-label">
                                    Pdf Cv
                                    <span className="star">*</span>
                                </span>
                            }
                            className="mb-3"
                        >
                            <Form.Control type="File" placeholder="cv" name="cv" onChange={onchange} />
                        </FloatingLabel>
                        <Button type="submit">Upload Pdf Cv</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}
