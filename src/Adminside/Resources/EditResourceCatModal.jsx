import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import ResourceCatContext from "../../ContextApi/ResourceCatContext";

export default function EditResourceCatModal({ resCatId }) {
    const [lgShow, setLgShow] = useState(false);
    const { getResourceCatId, resourceCatId, allResourceCat, setResourceCatId } = useContext(ResourceCatContext)
    const apiUrl = import.meta.env.VITE_API_URL;

    const editAndShowModal = () => {
        setLgShow(true)
        getResourceCatId(resCatId)
    }

    const updateResource = async (e) => {
        e.preventDefault()
        await fetch(`${apiUrl}/api/resourceCat/editcategory/${resourceCatId._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                category: resourceCatId.category,
            }),
        });
        allResourceCat();
    };

    const onchange = (e) => {
        setResourceCatId({ ...resourceCatId, [e.target.name]: e.target.value });
    };
    return (
        <>
            <FontAwesomeIcon
                className="me-3"
                icon={faPen}
                onClick={() => editAndShowModal()}
                style={{ cursor: "pointer" }}
            />
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Edit Resource Category
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={updateResource}>
                        <label className="form-lable">Title</label>
                        <input
                            className="form-control"
                            type="text"
                            name="category"
                            value={resourceCatId.category}
                            onChange={onchange}
                        />
                        <div className="text-center mt-3">
                            <Button type="submit" className="first-button">Update Resource Category</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

EditResourceCatModal.propTypes = {
    resCatId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

EditResourceCatModal.defaultProps = {
    resCatId: null,
};