import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2022-04-07',
  authenticator: new IamAuthenticator({
    apikey: process.env.API_KEY,
  }),
  serviceUrl: process.env.API_URL,
});

const analyzeParams = {
  'text': 'I am happy today',
  'features': {
    'keywords': {
      'emotion': false,
      'sentiment': true,
      'limit': 1,
    },
  },
};

naturalLanguageUnderstanding.analyze(analyzeParams)
  .then((analysisResults: any) => {
    // console.log(JSON.stringify(analysisResults, null, 2));
    res.send(analysisResults);
  })
  .catch((err: any) => {
    console.log('error:', err);
  });
  }