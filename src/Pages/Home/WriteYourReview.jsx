import { useContext, useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import ReviewContext from "../../ContextApi/ReviewContext";

function WriteYourReview() {
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
    const { name, email, companyName, message, role, image, designation } = review;
    const status = "P"
    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("companyName", companyName)
    formData.append("message", message)
    formData.append("role", role)
    formData.append("status", status)
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
      name: "role",
      val: review.role,
      type: "select",
      placeH: "Review as",
      conId: "floatingSelect",
      lab: "Review as",
      options: [
        { value: "", label: "Select User Role" },
        { value: "Employer", label: "Employer" },
        { value: "Job Seeker", label: "Job Seeker" },
      ],
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
      <section className=" write-review-container">
        <div className="review-overlay">
          <Container className="py-6">
            <Row className="justify-content-center">
              <Col md={9}>
                <div className="section-head text-center text-white">
                  <h2>Your Feedback Matters!</h2>
                  <p className="m-0 mb-3 text-white">If you want to share your feedback regarding the bettermet of the platform or to tell us about your expierence, use this platform to write to us.</p>
                </div>
                <div id="userFormError" className="text-danger"></div>
                <Form
                  onSubmit={addReview}
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
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </>
  );
}

export default WriteYourReview;
