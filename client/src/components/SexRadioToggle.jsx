import React from 'react';
import { Form, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

/**
 * Toggle component for sex
 *
 * @param {string} sex - sex state
 * @param {function} setSex - setter function for sex
 *
 * @returns {JSX.Element}
 */
const SexRadioToggle = ({ sex, setSex }) => {
  // Radio button choices
  const options = ['female', 'male'];

  const handleChange = (e) => setSex(e.target.value);

  return (
    <Form.Group controlId="formSex">
      <Form.Label column sm="2">
        Sex
      </Form.Label>
      <ToggleButtonGroup type="radio" name="options" value={sex}>
        {options.map((val) => (
          <ToggleButton key={val} value={val} onChange={handleChange}>
            {/* Capitalize first letter */}
            {val.charAt(0).toUpperCase() + val.slice(1)}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Form.Group>
  );
};

export default SexRadioToggle;
