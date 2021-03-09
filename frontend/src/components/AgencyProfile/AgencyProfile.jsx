import React, { useState, useEffect } from 'react';
import './AgencyProfile.css';

function AgencyProfile({ data }) {
  const [id, setId] = useState(data);
  const [agency, setAgency] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8000/agency/${id}`, { method: 'GET' })
    .then(res => res.json())
    .then(data => {
      setAgency(data);
    })
    .catch(err => {
      console.log(err);
    });
  }, [])

  return (
    <div>
      <div className="agency-profile-header">
        <ul>
          <li>
            {agency.tableContent.agencyNumber} - {agency.tableContent.name} (Partnered since {agency.dateOfInitialPartnership})
          </li>
        </ul>
      </div>
      <div className="agency-profile-container">
        <div className="agency-profile-sidebar"></div>
        <div className="agency-profile-information"></div>
      </div>
    </div>
  );
}

export default AgencyProfile;
