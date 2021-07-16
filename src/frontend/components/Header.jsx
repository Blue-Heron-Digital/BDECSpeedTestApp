// base imports
import React from 'react';
import { css, hover } from 'glamor';

// css imports
import '../css/header.css';

// img imports
// import InternetSpeedTestLogo from '../assets/images/logo.svg';
import InternetSpeedTestLogo from '../assets/images/logo.svg';

// Bootstrap imports
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

export default function NavBar() {
  //   const settings = props.location.state.settings;

  const handleSelect = eventKey => {
    console.log(`selected ${eventKey}`);
  };

  // style rules
  let buttonPrimary = css({
    backgroundColor: '#003952',
    color: 'white',
    ':hover': {
      color: 'white',
    },
  });

  let buttonSecondary = css({
    border: '1px solid #003952',
  });

  let navbarA = css({
    color: '#003952 !important',
    ':hover': {
      color: '#003952',
    },
    backgroundColor: '#FFF',
  }); // this bg color helps with issues of no navigability on mobile
  // when the links have transparent backgrounds on hamburger expansion

  let navbar = css({
    height: '88px',
  });

  let speedTestLogo = css({
    height: '3vh',
  });

  return (
    <div className="header">
      <img className="logo" src={InternetSpeedTestLogo}
                alt="InternetSpeedTest" />
      <Navbar collapseOnSelect expand="lg">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav
            variant="pills"
            className="navbar"
            {...navbar}
            {...navbarA}
            onSelect={handleSelect}
          >
            
            <NavDropdown {...navbarA} title="About Us" id="nav-dropdown">
              <NavDropdown.Item
                eventKey="Our Focus"
                href="https://digitalequitybaltimore.org/our-focus/"
              >
                Our Focus
              </NavDropdown.Item>
              <NavDropdown.Item
                eventKey="Our Members"
                href="https://digitalequitybaltimore.org/members/"
              >
                Our Members
              </NavDropdown.Item>
              <NavDropdown.Item
                eventKey="Opportunities"
                href="https://digitalequitybaltimore.org/Opportunities/"
              >
                Opportunities
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Item>
              <Nav.Link
                {...navbarA}
                eventKey="1"
                href="https://digitalequitybaltimore.org/hotline/"
              >
                Adult Learner
              </Nav.Link>
            </Nav.Item>
            <NavDropdown title="FREE Internet" id="nav-dropdown" {...navbarA}>
              <NavDropdown.Item
                eventKey="Sign Up"
                href="https://digitalequitybaltimore.org/freeinternet/"
              >
                Sign Up
              </NavDropdown.Item>
              <NavDropdown.Item
                eventKey="Resources"
                href="https://digitalequitybaltimore.org/ebb-resources/"
              >
                Resources
              </NavDropdown.Item>
              <NavDropdown.Item
                eventKey="FAQ"
                href="https://digitalequitybaltimore.org/ebbfaq/"
              >
                FAQ
              </NavDropdown.Item>
              <NavDropdown.Item
                eventKey="Presentation Request"
                href="https://digitalequitybaltimore.org/presentation-request/"
              >
                Presentation Request
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div class="button-section">
                    <a href="#">SUPPORT US</a> 
                    <a class="active" href="https://digitalequitybaltimore.org/">BDEC MAIN</a>
                 </div>
    </div>
  );
}
