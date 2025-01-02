import { useContext, useState } from "react";
import Swal from "sweetalert2";
import CategoryContext from "../../ContextApi/CategoryContext";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import EditCategoryModal from "./EditCategoryModal";

export default function Categories() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { AllCategory, allCategory, deleteCategory } = useContext(CategoryContext);
    const [lgShow, setLgShow] = useState(false);
    const [catCredentials, setCatCredentials] = useState({
        category: "",
        image: ""
    });
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25)
    const catPerPage = itemsPerPage;
    // Pagination logic
    const indexOfLastCategory = currentPage * catPerPage;
    const indexOfFirstCategory = indexOfLastCategory - catPerPage;
    const currentCategories = AllCategory.slice(indexOfFirstCategory, indexOfLastCategory);

    // Total pages for pagination
    const totalPages = Math.ceil(AllCategory.length / catPerPage);

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

    // Add category logic
    const AddCategory = async (e) => {
        e.preventDefault();
        const { image, category } = catCredentials
        const formData = new FormData()
        formData.append("category", category)
        formData.append("image", image)

        const res = await fetch(`${apiUrl}/api/category/addcategory`, {
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
            allCategory();
        }
    };

    const onchange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image' && files) {
            setCatCredentials({ ...catCredentials, image: files[0] });
        } else {
            setCatCredentials({ ...catCredentials, [name]: value });
        }
    };

    return (
        <div className="container mt-3">
            <div className="row d-flex justify-content-center">
                <div className="d-flex mb-3 justify-content-between">
                    <h2>Course Categories List</h2>
                    <Button className="first-button" onClick={() => setLgShow(true)}>
                        <i className="fas fa-plus"></i> Add Category
                    </Button>
                </div>

                <div>
                    <p>Show <select name="" id="" onChange={(e) => setItemsPerPage(e.target.value)}>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select> Entries</p>
                </div>

                <div className="col-md-12">
                    <div className="table-container" style={{ overflowX: "auto" }}>
                        <div className="table-responsive-sm">
                            <table className="admin-table">
                                <thead>
                                    <tr className="form-title">
                                        <th scope="col">#</th>
                                        <th scope="col">Category</th>
                                        <th scope="col" style={{ opacity: "0" }}>All Course Categories</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentCategories.reverse().map((course, index) => (
                                        <tr key={index}>
                                            <td>{indexOfFirstCategory + index + 1}</td>
                                            <td>{course.category}</td>
                                            <td style={{ opacity: "0" }}>{course.category}</td>
                                            <td>
                                                <i
                                                    className="fa fa-trash me-3"
                                                    onClick={() => deleteCategory(course._id)}
                                                ></i>
                                                <EditCategoryModal courseCategoryID={course._id}/>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* {/ {/ Pagination controls /} /} */}
                    {AllCategory.length > catPerPage && (
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
            </div>

            {/* {/ {/ Category modal /} /} */}
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='form-group admin-form p-3' onSubmit={AddCategory} style={{ boxShadow: "none" }}>
                        <input
                            className='form-control'
                            style={{ width: '100%', height: '55px', borderRadius: '0', marginTop: '20px' }}
                            type='text'
                            placeholder='Add Category'
                            name='category'
                            value={catCredentials.category}
                            onChange={onchange}
                        />
                        <input
                            className='form-control'
                            style={{ width: '100%', height: '55px', borderRadius: '0', marginTop: '20px' }}
                            type='file'
                            placeholder='Add industry Logo'
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
        </div>
    );
}
