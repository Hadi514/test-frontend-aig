import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import ReactQuill from "react-quill"
import ResourcesContext from "../../ContextApi/ResourcesContext";
import ResourceCatContext from "../../ContextApi/ResourceCatContext";

export default function EditResource({ ResourceId }) {
    const [lgShow, setLgShow] = useState(false);
    const { getResourceId, resourceById, showAllResources, setResourceById } = useContext(ResourcesContext)
    const { resourceCat } = useContext(ResourceCatContext)
    const apiUrl = import.meta.env.VITE_API_URL;
    const editAndShowModal = () => {
        setLgShow(true)
        getResourceId(ResourceId)
    }

    const updateResource = async (e) => {
        e.preventDefault()
        await fetch(`${apiUrl}/api/resource/editResource/${resourceById._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: resourceById.title,
                category: resourceById.category,
                content: resourceById.content,
                slug: resourceById.slug,
            }),
        });
        showAllResources();
    };

    const onchange = (e) => {
        setResourceById({ ...resourceById, [e.target.name]: e.target.value });
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
                        Edit Resource
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={updateResource}>
                        <label className="form-lable">Title</label>
                        <input
                            className="form-control"
                            type="text"
                            name="title"
                            value={resourceById.title}
                            onChange={onchange}
                        />
                        <label className="form-lable">Slug</label>
                        <input
                            className="form-control"
                            type="text"
                            name="slug"
                            style={{ color: "red" }}
                            value={resourceById.slug}
                            onChange={onchange}
                        />
                        <label className="form-lable">Category</label>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            name="category"
                            value={resourceById.category}
                            onChange={onchange}
                        >
                            <option value="">Select a category</option>
                            {resourceCat &&
                                resourceCat.map((select, index) => (
                                    <option key={index}>{select.category}</option>
                                ))}
                        </select>
                        <label className="form-lable">Content</label>
                        <ReactQuill
                            theme="snow"
                            value={resourceById.content}
                            onChange={(value) =>
                                onchange({ target: { name: "content", value } })
                            }
                        />
                        <div className="text-center mt-3">
                        <Button className="first-button" type="submit">Update Resource</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

EditResource.propTypes = {
    ResourceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

EditResource.defaultProps = {
    ResourceId: null,
};