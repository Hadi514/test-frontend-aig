import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';

function AddResourceCatModal() {
  const [show, setShow] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [category, setCategory] = useState('');
  const [charCount, setCharCount] = useState(0); // New state to track character count
  const maxLength = 40; // Set the maximum character limit
  const refForm = useRef();
 
  const AddCategory = async (e) => {
    e.preventDefault();
    const form = refForm.current;
    const catValue = form.category.value.trim();

    const res = await fetch(`${apiUrl}/api/resourceCat/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category: catValue }),
    });
    const data = await res.json();
    const cate = document.getElementById('category');
    data.message !== undefined ? cate.innerText = data.message : cate.innerText = "";
    if (res.ok) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Category added successfully!",
        showConfirmButton: true,
      });
      setCategory('');
      setCharCount(0); // Reset character count after successful submission
    }
  };

  return (
    <>
      <Button className="first-button" onClick={handleShow}>
        + Add Resource Category
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Resource Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form ref={refForm} className='form-group admin-form p-3' onSubmit={AddCategory} style={{ boxShadow: "none" }}>
            <input
              className='form-control'
              style={{ width: '100%', height: '55px', borderRadius: '0', marginTop: '20px' }}
              type='text'
              placeholder='Add Category'
              name='category'
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCharCount(e.target.value.length); // Update character count
              }}
              maxLength={maxLength} // Set the character limit
            />
            <div id='category' style={{ color: 'red' }}></div>
            <div className="text-center">
              <button className='first-button mt-3 text-white'>Add Resource Category</button>
            </div>
            {/* Character count display */}
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddResourceCatModal;
