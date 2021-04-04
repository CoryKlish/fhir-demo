import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import useFetch from 'use-http';
import SexRadioToggle from '../components/SexRadioToggle';
import AgeInput from '../components/AgeInput';
import WeightInput from '../components/WeightInput';
import CreatinineInput from '../components/CreatinineInput';
import HeightInput from '../components/HeightInput';

const CalculatorForm = () => {
  const [sex, setSex] = useState(null);
  const [age, setAge] = useState(null);
  const [weight, setWeight] = useState(null);
  const [creatinine, setCreatinine] = useState(null);
  const [height, setHeight] = useState(null);
  const [results, setResults] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);

  const { loading, error, data = [] } = useFetch('/api/data', []);
  const { get, response: calcResponse } = useFetch('/api/calculation');

  const handleSubmit = async (e) => {
    // Do not reload page
    e.preventDefault();

    // Pack query params
    const params = new URLSearchParams({
      sex,
      age,
      weight,
      creatinine,
      height,
    });

    await get(params);

    // Display error on fail
    if (!calcResponse.ok) {
      setErrorMessage(() => calcResponse.data.errors);
      setShowAlert(() => true);
      setResults(null);
    } else {
      setResults(calcResponse.data);
    }
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(() => data.errors);
      setShowAlert(() => true);
    } else {
      setSex(data.gender);
      setAge(data.age);
      setWeight(data.weight);
      setHeight(data.height);
    }
  }, [data, error]);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <>
      <div>
        <Form onSubmit={handleSubmit}>
          <SexRadioToggle sex={sex} setSex={setSex} />
          <AgeInput age={age} setAge={setAge} />
          <WeightInput weight={weight} setWeight={setWeight} />
          <CreatinineInput
            creatinine={creatinine}
            setCreatinine={setCreatinine}
          />
          <HeightInput height={height} setHeight={setHeight} />
          <Button variant="primary" type="submit">
            Calculate
          </Button>
        </Form>
      </div>
      {results && (
        <div>
          Results: score {results.calculatedScore}, {results.severity}
        </div>
      )}
      <Alert
        show={showAlert}
        variant="danger"
        onClose={() => setShowAlert(false)}
        dismissible
      >
        <Alert.Heading>Error!</Alert.Heading>
        {errorMessage.map((err, index) => (
          <p key={index}>{err.msg}</p>
        ))}
      </Alert>
    </>
  );
};

export default CalculatorForm;
