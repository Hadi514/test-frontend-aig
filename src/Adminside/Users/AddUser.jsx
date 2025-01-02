import { useContext, useState } from "react";
import { Col, Container, FloatingLabel, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import UserContext from "../../ContextApi/UserContext";
import Swal from "sweetalert2";

function AddUser() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { allUsers } = useContext(UserContext);
  const [userCredential, setUserCredential] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    number: "",
    uploadCv: "",
    userImage: "",
    role: "",
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
      Swal.fire({
              position: "center",
              icon: "success",
              title: "User added successfully!",
              showConfirmButton: true,
      });
      setUserCredential({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        number: "",
        uploadCv: "",
      });
      allUsers();
    }
  };

  const formValueChange = (e) => {
    const { name, value } = e.target;

    if (name === "number" && value.length > 15) {
      return; 
    }

    if (name !== "number" && ["name", "email", "password", "confirmPassword"].includes(name) && value.length > 40) {
      return; 
    }

    if (e.target.files) {
      setUserCredential({ ...userCredential, userImage: e.target.files[0] });
    } else {
      setUserCredential({ ...userCredential, [name]: value });
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
      star: "*",
    },
    {
      name: "email",
      val: userCredential.email,
      type: "email",
      placeH: "mailto:name@example.com",
      conId: "floatingInput",
      lab: "Email Address",
      star: "*",
    },
    {
      name: "number",
      val: userCredential.number,
      type: "tel",
      placeH: "+923001234567",
      conId: "floatingInput",
      lab: "Contact",
      star: "*",
    },
    {
      name: "userImage",
      type: "File",
      placeH: "User Image",
      conId: "floatingInput",
      lab: "User Image",
    },
    {
      name: "password",
      val: userCredential.password,
      type: "password",
      placeH: "Password",
      conId: "floatingPassword",
      lab: "Password",
      star: "*",
    },
    {
      name: "confirmPassword",
      val: userCredential.confirmPassword,
      type: "password",
      placeH: "Password",
      conId: "floatingPassword",
      lab: "Confirm Password",
      star: "*",
    },
    {
      name: "role",
      val: userCredential.role,
      type: "select",
      placeH: "User Role",
      conId: "floatingSelect",
      lab: "User Role",
      star: "*",
      options: [
        { value: "", label: "Select User Role" },
        { value: "Admin", label: "Admin" },
        { value: "Editor", label: "Editor" },
        { value: "Employer", label: "Employer" },
        { value: "Job Seaker", label: "Job Seeker" },
      ],
    },
  ];

  return (
    <>
      <Container>
        <Form onSubmit={addUser} className="admin-form">
          <div className="form-title">
            <h2>Add User</h2>
          </div>
          <Row>
            <Col md={12}>
              <div id="userFormError" className="text-danger"></div>
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
              <div className="d-flex justify-content-center pb-3">
                <Button type="submit">Add User</Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}

export default AddUser;
