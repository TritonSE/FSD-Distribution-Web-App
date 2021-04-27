import React, { useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import AgencyProfileForm from "../../components/AgencyProfileForm/AgencyProfileForm";
import { isAuthenticated } from "../../auth";

const CONFIG = require("../../config");

/**
 * Page that contains the agency profile form for editing
 */
function AgencyEditPage() {
  const [agency, setAgency] = useState(null);
  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    fetch(`${CONFIG.backend.uri}/agency/${id}`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAgency(data.agency);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!isAuthenticated()) {
    return <Redirect to="login" />;
  }

  if (!id) {
    history.push("/agency");
  }

  if (!agency) {
    return null;
  } else {
    return <AgencyProfileForm agencyData={agency} editing />;
  }
}

export default AgencyEditPage;
