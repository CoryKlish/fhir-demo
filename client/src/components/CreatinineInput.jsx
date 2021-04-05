import React from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';

/**
 * Input component for creatinine
 *
 * @param {number} creatinine - creatinine state
 * @param {function} setCreatinine - setter function for creatinine
 *
 * @returns {JSX.Element}
 */
const CreatinineInput = ({ creatinine, setCreatinine }) => {
  return (
    <InputGroup className="mb-3">
      <Form.Label column sm="2">
        Creatinine
      </Form.Label>
      <FormControl
        type="number"
        name="creatinine"
        value={creatinine ?? ''}
        onChange={(e) => setCreatinine(e.target.value)}
      />
      <InputGroup.Append>
        <InputGroup.Text id="mgdl-addon">mg/dl</InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default CreatinineInput;
