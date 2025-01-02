import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import AddBlogCategoryModal from "./AddBlogCategoryModal";

export default function AllBlogCategory() {
  const [category, setCategory] = useState([]);
  const [seeCategory, setSeeCategory] = useState([]);
  const [seCategory, setSeCategory] = useState("");
  const [editId, setEditId] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const Getcategory = async () => {
    await fetch(`${apiUrl}/api/blogCat/getcategory`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
      });
  };

  useEffect(() => {
    Getcategory();
  }, []);

  const viewCategory = async (id) => {
    await fetch(`${apiUrl}/api/blogCat/getcategory/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setSeeCategory(data));
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
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
      return result;
    });

    if (isConfirmed) {
      await fetch(`${apiUrl}/api/blogCat/delcategory/${id}`, {
        method: "DELETE",
      });
    }
    Getcategory();
  };

  const editCategory = async (id) => {
    await fetch(`${apiUrl}/api/blogCat/getcategory/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setSeCategory(data);
        setEditId(data._id);
      });
  };

  const updateCategory = async () => {
    await fetch(`${apiUrl}/api/blogCat/editcategory/${editId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category: seCategory }),
    });
    Getcategory();
  };

  const openViewCategory = (id) => {
    setLgShow(true);
    viewCategory(id);
  };

  const openEditCategory = (id) => {
    setEditShow(true);
    editCategory(id);
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const catPerPage = itemsPerPage;
  // Pagination logic
  const indexOfLastCategory = currentPage * catPerPage;
  const indexOfFirstCategory = indexOfLastCategory - catPerPage;
  const currentCategories = category?.slice(indexOfFirstCategory, indexOfLastCategory);

  // Total pages for pagination
  const totalPages = Math.ceil(category?.length / catPerPage);

  // Handle Next Page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Handle Previous Page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };


  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h2 className="text-center">Blog Categories List</h2>
        <AddBlogCategoryModal />
      </div>

      <div>
        <p>Show <select name="" id="" onChange={(e) => setItemsPerPage(e.target.value)}>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select> Entries</p>
      </div>

      <div className="table-responsive-sm">

        <table className="admin-table">
          <thead>
            <tr className="form-title">
              <th>#</th>
              <th>Category</th>
              <th style={{ opacity: "0" }}>All Blog Categories</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentCategories &&
              currentCategories.reverse().map((post, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{post.category}</td>
                    <td style={{ opacity: "0" }}>{post.category}</td>
                    <td>
                      <i
                        className="fa-solid fa-eye me-3"
                        style={{ color: "blue" }}
                        data-bs-toggle="modal"
                        data-bs-target="#static"
                        onClick={() => openViewCategory(post._id)}
                      ></i>
                      <i
                        className="fas fa-edit me-3"
                        style={{ color: "blue" }}
                        data-bs-toggle="modal"
                        data-bs-target="#staticEdit"
                        onClick={() => openEditCategory(post._id)}
                      ></i>
                      <i
                        className="fas fa-trash"
                        style={{ color: "blue" }}
                        onClick={() => deleteCategory(post._id)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* {/ View Modal /} */}
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">View Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="admin-form" style={{ boxShadow: "none" }}>
            <label className="form-lable mb-2">Category</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={seeCategory.category}
              style={{ height: "55px", borderRadius: "0" }}
            />
          </form>
        </Modal.Body>
      </Modal>

      {/* {/ Edit Modal /} */}
      <Modal
        size="lg"
        show={editShow}
        onHide={() => setEditShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="admin-form" style={{ boxShadow: "none" }}>
            <label className="form-lable">Category</label>
            <input
              className="form-control mb-2"
              type="text"
              name="name"
              value={seCategory.category}
              onChange={(e) => setSeCategory(e.target.value)}
              style={{ height: "55px", borderRadius: "0" }}
            />
          </form>
          <div className="text-center">

          <button
            type="first-button"
            className="first-button text-white"
            data-bs-dismiss="modal"
            onClick={updateCategory}
          >
            Update Blog Category
          </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* {/ Pagination Controls /} */}
      {category.length > catPerPage && (
        <div className="pagination-controls text-center mt-3">
          <Button onClick={goToPreviousPage} disabled={currentPage === 1}>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </Button>
          <span className="me-2 ms-2">
            Page {currentPage} of {totalPages}
          </span>
          <Button onClick={goToNextPage} disabled={currentPage === totalPages}>
            <FontAwesomeIcon icon={faAnglesRight} />
          </Button>
        </div>
      )}
    </div>
  );
}
