import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { Button, Container, FloatingLabel, Form, Modal, Row } from "react-bootstrap"
import UserContext from "../../ContextApi/UserContext";
import PropTypes from "prop-types"
import Swal from 'sweetalert2'

function UserEditModal({ userId }) {
    const [lgShow, setLgShow] = useState(false);
    const { userById, usersById, setUsersById, allUsers } = useContext(UserContext)
    const apiUrl = import.meta.env.VITE_API_URL;
    const updateUser = async (e) => {
        e.preventDefault()

        const { isConfirmed } = await Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`,
        });
        if (isConfirmed) {
            const { name, email, number, password, userImage } = usersById

            const formData = new FormData
            formData.append("name", name);
            formData.append("email", email);
            formData.append("number", number);
            formData.append("userImage", userImage);
            formData.append("password", password);

            const res = await fetch(`${apiUrl}/api/user/updateUser/${usersById?._id}`, {
                method: "PUT",
                body: formData
            })
            if (res.ok) {
                Swal.fire("Saved!", "", "success");
                allUsers()
            }
        } else {
            Swal.fire("Changes are not saved", "", "info");
        }
    }

    const formValueChange = (e) => {
        if (e.target.files) {
            setUsersById({ ...usersById, userImage: e.target.files[0] })
        } else {
            setUsersById({ ...usersById, [e.target.name]: e.target.value })
        }
    }

    const userForm = [
        { name: "name", val: usersById.name, type: "text", placeH: "User Name", conId: "floatingInput", lab: "Username" },
        { name: "email", val: usersById.email, type: "email", placeH: "mailto:name@example.com", conId: "floatingInput", lab: "Email Adderss" },
        { name: "number", val: usersById.number, type: "tel", placeH: "+923001234567", conId: "floatingInput", lab: "Contact" },
        { name: "userImage", type: "File", placeH: "Image", conId: "floatingInput", lab: "Image" },
        { name: "password", val: usersById.password, type: "password", placeH: "Password", conId: "floatingPassword", lab: "Password" },
    ]


    const editAndShowModal = () => {
        userById(userId);
        setLgShow(true)
    }

    return (
        <>
            <FontAwesomeIcon
                className="me-3"
                icon={faPen}
                onClick={() => editAndShowModal()}
            />
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Edit User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form className="admin-form" onSubmit={updateUser} style={{ boxShadow: 'none' }}>
                            <div id="userFormError" className="text-danger"></div>
                            <Row className="justify-content-center">
                                {userForm && userForm.map((user, index) => {
                                    return (
                                        user.type !== "File" ? (

                                            <FloatingLabel
                                                key={index}
                                                controlId="floatingInput"
                                                label={user.lab}
                                                className="mb-3"
                                            >
                                                <Form.Control
                                                    type={user.type}
                                                    name={user.name}
                                                    value={user.val}
                                                    readOnly={user.type === "email"}
                                                    onChange={formValueChange}
                                                    placeholder={user.placeH}
                                                />
                                            </FloatingLabel>
                                        ) : (
                                            <div className="d-flex justify-content-between align-items-center">
                                                <FloatingLabel
                                                    key={index}
                                                    controlId="floatingInput"
                                                    label={user.lab}
                                                    className="mb-3"
                                                >
                                                    <Form.Control
                                                        type={user.type}
                                                        name={user.name}
                                                        onChange={formValueChange}
                                                        placeholder={user.placeH}
                                                    />
                                                </FloatingLabel>
                                                <img src={usersById.userImage} alt="" className="img-fluid mb-4" style={{ width: "100px" }} />
                                            </div>
                                        )
                                    )
                                })}
                            </Row>
                            <div className="text-center">
                                <Button type="submit" className="first-button">Update User</Button>
                            </div>
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UserEditModal

UserEditModal.propTypes = {
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

UserEditModal.defaultProps = {
    userId: null,
};
