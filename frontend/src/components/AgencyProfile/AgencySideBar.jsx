import React from 'react'
import { Component, useEffect, useState } from 'react';
import "./AgencyProfile.css";

function AgencySideBar({getScrollPositions}) {

  const [scrollPos, setScrollPos] = useState("");

  const resetSideBar = () => {
    document.getElementById("main").className = "header-side-container";
    document.getElementById("contacts").className = "header-side-container";
    document.getElementById("capacity").className = "header-side-container";
    document.getElementById("compliance").className = "header-side-container";
    document.getElementById("demographics").className = "header-side-container";
    document.getElementById("retail").className = "header-side-container";
    document.getElementById("tasks").className = "header-side-container";
  }

  const handleScroll = () => {
    let positions = getScrollPositions();
    switch(true){
      case (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight:
        resetSideBar();
        document.getElementById("tasks").className = "header-side-active-container";
        setScrollPos("tasks");
        console.log("tasks");
        console.log(positions);
        console.log(window.pageYOffset);
        break;
      case positions[5] <= 160:
        resetSideBar();
        document.getElementById("retail").className = "header-side-active-container";
        setScrollPos("retail");
        console.log("retail");
        break;
      case positions[4] <= 160:
        resetSideBar();
        document.getElementById("demographics").className = "header-side-active-container";
        setScrollPos("demographics");
        console.log("demographics");
        break;
      case positions[3] <= 160:
        resetSideBar();
        document.getElementById("compliance").className = "header-side-active-container";
        setScrollPos("compliance");
        console.log("compliance");
        break;
      case positions[2] <= 160:
        resetSideBar();
        document.getElementById("capacity").className = "header-side-active-container";
        setScrollPos("capacity");
        console.log("capacity");
        break;
      case positions[1] <= 160:
        resetSideBar();
        document.getElementById("contacts").className = "header-side-active-container";
        setScrollPos("contacts");
        console.log("contacts");
        break;
      default:
        resetSideBar();
        document.getElementById("main").className = "header-side-active-container";
        setScrollPos("main");
        console.log("main");
        break;
    }
    // if(window.pageYOffset > positions[1]) {
    //   resetSideBar();
    //   document.getElementById("contacts").className = "header-side-active-container";
    //   setScrollPos("contacts");
    //   console.log("contacts");
    // } else {
    //   resetSideBar();
    //   document.getElementById("main").className = "header-side-active-container";
    //   setScrollPos("main");
    //   console.log("main");
    // }
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
      <div id="capacity" className="header-side-container">
        <h3>Capacity</h3>
      </div>
      <div id="compliance" className="header-side-container">
        <h3>Compliance</h3>
      </div>
      <div id="demographics" className="header-side-container">
        <h3>Demographics</h3>
      </div>
      <div id="retail" className="header-side-container">
        <h3>Retail Rescue</h3>
      </div>
      <div id="tasks" className="header-side-container">
        <h3>Tasks</h3>
      </div>
    </div>
  )
}

export default AgencySideBar;