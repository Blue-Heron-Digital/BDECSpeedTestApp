// base imports
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import parse from 'html-react-parser';

// Bootstrap imports
import Container from 'react-bootstrap/Container';
import Progress from 'react-circle-progress-bar';

// css imports
import '../css/main.css';

export default function ThankYou(props) {
  const results = props.location.state.results;
  const settings = props.location.state.settings;

  // style rules
  let h1 = css({
    color: settings.color_one,
  });

  useEffect(() => {
    document.title = `${settings.title} | Thank You`;
  }, []);

  return (
    <Container>
      <div className={'main-content'}>
        <div className="top-heading">
          <h2>Here are your results.</h2>
        </div>

        <div className="form-section">
          <div className="result">
            <div className="left-side">
              <p>
                Download speed is how fast your internet connection can transfer
                data from a server. Download speeds are important for
                downloading files, loading a website, streaming a video or
                music.
              </p>
              <div className="download">
                <Progress
                  progress={(results.s2cRate / 1000).toFixed(2)}
                  strokeWidth={18}
                  gradient={[
                    { stop: 0.0, color: '#003952' },
                    { stop: 1, color: '#003952' },
                  ]}
                  background="#fff"
                />
                <strong>Download Mbps</strong>{' '}
              </div>
            </div>
            <div className="right-side">
              <div className="download">
                <Progress
                  progress={(results.c2sRate / 1000).toFixed(2)}
                  strokeWidth={18}
                  gradient={[
                    { stop: 0.0, color: '#00A9F4' },
                    { stop: 1, color: '#00A9F4' },
                  ]}
                  background="#fff"
                />
                <strong>Upload Mbps</strong>
              </div>
              <p>
                Upload speed is how fast your internet connection can transfer
                your data to a server. Upload speeds are important for sending
                emails, sending files to other people, live video chats and
                gaming.
              </p>
            </div>
          </div>

          <div className="result-btn">
            <a
              href="https://digitalequitybaltimore.org/support/"
              target="_blank"
            >
              Donate
            </a>
            <a
              href="https://digitalequitybaltimore.org/"
              target="_blank"
              className="active"
            >
              Get Involved
            </a>
            <a href="javascript:void(0)">Community Resources</a>
          </div>
        </div>
      </div>
    </Container>
  );
}

ThankYou.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      results: PropTypes.object.isRequired,
      settings: PropTypes.object.isRequired,
    }),
  }),
};
