import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import AgencyBar from './AgencyBar';
import './AgencyProfile.css';
import AgencySideBar from './AgencySideBar';
import LocationAndDistributions from './LocationAndDistributions';

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
            <LocationAndDistributions agency={agency} />
          </div>
        </div>
      </>
    )
  } else {
    return null;
  }

}

export default AgencyProfile;
