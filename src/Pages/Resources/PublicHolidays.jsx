import { Col, Container, Row } from "react-bootstrap"

function PublicHolidays() {
  return (
    <>
      <section className="job-head">
        <div className="page-head-overlay">
          <Container>
            <Row className="justify-content-center align-items-center py-6">
              <Col md={9}>
                <h2 className="text-center text-white fw-bold">
                  Public Holidays
                </h2>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      <section className="qatar-labor py-5" style={{backgroundColor: '#f5f5f5'}}>
        <Container>
        <Row>
            <Col>
            <div className="section-head">
                <h2 className="text-primary">
                Celebrating Together, Observing Traditions  
                </h2>
                <p>Public holidays are more than just a break from the routine—they are days set aside to honor cultural traditions, national achievements, and shared values. Observing these days together brings people closer, creating moments to celebrate, reflect, and reconnect with loved ones.</p>
            </div>
            <div className="section-head">
                <h3 className="">
                Why Public Holidays Matter  
                </h3>
            </div>
                <p>Public holidays hold a special place in society, each day marking a meaningful event, historical milestone, or cultural tradition. They give us time to pause, express gratitude, and pay tribute to the values that unite us as a community. These occasions are also opportunities to relax, recharge, and enjoy quality time with family and friends. From New Year’s Day to Independence Day, each holiday carries its own spirit, customs, and significance.</p>

            <div className="laws">
                <h5>
                Upcoming Public Holidays
                </h5>
            </div>
                <p>Stay informed on the upcoming public holidays so you can make the most of each special day. Planning ahead allows you to organize travel, gatherings, or simply enjoy a relaxing break. Here’s a quick look at some important public holidays observed annually:</p>
                <ul style={{lineHeight: '2'}}>
                    <li><span className="fw-bold">New Year’s Day:</span> A time to start fresh, make resolutions, and celebrate the beginning of a new year.</li>
                    <li><span className="fw-bold">Labor Day: </span> Honoring the contributions and achievements of workers, with parades, events, and gatherings.</li>
                    <li><span className="fw-bold">Independence Day:</span> Celebrating national pride, unity, and the freedom fought for by generations before us.</li>
                    <li><span className="fw-bold">Religious and Cultural Holidays:</span> Days like Christmas, Eid, Diwali, and more allow people of various faiths to celebrate their beliefs and practices.</li>
                    <li><span className="fw-bold">National Heroes’ Days:</span> Special days set aside to remember the sacrifices and contributions of influential leaders and heroes.</li>
                </ul>
                <div className="section-head">
                <h3 className="">
                Plan Ahead for Your Next Holiday  
                </h3>
                <p>With a clear view of upcoming public holidays, you can make the most of your time, whether it’s planning a family trip, hosting a festive gathering, or simply enjoying a quiet day off. Public holidays offer a chance to step back, appreciate the good things in life, and make memories that last.</p>
            </div>

            </Col>
        </Row>
        </Container>
      </section>
    </>
  )
}

export default PublicHolidays
