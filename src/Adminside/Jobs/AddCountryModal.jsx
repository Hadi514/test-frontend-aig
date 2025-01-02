import { useContext, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import jobConContext from '../../ContextApi/JobConContext';

function AddCountryModal() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [show, setShow] = useState(false);
    const { alljobCon } = useContext(jobConContext)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [conCredentials, setConCredentials] = useState({
        category: "",
        image: ""
    });
    const refForm = useRef();

    const AddCountry = async (e) => {
        e.preventDefault();
        const { country, image } = conCredentials
        const formData = new FormData()
        formData.append("country", country)
        formData.append("image", image)
        const res = await fetch(`${apiUrl}/api/jobCon/addCountry`, {
            method: "POST",
            body: formData
        });
        const data = await res.json()
        const con = document.getElementById('country');
        data.message !== undefined ? con.innerText = data.message : con.innerText = ""
        if (res.ok) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Country added successfully!",
                showConfirmButton: true,
            });
            setConCredentials({
                country: "",
                image: ""
            })
            alljobCon();
        }
    };

    const onchange = (e) => {
        const { files, value } = e.target;
        if (files) {
            setConCredentials({ ...conCredentials, image: files[0] });
        } else {
            // Limit country input to 40 characters
            if (value.length <= 40) {
                setConCredentials({ ...conCredentials, country: value });
            }
        }
    };
    

    return (
        <>
            <Button className='first-button' onClick={handleShow}>
                + Add New Country
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Job Country</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form ref={refForm} className='form-group admin-form p-3' onSubmit={AddCountry} style={{ boxShadow: "none" }}>
                        <div id='country' style={{ color: 'red' }}></div>
                        <input
                            className='form-control'
                            style={{ width: '100%', height: '55px', borderRadius: '0', marginTop: '20px' }}
                            type='text'
                            placeholder='Add Country'
                            name='country'
                            value={conCredentials.country}
                            onChange={onchange}
                        />

                        <input
                            className='form-control'
                            style={{ width: '100%', height: '55px', borderRadius: '0', marginTop: '20px' }}
                            type='file'
                            placeholder='Add Country Image'
                            name='image'
                            onChange={onchange}
                        />
                        <div className="text-center">

                            <button className='first-button mt-3 text-white'>Add Job Country</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddCountryModal;