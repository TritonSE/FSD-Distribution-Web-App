import REACT from 'react';
import { BrowserRouter } from "react-router-dom"; 
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar'

const links = [
    { text: 'Home', location: "/" },
    { text: 'Agency', location: "/agency" },
];

// I use test.each to iterate the test cases above
test.each(links)(
    "Check if Nav Bar have %s link.",
    (link) => {
      render(<BrowserRouter><Navbar /></BrowserRouter>);
      const linkDomArr = screen.getAllByText(link.text);
      const linkDom = linkDomArr[0];
      expect(linkDom).toHaveAttribute("href", link.location);
    }

);