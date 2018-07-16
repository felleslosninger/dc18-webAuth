import {ServerSchemes} from "./enums";

const webAuthnConfig = {
  timeout: 30000,
  username: 'Per',
  registerChallengeMethod: 'POST',
  registerChallengeEndpoint: 'https://localhost:4567/register',
  authenicateChallengeEndpoint: 'https://localhost:4567/authenticate',
  registerResponseEndpoint: 'https://localhost:4567/register/finish',
  authenticateResponseEndpoint: 'https://localhost:4567/authenticate/finish',
  registerResponseMethod: 'POST',
  serverScheme: ServerSchemes.SPARK,
};

export default webAuthnConfig;
