require('dotenv').config();

const axios = require('axios');
// Base URL for all patient requests
axios.defaults.baseURL = process.env.FHIR_BASE_URL;

/** Retrieve patient sex and age
 *
 * @param {string} sexAndAgePath - Path to request
 * @returns {Object} sex and age
 */
const getSexAndAge = async (sexAndAgePath) => {
  const res = await axios.get(sexAndAgePath);

  if (res.status !== 200 || !res.data) throw new Error('Request Error');

  const { gender, birthDate } = res.data;

  if (!birthDate || !gender) throw new Error('Invalid Patient Data');

  const diff = new Date(Date.now() - new Date(birthDate).getTime());
  const age = Math.abs(diff.getUTCFullYear() - 1970);

  return { gender, age };
};

/** Retrieve patient sex and age
 *
 * @param {string} weightPath - Path to request
 * @returns {Object} weight
 */
const getWeight = async (weightPath) => {
  const res = await axios.get(weightPath);

  if (res.status !== 200 || !res.data) throw new Error('Request Error');

  // Most recent is in first entry
  const weight =
    res.data.entry &&
    res.data.entry.length &&
    res.data.entry[0].resource &&
    res.data.entry[0].resource.valueQuantity &&
    res.data.entry[0].resource.valueQuantity.value;

  if (!weight) throw new Error('No weight found');

  return { weight };
};

/** Retrieve patient sex and age
 *
 * @param {string} heightPath - Path to request
 * @returns {Object} height
 */
const getHeight = async (heightPath) => {
  const res = await axios.get(heightPath);

  if (res.status !== 200 || !res.data) throw new Error('Request Error');

  // Most recent is in first entry
  const height =
    res.data.entry &&
    res.data.entry.length &&
    res.data.entry[0].resource &&
    res.data.entry[0].resource.valueQuantity &&
    res.data.entry[0].resource.valueQuantity.value;

  if (!height) throw new Error('No height found');

  return { height };
};

module.exports = { getSexAndAge, getWeight, getHeight };
