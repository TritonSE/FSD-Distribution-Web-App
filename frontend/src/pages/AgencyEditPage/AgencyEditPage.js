import React, { useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import AgencyProfileForm from "../../components/AgencyProfileForm/AgencyProfileForm";
import { isAuthenticated, getJWT } from "../../auth";

const CONFIG = require("../../config");
require("dotenv").config();

/**
 * Page that contains the agency profile form for editing
 */
function AgencyEditPage() {
  const [agency, setAgency] = useState(null);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetch(`${process.env.BACKEND_URI}/agency/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getJWT()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
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
  }
  return <AgencyProfileForm agencyData={agency} editing />;
}

export default AgencyEditPage;
