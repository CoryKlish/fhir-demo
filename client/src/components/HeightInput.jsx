import React from 'react';
import { Form } from 'react-bootstrap';

const HeightInput = ({ height, setHeight }) => {
  return (
    <Form.Group controlId="formHeight">
      <Form.Label column sm="2">
        Height
      </Form.Label>
      <Form.Control
        type="number"
        name="height"
        value={height ?? ''}
        onChange={(e) => setHeight(+e.target.value)}
      />
    </Form.Group>
  );
};

export default HeightInput;
