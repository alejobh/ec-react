import { useState, useEffect } from 'react';

import { errorApiHandler } from '../../utils/errorHandler';

const useRequest = ({ request, payload }) => {
  const [isLoading, setIsLoading] = useState();
  const [submitError, setSubmitError] = useState([]);
  const [response, setResponse] = useState();

  const sendRequest = dataPayload => {
    setIsLoading(true);
    request(dataPayload).then(data => {
      if (data && data.ok) {
        setSubmitError(null);
      } else {
        setSubmitError(errorApiHandler(data));
      }
      setIsLoading(false);
      setResponse(data);
    });
  };

  useEffect(() => {
    if (!payload || !Object.entries(payload).length) {
      return;
    }

    sendRequest(payload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload, request]);
  return [isLoading, submitError, response, sendRequest];
};

export default useRequest;
