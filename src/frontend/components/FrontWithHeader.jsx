// base imports
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { css } from 'glamor';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';

// bootstrap imports
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// module imports
import NavBar from './NavBar.jsx';
import Loading from './Loading.jsx';
import ChromeScreengrab from '../assets/images/chrome-location.jpg';
import FirefoxScreengrab from '../assets/images/firefox-location.jpg';
import defaultLogo from '../../common/assets/favicon.ico';

export default function Basic() {
  const history = useHistory();
  /* eslint-disable no-unused-vars */
  const [favicon, setFavicon] = useState(
    document.querySelector('[rel="shortcut icon"]'),
  );
  const [logo, setLogo] = useState(defaultLogo);
  const [primary, setPrimary] = useState(css({ color: '#333' }));
  const [secondary, setSecondary] = useState(
    css({ backgroundColor: '#ccc !important', borderColor: '#ccc !important' }),
  );

  // style rules

  let card = css({
    height: '100%',
  });

  let cardText = css({
    fontStyle: 'italic',
    padding: '10px',
  });

  let image = css({
    maxHeight: '150px',
  });

  let location = css({
    marginLeft: '20px',
  });

  let mb2 = css({
    '@media(max-width: 768px)': {
      marginBottom: '20px',
    },
  });

  const handleColors = settings => {
    setPrimary(
      css({
        color: settings.color_one,
      }),
    );
    setSecondary(
      css({
        backgroundColor: `${settings.color_two} !important`,
        borderColor: `${settings.color_two} !important`,
        ':hover': {
          filter: 'brightness(85%)',
        },
      }),
    );
  };

  const handleLogo = settings => {
    if (settings.logo) {
      setFavicon(settings.logo);
      setLogo(settings.logo);
      document.querySelector('[rel="shortcut icon"]').href = settings.logo;
    }
  };

  // handle geolocation consent
  const [locationConsent, setLocationConsent] = useState(true);
  // site settings
  const [settings, setSettings] = useState({});

  const processError = errorMessage => {
    let text = `We're sorry, your request didn't go through. Please send the message below to the support team and we'll try to fix things as soon as we can.`;
    let debug = JSON.stringify(errorMessage);
    return [text, debug];
  };

  // fetch settings from API
  const downloadSettings = () => {
    let status;
    return fetch('/api/v1/settings', {
      method: 'GET',
    })
      .then(response => {
        status = response.status;
        return response.json();
      })
      .then(result => {
        if (status === 200 || status === 201) {
          if (result.data) {
            setSettings(result.data);
            handleColors(result.data);
            handleLogo(result.data);
            document.title = result.data.title;
            return;
          } else {
            const error = processError(result);
            throw new Error(`Error in response from server: ${error}`);
          }
        } else {
          const error = processError(result);
          throw new Error(`Error in response from server: ${error}`);
        }
      })
      .catch(error => {
        console.error('error:', error);
        throw Error(error.statusText);
      });
  };

  useEffect(() => {
    downloadSettings()
      .then(data => {
        if (data) {
          setSettings(data);
          handleColors(data);
          handleLogo(data);
          document.title = data.title;
        }
        return;
      })
      .catch(error => {
        console.error('error:', error);
        throw Error(error.statusText);
      });
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    history.push({
      pathname: '/survey',
      state: { settings: settings, locationConsent: locationConsent },
    });
  };

  if (!settings) {
    return <Loading />;
  } else {
    return (
      <Container fluid="lg" className={'mt-4 mb-4'}>
        <NavBar />
       <div class="hero-img-container">
        <h2 class="hero-text">Help us tackle the digital divide and ensure
<span class="bold-highlight">equal internet connectivity</span> for all of Baltimore
by testing your internet speed</h2>
        </div>
        <Form onSubmit={handleSubmit}>
          <p>Please share your browser location for the most 
            <span class="bold">accurate location data</span><span class="req-star">*</span>
          </p>
          <Form.Group as={Row} controlId="formShare">
            <Form.Check 
            id="location-yes" 
            name="location"
            label="Share my browser location"
            onChange={() => setLocationConsent(true)}
            defaultChecked />
          
            <Form.Check 
            id="location-no"
            name="location"
            label="Do not share my browser location"
            onChange={() => setLocationConsent(false)} 
            />
          </Form.Group>
          <h2>Privacy Policy</h2>
          <Form.Group {...location} as={Row} controlId="formAgree">
            <Form.Check.Input required id="consent" type="checkbox" label="I agree" />
          </Form.Group>
          <p>*includes retention and publication of IP addresses, in addition to speed test results.</p>
        
          <Button className="" variant="primary" type="submit" {...secondary}>
            Take the Test
          </Button>
        </Form>
      </Container>
    );
  }
}

Basic.propTypes = {
  history: PropTypes.object,
  location: PropTypes.shape({
    state: PropTypes.shape({
      description: PropTypes.string,
      files: PropTypes.array,
      links: PropTypes.array,
    }),
  }),
};
