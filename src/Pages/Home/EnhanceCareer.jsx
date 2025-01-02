import { Card, Col, Container, Row } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faChalkboardTeacher, faFileAlt, faIdCard, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useContext } from "react";
import UserContext from "../../ContextApi/UserContext";

function EnhanceCareer() {
  const {signUser} = useContext(UserContext)

  const career = [
    {
        title: "Explore Courses", 
        icon: faChalkboardTeacher,
        path: "/courses"
    },
    {
        title: "Hiring Guides", 
        icon: faUserPlus,
        path: "/hiring-guides"
    },
    {
        title: "Resources", 
        icon: faIdCard ,
        path: "/resources"
    },
    {
        title: "Resume Maker", 
        icon: faFileAlt,
        path: signUser.role === "Job Seaker" ? "/user-panel/create-resume" : "/sign-in"
    },
]


  return (
    <>
      <section className="enhance-career px-4 py-4">
        <Container fluid>
            <h2 className='text-center mb-3'>Enhance Your Career</h2>
            <Row>
                {career && career.map((car, index) =>{
                    return <Col key={index} md={3}>
                    <Card className='border-0 bg-transparent' as={Link} to={car.path}>
                        <div className="career-card-content">
                            <FontAwesomeIcon icon={car.icon} size="3x" style={{color: 'var(--primary-color)'}}/>
                            <h6 className='mt-4' style={{textDecoration: 'none'}}>{car.title}</h6>
                        </div>
                    </Card>
                    </Col>
                })}
            </Row>
        </Container>
      </section>
    </>
  )
}

export default EnhanceCareer
