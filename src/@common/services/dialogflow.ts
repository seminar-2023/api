import dialogflow from '@google-cloud/dialogflow';

console.log(process.env.DIALOGFLOW_PROJECT_ID);

const DIALOGFLOW_CONFIG = {
  PROJECT_ID: 'pro-equinox-374617',
  LANGUAGE_CODE: 'es',
};
const sessionClient = new dialogflow.SessionsClient();

export async function detectIntent(query, sessionId) {
  const sessionPath = sessionClient.projectAgentSessionPath(
    DIALOGFLOW_CONFIG.PROJECT_ID,
    sessionId,
  );

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: DIALOGFLOW_CONFIG.LANGUAGE_CODE,
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  return responses[0];
}
