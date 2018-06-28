import {ServerSchemes} from "./enums";

const webAuthnConfig = {
  timeout: 30000,
  username: 'Per',
  registerChallengeMethod: 'POST',
  registerChallengeEndpoint: 'https://localhost:4567/register',
  authenicateChallengeEndpoint: 'https://localhost:8443/webauthn/api/v1/authenticate',
  registerResponseEndpoint: 'https://localhost:4567/register/finish',
  authenticateResponseEndpoint: 'https://localhost:8443/webauthn/api/v1/authenticate/finish',
  registerResponseMethod: 'POST',
  serverScheme: ServerSchemes.SPARK,
};

export default webAuthnConfig;
