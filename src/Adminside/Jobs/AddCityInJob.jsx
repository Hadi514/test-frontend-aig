import { useContext, useRef, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import jobConContext from '../../ContextApi/JobConContext';
import JobCityContext from '../../ContextApi/JobCityContext';

function AddCityInJob() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [show, setShow] = useState(false);
    const { allJobCity } = useContext(JobCityContext)
    const { jobCon } = useContext(jobConContext)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [city, setCity] = useState("");
    const [countryId, setCountryId] = useState("");
    const refForm = useRef();

    const AddCity = async (e) => {
        e.preventDefault();
        const res = await fetch(`${apiUrl}/api/jobCity/addCity`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ city, countryId })
        });
        const data = await res.json()
        const con = document.getElementById('city');
        data.message !== undefined ? con.innerText = data.message : con.innerText = ""
        if (res.ok) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "city added successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            setCity("")
            setCountryId("")
            allJobCity();
        }
    };

    return (
        <>
            <span onClick={handleShow} style={{color: "var(--primary-color)", fontSize: "15px", fontWeight: "650", cursor: "pointer"}}>
                + Add New
            </span>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Job City</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form ref={refForm} className='form-group admin-form p-3' onSubmit={AddCity} style={{ boxShadow: "none" }}>
                        <select name="countryId" className="form-control" value={countryId} onChange={(e) => setCountryId(e.target.value)}>
                            <option value="">Select City</option>
                            {jobCon?.map((con, index) => (
                                <option key={index} value={con._id}>{con.country}</option>
                            ))}
                        </select>
                        <input
                            className='form-control'
                            style={{ width: '100%', height: '55px', borderRadius: '0', marginTop: '20px' }}
                            type='text'
                            placeholder='Add city'
                            name='city'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />

                        <div id='city' style={{ color: 'red' }}></div>
                        <div className="text-center">

                            <button className='first-button mt-3 text-white'>Add Job City</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddCityInJob;