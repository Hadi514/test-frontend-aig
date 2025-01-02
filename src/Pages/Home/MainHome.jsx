import EmployeeAndEmployer from "./EmployeeAndEmployer";
import EnhanceCareer from "./EnhanceCareer";
import HeroSection from "./HeroSection";
// import InterviwePrep from "./InterviwePrep";
import JobByField from "./JobByField";
import JobsByCountry from "./JobsByCountry";
import Testimonials from '../../Components/Testimonials';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReviewSection from "./ReviewSection";

function MainHome() {
  return (
    <>
      <HeroSection />
      <JobByField />
      <EmployeeAndEmployer />
      <JobsByCountry />
      {/* <InterviwePrep /> */}
      <ReviewSection />
      <EnhanceCareer />
      <Testimonials />
      
    </>
  );
}

export default MainHome;
