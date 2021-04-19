import React from 'react'
import { Component, useEffect, useState } from 'react';
import "./AgencyProfile.css";

function AgencySideBar({getScrollPositions}) {

  const [scrollPos, setScrollPos] = useState("");

  const resetSideBar = () => {
    document.getElementById("main").className = "header-side-container";
    document.getElementById("contacts").className = "header-side-container";
  }

  const handleScroll = () => {
    let positions = getScrollPositions();
    if(window.pageYOffset > positions[1]) {
      resetSideBar();
      document.getElementById("contacts").className = "header-side-active-container";
      setScrollPos("contacts");
      console.log("contacts");
    } else {
      resetSideBar();
      document.getElementById("main").className = "header-side-active-container";
      setScrollPos("main");
      console.log("main");
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])

  return (
    <div className="agency-sidebar">
      <div id="main" className="header-side-active-container">
        <h3>Main</h3>
      </div>
      <div id="contacts" className="header-side-container">
        <h3>Contacts</h3>
      </div>
      <div className="header-side-container">
        <h3>Compliance</h3>
      </div>
      <div className="header-side-container">
        <h3>Demographics</h3>
      </div>
      <div className="header-side-container">
        <h3>Retail Rescue</h3>
      </div>
      <div className="header-side-container">
        <h3>Tasks</h3>
      </div>
    </div>
  )
}

export default AgencySideBar;