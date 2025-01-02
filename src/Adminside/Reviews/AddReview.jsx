import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useContext, useState } from "react";
import ReviewContext from "../../ContextApi/ReviewContext";
import Swal from "sweetalert2";

export default function AddReview() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { allReviews } = useContext(ReviewContext)
    const [review, setReview] = useState({
        name: "",
        email: "",
        companyName: "",
        message: "",
        role: "",
        image: "",
        designation: ""
    });

    const addReview = async (e) => {
        e.preventDefault();
        const { name, email, companyName, message, image, designation } = review;
        const role = "Admin"
        const formData = new FormData()
        formData.append("name", name)
        formData.append("email", email)
        formData.append("companyName", companyName)
        formData.append("message", message)
        formData.append("role", role)
        formData.append("image", image)
        formData.append("designation", designation)

        const res = await fetch(`${apiUrl}/api/review/addReview`, {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        console.log(data);

        const userFormError = document.getElementById("userFormError");
        data.errorMessage !== undefined
            ? (userFormError.innerText = data.errorMessage)
            : (userFormError.innerText = "");

        if (res.ok) {
            allReviews()
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Review added successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            setReview({
                name: "",
                email: "",
                companyName: "",
                message: "",
                role: "",
            });
        }
    };

    const reviewForm = [
        {
            name: "name",
            val: review.name,
            type: "text",
            placeH: "Name",
            conId: "floatingInput",
            lab: "Name",
        },
        {
            name: "email",
            val: review.email,
            type: "email",
            placeH: "name@example.com",
            conId: "floatingInput",
            lab: "Email",
        },
        {
            name: "designation",
            val: review.designation,
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
            val: review.companyName,
            type: "text",
            placeH: "Company Name",
            conId: "floatingPassword",
            lab: "Company Name",
        },

        {
            name: "message",
            val: review.message,
            type: "textarea",
            placeH: "Your Message",
            conId: "floatingInput",
            lab: "Your Review",
        },
    ];

    const formValueChange = (e) => {
        if (e.target.files) {
            setReview({ ...review, image: e.target.files[0] });
        } else {
            setReview({ ...review, [e.target.name]: e.target.value });
        }
    };
    return (
        <>
            <div style={{ backgroundColor: "rgb(246 249 255)" }}>
                <div className="container">

                    <div className="row d-flex justify-content-center">
                        <div className="col-md-12">
                            <div id="userFormError" className="text-danger"></div>
                            <form
                                onSubmit={addReview}
                                className="form-group admin-form"
                            >
                                <div className="form-title">
                                    <h2>Add Review</h2>
                                </div>
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
                                        ) : (
                                            <FloatingLabel
                                                FloatingLabel
                                                key={index}
                                                controlId="floatingInput"
                                                label={
                                                    <span className="custom-label">
                                                        {user.lab}
                                                        <span span className="star">
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
                                        );
                                    })}

                                <Button type="submit" className="w-100">
                                    Submit Review
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}
