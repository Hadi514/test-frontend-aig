import { Button } from "react-bootstrap";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFont,
  faFlag,
  faBuilding,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import jobContext from "../../ContextApi/JobContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import JobIndContext from "../../ContextApi/JobIndContext";
import jobConContext from "../../ContextApi/JobConContext";

function JobSearchForm() {
  const { jobItems, formCheck, setJobItems } = useContext(jobContext);
  const { jobInd } = useContext(JobIndContext)
  const { jobCon } = useContext(jobConContext)

  const allIndustries = jobInd?.map(ind => {
    return { value: ind.industry, label: ind.industry }
  })

  const allCountries =
    jobCon?.map((job) => {
      return { value: job.country, label: job.country };
    });

  const seachForm = [
    {
      name: "title",
      val: jobItems.title,
      type: "text",
      placeH: "Search By Title",
      conId: "floatingInput",
      icon: faFont,
      star: "*",
    },
    {
      name: "country",
      val: jobItems.country,
      type: "select",
      placeH: "Country",
      conId: "floatingSelect",
      icon: faFlag,
      options: [{ value: "option", label: "Select Country" }, ...allCountries],
    },
    {
      name: "industry",
      val: jobItems.industry,
      type: "select",
      placeH: "Industry",
      conId: "floatingInput",
      icon: faBuilding,
      star: "*",
      options: [
        { value: "options", label: "Select Industry" },
        ...allIndustries],
    },
    {
      name: "jobLocaType",
      val: jobItems.jobLocaType,
      type: "select",
      placeH: "Job Location Type",
      conId: "floatingSelect",
      icon: faBriefcase,
      options: [
        { value: "option", label: "Select Job Type" },
        { value: "On Site", label: "On Site" },
        { value: "Remote", label: "Remote" },
        { value: "Hybrid", label: "Hybrid" },
      ],
    },
  ];

  const onValueChange = (e) => {
    setJobItems({ ...jobItems, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="search-filters justify-content-between">
        {seachForm &&
          seachForm.map((fields, index) => {
            return (
              <div key={index}>
                {fields.type === "text" ? (
                  <div className="filter-field">
                    <span className="d-flex align-items-center ">
                      <FontAwesomeIcon
                        icon={fields.icon}
                        className="input-icon"
                      />
                      <input
                        name={fields.name}
                        value={fields.val}
                        placeholder={fields.placeH}
                        onChange={onValueChange}
                        className="form-control "
                      />
                    </span>
                  </div>
                ) : (
                  <div className="filter-field">
                    <span className="d-flex align-items-center ">
                      <FontAwesomeIcon
                        icon={fields.icon}
                        className="input-icon"
                      />
                      <select
                        className="form-select "
                        name={fields.name}
                        value={fields.val}
                        onChange={onValueChange}
                        aria-label="Default select example"
                      >
                        {fields.options.map((options, index) => (
                          <option key={index} value={options.value}>
                            {options.label}
                          </option>
                        ))}
                      </select>
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        <div className="d-flex justify-content-center align-items-center me-1">
          <Button onClick={formCheck} style={{ height: "70%" }}>Explore Options</Button>
        </div>
      </div>
    </>
  );
}

export default JobSearchForm;
