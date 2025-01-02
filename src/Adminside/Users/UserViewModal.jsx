import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Col, Container, FloatingLabel, Form, Modal, Row } from "react-bootstrap"
import UserContext from "../../ContextApi/UserContext";
import PropTypes from "prop-types"



function UserViewModal({ userId }) {
    const [lgShow, setLgShow] = useState(false);
    const { userById, usersById } = useContext(UserContext)

    const userForm = [
        { val: usersById.name, lab: "Name" },
        { val: usersById.email, lab: "Email" },
        { val: usersById.number, lab: "Contact" },
        { val: usersById.password, lab: "Password", type: "password" },
    ]


    const viewAndShowModal = () => {
        userById(userId);
        setLgShow(true)
    }

    return (
        <>
            <FontAwesomeIcon
                className="me-3"
                icon={faEye}
                onClick={() => viewAndShowModal()}
            />
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        View User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                    {usersById.userImage ? (
                                    <img src={usersById.userImage} style={{ width: "120px" }} alt="" />
                                ) : (
                                    <img src="" alt="" />
                                )}
                        <Form className="admin-form" style={{ boxShadow: 'none' }}>
                            <div id="userFormError" className="text-danger"></div>
                            <Row className="justify-content-center">
                                {userForm && userForm.map((job, index) => {
                                    return <Col key={index} md={6}>
                                        <div>
                                            <FloatingLabel
                                                controlId={job.conId}
                                                label={
                                                    <span className="custom-label">
                                                        {job.lab}
                                                    </span>
                                                }
                                                className="mb-3"
                                            >
                                                <Form.Control value={job.val} type={job.type} />
                                            </FloatingLabel>

                                        </div>
                                    </Col>
                                })}
                            </Row>

                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UserViewModal

UserViewModal.propTypes = {
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

UserViewModal.defaultProps = {
    userId: null,
};
