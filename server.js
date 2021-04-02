const express = require('express');
const path = require('path');

const axios = require('axios');
axios.defaults.baseURL = 'https://open-ic.epic.com/FHIR/api/FHIR/DSTU2';

const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());

// Serve static files from React
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/data', async (req, res, next) => {
  try {
    const respArray = await Promise.all([
      getSexAndAge(),
      getWeight(),
      getHeight(),
    ]);

    // Format response object
    const resp = { ...respArray[0], ...respArray[1], ...respArray[2] };

    res.json(resp);
  } catch (error) {
    return next(error);
  }
});

const getSexAndAge = async () => {
  // Sex and Age info can be fetched via GET
  const sexAndAgePath =
    '/Patient/Tbt3KuCY0B5PSrJvCu2j-PlK.aiHsu2xUjUM8bWpetXoB';

  const res = await axios.get(sexAndAgePath);

  if (res.status !== 200 || !res.data) throw new Error('Request Error');

  const { gender, birthDate } = res.data;

  if (!birthDate || !gender) throw new Error('Invalid Patient Data');

  const diff = new Date(Date.now() - new Date(birthDate).getTime());
  const age = Math.abs(diff.getUTCFullYear() - 1970);

  return { gender, age };
};

const getWeight = async () => {
  // Weight info can be fetched via GET, use the latest (most recent) value
  const weightPath =
    '/Observation?patient=Tbt3KuCY0B5PSrJvCu2j-PlK.aiHsu2xUjUM8bWpetXoB&code=29463-7';

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

const getHeight = async () => {
  // Height info can be fetched via GET, use the latest (most recent) value
  const heightPath =
    '/Observation?patient=Tbt3KuCY0B5PSrJvCu2j-PlK.aiHsu2xUjUM8bWpetXoB&code=8302-2';

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

// React handle all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, () => console.log(`Running on port ${port}`));
