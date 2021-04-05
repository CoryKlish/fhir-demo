import React from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';

const HeightInput = ({ height, setHeight }) => {
  return (
    <InputGroup className="mb-3">
      <Form.Label column sm="2">
        Height
      </Form.Label>
      <FormControl
        type="number"
        name="height"
        value={height ?? ''}
        onChange={(e) => setHeight(e.target.value)}
      />
      <InputGroup.Append>
        <InputGroup.Text id="cm-addon">cm</InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default HeightInput;
