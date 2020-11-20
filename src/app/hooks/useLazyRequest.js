import { useState, useCallback } from 'react';

import { errorApiHandler } from '../../utils/errorHandler';

const useLazyRequest = ({ request }) => {
  const [isLoading, setIsLoading] = useState();
  const [submitError, setSubmitError] = useState([]);
  const [response, setResponse] = useState();

  const sendRequest = useCallback(
    dataPayload => {
      setIsLoading(true);
      request(dataPayload).then(data => {
        if (data && data.ok) {
          setSubmitError(null);
        } else {
          setSubmitError(errorApiHandler(data));
        }
        setResponse(data);
        setIsLoading(false);
      });
    },
    [request]
  );

  return [isLoading, submitError, response, sendRequest];
};

export default useLazyRequest;
