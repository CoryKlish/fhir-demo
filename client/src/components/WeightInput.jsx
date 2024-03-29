import React from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';

/**
 * Input component for weight
 *
 * @param {number} weight - weight state
 * @param {function} setWeight - setter function for weight
 *
 * @returns {JSX.Element}
 */
const WeightInput = ({ weight, setWeight }) => {
  return (
    <InputGroup className="mb-3">
      <Form.Label column sm="2">
        Weight
      </Form.Label>
      <FormControl
        type="number"
        name="weight"
        value={weight ?? ''}
        onChange={(e) => setWeight(e.target.value)}
      />
      <InputGroup.Append>
        <InputGroup.Text id="kg-addon">kg</InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default WeightInput;
