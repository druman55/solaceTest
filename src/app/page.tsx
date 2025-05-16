"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

  // Define the interface for what an Advocate has for props and their types.
  // For improved performance, added the *Filter elements that are pre-lowercased.
  interface AdvocateProps {
    firstName: string;
    firstNameFilter: string;
    lastName: string;
    lastNameFilter: string;
    city: string;
    cityFilter: string;
    degree: string;
    degreeFilter: string;
    specialties: string[];
    specialtiesFilter: string[];
    yearsOfExperience: number;
    phoneNumber: number;
  }

  // Fetch the advocates from the API.
  useEffect(() => {
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []); // end useEffect. We only want to run this once, so we pass an empty array as the second argument.

  /**
   * Take in a number, and present it back in a format that is more human readable.
   * @param {number} rawDigits The number to format. 
   * @todo This is a candidate for a method to put in a utils file/library.
   * @returns {string} The formatted phone number.
   */
  const formatPhoneNumber = (rawDigits: number) => {
    const phoneNumber = rawDigits.toString();
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`; 
  } // end function formatPhoneNumber

  /**
   * Method for handling change of the search term
   * @param { React.ChangeEvent } e The change event.
   */
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement >) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filteredAdvocates = advocates.filter((advocate: AdvocateProps) => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      return (
        advocate.firstNameFilter.includes(lowerSearchTerm) ||
        advocate.lastNameFilter.includes(lowerSearchTerm) ||
        advocate.cityFilter.includes(lowerSearchTerm) ||
        advocate.degreeFilter.includes(lowerSearchTerm) ||
        advocate.specialtiesFilter.includes(lowerSearchTerm) ||
        advocate.yearsOfExperience >= parseInt(searchTerm) || 
        advocate.phoneNumber.toString().includes(lowerSearchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  }; // end function onChangeSearch.

  /**
   * Reset the advocates, clearing the search.
   */
  const onClickReset = () => {
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  }; // end function onClickReset

  // Interface to show if we are still loading advocates
  const noAdvocatesLoaded = (
    <tr>
      <td colSpan={7} className="text-center text-gray-500 py-4">
        Loading...
      </td>
    </tr>
  );

  // Interface to show if we are have filtered out all advocates
  const noAdvocatesFound = (
    <tr>
      <td colSpan={7} className="text-center text-gray-500 py-4">
      No advocates found matching your search.
      </td>
    </tr>
  );

  return (
    <main className="p-6 bg-grey-50 min-h-screen bg-gradient-radial from-gray-50 to-gray-100"> 
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Solace Advocates</h1>
      <br />
      <div className="flex flex-row w-full">
        <input 
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mr-4"
          placeholder="Search advocates..."
          value={searchTerm}
          onChange={onChangeSearch} />
        <button className="text-nowrap bg-blue-500 text-white font-medium px-4 py-2 rounded-lg shadow" 
          onClick={onClickReset}>Reset Search</button>
      </div>
      {( searchTerm.length > 0  // Only show this if we have a search term
        ? <p className="text-gray-800 ml-4 mt-1">
          Search results for: <span id="search-term">{searchTerm}</span>
        </p>
        : null )}
      <br />
      <br />
      <table className="w-full border-collapse overflow-hidden">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
        {
          // If we havent loaded advocates yet...
          advocates.length === 0 ? noAdvocatesLoaded 
          // If we have filtered all of the advocates out...
            : filteredAdvocates.length === 0 ? noAdvocatesFound : (
              // Lets get busy with some advocates!
              filteredAdvocates.map((advocate: AdvocateProps, index: number) => {
                return (
                  <tr key={index}>
                    <td className="align-top text-center">{advocate.firstName}</td>
                    <td className="align-top text-center">{advocate.lastName}</td>
                    <td className="align-top text-center">{advocate.city}</td>
                    <td className="align-top text-center">{advocate.degree}</td>
                    <td className="align-top">
                      <ul className="list-disc pl-4">
                      {advocate.specialties.map((s: string, index: number) => (
                        <li key={index}>{s}</li>
                      ))}
                      </ul>
                    </td>
                    <td className="align-top text-center">{advocate.yearsOfExperience}</td>
                    <td className="align-top text-center">{formatPhoneNumber(advocate.phoneNumber)}</td>
                  </tr>
                );
              })
        )}
        </tbody>
      </table>
    </main>
  );
}
