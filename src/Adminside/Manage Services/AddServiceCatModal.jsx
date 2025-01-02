import { useContext, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import ServicesCatContext from '../../ContextApi/ServicesCatContext';

function AddServiceCatModal() {
  const [show, setShow] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {allServicesCatEntries} = useContext(ServicesCatContext)

  const [category, setCategory] = useState('');
  const refForm = useRef();

  const AddCategory = async (e) => {
    e.preventDefault();
    const form = refForm.current;
    const catValue = form.category.value.trim();

    const res = await fetch(`${apiUrl}/api/serviceCat/serviceCategory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category: catValue }),
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
      allServicesCatEntries()
      setCategory('');
    }
  };

  return (
    <>
      <Button className="first-button" onClick={handleShow}>
        + Add Services Category
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Services Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form ref={refForm} className='form-group admin-form p-3' onSubmit={AddCategory} style={{boxShadow: "none"}}>
        <input
          className='form-control'
          style={{ width: '100%', height: '55px', borderRadius: '0', marginTop: '20px' }}
          type='text'
          placeholder='Add Category'
          name='category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <div id='category' style={{ color: 'red' }}></div>
        <div className="text-center">

        <button className='first-button mt-3 text-white'>Add Service Category</button>
        </div>
      </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddServiceCatModal;