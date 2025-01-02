import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft, faAnglesRight } from "@fortawesome/free-solid-svg-icons";
export default function AllBlogPosts() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState([]);
  const [post, setPost] = useState([]);
  const [editPost, setEditPost] = useState([]);
  const [postId, setPostId] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [lgShow, setLgShow] = useState(false);
  const [editShow, setEditShow] = useState(false);

  const Getallposts = async () => {
    await fetch(`${apiUrl}/api/blog/getallposts`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  };
  useEffect(() => {
    Getallposts();
  }, []);

  const viewPosts = async (id) => {
    await fetch(
      `${apiUrl}/api/blog/getposts/${id}`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => setPost(data));
  };
  const deletePosts = async (id) => {
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
      await fetch(
        `${apiUrl}/api/blog/delposts/${id}`,
        {
          method: "DELETE",
        }
      );
      Getallposts();
    }
  };

  const editPosts = async (id) => {
    await fetch(`${apiUrl}/api/blog/getposts/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setEditPost(data);
        setPostId(data._id);
      });
  };
  const onchange = (e) => {
    setEditPost({ ...editPost, [e.target.name]: e.target.value });
  };
  const updatePost = async (e) => {
    e.preventDefault()
    await fetch(`${apiUrl}/api/blog/editposts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: editPost.title,
        category: editPost.category,
        content: editPost.content,
        slug: editPost.slug,
      }),
    });
    Getallposts();
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      post.category.toLowerCase().includes(searchCategory.toLowerCase())
  );

  const Getcategory = async () => {
    await fetch(
      `${apiUrl}/api/blogCat/getcategory`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCategory(data);
      });
  };
  useEffect(() => {
    Getcategory();
  });

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const openViewPosts = (id) => {
    viewPosts(id)
    setLgShow(true)
  }
  const openEditPosts = (id) => {
    editPosts(id)
    setEditShow(true)
  }

  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const postPerPage = itemsPerPage

  const lastPostIndex = currentPage * postPerPage
  const firstUserIndex = lastPostIndex - postPerPage
  const currentPosts = filteredPosts?.slice(firstUserIndex, lastPostIndex)

  const totalPages = Math.ceil(filteredPosts.length / postPerPage)

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
  }

  return (
    <div>

      <h2 className="">Blog Posts List</h2>

      {/* {/ Add search input fields /} */}
      <div className="container">
        <div className="row d-flex justify-content-between">
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Search by Title:</label>
              <input
                type="text"
                className="form-control admin-form"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label className="form-label">Search by Category:</label>
              <select
                className="form-select admin-form"
                aria-label="Default select example"
                name="category"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {category &&
                  category.map((select, index) => (
                    <option key={index}>{select.category}</option>
                  ))}
              </select>
            </div>
          </div>
        </div>
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
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.slice().reverse().map((posts, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{posts.title}</td>
                  <td>{posts.category}</td>
                  <td>{formatDate(posts.date)}</td>
                  <td>
                    <i
                      className="fa-solid fa-eye me-1"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      style={{ color: "blue", cursor: "pointer" }}
                      onClick={() => openViewPosts(posts._id)}
                    ></i>
                    <i
                      className="fas fa-edit me-1"
                      style={{ color: "blue", cursor: "pointer" }}
                      data-bs-toggle="modal"
                      data-bs-target="#staticdel"
                      onClick={() => openEditPosts(posts._id)}
                    ></i>
                    <i
                      className="fas fa-trash"
                      style={{ color: "red" }}
                      onClick={() => deletePosts(posts._id)}
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
          <Modal.Title id="example-modal-sizes-title-lg">
            View Blog
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="admin-form" style={{ boxShadow: 'none' }}>
            <label className="form-lable">Title</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={post.title}
            />
            <label className="form-lable">Category</label>
            <input
              className="form-control"
              type="name"
              name="email"
              value={post.category}
            />
            <label className="form-lable">Content</label>
            <div
              className="form-control"
              dangerouslySetInnerHTML={{ __html: post.content }}
              type="text"
              rows={10}
            // value={post.content}
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
          <Modal.Title id="example-modal-sizes-title-lg">
            Edit Blog
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="admin-form" style={{ boxShadow: 'none' }}>
            <label className="form-lable">Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              value={editPost.title}
              onChange={onchange}
            />
            <label className="form-lable">Slug</label>
            <input
              className="form-control"
              type="text"
              name="slug"
              style={{ color: "red" }}
              value={editPost.slug}
              onChange={onchange}
            />
            <label className="form-lable">Category</label>
            <select
              className="form-select"
              aria-label="Default select example"
              name="category"
              value={editPost.category}
              onChange={onchange}
            >
              <option value="">Select a category</option>
              {category &&
                category.map((select, index) => (
                  <option key={index}>{select.category}</option>
                ))}
            </select>
            <label className="form-lable">Content</label>
            <ReactQuill
              theme="snow"
              value={editPost.content}
              onChange={(value) =>
                onchange({ target: { name: "content", value } })
              }
            />
          </form>
          <div className="text-center">

            <button
              type="button"
              className="first-button text-white mt-3"
              data-bs-dismiss="modal"
              onClick={updatePost}
            >
              Update
            </button>
          </div>
        </Modal.Body>
      </Modal>
      {posts?.length > postPerPage && (
        <div className="pagination-controls mt-3">
          <Button onClick={goToPreviousPage} disabled={currentPage === 1}>
            <FontAwesomeIcon icon={faAnglesLeft} />
          </Button>
          <span className="me-2 ms-2">Page {currentPage} of {totalPages}</span>
          <Button onClick={goToNextPage} disabled={currentPage === totalPages}>
            <FontAwesomeIcon icon={faAnglesRight} />
          </Button>
        </div>
      )}
    </div>
  );
}
