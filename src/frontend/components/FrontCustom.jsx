// base imports
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { css } from 'glamor';
import PropTypes from 'prop-types';

// img imports
import ThreeLayerHeroImage from '../assets/images/3-layer-hero-img.png';

// bootstrap imports
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

// module imports
import Loading from './Loading.jsx';
import defaultLogo from '../../common/assets/favicon.ico';

export default function FrontCustom() {
  const history = useHistory();
  /* eslint-disable no-unused-vars */
  const [favicon, setFavicon] = useState(
    document.querySelector('[rel="shortcut icon"]'),
  );
  const [logo, setLogo] = useState(defaultLogo);
  const [primary, setPrimary] = useState(
    css({ color: '#333', textAlign: 'center' }),
  );
  const [secondary, setSecondary] = useState(
    css({ backgroundColor: '#ccc !important', borderColor: '#ccc !important' }),
  );

  // style rules
  let location = css({
    maxWidth: '313px',
    width:'100%',
    margin:'0 auto',
  });

  let heroImageContainer = css({

  }); //this gradient isn't working as planned, it's showing as all grey but is supposed to be white at the top fading to grey at the bottom

  let heroText = css({

  });

  let bodyWrapper = css({

  });

  let contentGradient = css({

  });

  let questionBox = css({
    padding: '8px',
    textAlign: 'left',
    margin: '5px  auto',
    backgroundColor: 'white',
    width: '100%',
  });

  let bold = css({
    fontWeight: 800,
  });

  let boldHighlight = css({
    fontWeight: 800,
    backgroundColor: 'rgba(0, 169, 244, 0.4)',
  }); // we had green but don't want it anymore?
  // backgroundColor: 'RGBA(104, 187, 89, .4)',

  let reqStar = css({
    color: 'red',
    fontWeight: 800,
  });

  let stuckTogether = css({
    margin: '15px 0',
    maxWidth: '313px',
    width:'100%',
    margin:'0 auto',
  });

  let gradientParagraph = css({
    marginTop: '4vh',
    textAlign: 'center',
  });

  let takeTestCTA = css({
    width: '348px',
    height: '60px',
  }); // do we want 40% opacity or not on this bg color?
  // backgroundColor: 'rgba(0, 169, 244, 0.4);', doesn't really look good

  let navBarCustomStyle = css({
    marginTop: 0,
  });

  let specialNotice = css({
    margin: '15px auto 30px',
    maxWidth: '504px',
    textAlign: 'center',
    padding: '0 10px',
  });

  let privacyPolicy = css({
    fontSize: '1.6rem',
    margin: '20px 0',
    textAlign: 'center',
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
  }; // I had tried pathname: '/survey-with-header', but got the issues described in App.jsx on routes

  if (!settings) {
    return <Loading />;
  } else {
    return (
      <Container>
         <div className={'main-content'}>
        <div className="top-heading">
          <h2>
            Help us tackle the digital divide and ensure
            <span>
              {' '}
              equal internet connectivity
            </span>{' '}
            for all of Baltimore by testing your internet speed
          </h2>
        </div>
        <div className="top-image">
            <img src={ThreeLayerHeroImage} {...ThreeLayerHeroImage} />
          </div>
        <Form onSubmit={handleSubmit} {...contentGradient}>
          <p {...gradientParagraph}>
            Please share your browser location for the most
            <span className="bold" {...bold}>
              {' '}
              accurate location data
            </span>
            <span className="req-star" {...reqStar}>
              *
            </span>
          </p>
          <Form.Group as={Row} {...stuckTogether} controlId="formShare">
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
          <h2 {...privacyPolicy}>Privacy Policy</h2>

          <Form.Group {...location} as={Row} controlId="formAgree">
            <div {...questionBox}>
              <Form.Check
                required
                id="consent"
                type="checkbox"
                label="I agree*"
              />
            </div>
          </Form.Group>
          <p {...specialNotice}>
            *includes retention and publication of IP addresses, in addition to
            speed test results.
          </p>

          <Button className="" variant="primary" type="submit" {...takeTestCTA}>
            Take the Test
          </Button>
        </Form>
        </div>
      </Container>
    );
  }
}

FrontCustom.propTypes = {
  history: PropTypes.object,
  location: PropTypes.shape({
    state: PropTypes.shape({
      description: PropTypes.string,
      files: PropTypes.array,
      links: PropTypes.array,
    }),
  }),
};