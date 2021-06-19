// base imports
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { css } from 'glamor';
import PropTypes from 'prop-types';

// img imports
import { ThreeLayerHeroImage } from '../assets/images/3-layer-hero-img.png';

// bootstrap imports
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// module imports
import NavBar from './NavBar.jsx';
import Loading from './Loading.jsx';
import defaultLogo from '../../common/assets/favicon.ico';

export default function Basic() {
  const history = useHistory();
  /* eslint-disable no-unused-vars */
  const [favicon, setFavicon] = useState(
    document.querySelector('[rel="shortcut icon"]'),
  );
  const [logo, setLogo] = useState(defaultLogo);
  const [primary, setPrimary] = useState(css({ color: '#333', textAlign: 'center' }));
  const [secondary, setSecondary] = useState(
    css({ backgroundColor: '#ccc !important', borderColor: '#ccc !important' }),
  );

  // style rules
  let location = css({
    marginLeft: '20px',
  });

  let heroImageContainer = css({
    width: '90vw',
    height: '25vh',
    backgroundImage: `url(${ThreeLayerHeroImage})`
  })

  let heroText = css({
    /* TODO: convert to vw and vh */
    width: '730px',
    height: '120px',
    left: '355px',
    top: '172px',
    fontFamily: 'Darker Grotesque',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '36px',
    lineHeight: '40px',
    textAlign: 'center'
  })

  let contentGradient = css({
    width: '80vw',
    height: '50vh',
    left: '92px',
    top: '540px',
    textAlign: 'center',
    background: 
    'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%), #E8E8E8'
  })

  let questionBox = css({
    minWidth: '20vw',
    padding: '1vw',
    textAlign: 'left',
    margin: '0  auto',
    backgroundColor: 'white'
  })

  let bold = css({
    fontWeight: 800
  })

  let boldHighlight = css({
    fontWeight: 800,
    backgroundColor: 'RGBA(104, 187, 89, .4)'
  })

  let reqStar = css({
    color: 'red',
    fontWeight: 800
  })

  let takeTestCTA = css({
    width: '348px',
    height: '60px',
    backgroundColor: '#68BB59'
  })

  let navBarCustomStyle = css({
    marginTop: 0
  })

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
        <NavBar {...navBarCustomStyle}/>
        <div className="hero-img-container" {...heroImageContainer}>
          <h2 className="hero-text" {...heroText}>
            Help us tackle the digital divide and ensure
             <span className="bold-highlight" {...boldHighlight}> equal internet connectivity
            </span>{' '}
            for all of Baltimore by testing your internet speed
          </h2>
        </div>
        <Form onSubmit={handleSubmit} {...contentGradient}>
          <p>
            Please share your browser location for the most 
             <span className="bold" {...bold}> accurate location data</span>
            <span className="req-star" {...reqStar}>*</span>
          </p>
          <Form.Group as={Row} controlId="formShare">
            <div {...questionBox}>
              <Form.Check
                id="location-yes"
                name="location"
                label="Share my browser location"
                onChange={() => setLocationConsent(true)}
                defaultChecked
              />
            </div>
            <div {...questionBox}>
              <Form.Check
                id="location-no"
                name="location"
                label="Do not share my browser location"
                onChange={() => setLocationConsent(false)}
              />
            </div>
          </Form.Group>
          <h2>Privacy Policy</h2>
          
          <Form.Group {...location} as={Row} controlId="formAgree">
          <div {...questionBox}>
            <Form.Check
              required
              id="consent"
              type="checkbox"
              label="I agree"
            />
          </div>
          </Form.Group>
          <p>
            <span {...reqStar}>*</span>includes retention and publication of IP addresses, in addition to
            speed test results.
          </p>

          <Button className="" variant="primary" type="submit" 
          {...secondary} {...takeTestCTA}>
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
