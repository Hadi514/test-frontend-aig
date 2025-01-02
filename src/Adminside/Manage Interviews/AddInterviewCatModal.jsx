import { useContext, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import InterviewCatContext from '../../ContextApi/InterviewCatContext';

function AddInterviewCatModal() {
  const [show, setShow] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const {allInterviewCat} = useContext(InterviewCatContext)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [category, setCategory] = useState('');
  const refForm = useRef();

  const AddCategory = async (e) => {
    e.preventDefault();
    const form = refForm.current;
    const catValue = form.category.value.trim();

    const res = await fetch(`${apiUrl}/api/interviewCat/interviewCategory`, {
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
      allInterviewCat()
      setCategory('');
    }
  };

  return (
    <>
      <Button className="first-button" onClick={handleShow}>
        + Add Interview Category
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Interview Category</Modal.Title>
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

        <button className='first-button mt-3 text-white'>Add Interview Category</button>
        </div>
      </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddInterviewCatModal;