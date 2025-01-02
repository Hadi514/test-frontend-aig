import { useContext, useEffect, useState } from "react"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import UserContext from "../ContextApi/UserContext"
import Swal from "sweetalert2"

function EditorProfile() {
  const { signUser, setSignUser } = useContext(UserContext)
  const [updateType, setUpdateType] = useState("password")
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const [updateSignUser, setUpdateSignUser] = useState({
    name: "",
    email: "",
    number: "",
    password: ""
  });

  useEffect(() => {
    if (signUser) {
      setUpdateSignUser({
        name: signUser.name || "",
        email: signUser.email || "",
        number: signUser.number || "",
        password: signUser.password || ""
      });
    }
  }, [signUser]);
  const changeType = () => {
    updateType === "text" ? setUpdateType("password") : setUpdateType("text")
  }

  const updateUser = async (e) => {
    e.preventDefault()
    const { name, number, password } = updateSignUser

    const res = await fetch(`${apiUrl}/api/user/updateUser/${signUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, number, password })
    })
    const data = await res.json()

    if (res.ok) {
      Swal.fire("Changes Saved!");
      sessionStorage.setItem("userData", JSON.stringify(data));
      setSignUser(data)
    }
  }

  const formValueChange = (e) => {
    setUpdateSignUser({ ...updateSignUser, [e.target.name]: e.target.value })
  }

  return (
    <>
      <section className="interview-section">
        <Container>
          <Row className="mt-3 justify-content-center align-items-center">
            <Col className="" md={12}>
              <Form className="admin-form pb-4" onSubmit={updateUser}>
                <div className="form-title"><h2>My Profile</h2></div>
                <Row>
                  <Col md={6}>
                    <label className="mt-3 mb-2">Name</label>
                    <Form.Control className="p-3" name="name" value={updateSignUser.name} onChange={formValueChange}></Form.Control>
                  </Col>
                  <Col md={6}>
                    <label className="mt-3 mb-2">Email</label>
                    <Form.Control className="p-3" value={updateSignUser.email}></Form.Control>
                  </Col>
                  <Col md={6}>
                    <label className="mt-3 mb-2">Contact</label>
                    <Form.Control className="p-3" name="number" value={updateSignUser.number} onChange={formValueChange}></Form.Control>
                  </Col>
                  <Col md={6}>
                    <label className="mt-3 mb-2">Current Password</label>
                    <div className="d-flex align-items-center p-2" style={{ border: "1px solid #ccc", borderRadius: '5px' }}>
                      <Form.Control type={updateType} className="" name="password" value={updateSignUser.password} aria-label="Current Password" style={{ border: "none" }} onChange={formValueChange}></Form.Control>
                      <i className="fas fa-eye" onClick={() => changeType()}></i>
                    </div>
                  </Col>

                  <div className="mt-3 text-center">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </Row>
              </Form>
              
            </Col>
          </Row>
        </Container>
      </section >
    </>
  )
}

export default EditorProfile
