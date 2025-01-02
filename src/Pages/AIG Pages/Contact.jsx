// import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import emailjs from '@emailjs/browser';

function Contact() {

  const [successMessage, setSuccessMessage] = useState("");
  const formRef = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    const form = formRef.current;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const number = form.number.value.trim();
    const message = form.message.value.trim();

    const nameI = document.getElementById("nameI");
    const emailI = document.getElementById("emailI");
    const customerno = document.getElementById("customerno");
    const subjectI = document.getElementById("subjectI");
    const messageI = document.getElementById("messageI");

    let hasError = false;

    if (!name) {
      nameI.innerText = "Please fill this field ";
      hasError = true;
    } else {
      nameI.innerText = "";
    }

    if (!email) {
      emailI.innerText = "Please fill this field ";
      hasError = true;
    } else {
      emailI.innerText = "";
    }
    if (!number) {
      customerno.innerText = "Please fill this field ";
      hasError = true;
    } else {
      customerno.innerText = "";
    }

    if (!subject) {
      subjectI.innerText = "Please fill this field ";
      hasError = true;
    } else {
      subjectI.innerText = "";
    }

    if (!message) {
      messageI.innerText = "Please fill this field ";
      hasError = true;
    } else {
      messageI.innerText = "";
    }

    if (hasError) {
      return;
    }

    emailjs
      .sendForm(
        "service_42tlu3f",
        "template_i66jjsi",
        formRef.current,
        "IS4D954-DxAOC9p8E"
      )

      .then(() => {
        formRef.current.reset();
        setSuccessMessage("Your Message Is Sent Successfully");
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      });
  };

  return (
    <div>
      <section className="job-head">
        <div className="page-head-overlay">
          <Container>
            <Row className="justify-content-center align-items-center py-6">
              <Col md={9}>
                <h2 className="text-center text-white fw-bold">
                 Contact Us
                </h2>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      <section className="contact-us-section pt-5">
        <div className="container">
          <div className="row">
            <div
              className="col-md-7"
              data-aos="fade-right"
              data-aos-offset="200"
              data-aos-duration="1200"
            >
              <h2 className="main-heading">Have A Query or Feedback to Share?</h2>
              <p className="mb-5">
              We’re here to help and would love to hear from you! Whether you have a question, suggestion, or feedback, don’t hesitate to reach out to us.
              </p>
              <div className="row justify-content-center align-items-center">
                <div className="col-md-6 col-6">
                  <div className="card contact-cards text-center">
                    <i className=" fas fa-envelope fa-2x"></i>
                    <p className="email"> jobs.aigofficial@gmail.com</p>
                  </div>
                </div>

                <div className="col-md-6 col-6">
                  <div className="card contact-cards text-center">
                    <i className="fas fa-phone fa-2x"></i>
                    <p className="phone">
                    +966 50 860 4182
                    </p>
                  </div>
                </div>
                <section className="text-center text-dark mt-4 mb-4">
                  <a
                    data-mdb-ripple-init
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline btn-floating m-1"
                    href="https://www.facebook.com"
                    role="button"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>

                  <a
                    data-mdb-ripple-init
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline btn-floating m-1"
                    href="https://twitter.com"
                    role="button"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>

                  <a
                    data-mdb-ripple-init
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline btn-floating m-1"
                    href="https://www.youtube.com"
                    role="button"
                  >
                    <i className="fab fa-youtube"></i>
                  </a>

                  <a
                    data-mdb-ripple-init
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline btn-floating m-1"
                    href="https://www.instagram.com"
                    role="button"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>

                  <a
                    data-mdb-ripple-init
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline btn-floating m-1"
                    href="https://www.linkedin.com"
                    role="button"
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </a>

                  
                </section>
              </div>
            </div>
            <div className="col-md-5" data-aos="fade-left" data-aos-offset="200" data-aos-duration="1200">
              <div className="row" data-aos="fade-up" data-aos-delay="100">
                <div className="col-md-12 mb-4">
                  <form
                    id="contactForm"
                    onSubmit={sendEmail}
                    ref={formRef}
                    className="contactform"
                  >
                    {successMessage && (
                      <div className="alert alert-info">{successMessage}</div>
                    )}

                    <div className="row">
                      <div className="col form-group">
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          id="name"
                          placeholder="Your Name"
                          required
                        />
                        <div id="nameI" style={{ color: "red" }}></div>
                      </div>
                      <div className="col form-group">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="Your Email"
                          required
                        />
                        <div id="emailI" style={{ color: "red" }}></div>
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="number"
                        id="customerno"
                        placeholder="Contact"
                        required
                      />
                      <div id="customerno" style={{ color: "red" }}></div>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="subject"
                        id="subject"
                        placeholder="Subject"
                        required
                      />
                      <div id="subjectI" style={{ color: "red" }}></div>
                    </div>
                    
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        name="message"
                        id="message"
                        rows="5"
                        placeholder="Message"
                        required
                      ></textarea>
                      <div id="messageI" style={{ color: "red" }}></div>
                    </div>
                    <div className="text-center">
                      <button type="submit">Send Message</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
