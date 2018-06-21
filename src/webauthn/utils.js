import _ from 'lodash';

import {WebAuthnHelpers} from './webauthn';
import formurlencoded from "form-urlencoded";
import webAuthnConfig from './config';
import {ServerSchemes, ContentTypes} from "./enums";

export const getDecodedObject = (obj, paths) => {
  const clonedObj = {..._.clone(obj)};
  for (let path of paths) {
    _.update(clonedObj, path, WebAuthnHelpers.utils.coerceToArrayBuffer);
  }
  return clonedObj;
};

export const getEncodedObject = (obj, paths) => {
  const result = {};
  for (let path of paths) {
    _.set(result, path, WebAuthnHelpers.utils.coerceToBase64Url(_.get(obj, path)));
  }
  return {..._.toPlainObject(obj), ...result};
};

export const getCreateCredentialsOptions = (serverResponse) => {
  return {
    publicKey: serverResponse,
  };
};

export const getRegisterResponseObject = (publicKeyCredential) => {
  return publicKeyCredential;
};

export const getFetchOptions = (data, contentType) => {
  const defaultHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
  };
  const defaultOptions = {
    headers: defaultHeaders,
    body: JSON.stringify(data),
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
  };
  const resultOptions = {};
  const resultHeaders = {};

  switch (webAuthnConfig.serverScheme) {
    case ServerSchemes.YUBICO:
      break;
    default:
      break;
  }
  switch (contentType) {
    case ContentTypes.JSON:
      resultHeaders['Content-Type'] = ContentTypes.JSON;
      resultOptions.body = JSON.stringify(data);
      break;
    case ContentTypes.URLENCODED:
      defaultOptions.headers["Content-Type"] = ContentTypes.URLENCODED;
      defaultOptions.body = formurlencoded(data);
      break;
    default:
      break;
  }
  return {
    ...defaultOptions,
    headers: {...defaultHeaders, resultHeaders},
    ...resultOptions,
  };
};
