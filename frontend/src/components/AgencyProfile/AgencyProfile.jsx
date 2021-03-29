import React, { useState, useEffect } from 'react';

function AgencyProfile({ data }) {
  const [agency, setAgency] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8000/agency/${data}`, { method: 'GET' })
    .then(res => res.json())
    .then(agency => {
      setAgency(agency);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);
  console.log(agency);
  return (
    <div>
      {data}
    </div>
  )
}

export default AgencyProfile;
