import { useRef, useState, useEffect } from 'react';
import Swal from 'sweetalert2'

export default function AddBlogCategory() {
  const [category, setCategory] = useState('');
  const [existingCategories, setExistingCategories] = useState([]);
  const refForm = useRef();
  const apiUrl = import.meta.env.VITE_API_URL;

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
if(res.ok){
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Category added successfully!",
    showConfirmButton: false,
    timer: 1500
  });
  setCategory('');
  fetchExistingCategories();
}
  };

  return (
    <div>
      <form ref={refForm} className='form-group admin-form p-3' onSubmit={AddCategory}>
      <div className="form-title">
      <h2 className="">Create Blog Category</h2>
      </div>
        <input
          className='form-control'
          style={{ width: '100%', height: '50px', borderRadius: '0', marginTop: '20px' }}
          type='text'
          placeholder='Add Category'
          name='category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        /> 
        <div id='category' style={{ color: 'red' }}></div>
        <div className="text-center">
        <button className='first-button mt-3 text-white'>Add Category</button>
        </div>
      </form>

    </div>
  );
}
