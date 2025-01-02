import { useContext, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import JobCatContext from '../../ContextApi/JobCatContext';

function AddCatModal() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [show, setShow] = useState(false);
  const { alljobCat } = useContext(JobCatContext)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [catCredentials, setCatCredentials] = useState({
    category: "",
    image: ""
  });
  const refForm = useRef();

  const AddCategory = async (e) => {
    e.preventDefault();
    const { image, category } = catCredentials
    const formData = new FormData()
    formData.append("category", category)
    formData.append("image", image)
    const res = await fetch(`${apiUrl}/api/jobCat/category`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json()
    const cate = document.getElementById('category');
    data.message !== undefined ? cate.innerText = data.message : cate.innerText = ""
    if (res.ok) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Category added successfully!",
        showConfirmButton: true,
      });
      alljobCat();
    }
  };

  const onchange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'image' && files) {
      setCatCredentials({ ...catCredentials, image: files[0] });
    } else {
      if (name === 'category') {
        // Character length validation for category
        if (value.length > 40) {
          document.getElementById('category').innerText = "Category name should not exceed 50 characters.";
        } 
      }
      setCatCredentials({ ...catCredentials, [name]: value });
    }
  };

  return (
    <>
      <Button className='first-button' onClick={handleShow}>
        + Add New Category
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Job Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form ref={refForm} className='form-group admin-form p-3' onSubmit={AddCategory} style={{ boxShadow: "none" }}>
            <input
              className='form-control'
              style={{ width: '100%', height: '55px', borderRadius: '0', marginTop: '20px' }}
              type='text'
              placeholder='Add Category'
              name='category'
              value={catCredentials.category}
              onChange={onchange}
              maxLength="40"
            />
            <input
              className='form-control'
              style={{ width: '100%', height: '55px', borderRadius: '0', marginTop: '20px' }}
              type='file'
              placeholder='Add category Logo'
              name='image'
              onChange={onchange}
            />
            <div id='category' style={{ color: 'red' }}></div>
            <div className="text-center">

              <button className='first-button mt-3 text-white'>Add Job Category</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddCatModal;