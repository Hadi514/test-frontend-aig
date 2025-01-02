import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Modal } from "react-bootstrap"
import PropTypes from "prop-types";
import ResourcesContext from "../../ContextApi/ResourcesContext";

export default function ViewResourceModal({ resouceId }) {
    const [lgShow, setLgShow] = useState(false);
    const { getResourceId, resourceById } = useContext(ResourcesContext)

    const openViewModal = () => {
        setLgShow(true)
        getResourceId(resouceId)
    }
    return (
        <>
            <FontAwesomeIcon
                className="me-3"
                icon={faEye}
                onClick={() => openViewModal()}
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
                        Large Modal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <label className="form-lable">Title</label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            value={resourceById.title}
                        />
                        <label className="form-lable">Category</label>
                        <input
                            className="form-control"
                            type="name"
                            name="email"
                            value={resourceById.category}
                        />
                        <label className="form-lable">Content</label>
                        <div
                            className="form-control"
                            dangerouslySetInnerHTML={{ __html: resourceById.content }}
                            type="text"
                            rows={10}
                        />
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

ViewResourceModal.propTypes = {
    resouceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

ViewResourceModal.defaultProps = {
    resouceId: null,
};