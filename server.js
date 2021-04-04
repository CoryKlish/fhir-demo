const express = require('express');
const path = require('path');
const cors = require('cors');
const http = require('http');
const enforce = require('express-sslify');

/// IMPORT CONTROLLERS ///
const patientController = require('./controllers/patient/patientController');

/// INIT App ///
const app = express();
const port = process.env.PORT || 5000;

// Serve static files from React
app.use(express.static(path.join(__dirname, 'client/build')));

// CORS Policy
app.use(cors());

app.use(enforce.HTTPS({ trustProtoHeader: true }));

/////////////////////// END CONFIG ///////////////////////

/// PATIENT ROUTES ///

// GET patient data (sex, age, weight, height)
app.get('/api/data', patientController.patientData);

// GET calculated creatinine levels
app.get(
  '/api/calculation',
  patientController.validateCalculation(),
  patientController.calculation,
);

// GET extra tab info
app.get('/api/extra-info', patientController.extraInfo);

// React handles all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// Error handler
app.use(async (err, req, res, next) => {
  return res.status(500).json({
    errors: [{ msg: err.message.toString() }],
  });
});

// app.listen(port, () => console.log(`Running on port ${port}`));
http.createServer(app).listen(app.get('port'), () => {
  console.log(`Running on port ${port}`);
});
