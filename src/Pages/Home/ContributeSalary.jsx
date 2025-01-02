import { Col, Container, Row } from "react-bootstrap";

function ContributeSalary() {
  return (
    <>
      <section className="job-head">
        <div className="page-head-overlay">
          <Container>
            <Row className="justify-content-center align-items-center py-6">
              <Col md={9}>
                <h2 className="text-center text-white fw-bold">
                  Contribute Salary
                </h2>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      <section className="py-5" style={{backgroundColor: "#f8f8f8"}}>
        <Container>
          <Row>
            <Col>
              <h2>Contribute Your Salary: Make a Difference Today</h2>
              <p>
                {" "}
                By contributing a portion of your salary, you can directly
                impact the lives of those in need, helping to fund essential
                programs and services that benefit our community. Your
                commitment can support initiatives in education, healthcare,
                food security, and more.
              </p>
              <h2>Why Contribute?</h2>
              <p>
                {" "}
                Every contribution, whether big or small, goes a long way toward
                creating a positive change. When you donate a part of your
                salary, you’re not just giving money—you’re providing
                opportunities, resources, and hope to individuals and families
                facing challenges.
              </p>
              <h2>How Your Contribution Helps?</h2>
              <p> Your contributions support a variety of programs aimed at:</p>
              <ul>
                <li>
                  <span className="fw-bold">Educational Resources:</span>{" "}
                  Providing books, school supplies, and scholarships.
                </li>
                <li>
                  <span className="fw-bold">Healthcare Access:</span> Funding
                  medical treatment, vaccinations, and health camps.
                </li>
                <li>
                  <span className="fw-bold">Food Security:</span> Ensuring
                  nutritious meals for vulnerable populations.
                </li>
                <li>
                  <span className="fw-bold">Community Development:</span>{" "}
                  Supporting projects that improve local infrastructure and
                  provide training for sustainable livelihoods.
                </li>
              </ul>
              <h2>Join Us in Building a Better Future</h2>
              <p>
                {" "}
                Whether it’s a one-time donation or a recurring contribution,
                your salary pledge can empower communities, transform lives, and
                pave the way for a brighter future. Consider contributing today
                and be part of a dedicated group of changemakers. Thank you for
                your generosity and commitment!
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default ContributeSalary;
