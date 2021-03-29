import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import AgencyBar from './AgencyBar';
import './AgencyProfile.css';
import AgencySideBar from './AgencySideBar';
import edit from './imgs/edit-icon.png';

function AgencyProfile({ data }) {
  const [agency, setAgency] = useState(undefined);

  let history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:8000/agency/${data}`, { method: 'GET' })
    .then(res => res.json())
    .then(agency => {
      setAgency(agency.agency);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);
  
  if (!data) {
    history.push("/agency");
  }
  
  if(agency) {
    return (
      <>
        <AgencyBar agency={agency} />
        <div className="agency-profile-container">
          <AgencySideBar />
          <div className="agency-profile-info">
            <div className="agency-category">
              <img id="edit-icon" src={edit} alt="edit"></img>
              <h1 className="category-title">
                LOCATION AND DISTRIBUTION HOURS
              </h1>
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return null;
  }

}

export default AgencyProfile;
