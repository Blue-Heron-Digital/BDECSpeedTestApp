// base imports
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

// Bootstrap imports
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

export default function NavBar(props) {
  const settings = props.location.state.settings;
  console.log(settings)

  // style rules
  let h1 = css({
    color: settings.color_one,
  });

  useEffect(() => {
    document.title = `${settings.title} | BDEC`;
  }, []);

  const handleSelect = (eventKey) => {
      console.log(`selected ${eventKey}`);
  }
      
  return (
    <Container fluid="sm" className={'mt-4 mb-4'}>
        <Nav variant="pills" onSelect={handleSelect}>
            <NavDropdown title="About Us" id="nav-dropdown">
                <NavDropdown.Item eventKey="Our Focus" href="https://digitalequitybaltimore.org/our-focus/">Our Focus</NavDropdown.Item>
                <NavDropdown.Item eventKey="Our Members" href="https://digitalequitybaltimore.org/members/">Our Members</NavDropdown.Item>
                <NavDropdown.Item eventKey="Opportunities" href="https://digitalequitybaltimore.org/Opportunities/">Opportunities</NavDropdown.Item>
            </NavDropdown>
            <Nav.Item>
                <Nav.Link eventKey="1" href="https://digitalequitybaltimore.org/hotline/">
                    Adult Learner Hotline
                </Nav.Link>
            </Nav.Item>
            <NavDropdown title="FREE Internet" id="nav-dropdown">
                <NavDropdown.Item eventKey="Sign Up" href="https://digitalequitybaltimore.org/freeinternet/">Sign Up</NavDropdown.Item>
                <NavDropdown.Item eventKey="Resources" href="https://digitalequitybaltimore.org/ebb-resources/">Resources</NavDropdown.Item>
                <NavDropdown.Item eventKey="FAQ" href="https://digitalequitybaltimore.org/ebbfaq/">FAQ</NavDropdown.Item>
                <NavDropdown.Item eventKey="Presentation Request" href="https://digitalequitybaltimore.org/presentation-request/">FAQ</NavDropdown.Item>
            </NavDropdown>
            <Nav.Item>
                <Nav.Link eventKey="Donate">
                    DONATE
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="Main Site" href="https://digitalequitybaltimore.org/">
                    MAIN SITE
                </Nav.Link>
            </Nav.Item>
        </Nav>
    </Container>
  );
}

NavBar.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      settings: PropTypes.object,
    }),
  }),
};