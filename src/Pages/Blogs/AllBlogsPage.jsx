import { useContext } from "react"
import MyContext from "../../ContextApi/MyContext"
import { Link } from "react-router-dom"
import { Col, Container, Row } from "react-bootstrap"

export default function AllBlogsPage() {
    const { posts } = useContext(MyContext)
    return (
        <>
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
      
            <div className="container">
                <div className="row mt-3 d-flex justify-content-between">
                    <div className="col-md-12">
                        <div className="container">
                            <div className="row">
                                {posts.map((post) => (
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
        </>
    )
}