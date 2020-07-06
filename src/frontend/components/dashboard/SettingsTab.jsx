// base imports
import React from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';

// bootstrap imports
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

// custom styles
import './SettingsTab.css';

export default function SettingsTab(props) {
  const { defaults, setDefaults } = props;
  const [inputs, setInputs] = React.useState({});

  // color picker
  const handleChangeColorPrimary = color => {
    setInputs(inputs => ({
      ...inputs,
      color_one: color.hex,
    }));
  };

  const handleChangeColorSecondary = color => {
    setInputs(inputs => ({
      ...inputs,
      color_two: color.hex,
    }));
  };

  // other inputs
  const handleInputChange = event => {
    event.persist();
    setInputs(inputs => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const processError = errorMessage => {
    let text = `We're sorry your, request didn't go through. Please send the message below to the support team and we'll try to fix things as soon as we can.`;
    let debug = JSON.stringify(errorMessage);
    return [text, debug];
  };

  const uploadSettings = event => {
    event.preventDefault();
    const json = JSON.stringify({
      data: {
        title: inputs.title,
        header: inputs.header,
        footer: inputs.footer,
        color_one: inputs.color_one,
        color_two: inputs.color_two,
      },
    });
    fetch('/api/v1/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: json,
    })
      .then(response => {
        if (response.status === 204) {
          alert('Settings saved successfully.');
          const newDefaults = Object.assign(defaults, inputs);
          return setDefaults(newDefaults);
        } else {
          const error = processError(response.json());
          throw new Error(`Error in response from server: ${error}`);
        }
      })
      .catch(error => {
        console.error('error:', error);
        throw Error(error.statusText);
      });
  };

  return (
    <Container className={'mt-4 mb-4'}>
      <Alert variant="secondary">
        <p className="mb-0">
          <em>Fill out the sitewide settings with the form below.</em>
        </p>
      </Alert>
      <Form onSubmit={uploadSettings}>
        <Form.Group>
          <Form.Label for="title">Site Title</Form.Label>
          <Form.Control
            required
            type="text"
            name="title"
            placeholder="Enter a title for the site"
            defaultValue={inputs.title || defaults.title || ''}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label for="header">Welcome Message</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows="3"
            name="header"
            placeholder="Welcome text shown when first visiting te site"
            defaultValue={inputs.header || defaults.header || ''}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label for="footer">Thank You Message</Form.Label>
          <Form.Control
            required
            as="textarea"
            rows="3"
            name="footer"
            placeholder="Text shown after taking the survey"
            defaultValue={inputs.footer || defaults.footer || ''}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className={'flex'}>
          <div className={'flex-item'}>
            <Form.Label for="color_one">
              Choose a primary default color for the site:
            </Form.Label>
            <SketchPicker
              name="color_one"
              color={inputs.color_one || defaults.color_one}
              onChangeComplete={handleChangeColorPrimary}
            />
          </div>
          <div className={'flex-item'}>
            <Form.Label for="color_two">
              Choose a secondary default color for the site:
            </Form.Label>
            <SketchPicker
              name="color_two"
              color={inputs.color_two || defaults.color_two}
              onChangeComplete={handleChangeColorSecondary}
            />
          </div>
        </Form.Group>
        <Button type="submit">Save</Button>
      </Form>
    </Container>
  );
}

SettingsTab.propTypes = {
  defaults: PropTypes.object.isRequired,
  setDefaults: PropTypes.func.isRequired,
};
