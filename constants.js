module.exports = Object.freeze({
  FHIR_BASE_URL: 'https://open-ic.epic.com/FHIR/api/FHIR/DSTU2',
  SEX_AND_AGE_PATH: '/Patient/Tbt3KuCY0B5PSrJvCu2j-PlK.aiHsu2xUjUM8bWpetXoB',
  WEIGHT_PATH:
    '/Observation?patient=Tbt3KuCY0B5PSrJvCu2j-PlK.aiHsu2xUjUM8bWpetXoB&code=29463-7',
  HEIGHT_PATH:
    '/Observation?patient=Tbt3KuCY0B5PSrJvCu2j-PlK.aiHsu2xUjUM8bWpetXoB&code=8302-2',
  POPOVER_DATA: {
    whenToUse: [
      'Assessing a patient’s renal function',
      'Prescribing a drug that is renally metabolized',
    ],
    pearlsPitfaills: {
      title:
        'From Dan Brown, PharmD, at Palm Beach Atlantic University, the primary author of the functional range of creatinine clearance paper:',
      text:
        'The Cockcroft-Gault equation remains the gold standard after almost 40 years, despite inaccuracies that arise from variations in body composition among patients. Those who understand potential sources of error can adjust accordingly.',
    },
  },
});
