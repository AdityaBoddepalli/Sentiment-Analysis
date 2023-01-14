import type {NextApiRequest, NextApiResponse} from 'next'

type Data = {
    sadness: Number,
    joy: Number,
    fear: Number,
    disgust: Number,
    anger: Number
}

const api_key = process.env.API_KEY;
const api_url = process.env.API_URL;

function getNLUInstance() {
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');
  
    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2022-04-07',
        authenticator: new IamAuthenticator ({
            apikey: api_key
        }),
        serviceUrl: api_url
    });
    return naturalLanguageUnderstanding;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
  let textToAnalyze = req.query.text;
  const analyzeParams = {
    'text': textToAnalyze,
    'features': {
      'keywords': {
        'emotion': true,
        'sentiment': false,
        'limit': 1,
      },
    },
  };

  const naturalLanguageUnderstanding = getNLUInstance();

  naturalLanguageUnderstanding.analyze(analyzeParams)
  .then((analysisResults: any) => {
      return res.send(analysisResults.result.keywords[0].emotion);
  })
  .catch((err: string) => {
      return res.status(500);
  });

}