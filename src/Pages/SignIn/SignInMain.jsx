import { useContext, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../ContextApi/UserContext";

function SignIn() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { setSignUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [userCredential, setUserCredential] = useState({
    email: "",
    password: "",
  });

  const signInUser = async (e) => {
    e.preventDefault();
    const { email, password } = userCredential;
    const res = await fetch(
      `${apiUrl}/api/user/signIn`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await res.json();
    const userFormError = document.getElementById("userFormError");
    data.message !== undefined
      ? (userFormError.innerText = data.message)
      : (userFormError.innerText = "");

    if (res.ok) {
      setSignUser(data);
      sessionStorage.setItem("userData", JSON.stringify(data));
      if (data.role === "Admin") {
        navigate("/adminPanel/dashboard")
      } else if (data.role === "Employer") {
        navigate("/employer-panel/dashboard")
      } else if (data.role === "Editor") {
        navigate("/editor-panel/dashboard")
      } else {
        navigate("/user-panel/dashboard")

      }
    }

  };

  const formValueChange = (e) => {
    setUserCredential({ ...userCredential, [e.target.name]: e.target.value });
  };

  const signUpForm = [
    {
      name: "email",
      val: userCredential.email,
      type: "email",
      conId: "floatingInput",
      lab: "",
      placeH: "example@gmail.com",
    },
    {
      name: "password",
      val: userCredential.password,
      type: "password",
      conId: "floatingPassword",
      lab: "",
      placeH: "Password",
    },
  ];

  return (
    <>
      <section className="py-7 sign-in-section">
        <Container>
          <Row className="justify-content-center">
            <Col md={6} className="sign-in-form-container ">
              <div className="text-center text-white section-head">
                <h2 className="mb-3">Login to your account</h2>
              </div>
              <p className="text-center text-white">
                Do not have an account yet?{" "}
                <Link
                  to="/sign-up"
                  className="text-white text-underline fw-bold"
                >
                  Register here
                </Link>
              </p>
              <div id="userFormError" className="text-danger"></div>
              <Form
                onSubmit={signInUser}
                className="admin-form"
                style={{ backgroundColor: "transparent", boxShadow: "none" }}
              >
                {signUpForm &&
                  signUpForm.map((user, index) => {
                    return (
                      <Form.Control
                        key={index}
                        type={user.type}
                        name={user.name}
                        value={user.val}
                        onChange={formValueChange}
                        placeholder={user.placeH}
                      />
                    );
                  })}
                {/* <div className="d-flex justify-content-end">
                  <Link to="#" className="text-white text-underline fw-bold">
                    Forgot Password?
                  </Link>
                </div> */}
                <div className="text-center mt-3 ">
                  <Button
                    type="submit"
                    className="w-100 border-0"
                    style={{
                      borderRadius: "50px",
                      backgroundColor: "var(--primary-color)",
                    }}
                  >
                    Sign In
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default SignIn;
