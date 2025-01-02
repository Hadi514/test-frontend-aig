import { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';

function AddBlogCategoryModal() {
  const [show, setShow] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [category, setCategory] = useState('');
  const [existingCategories, setExistingCategories] = useState([]);
  const refForm = useRef();

  // Set character limit
  const maxCategoryLength = 40;

  useEffect(() => {
    fetchExistingCategories();
  }, []);

  const fetchExistingCategories = async () => {
    await fetch(`${apiUrl}/api/blogCat/getcategory`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        const cleanedCategories = data.map((post) =>
          post.category
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ")
        );
        setExistingCategories(cleanedCategories);
      });
  };

  const AddCategory = async (e) => {
    e.preventDefault();
    const form = refForm.current;
    const catValue = form.category.value.trim();
    const cate = document.getElementById('category');

    if (!catValue) {
      cate.innerText = 'Please enter category';
      return;
    }

    const isCategoryExists = existingCategories.some(
      (existingCategory) => existingCategory.toLowerCase() === catValue.toLowerCase()
    );

    if (isCategoryExists) {
      cate.innerText = 'Category already exists';
      return;
    }

    cate.innerText = '';

    const res = await fetch(`${apiUrl}/api/blogCat/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category: catValue }),
    });
    if (res.ok) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Category added successfully!",
        showConfirmButton: true,
      });
      
      setCategory('');
      fetchExistingCategories();
    }
  };

  // Handle character limit in onChange
  const handleCategoryChange = (e) => {
    if (e.target.value.length <= maxCategoryLength) {
      setCategory(e.target.value);
    }
  };

  return (
    <>
      <Button className="first-button" onClick={handleShow}>
        + Add Blog Category
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Blog Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form ref={refForm} className='form-group admin-form p-3' onSubmit={AddCategory} style={{ boxShadow: "none" }}>
            <input
              className='form-control'
              style={{ width: '100%', height: '50px', borderRadius: '0', marginTop: '20px' }}
              type='text'
              placeholder='Add Category'
              name='category'
              value={category}
              onChange={handleCategoryChange} // Update onChange handler here
              maxLength={maxCategoryLength} // Character limit
            />
            <div id='category' style={{ color: 'red' }}></div>
            <div className="text-center">
              <button className='first-button mt-3 text-white'>Add Category</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddBlogCategoryModal;
