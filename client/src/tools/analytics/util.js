export const isAjaxError = error => error && error.request && error.request instanceof XMLHttpRequest;

export const parseError = (type, error) => {
  let parsedError = `There's been an error in action "${type}"\n`;

  if (isAjaxError(error)) {
    parsedError = `${parsedError}
      message: ${error.request.responseText}\n
      data: ${JSON.stringify(error.config.data)}`;

    return parsedError;
  }

  return `${parsedError}error: ${JSON.stringify(error)}`;
};

export const resolveGaPayload = (payload, config) => {
  const { payloadAttributes } = config;

  const gaPayload = payloadAttributes.reduce((accum, item) => {
    const joiner = accum.length ? ', ' : '';
    const newAccum = `${accum}${joiner}${item.label}: ${JSON.stringify(payload[item.attr])}`;
    return newAccum;
  }, '');

  return gaPayload;
};
