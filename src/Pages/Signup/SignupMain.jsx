import { useContext, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import signUpImg from "../../assets/Images/sign-up-page.avif";
import UserContext from "../../ContextApi/UserContext";
// import { icon } from "@fortawesome/f";

function Signup() {
  const { setSignUser } = useContext(UserContext);
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [userCredential, setUserCredential] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    number: "",
    uploadCv: "",
    userImage: "",
    role: ""
  });

  const addUser = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, number, userImage, role } =
      userCredential;
    const userFormError = document.getElementById("userFormError");
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      userFormError.innerText = "Please enter a valid email address";
      return;
    } else {
      userFormError.innerText = "";
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("role", role);
    formData.append("number", number);
    formData.append("userImage", userImage);

    const res = await fetch(`${apiUrl}/api/user/addUser`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    data.message !== undefined
      ? (userFormError.innerText = data.message)
      : (userFormError.innerText = "");

    if (res.ok) {
      setUserCredential({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        number: "",
        uploadCv: "",
      });
      setSignUser(data);
      sessionStorage.setItem("userData", JSON.stringify(data));
      if (data.role === "Employer") {
        navigate("/employer-panel/employer-profile")
      } else {
        navigate("/user-panel/dashboard");
      }
    }
  };

  const formValueChange = (e) => {
    const { name, value } = e.target

    if (name === "number") {
      const regex = /^\+?[0-9-\s]*$/;
      if (!regex.test(value)) {
        return;
      }
    }

    if (e.target.files) {
      setUserCredential({ ...userCredential, userImage: e.target.files[0] });
    } else {
      setUserCredential({ ...userCredential, [e.target.name]: e.target.value });
    }
  };

  const signUpForm = [
    {
      name: "name",
      val: userCredential.name,
      type: "text",
      placeH: "User Name",
      conId: "floatingInput",
      lab: "Username",
    },
    {
      name: "email",
      val: userCredential.email,
      type: "email",
      placeH: "mailto:name@example.com",
      conId: "floatingInput",
      lab: "Email Adderss",
    },
    {
      name: "number",
      val: userCredential.number,
      type: "tel",
      placeH: "+923001234567",
      conId: "floatingInput",
      lab: "Contact",
    },
    { name: "userImage", type: "File", placeH: "User Image", conId: "floatingInput", lab: "User Image" },
    {
      name: "password",
      val: userCredential.password,
      type: "password",
      placeH: "Password",
      conId: "floatingPassword",
      lab: "Password",
    },
    {
      name: "confirmPassword",
      val: userCredential.confirmPassword,
      type: "password",
      placeH: "Password",
      conId: "floatingPassword",
      lab: "Confirm Password",
    },
    {
      name: "role", val: userCredential.role, type: "select", placeH: "User Role", conId: "floatingSelect", lab: "Register As", options: [
        { value: "", label: "Select User Role" },
        { value: "Employer", label: "Employer" },
        { value: "Job Seaker", label: "Job Seeker" }
      ]
    },
  ];

  return (
    <>
      <section className="py-5 sign-up-section">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col md={6}>
              <img
                src={signUpImg}
                alt="register-on-job-portal"
                className="img-fluid register-image"
              />
            </Col>
            <Col md={6}>
              <div className="section-head mb-4">
                <h2 style={{ color: "var(--primary-color)" }}>
                  Sign Up For AIG Jobs
                </h2>
              </div>
              <div id="userFormError" className="text-danger"></div>
              <Form
                onSubmit={addUser}
                className="admin-form"
                style={{ backgroundColor: "transparent", boxShadow: "none" }}
              >
                {signUpForm &&
                  signUpForm.map((user, index) => {
                    return user.type === "select" ? (
                      <FloatingLabel
                        controlId={user.conId}
                        label={
                          <span className="custom-label">
                            {user.lab}
                            <span span className="star">
                              {user.star}
                            </span>
                          </span>
                        }
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
                    ) : user.type === "File" ? (
                      <div className="mb-3">
                        <span className="text-muted" style={{ fontSize: "12px" }}>
                          Important *: DO NOT upload photos more than 2MB.
                        </span>{" "}
                        <FloatingLabel
                          FloatingLabel
                          className="mt-2"
                          key={index}
                          controlId="floatingInput"
                          label={
                            <span className="custom-label">
                              {user.lab}
                              <span span className="star">
                                {user.star}
                              </span>
                            </span>
                          }

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
                    ) : (
                      <FloatingLabel
                        FloatingLabel
                        key={index}
                        controlId="floatingInput"
                        label={
                          <span className="custom-label">
                            {user.lab}
                            <span span className="star">
                              {user.star}
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
                  Sign Up
                </Button>
              </Form>

              <div className="mt-4 text-center">
                <p className="m-0">
                  Already have an account?{" "}
                  <Link
                    to="/sign-in"
                    className="text-underline text-dark fw-bold"
                  >
                    Sign In here
                  </Link>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Signup;
