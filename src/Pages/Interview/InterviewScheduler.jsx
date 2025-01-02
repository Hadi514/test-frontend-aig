import { Col, Container, Row } from "react-bootstrap"

function InterviewScheduler() {
  return (
    <>
      <section className="job-head">
        <div className="page-head-overlay">
          <Container>
            <Row className="justify-content-center align-items-center py-6">
              <Col md={9}>
                <h2 className="text-center text-white fw-bold">
                  Schelue Your Interviews Hassle Free
                </h2>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      <section className="py-5" style={{backgroundColor: '#f1f3fa'}}>
        <Container>
            <Row>
                <Col>
                <div className="section-head">
                    <h2 className="text-primary">
                    Streamline Your Hiring Process with Our Interview Scheduler
                    </h2>
                </div>
                    <p className="m-0">Managing multiple candidate interviews can be time-consuming and challenging, but our Interview Scheduler tool simplifies the process, making it efficient and stress-free. Designed to save you time and reduce scheduling conflicts, the Interview Scheduler is your go-to solution for organizing interviews seamlessly. Whether you&apos;re coordinating with a single candidate or a panel of interviewers, this tool keeps everything in one place, making scheduling quick, clear, and accessible.</p>
                <div className="section-head mt-3">
                    <h3 className="">
                    Effortless Scheduling and Coordination
                    </h3>
                </div>
                    <p className="m-0">Our Interview Scheduler takes the complexity out of interview planning, enabling you to focus on selecting the best candidates without worrying about logistics. Here’s how it helps streamline scheduling:</p>
                    <ul style={{lineHeight: '2'}}>
                        <li><span className="fw-bold">Centralized Calendar View:</span> View all upcoming interviews in one calendar, making it easy to manage your schedule and avoid double-booking.</li>
                        <li><span className="fw-bold">Automated Notifications:</span> Send timely reminders and notifications to candidates and interviewers, keeping everyone informed and reducing missed appointments.</li>
                        <li><span className="fw-bold">Flexible Time Slots:</span> Offer a variety of time slots to candidates, allowing them to choose an interview time that suits their availability, reducing back-and-forth emails.</li>
                    </ul>
                <div className="section-head mt-3">
                    <h3 className="">
                    Seamless Collaboration with Teams
                    </h3>
                </div>
                    <p className="m-0">When multiple people are involved in the hiring process, coordinating interview schedules can be a challenge. Our Interview Scheduler is built to support collaborative hiring, making it easy for your team to work together effectively. Key features include:</p>
                    <ul style={{lineHeight: '2'}}>
                        <li><span className="fw-bold">Shared Access for Interviewers:</span> Allow team members to view, adjust, and confirm interview schedules, ensuring everyone stays on the same page.</li>
                        <li><span className="fw-bold">Role-Based Permissions:</span> Control access by assigning roles to team members, giving everyone the right level of involvement without compromising privacy.</li>
                        <li><span className="fw-bold">Interview Feedback Tracking:</span> Capture interviewer notes and feedback after each interview, enabling smooth follow-ups and informed hiring decisions.</li>
                    </ul>
                <div className="section-head mt-3">
                    <h3 className="">
                    Enhanced Candidate Experience
                    </h3>
                </div>
                    <p className="m-0">Creating a positive experience for candidates is crucial, and our Interview Scheduler helps ensure a smooth, professional experience from start to finish. Here’s how it contributes to candidate satisfaction:</p>
                    <ul style={{lineHeight: '2'}}>
                        <li><span className="fw-bold">Simple Scheduling Process:</span> Candidates can easily select available time slots, reducing scheduling conflicts and saving time for everyone.</li>
                        <li><span className="fw-bold">Automated Reminders:</span> Send reminders before the interview to minimize missed appointments and keep candidates informed.</li>
                        <li><span className="fw-bold">Easy Rescheduling:</span> If changes are necessary, candidates can quickly reschedule without the hassle, showing respect for their time and commitments.</li>
                    </ul>
                </Col>
            </Row>
        </Container>
      </section>
    </>
  )
}

export default InterviewScheduler
