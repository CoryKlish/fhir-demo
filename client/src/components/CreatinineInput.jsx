import React from 'react';
import { Form } from 'react-bootstrap';

const CreatinineInput = ({ creatinine, setCreatinine }) => {
  return (
    <Form.Group controlId="formCreatinine">
      <Form.Label column sm="2">
        Creatinine
      </Form.Label>
      <Form.Control
        type="number"
        name="creatinine"
        value={creatinine ?? ''}
        onChange={(e) => setCreatinine(+e.target.value)}
      />
    </Form.Group>
  );
};

export default CreatinineInput;
