import React from 'react';
import { Form } from 'react-bootstrap';

const WeightInput = ({ weight, setWeight }) => {
  return (
    <Form.Group controlId="formWeight">
      <Form.Label column sm="2">
        Weight
      </Form.Label>
      <Form.Control
        type="number"
        name="weight"
        value={weight ?? ''}
        onChange={(e) => setWeight(+e.target.value)}
      />
    </Form.Group>
  );
};

export default WeightInput;
