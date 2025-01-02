import { useState } from "react"
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";

function ShareInterviewAdvice() {
  const apiUrl = import.meta.env.VITE_API_URL;
const [interAdvice, setInterAdvice] = useState({
    name: "",
    email: "",
    advice: ""
})

const addAdvice = async (e) => {
    e.preventDefault();
    const {name, email, advice} = interAdvice;
    console.log(name,email,advice);
    
    const res = await fetch(`${apiUrl}/api/advice/addAdvice`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({name, email,advice})
    });
    const data = await res.json()
    const userFormError = document.getElementById("userFormError");
    data.message !== undefined 
    ? (userFormError.innerText = data.message) :
    (userFormError.innerText = "");
    if (res.ok){
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your advice added successfully!",
            showConfirmButton: false,
            timer: 1500
          });
          setInterAdvice({
            name: "",
            email: "",
            advice: ""
          })
    }

}

const adviceForm = [
    {
      name: "name",
      val: interAdvice.name,
      type: "text",
      placeH: "Name",
      conId: "floatingInput",
      lab: "Name",
    },
    {
      name: "email",
      val: interAdvice.email,
      type: "email",
      placeH: "name@example.com",
      conId: "floatingInput",
      lab: "Email",
    },
    {
        name: "advice",
        val: interAdvice.message,
        type: "textarea",
        placeH: "Your Advice",
        conId: "floatingInput",
        lab: "Your Advice",
      },
]

const formValueChange = (e) => {
    if (e.target.files) {
        setInterAdvice({ ...interAdvice, userImage: e.target.files[0] });
    } else {
        setInterAdvice({ ...interAdvice, [e.target.name]: e.target.value });
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
          <h2>Lets Help The Freshers</h2>
          <p className="m-0 mb-3 text-white">Want to make potential employees feel less stressed? Guide them with your precious and full of experience advices on how they can ace an interview.</p>
        </div>
        <div id="userFormError" className="text-danger"></div>
            <Form
              onSubmit={addAdvice}
              className="admin-form"
              style={{ backgroundColor: "transparent", boxShadow: "none" }}
            >
              {adviceForm &&
                adviceForm.map((user, index) => {
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
                Submit Advice
              </Button>
            </Form>
        </Col>
        </Row>
          </Container>
        </div> 
      </section>
    </>
  )
}

export default ShareInterviewAdvice
