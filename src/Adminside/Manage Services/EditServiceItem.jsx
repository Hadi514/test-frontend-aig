import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import ReactQuill from "react-quill"
import ServicesContext from "../../ContextApi/ServicesContext";
import ServicesCatContext from "../../ContextApi/ServicesCatContext";

export default function EditServiceItem({ serviceId }) {
    const [lgShow, setLgShow] = useState(false);
    const { getServiceId, serviceById, allServicesEntries, setServiceById } = useContext(ServicesContext)
    const { allServicesCat } = useContext(ServicesCatContext)
    const apiUrl = import.meta.env.VITE_API_URL;
    
    const editAndShowModal = () => {
        setLgShow(true)
        getServiceId(serviceId)
    }

    const updateResource = async (e) => {
        e.preventDefault()
        await fetch(`${apiUrl}/api/service/editService/${serviceById._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: serviceById.title,
                category: serviceById.category,
                content: serviceById.content,
                slug: serviceById.slug,
            }),
        });
        allServicesEntries();
    };

    const onchange = (e) => {
        setServiceById({ ...serviceById, [e.target.name]: e.target.value });
    };
    return (
        <>
            <FontAwesomeIcon
                className="me-3"
                icon={faPen}
                onClick={() => editAndShowModal()}
                style={{cursor: "pointer"}}
            />
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Edit Interivew Item
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={updateResource}>
                        <label className="form-lable">Title</label>
                        <input
                            className="form-control"
                            type="text"
                            name="title"
                            value={serviceById.title}
                            onChange={onchange}
                        />
                        <label className="form-lable">Slug</label>
                        <input
                            className="form-control"
                            type="text"
                            name="slug"
                            style={{ color: "red" }}
                            value={serviceById.slug}
                            onChange={onchange}
                        />
                        <label className="form-lable">Category</label>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            name="category"
                            value={serviceById.category}
                            onChange={onchange}
                        >
                            <option value="">Select a category</option>
                            {allServicesCat &&
                                allServicesCat.map((select, index) => (
                                    <option key={index}>{select.category}</option>
                                ))}
                        </select>
                        <label className="form-lable">Content</label>
                        <ReactQuill
                            theme="snow"
                            value={serviceById.content}
                            onChange={(value) =>
                                onchange({ target: { name: "content", value } })
                            }
                        />
                        <div className="py-2 text-center">
                        <button type="submit" className="first-button text-white">Update Service Item</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

EditServiceItem.propTypes = {
    serviceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

EditServiceItem.defaultProps = {
    serviceId: null,
};