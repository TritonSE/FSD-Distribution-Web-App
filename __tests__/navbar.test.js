import React from 'react';
import { BrowserRouter } from "react-router-dom"; 
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import { render, screen } from '@testing-library/react';
import Navbar from '../src/components/Navbar/Navbar'
import "@testing-library/jest-dom/extend-expect";

//links that will be checked for in the navbar
const links = [
    { text: 'Home', location: "/" },
    { text: 'Agency', location: "/agency" },
];

// Iterating through above test cases to test if navbar has correct links
test.each(links)(
    "Check if Nav Bar have %s link.",
    (link) => {
      render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>);
      const linkDom = screen.getByText(link.text);

      //toHaveAttrbitute is JEST assertion to check if links are correct
      expect(linkDom).toHaveAttribute("href", link.location);
    }
);