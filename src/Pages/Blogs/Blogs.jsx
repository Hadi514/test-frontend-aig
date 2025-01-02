import { useContext } from "react";
import { Link } from "react-router-dom";
import MyContext from "../../ContextApi/MyContext";
import { Col, Container, Row } from "react-bootstrap";

export default function Blogs() {
  const { filterPosts, posts, uniqueCategory, setCategory } = useContext(MyContext)

  return (
    <div className="ps-0" style={{ overflowX: "hidden" }}>

<section className="job-head">
        <div className="page-head-overlay">
          <Container>
            <Row className="justify-content-center align-items-center py-6">
              <Col md={9}>
                <h2 className="text-center text-white fw-bold">
                  Explore Our Articles
                </h2>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      <div className="row mt-3 d-flex justify-content-between">
        <div className="col-md-3">
          <div
          >
            <div className="pb-3 pt-2 outlet">
              {posts &&
                [...uniqueCategory].map((category) => {
                  return (
                    <div className="text-dark px-2" key={category}>
                      <button
                        className="btn btn-outline-primary w-100 text-dark mt-2"
                        onClick={() => setCategory(category)}
                      >
                        <div className="d-flex justify-content-start">
                          <div>
                            <span
                              className="text-dark ms-2"
                            >
                              {category}
                            </span>
                          </div>
                        </div>
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="container">
            
            <div className="row">
              {filterPosts.map((post) => (
                <div className="col-md-4 col-12 mt-3 mb-3" key={post._id}>
                  <Link style={{ textDecoration: "none" }} to={`/blog/${post.slug}`}>
                    <div className="card h-100">
                      <div className="card-body">
                        <p className="card-title" style={{ fontSize: "20px", fontWeight: "normal", color: "initial" }}>
                          {post.title.length > 40 ? post.title.slice(0, 40) + "..." : post.title}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
