// base imports
import React from 'react';
import { css } from 'glamor';

// css imports
import '../css/header.css';

// img imports
// import InternetSpeedTestLogo from '../assets/images/logo.svg';
import InternetSpeedTestLogo from '../assets/images/logo.svg';

// Bootstrap imports
import { Nav, Navbar, Dropdown } from 'react-bootstrap';

export default function HeaderCustom() {
  //   const settings = props.location.state.settings;

  const handleSelect = eventKey => {
    console.log(`selected ${eventKey}`);
  };

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

  return (
    <div className="header">
      <a href="/" className="logo-anchor">
        <img
          className="logo"
          src={InternetSpeedTestLogo}
          alt="InternetSpeedTest"
        />
      </a>
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
            <Dropdown className="my-nav-dropdown">
              <Dropdown.Toggle variant="link" id="dropdown-about-us">
                About Us
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  eventKey="Our Focus"
                  href="https://digitalequitybaltimore.org/our-focus/"
                >
                  Our Focus
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Our Members"
                  href="https://digitalequitybaltimore.org/members/"
                >
                  Our Members
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Opportunities"
                  href="https://digitalequitybaltimore.org/Opportunities/"
                >
                  Opportunities
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Nav.Item>
              <Nav.Link
                {...navbarA}
                eventKey="1"
                href="https://digitalequitybaltimore.org/hotline/"
              >
                Adult Learner
              </Nav.Link>
            </Nav.Item>
            <Dropdown className="my-nav-dropdown">
              <Dropdown.Toggle variant="link" id="dropdown-free-internet">
                FREE Internet
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  eventKey="Sign Up"
                  href="https://digitalequitybaltimore.org/freeinternet/"
                >
                  Sign Up
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Resources"
                  href="https://digitalequitybaltimore.org/ebb-resources/"
                >
                  Resources
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="FAQ"
                  href="https://digitalequitybaltimore.org/ebbfaq/"
                >
                  FAQ
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="Presentation Request"
                  href="https://digitalequitybaltimore.org/presentation-request/"
                >
                  Presentation Request
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="button-section">
       <a href="https://digitalequitybaltimore.org/support/">SUPPORT US</a>
        <a className="active" href="https://digitalequitybaltimore.org">
          BDEC MAIN
        </a>
      </div>
    </div>
  );
}
