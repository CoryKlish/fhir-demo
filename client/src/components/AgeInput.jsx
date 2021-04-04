import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const AgeInput = ({ age, setAge }) => {
  return (
    <Form.Group controlId="formAge">
      <Form.Label column sm="2">
        Age
      </Form.Label>
      <Form.Control
        type="number"
        step="1"
        name="age"
        value={age ?? ''}
        onChange={(e) => setAge(+e.target.value)}
      />
      <InputGroup.Append>
        <InputGroup.Text id="years-addon">years</InputGroup.Text>
      </InputGroup.Append>
    </Form.Group>
  );
};

export default AgeInput;
