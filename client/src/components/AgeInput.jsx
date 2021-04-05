import React from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';

const AgeInput = ({ age, setAge }) => {
  return (
    <InputGroup className="mb-3">
      <Form.Label column sm="2">
        Age
      </Form.Label>
      <FormControl
        type="number"
        step="1"
        name="age"
        value={age ?? ''}
        onChange={(e) => setAge(e.target.value)}
      />
      <InputGroup.Append>
        <InputGroup.Text id="years-addon">years</InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default AgeInput;
