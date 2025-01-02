import { useContext, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import ReviewContext from "../../ContextApi/ReviewContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

function EditReview({ reviewId }) {
    const { getReviewById, allReviews, setGetReviewById, reviewById } = useContext(ReviewContext)
    const [lgShow, setLgShow] = useState(false);
    const apiUrl = import.meta.env.VITE_API_URL;
    const updateReview = async (e) => {
        e.preventDefault();
        console.log(getReviewById._id);

        const { name, email, companyName, message, role, image, designation } = getReviewById;
        const { isConfirmed } = await Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`,
        });
        if (isConfirmed) {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("email", email)
            formData.append("companyName", companyName)
            formData.append("message", message)
            formData.append("role", role)
            formData.append("image", image)
            formData.append("designation", designation)

            const res = await fetch(`${apiUrl}/api/review/updateReview/${getReviewById._id}`, {
                method: "PUT",
                body: formData,
            });

            if (res.ok) {
                Swal.fire("Saved!", "", "success");
                allReviews()
            }
        } else {
            Swal.fire("Changes are not saved", "", "info");
        }
    };

    const reviewForm = [
        {
            name: "name",
            val: getReviewById.name,
            type: "text",
            placeH: "Name",
            conId: "floatingInput",
            lab: "Name",
        },
        {
            name: "email",
            val: getReviewById.email,
            type: "email",
            placeH: "name@example.com",
            conId: "floatingInput",
            lab: "Email",
        },
        {
            name: "designation",
            val: getReviewById.designation,
            type: "text",
            placeH: "Desination",
            conId: "floatingInput",
            lab: "Designation",
        },
        {
            name: "image",
            type: "File",
            placeH: "Image",
            conId: "floatingInput",
            lab: "Image",
        },
        {
            name: "companyName",
            val: getReviewById.companyName,
            type: "text",
            placeH: "Company Name",
            conId: "floatingPassword",
            lab: "Company Name",
        },
        {
            name: "role",
            val: getReviewById.role,
            type: "select",
            placeH: "User Role",
            conId: "floatingSelect",
            lab: "User Role",
            options: [
                { value: "", label: "Select User Role" },
                { value: "Employer", label: "Employer" },
                { value: "Job Seeker", label: "Job Seeker" },
            ],
        },
        {
            name: "message",
            val: getReviewById.message,
            type: "textarea",
            placeH: "Your Message",
            conId: "floatingInput",
            lab: "Your Review",
        },
    ];

    const formValueChange = (e) => {
        if (e.target.files) {
            setGetReviewById({ ...getReviewById, image: e.target.files[0] });
        } else {
            setGetReviewById({ ...getReviewById, [e.target.name]: e.target.value });
        }
    };

    const editOpenReview = () => {
        reviewById(reviewId)
        setLgShow(true)
    }

    return (
        <>
            <FontAwesomeIcon
                className="me-3"
                icon={faEdit}
                onClick={() => editOpenReview()}
                style={{ cursor: 'pointer' }}
            />

            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Edit Review
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        onSubmit={updateReview}
                        className="admin-form"
                        style={{ backgroundColor: "transparent", boxShadow: "none" }}
                    >
                        {reviewForm &&
                            reviewForm.map((user, index) => {
                                return user.type === "select" ? (
                                    <FloatingLabel
                                        controlId={user.conId}
                                        label={<span className="custom-label">
                                            {user.lab}
                                            <span span className="star">
                                                *
                                            </span>
                                        </span>}
                                        className="mb-3"
                                    >
                                        <Form.Select
                                            name={user.name}
                                            onChange={formValueChange}
                                            value={user.val}
                                            aria-label="Floating label select example"
                                        >
                                            {user.options.map((opt, index) => {
                                                return (
                                                    <option key={index} value={opt.value}>
                                                        {opt.label}
                                                    </option>
                                                );
                                            })}
                                        </Form.Select>
                                    </FloatingLabel>
                                ) : user.type === "textarea" ? (
                                    <FloatingLabel
                                        className="mb-3"
                                        controlId="floatingTextarea2"
                                        label={<span className="custom-label">
                                            {user.lab}
                                            <span span className="star">
                                                *
                                            </span>
                                        </span>}
                                    >
                                        <Form.Control
                                            onChange={formValueChange}
                                            type={user.type}
                                            name={user.name}
                                            value={user.val}
                                            as="textarea"
                                            placeholder="Write Your Review"
                                            style={{ height: "100px" }}
                                        />
                                    </FloatingLabel>
                                ) : user.type !== "File" ? (
                                    <FloatingLabel
                                        key={index}
                                        controlId="floatingInput"
                                        label={
                                            < span className="custom-label" >
                                                {user.lab}
                                                <span className="star" >
                                                    *
                                                </span>
                                            </span>
                                        }
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type={user.type}
                                            name={user.name}
                                            value={user.val}
                                            onChange={formValueChange}
                                            placeholder={user.placeH}
                                        />
                                    </FloatingLabel>
                                ) : (
                                    <div>
                                        <img src={getReviewById.image} style={{ width: "20%" }} className="mb-2" alt="" />
                                        <FloatingLabel
                                            key={index}
                                            controlId="floatingInput"
                                            label={
                                                < span className="custom-label" >
                                                    {user.lab}
                                                    <span className="star" >
                                                        *
                                                    </span>
                                                </span>
                                            }
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type={user.type}
                                                name={user.name}
                                                value={user.val}
                                                onChange={formValueChange}
                                                placeholder={user.placeH}
                                            />
                                        </FloatingLabel>
                                    </div>
                                );
                            })}

                        <Button type="submit" className="w-100">
                            Submit Review
                        </Button>
                    </Form >
                </Modal.Body >
            </Modal >
        </>
    );
}

export default EditReview;

EditReview.propTypes = {
    reviewId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

EditReview.defaultProps = {
    reviewId: null,
};
