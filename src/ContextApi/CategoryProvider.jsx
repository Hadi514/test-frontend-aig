import { useState, useEffect } from 'react'
import CategoryContext from './CategoryContext';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types'

function CategoryProvider({ children }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [category, setCategory] = useState([]);
  const [AllCategory, setAllCategory] = useState([])
  const [courseCatId, setCourseCatId] = useState([])
  const [courseCatCounting, setCourseCatCounting] = useState("")

  // get all courses
  const allCategory = async () => {
    await fetch(`${apiUrl}/api/category/getcategory`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
      .then(data => setAllCategory(data))
  }

  const getOnlyCategory = async () => {
    const res = await fetch(
      `${apiUrl}/api/category/getOnlyCategory`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    setCategory(data);
  };


  const deleteCategory = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "This course category has been deleted successfully.",
          icon: "success",
        });
      }
      return result;
    });

    if (isConfirmed) {
      await fetch(`${apiUrl}/api/category/delcategory/${id}`, {
        method: "delete"
      })
      allCategory()
    }
  }

  const getCatId = async (id) => {
    const res = await fetch(`${apiUrl}/api/category/getCategoryById/${id}`, {
        method: "GET",
    })
    const data = await res.json()
    setCourseCatId(data)
    console.log(data);
    
}

  const countCourseCategory = async () => {
    const res = await fetch(`${apiUrl}/api/user/userCount`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json()
    setCourseCatCounting(data)
  }

  useEffect(() => {
    getOnlyCategory();
    allCategory();
    countCourseCategory()
  }, []);



  return (
    <CategoryContext.Provider value={{ category, AllCategory, allCategory, deleteCategory, courseCatCounting, setCourseCatId, courseCatId, getCatId  }}>
      {children}
    </CategoryContext.Provider>
  )
}

export default CategoryProvider;

CategoryProvider.propTypes = {
  children: PropTypes.node.isRequired
}