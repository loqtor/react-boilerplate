import axios from 'axios';

const ENVIRONMENT_TO_HOST = {
  baseUrl: process.env.REACT_APP_API_BASE_URL,
};

const ABSOLUTE_URL_REGEX = /^https?:\/\/|^\/\//i;

const isRequestSuccessful = (response) => {
  const statusFirstDigit = response.request.status.toString().charAt(0);
  return statusFirstDigit !== '4' && statusFirstDigit !== '5';
};

const processParams = (url, params) => {
  const baseUrl = `${url}?`;

  return Object.entries(params).reduce((accum, param) => {
    if (accum !== baseUrl) {
      return `${accum}&${param[0]}=${param[1]}`;
    }

    return `${accum}${param[0]}=${param[1]}`;
  }, baseUrl);
};

/*
 * Yes, axios does not give an option for this. GET parameters must be included
 * as part of the URL.
 */
const prepareGetRequest = (url, data, hasParams) => {
  let finalUrl = hasParams ? `${url}` : `${url}?`;

  data.map((datum) => {
    if (finalUrl !== `${url}?`) {
      finalUrl += '&';
    }

    finalUrl = `${finalUrl}${datum}=${data[datum]}`;

    return finalUrl;
  });
};

export async function makeRequest(uri, method, headers, data, params = undefined) {
  const requestMethod = method || 'get';
  const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  const { baseUrl } = ENVIRONMENT_TO_HOST;
  const requestUrl = ABSOLUTE_URL_REGEX.test(uri) ? uri : `${baseUrl || ''}${uri}`;

  const hasParams = params !== undefined;

  /** Process params object and return concatenated base URL and any params */
  const processedUrl = hasParams ? processParams(requestUrl, params) : requestUrl;
  const finalUrl = requestMethod === 'get' ? prepareGetRequest(processedUrl, data, hasParams) : processedUrl;

  const response = await axios({
    url: finalUrl,
    method: requestMethod,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    data,
  });

  if (isRequestSuccessful(response)) {
    return response.data;
  }

  throw response.response;
}

export default makeRequest;

export async function fetchJSON(url) {
  const response = await axios({
    url,
    method: 'get',
  });

  if (isRequestSuccessful(response)) {
    return response.data;
  }

  throw response.response;
}
