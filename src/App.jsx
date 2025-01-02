import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Pages/Signup/SignupMain";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainHome from "./Pages/Home/MainHome";
import AddJobs from "./Adminside/Jobs/AddJobs";
// import NavBaar from './Components/Navbar';
import JobProvider from "./ContextApi/JobsProvider";
import SignIn from "./Pages/SignIn/SignInMain";
import AdminPanel from "./Adminside/AdminPanel";
import PostedJobs from "./Adminside/Jobs/PostedJobs";
import JobCountryProvider from "./ContextApi/JobCountryProvider";
import UserProvider from "./ContextApi/UserProvider";
import Jobs from "./Pages/Jobs/Jobs";
import JobDetail from "./Pages/Jobs/JobDetail";
import Interview from "./Pages/Interview/Interview";
import Services from "./Pages/Services/Services";
import Resources from "./Pages/Resources/Resources";
import Blogs from "./Pages/Blogs/Blogs";
import HiringGuide from "./Pages/HiringGuide";
import JobsByCity from "./Pages/Jobs/JobsByCity";
import JobsByIndustry from "./Pages/Jobs/JobsByIndustry";
import CountryWiseJobs from "./Pages/Jobs/CountryWiseJobs";
import InterviewTips from "./Pages/Interview/InterviewTips";
import Userdashboard from "./Userside/Userdashboard";
// import Profile from "./Userside/Profile";
import SavedJobs from "./Userside/SavedJobs";
import AppliedJobs from "./Userside/AppliedJobs";
import Resume from "./Userside/Resume";
import JobPortalNavbar from "./Components/JobPortalNavbar";
import JobApplyProvider from "./ContextApi/JobApplyProvider";
import CoursePage from "./Pages/Courses/CoursePage";
import CourseProvider from "./ContextApi/CourseProvider";
import CategoryProvider from "./ContextApi/CategoryProvider";
import Addcourse from "./Adminside/Course/Addcourse";
import Categories from "./Adminside/Category/AddCategories";
import JobsByCategory from "./Pages/Jobs/JobsByCategory";
import WorkFromHomeJobs from "./Pages/Jobs/WorkFromHomeJobs";
import AddBlog from "./Adminside/Blog/AddBlog";
import AddBlogCategory from "./Adminside/Blog/BlogCategory";
import AllBlogPosts from "./Adminside/Blog/AllBlogPosts";
import AllBlogCategory from "./Adminside/Blog/AllBlogCategory";
import MyProvider from "./ContextApi/MyProvider";
import BlogDetail from "./Pages/Blogs/BlogDetail";
// import JobApplications from './Adminside/JobApply/JobApplications';
import Coursedetail from "./Pages/Courses/Coursedetail";
import Dashboard from "./Adminside/Dashboard";
import Footer from "./Components/Footer";
import KSALaborLaw from "./Pages/Resources/KSALaborLaw";
import QatarLaborLaw from "./Pages/Resources/QatarLaborLaw";
import BehrainLaborLaw from "./Pages/Resources/BehrainLaborLaw";
import TextResume from "./Pages/Services/TextResume";
import VisualResume from "./Pages/Services/VisualResume";
import JobApplications from "./Adminside/Applied Jobs/JobApplications";
import UserPanelDashboard from "./Userside/UserPanelDashboard";
import EmployerPanel from "./Employer/EmployerPanel";
import AllReviews from "./Adminside/Reviews/AllReviews";
import ReviewProvider from "./ContextApi/ReviewProvider";
import WriteYourReview from "./Pages/Home/WriteYourReview";
import ShareInterviewAdvice from "./Pages/Home/ShareInterviewAdvice";
import ContributeSalary from "./Pages/Home/ContributeSalary";
import PostAJob from "./Employer/PostAJob";
import EmployerPostedJobs from "./Employer/EmployerPostedJobs";
import Scrolltop from "./Components/ScrollTop";
import AdviceProvider from "./ContextApi/AdviceProvider";
import AllAdvices from "./Adminside/Interview Advices/AllAdvices";
import AllBlogsPage from "./Pages/Blogs/AllBlogsPage";
import AllCoursesPage from "./Pages/Courses/AllCoursesPage";
import JobSeeker from "./Pages/Job Seeker/JobSeeker";
import JobSeekerDetail from "./Pages/Job Seeker/JobSeekerDetail";
import JobSeekerProvider from "./ContextApi/JobSeekerProvider";
import AllJobSeekers from "./Adminside/Job Seekers/AllJobSeekers";
import ViewJobSeeker from "./Adminside/Job Seekers/ViewJobSeeker";
import ResumeMaker from "./Pages/Services/ResumeMaker";
import JobSeekerPostPage from "./Userside/JobSeakerPost";
import InterviewScheduler from "./Pages/Interview/InterviewScheduler";
import MarketResearchReports from "./Pages/Resources/MarketResearchReports";
import PublicHolidays from "./Pages/Resources/PublicHolidays";
import ProfessionalEvents from "./Pages/Resources/ProfessionalEvents";
import OmanLaborLaws from "./Pages/Resources/OmanLaborLaws";
import KuwaitLaborLaws from "./Pages/Resources/KuwaitLaborLaws";
import Employer from "./Adminside/Users/Employer";
import JobSeekerUser from "./Adminside/Users/JobSeeker";
import AddUser from "./Adminside/Users/AddUser";
import ManageJobSeekerPosts from "./Userside/ManageJobSeekerPosts";
import CreateResume from "./Userside/ResumeMaker";
import ResumeProvider from "./ContextApi/ResumeProvider";
import AllResumes from "./Adminside/Resume/AllResumes";
import ResourcesProvider from "./ContextApi/ResourcesProvider";
import ResourceCatProvider from "./ContextApi/ResourceCatProvider";
import AddResource from "./Adminside/Resources/AddResource";
import AddResourceCat from "./Adminside/Resources/AddResourceCat";
import AllResource from "./Adminside/Resources/AllResource";
import AllResourceCat from "./Adminside/Resources/AllResourceCat";
import ResourcesPage from "./Pages/Resource Content/Resources";
import ResourceDetail from "./Pages/Resource Content/ResourceDetail";
import JobCatProvider from "./ContextApi/JobCatProvider";
import JobIndProvider from "./ContextApi/JobIndProvider";
import AddJobCat from "./Adminside/Jobs/AddJobCat";
import AddJobInd from "./Adminside/Jobs/AddJobInd";
import AllJobCat from "./Adminside/Jobs/AllJobCat";
import AllJobIndustries from "./Adminside/Jobs/AllJobIndustries";
import Premium from "./Pages/Services/Premium";
import AddInterviewCat from "./Adminside/Manage Interviews/AddInterviewCat";
import AddInterviewItem from "./Adminside/Manage Interviews/AddInterviewItem";
import InterviewProvider from "./ContextApi/InterviewProvider";
import InterviewCatProvider from "./ContextApi/InterviewCatProvider";
import AllInterviewItems from "./Adminside/Manage Interviews/AllInterviewItems";
import InterviewDetails from "./Pages/Interviews Content/InterviewDetails";
import AddServiceCat from "./Adminside/Manage Services/AddServiceCat";
import AddServiceItem from "./Adminside/Manage Services/AddServiceItem";
import ServicesProvider from "./ContextApi/ServicesProvider";
import ServicesCatProvider from "./ContextApi/ServicesCatProvider";
import AllServiceCats from "./Adminside/Manage Services/AllServiceCats";
import AllServicesItems from "./Adminside/Manage Services/AllServicesItems";
import ServicesDetails from "./Pages/Services Content/ServicesDetails";
import Employers from "./Pages/Find Employers/Employers";
import EmployerDetails from "./Pages/Find Employers/EmployerDetails";
import AllInterviewCats from "./Adminside/Manage Interviews/AllInterviewCats";
import EmployerDashboard from "./Employer/EmployerDashboard";
import EmployerJobApplications from "./Employer/EmployerJobApplications";
import PostedJobsByEmployer from "./Adminside/Jobs/PostedJobsByEmployer";
import PendingPosts from "./Userside/PendingPosts";
import PendingJobSeekers from "./Adminside/Job Seekers/PendingJobSeekers";
import RejectedJobs from "./Adminside/Jobs/RejectedJobs";
import EmployerPendingJobs from "./Employer/EmployerPendingJobs";
import EmployerRejectedJobs from "./Employer/EmployerRejectedJobs";
import SystemUsers from "./Adminside/Users/SystemUsers";
import EditorDashboard from "./Editor/EditorDashboard";
import EditorPanel from "./Editor/EditorPanel";
import EditorProfile from "./Editor/EditorProfile";
import EditorAllJobCats from "./Editor/EditorAllJobCats";
import EditorAllJobInds from "./Editor/EditorAllJobInds";
import AddJobByEditor from "./Editor/AddJobByEditor";
import EditorPostedJobs from "./Editor/EditorPostedJobs";
import PendingAppliedJobs from "./Adminside/Applied Jobs/PendingAppliedJobs";
import AddReview from "./Adminside/Reviews/AddReview";
import EditorPendingJobs from "./Editor/EditorPendingJobs";
import EditorRejecetedJobs from "./Editor/EditorRejecetedJobs";
import RejectedJobSeekerPosts from "./Userside/RejectedJobSeekerPosts";
import UserContext from "./ContextApi/UserContext";
import { useContext } from "react";
import JobConProvider from "./ContextApi/JobConProvider";
import AllJobCountry from "./Adminside/Jobs/AllJobCountry";
import JobCityProvider from "./ContextApi/JobCityProvider";
import AllJobCities from "./Adminside/Jobs/AllJobCities";
import EditorAllContries from "./Editor/EditorAllContries";
import EditorAllJobCities from "./Editor/EditorAllJobCities";
import About from "./Pages/AIG Pages/About";
import Contact from "./Pages/AIG Pages/Contact";
import PrivacyPolicy from "./Pages/AIG Pages/PrivacyPolicy";
import TermsAndConditions from "./Pages/AIG Pages/TermsAndConditions";
import Profile from "./Userside/Profile";
import ProfileEmployer from "./Employer/EmployerProfile";
import AllJobCountries from "./Employer/AllJobCountries";
import AllCities from "./Employer/AllCities";
import EmployerAllJobCat from "./Employer/AllJobCat";
import EmployerAllJobInd from "./Employer/AllJobIndustries";
import PdfCvProvider from "./ContextApi/PdfCvProvider";
import PdfCv from "./Adminside/Resume/PdfCv";
import { HelmetProvider } from "react-helmet-async";

function App() {

  return (
    <>
      <Router>
        <JobProvider>
          <JobCountryProvider>
            <UserProvider>
              <JobApplyProvider>
                <CourseProvider>
                  <CategoryProvider>
                    <MyProvider>
                      <ReviewProvider>
                        <AdviceProvider>
                          <JobSeekerProvider>
                            <ResumeProvider>
                              <ResourcesProvider>
                                <ResourceCatProvider>
                                  <JobCatProvider>
                                    <JobIndProvider>
                                      <InterviewProvider>
                                        <InterviewCatProvider>
                                          <ServicesProvider>
                                            <ServicesCatProvider>
                                              <JobConProvider>
                                                <JobCityProvider>
                                                  <PdfCvProvider>
                                                    <HelmetProvider>
                                                  <JobPortalNavbar />
                                                  <Scrolltop />
                                                  <AllRoutes />
                                                  <Footer />
                                                  </HelmetProvider>
                                                  </PdfCvProvider>
                                                </JobCityProvider>
                                              </JobConProvider>
                                            </ServicesCatProvider>
                                          </ServicesProvider>
                                        </InterviewCatProvider>
                                      </InterviewProvider>
                                    </JobIndProvider>
                                  </JobCatProvider>
                                </ResourceCatProvider>
                              </ResourcesProvider>
                            </ResumeProvider>
                          </JobSeekerProvider>
                        </AdviceProvider>
                      </ReviewProvider>
                    </MyProvider>
                  </CategoryProvider>
                </CourseProvider>
              </JobApplyProvider>
            </UserProvider>
          </JobCountryProvider>
        </JobProvider>
      </Router >
    </>
  );
}

function AllRoutes() {
  const { signUser } = useContext(UserContext)

  const mainRoutes = [
    { path: "/", module: <MainHome /> },
    { path: "/sign-up", module: <Signup /> },
    { path: "/about", module: <About /> },
    { path: "/contact", module: <Contact />},
    { path: "/privacy-policy", module: <PrivacyPolicy />},
    { path: "/terms-and-conditions", module: <TermsAndConditions />},
    { path: "/interviews", module: <Interview /> },
    { path: "/interview-scheduler", module: <InterviewScheduler /> },
    { path: "/interview-tips-and-tricks", module: <InterviewTips /> },
    { path: "/services", module: <Services /> },
    { path: "/text-resume-writing", module: <TextResume /> },
    { path: "/visual-resume-writing", module: <VisualResume /> },
    { path: "/upgrade", module: <Premium /> },
    { path: "/resume-maker-services", module: <ResumeMaker /> },
    { path: "/courses", module: <CoursePage /> },
    { path: "/course-details/:title", module: <Coursedetail /> },
    { path: "/resources", module: <Resources /> },
    { path: "/market-research-reports", module: <MarketResearchReports /> },
    { path: "/public-holidays", module: <PublicHolidays /> },
    { path: "/professional-events", module: <ProfessionalEvents /> },
    { path: "/saudi-arabia-labor-laws", module: <KSALaborLaw /> },
    { path: "/oman-labor-laws", module: <OmanLaborLaws /> },
    { path: "/kuwait-labor-laws", module: <KuwaitLaborLaws /> },
    { path: "/qatar-labor-laws", module: <QatarLaborLaw /> },
    { path: "/behrain-labor-laws", module: <BehrainLaborLaw /> },
    { path: "/blog", module: <Blogs /> },
    { path: "/blog/:postSlug", module: <BlogDetail /> },
    { path: "/hiring-guides", module: <HiringGuide /> },
    { path: "/sign-in", module: <SignIn /> },
    { path: "/write-your-review", module: <WriteYourReview /> },
    { path: "/interview-advice", module: <ShareInterviewAdvice /> },
    { path: "/contribute-salary", module: <ContributeSalary /> },
    { path: "/all-courses", module: <AllCoursesPage /> },
    { path: "/all-blogs", module: <AllBlogsPage /> },
    { path: "/job-seekers", module: <JobSeeker /> },
    { path: "/job-seeker-detail/:title", module: <JobSeekerDetail /> },
    { path: "/find-employers", module: <Employers /> },
    { path: "/employer-details/:title", module: <EmployerDetails /> },
    { path: "/all-resources-page", module: <ResourcesPage /> },
    { path: "/resource-detail/:slug", module: <ResourceDetail /> },
    { path: "/interviews/:slug", module: <InterviewDetails /> },
    { path: "/services/:slug", module: <ServicesDetails /> },
  ];
  const adminRoutes = [
    {
      path: "/adminPanel",
      module: <AdminPanel />,
      subPaths: [
        { path: "dashboard", module: <Dashboard /> },
        { path: "employers", module: <Employer /> },
        { path: "job-seeker", module: <JobSeekerUser /> },
        { path: "system-users", module: <SystemUsers /> },
        { path: "pending-job-seekers", module: <PendingJobSeekers /> },
        { path: "add-user", module: <AddUser /> },
        { path: "add-jobs", module: <AddJobs /> },
        { path: "posted-jobs", module: <PostedJobs /> },
        { path: "job-requests", module: <PostedJobsByEmployer /> },
        { path: "rejected-jobs", module: <RejectedJobs /> },
        { path: "add-jobs-category", module: <AddJobCat /> },
        { path: "all-job-categories", module: <AllJobCat /> },
        { path: "add-jobs-industry", module: <AddJobInd /> },
        { path: "all-job-industries", module: <AllJobIndustries /> },
        { path: "all-job-countries", module: <AllJobCountry /> },
        { path: "all-job-cities", module: <AllJobCities /> },
        { path: "add-course", module: <Addcourse /> },
        { path: "course-category", module: <Categories /> },
        { path: "add-blog", module: <AddBlog /> },
        { path: "add-blog-category", module: <AddBlogCategory /> },
        { path: "all-blog-posts", module: <AllBlogPosts /> },
        { path: "all-blog-category", module: <AllBlogCategory /> },
        { path: "job-applications", module: <JobApplications /> },
        { path: "pending-job-applications", module: <PendingAppliedJobs /> },
        { path: "all-reviews", module: <AllReviews /> },
        { path: "add-review", module: <AddReview /> },
        { path: "interview-advices", module: <AllAdvices /> },
        { path: "job-seeker-posts", module: <AllJobSeekers /> },
        { path: "view-job-seeker", module: <ViewJobSeeker /> },
        { path: "all-resumes", module: <AllResumes /> },
        { path: "uploaded-cv", module: <PdfCv /> },
        { path: "add-resource", module: <AddResource /> },
        { path: "add-resource-category", module: <AddResourceCat /> },
        { path: "all-resources", module: <AllResource /> },
        { path: "all-resources-categories", module: <AllResourceCat /> },
        { path: "add-interview-category", module: <AddInterviewCat /> },
        { path: "add-interview-item", module: <AddInterviewItem /> },
        { path: "all-interview-items", module: <AllInterviewItems /> },
        { path: "all-interview-categories", module: <AllInterviewCats /> },
        { path: "add-services-category", module: <AddServiceCat /> },
        { path: "add-service-item", module: <AddServiceItem /> },
        { path: "all-service-categories", module: <AllServiceCats /> },
        { path: "all-service-items", module: <AllServicesItems /> },
      ],
    }
  ];
  const editorRoutes = [
    {
      path: "/editor-panel",
      module: <EditorPanel />,
      subPaths: [
        { path: "dashboard", module: <EditorDashboard /> },
        { path: "my-profile", module: <EditorProfile /> },
        { path: "job-categories", module: <EditorAllJobCats /> },
        { path: "job-industries", module: <EditorAllJobInds /> },
        { path: "job-countries", module: <EditorAllContries /> },
        { path: "job-cities", module: <EditorAllJobCities /> },
        { path: "add-job", module: <AddJobByEditor /> },
        { path: "editor-posted-jobs", module: <EditorPostedJobs /> },
        { path: "editor-pending-jobs", module: <EditorPendingJobs /> },
        { path: "editor-rejected-jobs", module: <EditorRejecetedJobs /> },
      ],
    }
  ];
  const jobSeekerRoutes = [
    {
      path: "/user-panel",
      module: <Userdashboard />,
      subPaths: [
        { path: "dashboard", module: <UserPanelDashboard /> },
        { path: "my-profile", module: <Profile /> },
        { path: "saved-jobs", module: <SavedJobs /> },
        { path: "applied-jobs", module: <AppliedJobs /> },
        { path: "my-resume", module: <Resume /> },
        { path: "create-resume", module: <CreateResume /> },
        { path: "Job-seeker-post", module: <JobSeekerPostPage /> },
        { path: "manage-Job-seeker-posts", module: <ManageJobSeekerPosts /> },
        { path: "pending-posts", module: <PendingPosts /> },
        { path: "rejected-posts", module: <RejectedJobSeekerPosts /> },
      ],
    }
  ];
  const employerRoutes = [
    {
      path: "/employer-panel",
      module: <EmployerPanel />,
      subPaths: [
        { path: "dashboard", module: <EmployerDashboard /> },
        { path: "employer-profile", module: <ProfileEmployer /> },
        { path: "employer-job-post", module: <PostAJob /> },
        { path: "employer-posted-jobs", module: <EmployerPostedJobs /> },
        { path: "pending-jobs", module: <EmployerPendingJobs /> },
        { path: "rejected-jobs", module: <EmployerRejectedJobs /> },
        { path: "job-applications", module: <EmployerJobApplications /> },
        { path: "add-jobs-category", module: <AddJobCat /> },
        { path: "add-jobs-industry", module: <AddJobInd /> },
        { path: "all-job-categories", module: <EmployerAllJobCat /> },
        { path: "all-job-industries", module: <EmployerAllJobInd /> },
        { path: "all-job-countries", module: <AllJobCountries /> },
        { path: "all-job-cities", module: <AllCities /> },
      ],
    }
  ]; 

  return (
    <>
      <Routes>
        {mainRoutes &&
          mainRoutes.map((routes, index) => {
            return (
              <Route
                key={index}
                path={routes.path}
                element={routes.module}
              />
            );
          })}
          <Route path="/jobs" element={<Jobs />}>
          <Route path="job-detail/:id" element={< JobDetail />} />
        </Route>
        <Route path="/remote-jobs" element={<WorkFromHomeJobs />}>
          <Route path="job-detail/:id" element={< JobDetail />} />
        </Route>
        <Route path="/jobs-by-country" element={<CountryWiseJobs />}>
          <Route path="job-detail/:id" element={< JobDetail />} />
        </Route>
        <Route path="/jobs-by-category" element={<JobsByCategory />}>
          <Route path="job-detail/:id" element={< JobDetail />} />
        </Route>
        <Route path="/jobs-by-city" element={<JobsByCity />}>
          <Route path="job-detail/:id" element={< JobDetail />} />
        </Route>
        <Route path="/jobs-by-industry" element={<JobsByIndustry />}>
          <Route path="job-detail/:id" element={< JobDetail />} />
        </Route>
        {signUser?.role === "Admin" && (
          adminRoutes &&
          adminRoutes.map((routes, index) => (
            <Route
              key={index}
              path={routes.path}
              element={routes.module}
            >
              {routes.subPaths.map((routes, index) => (
                <Route
                  key={index}
                  path={routes.path}
                  element={routes.module}
                />
              ))}
            </Route>
          ))
        )}
        {signUser?.role === "Editor" && (
          editorRoutes &&
          editorRoutes.map((routes, index) => (
            <Route
              key={index}
              path={routes.path}
              element={routes.module}
            >
              {routes.subPaths.map((routes, index) => (
                <Route
                  key={index}
                  path={routes.path}
                  element={routes.module}
                />
              ))}
            </Route>
          ))
        )}
        {signUser?.role === "Employer" && (
          employerRoutes &&
          employerRoutes.map((routes, index) => (
            <Route
              key={index}
              path={routes.path}
              element={routes.module}
            >
              {routes.subPaths.map((routes, index) => (
                <Route
                  key={index}
                  path={routes.path}
                  element={routes.module}
                />
              ))}
            </Route>
          ))
        )}
        {signUser?.role === "Job Seaker" && (
          jobSeekerRoutes &&
          jobSeekerRoutes.map((routes, index) => (
            <Route
              key={index}
              path={routes.path}
              element={routes.module}
            >
              {routes.subPaths.map((routes, index) => (
                <Route
                  key={index}
                  path={routes.path}
                  element={routes.module}
                />
              ))}
            </Route>
          ))
        )}

      </Routes>
    </>
  )
}

export default App;
