import React, { useState, useEffect } from 'react';
import {
  InputGroup,
  Form,
  Row,
  Col,
  ToggleButtonGroup,
  ToggleButton,
} from 'react-bootstrap';
import { useCalculatorForm } from '../hooks/useCalculatorForm';
import useFetch from 'use-http';
import 'bootstrap/dist/css/bootstrap.min.css';

const CalculatorForm = () => {
  const [values, setValue] = useCalculatorForm({
    sex: '',
    age: '',
    weight: '',
    creatinine: '',
    height: '',
  });
  const [age, setAge] = useState();
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();

  const { loading, error, data = [] } = useFetch('/api/data', []);

  useEffect(() => {
    setAge(data.age);
  }, [data]);

  const handleChange = (e) => setAge(e.target.value);

  if (error) {
    return <div>Error retrieving data</div>;
  }

  return (
    <div>
      {!loading && JSON.stringify(data)}
      <Form>
        <Form.Group as={Row} controlId="formSex">
          <Col sm="10">
            <Form.Label column sm="2">
              Sex
            </Form.Label>
            <ToggleButtonGroup type="radio" name="options">
              <ToggleButton value={1}>Male</ToggleButton>
              <ToggleButton value={2}>Female</ToggleButton>
            </ToggleButtonGroup>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formAge">
          <Col sm="10">
            <Form.Label column sm="2">
              Age
            </Form.Label>
            <Form.Control
              type="text"
              name="age"
              value={age}
              onChange={handleChange}
            />
            <InputGroup.Append>
              <InputGroup.Text id="years-addon">years</InputGroup.Text>
            </InputGroup.Append>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formWeight">
          <Col sm="10">
            <Form.Label column sm="2">
              Weight
            </Form.Label>
            <Form.Control
              type="text"
              name="weight"
              value={values.weight}
              onChange={setValue}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formCreatinine">
          <Col sm="10">
            <Form.Label column sm="2">
              Creatinine
            </Form.Label>
            <Form.Control
              type="text"
              name="creatinine"
              value={values.creatinine}
              onChange={setValue}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHeight">
          <Col sm="10">
            <Form.Label column sm="2">
              Height
            </Form.Label>
            <Form.Control
              type="text"
              name="height"
              value={values.height}
              onChange={setValue}
            />
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default CalculatorForm;
