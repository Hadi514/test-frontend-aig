import { useEffect, useState } from "react";
import jobContext from "./JobContext";
import PropTypes from "prop-types";
import { Country } from "country-state-city";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function JobProvider({ children }) {
  const apiUrl = import.meta.env.VITE_API_URL;
    const [colAdjust, setColAdjust] = useState(12)
    const [postedJobsById, setPostedJobsById] = useState("")
  const navigate = useNavigate();
  const [jobTitle, setJobTitle] = useState("");
  const [jobCounting, setJobCounting] = useState("");
  const [companiesCounting, setCompaniesCounting] = useState("");
  const [postedJobs, setPostedJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [pendingJobs, setPendingJobs] = useState([]);
  const [rejectedJobs, setRejectedJobs] = useState([]);
  const [filterPostedJobs, setFilterPostedJobs] = useState([]);
  const [postedJobById, setPostedJobById] = useState([]);
  const [postedJobCountries, setPostedJobCountries] = useState([]);
  const [jobItems, setJobItems] = useState({
    title: "",
    country: "",
    industry: "",
    jobLocaType: "",
  });

  const allJobPosts = async () => {
    const res = await fetch(`${apiUrl}/api/jobPost/getJobs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setAllJobs(data);
    const filterPostJobs = data
      ?.filter((job) => job.status !== "Pending")
      .filter((job) => job.status !== "N");
    const filterPendingJobs = data?.filter((job) => job.status === "Pending");
    setPendingJobs(filterPendingJobs);
    const filterRejectedJobs = data?.filter((job) => job.status === "N");
    setRejectedJobs(filterRejectedJobs);
    setFilterPostedJobs(filterPostJobs);
    setPostedJobs(filterPostJobs);
  };
  // getCountryByCode(isoCode)
  const jobById = async (id) => {
    const jobByIdIs = allJobs?.find((job) => job._id === id);
    setPostedJobById(jobByIdIs);
  };

  const jobApproval = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/api/jobPost/acceptStatus/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Job approved successfully!",
          showConfirmButton: true,
        });
        await allJobPosts();
      } else {
        const errorData = await res.json();
        Swal.fire("Error", errorData.error || "Something went wrong!", "error");
      }
    } catch (error) {
      console.error("Error approving job:", error);
      Swal.fire(
        "Error",
        "Unable to approve job. Please try again later.",
        "error"
      );
    }
  };

  const jobRejection = async (id) => {
    try {
      const res = await fetch(`${apiUrl}/api/jobPost/rejectStatus/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Job rejected successfully!",
          showConfirmButton: true,
        });
        await allJobPosts();
      } else {
        const errorData = await res.json();
        Swal.fire("Error", errorData.error || "Something went wrong!", "error");
      }
    } catch (error) {
      console.error("Error rejecting job:", error);
      Swal.fire(
        "Error",
        "Unable to reject job. Please try again later.",
        "error"
      );
    }
  };

  const deleteById = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your job has been deleted successfully.",
          icon: "success",
        });
      }
      return result;
    });
    if (isConfirmed) {
      const res = await fetch(`${apiUrl}/api/jobPost/delJob/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        allJobPosts();
      }
    }
  };

  const formCheck = (e) => {
    e.preventDefault();
    const title = jobItems.title;
    const industry = jobItems.industry;
    const country = jobItems.country;
    const jobType = jobItems.jobLocaType;

    if (
      !title &&
      (!industry || industry === "option") &&
      (!country || country === "option") &&
      (!jobType || jobType === "option")
    ) {
      setFilterPostedJobs(postedJobs);
    } else {
      const filterJobs = postedJobs?.filter(
        (job) =>
          (!title || job.title.toLowerCase().includes(title.toLowerCase())) &&
          (!industry || job.industryId?.industry.includes(industry)) &&
          (!jobType || job.jobLocaType?.includes(jobType)) &&
          (!country || job.country?.country.includes(country))
      );

      setFilterPostedJobs(filterJobs);
      setJobItems({
        title: "",
        country: "",
        industry: "",
        jobLocaType: "",
      });
      navigate("/jobs");
    }
  };

  const jobCount = async () => {
    const res = await fetch(`${apiUrl}/api/jobPost/jobCount`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setJobCounting(data);
  };

  useEffect(() => {
    allJobPosts();
    jobCount();
  }, []);

  useEffect(() => {
    const companies = postedJobs?.map((job) => job.companyName);
    const uniqueCompanies = Array.from(new Set(companies)).length;
    setCompaniesCounting(uniqueCompanies);

    const countries = postedJobs?.map((job) =>
      Country.getCountryByCode(job.country)
    );
    setPostedJobCountries(countries);
  }, [postedJobs]);

  return (
    <jobContext.Provider
      value={{
        postedJobs,
        postedJobById,
        jobById,
        setPostedJobById,
        allJobPosts,
        deleteById,
        postedJobCountries,
        jobItems,
        formCheck,
        setJobItems,
        filterPostedJobs,
        jobTitle,
        setJobTitle,
        jobCounting,
        companiesCounting,
        jobApproval,
        jobRejection,
        pendingJobs,
        rejectedJobs,
        postedJobsById, 
        setPostedJobsById,
        colAdjust, 
        setColAdjust
      }}
    >
      {children}
    </jobContext.Provider>
  );
}

JobProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
