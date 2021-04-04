const { query, validationResult } = require('express-validator');
require('dotenv').config();

/// HELPERS ///
const {
  getSexAndAge,
  getWeight,
  getHeight,
} = require('./helpers/patientHelpers');

const patientData = async (req, res, next) => {
  try {
    const respArray = await Promise.all([
      // Hardcoded URLs in ENV. Able to request different resources by passing different URLs in future
      getSexAndAge(process.env.SEX_AND_AGE_PATH),
      getWeight(process.env.WEIGHT_PATH),
      getHeight(process.env.HEIGHT_PATH),
    ]);

    // Format response object
    const resp = { ...respArray[0], ...respArray[1], ...respArray[2] };

    res.json(resp);
  } catch (error) {
    return next(error);
  }
};

const validateCalculation = () => {
  return [
    query('sex', 'Invalid Sex').exists().isString().isIn(['male', 'female']),
    query('age', 'Invalid age').exists().isInt(),
    query('weight').exists().isNumeric(),
    query('creatinine').exists().isNumeric(),
    query('height').exists().isNumeric(),
  ];
};

const calculation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  let { sex, age, weight, creatinine, height } = req.query;

  let calculatedScore = 0;
  let severity;

  // Sex = Male is 1 point, Female is 0 points
  if (sex === 'male') calculatedScore++;

  // Age > 40 is 1 point, <= 40 is 0 points
  if (age > 40) calculatedScore++;

  // Weight > 60 is 1 point, <= 50 is 0 points
  if (weight > 60) calculatedScore++;

  // Creatinine > .7 is 1 point, <=.7 is 0 points
  if (creatinine > 0.7) calculatedScore++;

  // Height > 160 is 1 point, <=160 is 0 points
  if (height > 160) calculatedScore++;

  // “Low” if the score is <= 3 and “High” if the score is > 3.
  calculatedScore > 3 ? (severity = 'High') : (severity = 'Low');

  res.json({ calculatedScore, severity });
};

module.exports = { patientData, validateCalculation, calculation };
