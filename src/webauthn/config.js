import {ServerSchemes} from "./enums";

const webAuthnConfig = {
  timeout: 30000,
  username: 'Per',
  registerChallengeMethod: 'POST',
  registerChallengeEndpoint: 'https://localhost:8443/webauthn/api/v1/register',
  registerResponseEndpoint: 'https://localhost:8443/webauthn/api/v1/register/finish',
  registerResponseMethod: 'POST',
  serverScheme: ServerSchemes.YUBICO,
};

export default webAuthnConfig;
