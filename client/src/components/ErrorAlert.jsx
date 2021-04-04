import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

const ErrorAlert = ({ message }) => {
  const [showAlert, setShowAlert] = useState(true);

  return (
    <Alert
      variant="danger"
      show={showAlert}
      onClose={() => setShowAlert(false)}
      dismissible
    >
      <Alert.Heading>Error!</Alert.Heading>
      {message.map((err, index) => (
        <p key={index}>{err.msg}</p>
      ))}
    </Alert>
  );
};

export default ErrorAlert;
