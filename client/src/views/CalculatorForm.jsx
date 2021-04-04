import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Spinner, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import useFetch from 'use-http';
import SexRadioToggle from '../components/SexRadioToggle';
import AgeInput from '../components/AgeInput';
import WeightInput from '../components/WeightInput';
import CreatinineInput from '../components/CreatinineInput';
import HeightInput from '../components/HeightInput';
import InfoPopover from '../components/InfoPopover';

const CalculatorForm = () => {
  // Form State
  const [sex, setSex] = useState(null);
  const [age, setAge] = useState(null);
  const [weight, setWeight] = useState(null);
  const [creatinine, setCreatinine] = useState(null);
  const [height, setHeight] = useState(null);
  const [results, setResults] = useState(null);

  // Alert State
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);

  /// API ///

  // GET patient data on component load
  const {
    loading: loadingData,
    error: patientError,
    data: patientData = {},
  } = useFetch('/api/data', []);

  // GET pop over data on component load
  const {
    loading: loadingPopOver,
    error: popOverError,
    data: popOverData = null,
  } = useFetch('/api/extra-info', []);

  // GET calculator respose. Triggered on form submit
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
    if (!calcResponse?.ok) {
      setErrorMessage(() => calcResponse.data.errors);
      setShowAlert(() => true);

      // Remove previous results
      setResults(null);
    } else {
      setResults(calcResponse.data);
    }
  };

  useEffect(() => {
    if (popOverError || patientError) {
      setErrorMessage(() => 'Error loading content');
      setShowAlert(() => true);
    } else {
      setSex(patientData.gender);
      setAge(patientData.age);
      setWeight(patientData.weight);
      setHeight(patientData.height);
    }
  }, [patientData, popOverError, patientError]);

  if (loadingData || loadingPopOver) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      {/* Render pop over if not loading and response */}
      {!loadingPopOver && popOverData && <InfoPopover data={popOverData} />}
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
        <div style={{ marginTop: 10 }}>
          Results: score {results.calculatedScore}, {results.severity}
        </div>
      )}
      <Alert
        style={{
          marginTop: 10,
          width: '50%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
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
    </Container>
  );
};

export default CalculatorForm;
