import { Col, Container, Row } from "react-bootstrap"


function KSALaborLaw() {
  return (
    <>
      <section className="job-head">
        <div className="page-head-overlay">
          <Container>
            <Row className="justify-content-center align-items-center py-6">
              <Col md={9}>
                <h2 className="text-center text-white fw-bold">
                  KSA Labor Laws
                </h2>
              </Col>
            </Row>
          </Container>
        </div>
      </section>


      <section className="py-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col>
              <div className="section-head">
                <h2 className="text-primary">Key Elements of KSA Labor Laws
                </h2>
              </div>
              <p>
                {" "}
                The Kingdom of Saudi Arabia frequently updates its labor laws to align with national goals and global labor standards. Understanding these laws is essential for both employees and employers to maintain a lawful, respectful, and productive working relationship. Whether you are currently working in Saudi Arabia or planning to join the workforce, being aware of your rights and obligations under Saudi labor law empowers you to navigate your employment journey with confidence.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="resources py-4" style={{backgroundColor: "#f1f3f5"}}>
        <Container>
          <Row>
            <Col>
            <div className="section-head text-center">
              <h2 className="text-primary">KSA Labor Laws</h2>
            <p>Saudi Arabia’s labor laws are designed to balance the rights and responsibilities of both employees and employers, fostering a fair and compliant workplace. The Kingdom has made significant strides in enhancing worker protections and creating a more transparent employment environment. Understanding these regulations is essential for anyone working in Saudi Arabia, as they cover important aspects such as contracts, wages, leave entitlements, and workplace safety.</p>
            </div>
            <Row className="mt-4">
              <Col md={6} className="country-labor-law">
              <div>
                <h5>1. Employment Contracts and Documentation</h5>
                <p>In Saudi Arabia, every employee must have a written employment contract that clearly defines their role, terms of service, salary, and benefits. These contracts should be transparent and mutually agreed upon by both parties, detailing any specific job conditions. Contracts are binding under Saudi labor laws, and any modifications must be documented and agreed to in writing by the employee.</p>
              </div>
              <div>
                <h5>2. Working Hours and Overtime Regulations</h5>
                <p>The standard workweek in Saudi Arabia is typically 48 hours, or 8 hours per day, spanning six days. During Ramadan, working hours for Muslim employees are reduced to six hours per day. Any work exceeding these hours qualifies as overtime, which is compensated at 150% of the regular hourly wage. Employers must obtain prior consent from employees for overtime work, except in urgent situations.</p>
              </div>
              <div>
                <h5>3. ages and Payment Requirements</h5>
                <p>Saudi labor laws stipulate that wages should be paid on time, generally on a monthly basis, through bank transfers. The Ministry of Human Resources and Social Development (MHRSD) monitors wage payments through the Wage Protection System to ensure timely and fair compensation. Any deductions from wages must be justified and in line with legal guidelines, with prior notice to the employee.</p>
              </div>
              </Col>
              <Col md={6} className="">
              <div>
                <h5>4. Annual, Sick, and Special Leave Entitlements</h5>
                <p>Employees in Saudi Arabia are entitled to 21 days of paid annual leave after completing one year of service, which increases to 30 days after five years of employment. Sick leave is also granted according to medical certification, with a maximum of 120 days of leave in a year. Additionally, employees can access special leave for family emergencies, Hajj pilgrimage, and maternity, with specific durations outlined by law.</p>
              </div>
              <div>
                <h5>5. End-of-Service Benefits and Gratuity</h5>
                <p>KSA labor laws entitle employees to end-of-service benefits based on the length of their employment. This gratuity, calculated at half a month’s salary for each of the first five years and a full month’s salary for each year thereafter, provides financial support to employees upon completion of their contract or resignation after two years of service. It’s a valuable benefit that ensures employees are compensated for their long-term commitment to their workplace.</p>
              </div>
              <div>
                <h5>6. Health and Safety Standards</h5>
                <p>Employers in Saudi Arabia are required to maintain a safe and healthy work environment for all employees. The law mandates adequate safety measures, emergency procedures, and access to medical care in case of work-related injuries. Companies must provide regular training on safety protocols, especially in sectors with higher occupational risks, to ensure employees well-being. </p>
              </div>
              <div>
                <h5>7. Dispute Resolution and Employee Rights</h5>
                <p>Saudi Arabia offers a structured process for resolving disputes between employees and employers. Employees can file complaints with the Ministry of Human Resources and Social Development if they believe their rights have been violated.  </p>
              </div>
              </Col>
            </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default KSALaborLaw
