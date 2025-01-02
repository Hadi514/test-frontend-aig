import { useRef, useState } from 'react';
import { Modal } from 'react-bootstrap'
import Swal from 'sweetalert2';

function AddIndModal() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [industryCredentials, setIndustryCredentials] = useState({
    industry: "",
    image: ""
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const refForm = useRef();

  const Addindustry = async (e) => {
    e.preventDefault();
    const { image, industry } = industryCredentials
    const formData = new FormData()
    formData.append("industry", industry)
    formData.append("image", image)

    const res = await fetch(`${apiUrl}/api/jobInd/industry`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json()
    const cate = document.getElementById('industry');
    data.message !== undefined ? cate.innerText = data.message : cate.innerText = ""
    if (res.ok) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "industry added successfully!",
        showConfirmButton: false,
        timer: 1500
      }); 
      setIndustryCredentials({
        industry: "",
        image: ""
      });
    }
  };

  const onchange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files) {
      setIndustryCredentials({ ...industryCredentials, image: files[0] });
    } else {
      setIndustryCredentials({ ...industryCredentials, [name]: value });
    }
  };

  return (
    <>
      <span className='' onClick={handleShow} style={{color: "var(--primary-color)", fontSize: "15px", fontWeight: "650", cursor: "pointer"}}>
        + Add New
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Job Industry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form ref={refForm} className='form-group admin-form p-3' onSubmit={Addindustry} style={{boxShadow: "none"}}>
            <input
              className='form-control'
              style={{ width: '100%', height: '55px', borderRadius: '0', marginTop: '20px' }}
              type='text'
              placeholder='Add industry'
              name='industry'
              value={industryCredentials.industry}
              onChange={onchange}
            />
            <div id='industry' style={{ color: 'red' }}></div>
            <input
              className='form-control'
              style={{ width: '100%', height: '55px', borderRadius: '0', marginTop: '20px' }}
              type='file'
              placeholder='Add industry Logo'
              name='image'
              onChange={onchange}
            />
            <div className="text-center">
              <button className='first-button mt-3 text-white'>Add Job Industry</button>
            </div>
          </form>

        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddIndModal
