import { useEffect, useState } from "react";
import JobCountriesContext from "./JobCountryContext";
import PropTypes from "prop-types";
import { Country, City } from "country-state-city";
import { useLocation } from "react-router-dom";

export default function JobCountryProvider({ children }) {
  const [jobCountries, setJobCountries] = useState([]);
  const [country, setCountry] = useState("");
  const [industry, setIndustry] = useState("");
  const { pathname } = useLocation()
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    const asianCountryCodes = [
      "AF", "AM", "AZ", "BH", "BD", "BT", "BN", "KH", "CN", "CY", "GE", "IN", "ID", "IR", "IQ", "IL",
      "JP", "JO", "KZ", "KW", "KG", "LA", "LB", "MY", "MV", "MN", "MM", "NP", "OM", "PK", "PH", "QA", "SA",
      "SG", "KR", "LK", "SY", "TW", "TJ", "TH", "TL", "TM", "AE", "UZ", "VN", "YE",
    ];

    const filterAsianContries = allCountries.filter((country) =>
      asianCountryCodes.includes(country.isoCode)
    );
    setJobCountries(filterAsianContries);
    if (pathname !== "/jobs" && pathname !=="/jobs-by-country") {
      setCountry("")
    }
  }, [pathname]);

  const countryCities = (isoCode) => {
    if (isoCode) {
      // Clear cities state before fetching new data
      setCities([]);

      const citiesData = City.getCitiesOfCountry(isoCode);

      // Use a Set to filter out duplicates based on city name or city code (or any other unique identifier)
      const uniqueCities = [
        ...new Map(citiesData.map(city => [city.name, city])).values(),
      ];

      setCities(uniqueCities);
    }
  }; 

  return (
    <JobCountriesContext.Provider
      value={{
        jobCountries,
        countryCities,
        cities,
        country,
        setCountry,
        industry,
        setIndustry,
      }}
    >
      {children}
    </JobCountriesContext.Provider>
  );
}

JobCountryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
