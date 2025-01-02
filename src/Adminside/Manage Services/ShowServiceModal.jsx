import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Modal } from "react-bootstrap"
import PropTypes from "prop-types";
import ServicesContext from "../../ContextApi/ServicesContext";

export default function ShowServiceModal({ serviceId }) {
    const [lgShow, setLgShow] = useState(false);
    const { getServiceId, serviceById } = useContext(ServicesContext)

    const openViewModal = () => {
        setLgShow(true)
        getServiceId(serviceId)
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
                        View Service Item
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <label className="form-lable">Title</label>
                        <input
                            className="form-control"
                            type="text"
                            name="name"
                            value={serviceById.title}
                        />
                        <label className="form-lable">Category</label>
                        <input
                            className="form-control"
                            type="name"
                            name="email"
                            value={serviceById.category}
                        />
                        <label className="form-lable">Content</label>
                        <div
                            className="form-control"
                            dangerouslySetInnerHTML={{ __html: serviceById.content }}
                            type="text"
                            rows={10}
                        />
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}

ShowServiceModal.propTypes = {
    serviceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

ShowServiceModal.defaultProps = {
    serviceId: null,
};