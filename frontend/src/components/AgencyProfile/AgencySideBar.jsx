import React from "react";
import { Component, useEffect, useState } from "react";
import "./AgencyProfile.css";
import { NavHashLink } from "react-router-hash-link";

/**
 * Functional component for Agency Side Bar
 *
 * @param {*} getScrollPositions function that returns page offset of agency categories
 * @param {string} id unique id of agency
 * @param {*} ScrollTo function that scrolls page to given element
 * @returns {*} Agency Side Bar Component
 */
function AgencySideBar({getScrollPositions, ScrollTo}) {

  const [scrollPos, setScrollPos] = useState("");

  const resetSideBar = () => {
    if (document.getElementById("main") !== null) {
      document.getElementById("main").className = "header-side-container";
    }
    if (document.getElementById("contacts") !== null) {
      document.getElementById("contacts").className = "header-side-container";
    }
    if (document.getElementById("capacity") !== null) {
      document.getElementById("capacity").className = "header-side-container";
    }
    if (document.getElementById("compliance") !== null) {
      document.getElementById("compliance").className = "header-side-container";
    }
    if (document.getElementById("demographics") !== null) {
      document.getElementById("demographics").className =
        "header-side-container";
    }
    if (document.getElementById("retail") !== null) {
      document.getElementById("retail").className = "header-side-container";
    }
    if (document.getElementById("tasks") !== null) {
      document.getElementById("tasks").className = "header-side-container";
    }
  };

  /**
   * Function gets the scrollPositions of each category and based off the
   * current scroll position of the user, updates the state which then re-renders
   * the sidebar component
   */
  const handleScroll = () => {
    let positions = getScrollPositions();
    // sidebar should change the active category when the top of the corresponding category's div 
    //is less than or equal to 160 pixels from the top of the viewport, the threshold distance
    const thresholdDist = 160;
    switch (true) {
      case window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight:
        resetSideBar();
        if (document.getElementById("tasks") !== null) {
          document.getElementById("tasks").className =
            "header-side-active-container";
        }
        setScrollPos("tasks");
        break;
      case positions[5] <= thresholdDist:
        resetSideBar();
        document.getElementById("retail").className =
          "header-side-active-container";
        setScrollPos("retail");
        break;
      case positions[4] <= thresholdDist:
        resetSideBar();
        document.getElementById("demographics").className =
          "header-side-active-container";
        setScrollPos("demographics");
        break;
      case positions[3] <= thresholdDist:
        resetSideBar();
        document.getElementById("compliance").className =
          "header-side-active-container";
        setScrollPos("compliance");
        break;
      case positions[2] <= thresholdDist:
        resetSideBar();
        document.getElementById("capacity").className =
          "header-side-active-container";
        setScrollPos("capacity");
        break;
      case positions[1] <= thresholdDist:
        resetSideBar();
        document.getElementById("contacts").className =
          "header-side-active-container";
        setScrollPos("contacts");
        break;
      default:
        resetSideBar();
        document.getElementById("main").className =
          "header-side-active-container";
        setScrollPos("main");
        break;
    }
  };

  // Adds scroll event listener on render to track scroll height
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="agency-sidebar">
      <div id="main" className="header-side-active-container">
        <a onClick={() => ScrollTo("location-container")}>
          <h3>Main</h3>
        </a>
      </div>
      <div id="contacts" className="header-side-container">
        <a onClick={() => ScrollTo("contacts-container")}>
          <h3>Contacts</h3>
        </a>
      </div>
      <div id="capacity" className="header-side-container">
        <a onClick={() => ScrollTo("capacity-container")}>
          <h3>Capacity</h3>
        </a>
      </div>
      <div id="compliance" className="header-side-container">
        <a onClick={() => ScrollTo("compliance-container")}>
          <h3>Compliance</h3>
        </a>
      </div>
      <div id="demographics" className="header-side-container">
        <a onClick={() => ScrollTo("demographics-container")}>
          <h3>Demographics</h3>
        </a>
      </div>
      <div id="retail" className="header-side-container">
        <a onClick={() => ScrollTo("retail-container")}>
          <h3>Retail Rescue</h3>
        </a>
      </div>
      <div id="tasks" className="header-side-container">
        <a onClick={() => ScrollTo("task-container")}>
          <h3>Tasks</h3>
        </a>
      </div>
    </div>
  );
}

export default AgencySideBar;
