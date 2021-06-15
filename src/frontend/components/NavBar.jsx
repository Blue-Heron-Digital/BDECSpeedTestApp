// base imports
import React from 'react';

// Bootstrap imports
import Container from 'react-bootstrap/Container';
import { Nav, NavDropdown } from 'react-bootstrap';

export default function NavBar() {
  //   const settings = props.location.state.settings;

  const handleSelect = eventKey => {
    console.log(`selected ${eventKey}`);
  };

  return (
    <Container fluid="sm" className={'mt-4 mb-4'}>
      <Nav variant="pills" className="navbar" onSelect={handleSelect}>
        <NavDropdown title="About Us" id="nav-dropdown">
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
            eventKey="1"
            href="https://digitalequitybaltimore.org/hotline/"
          >
            Adult Learner Hotline
          </Nav.Link>
        </Nav.Item>
        <NavDropdown title="FREE Internet" id="nav-dropdown">
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
        <Nav.Item>
          <Nav.Link eventKey="Donate" className="button-secondary">
            SUPPORT US
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            eventKey="Main Site"
            className="button-primary"
            href="https://digitalequitybaltimore.org/"
          >
            BDEC MAIN
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
}