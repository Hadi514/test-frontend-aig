import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { Col, Container, Row } from 'react-bootstrap';

export default function InterviewDetails() {
  const { slug } = useParams()
  const [posts, setPosts] = useState({})
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const postData = async () => {
      await fetch(`${apiUrl}/api/interview/getInterview/${slug}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => setPosts(data));
    };
    postData();
  }, [slug]);
  
  const sanitizedContent = { __html: DOMPurify.sanitize(posts.content) };
  return (
    <div style={{backgroundColor: "#f8f8f8"}}>
      
      <section className="job-head">
        <div className="page-head-overlay">
          <Container>
            <Row className="justify-content-center align-items-center py-6">
              <Col md={9}>
                <h2 className="text-center text-white fw-bold">
                  {posts.title}
                </h2>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      <div className="container blog-container pb-2">
        <div className='mt-5' dangerouslySetInnerHTML={sanitizedContent}></div>
      </div>
    </div>
  )
}
