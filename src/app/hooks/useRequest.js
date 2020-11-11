import { useState, useEffect } from 'react';

import { errorApiHandler } from '../../utils/errorHandler';

const useRequest = ({ request, payload }) => {
  const [isLoading, setIsLoading] = useState();
  const [submitError, setSubmitError] = useState([]);
  const [response, setResponse] = useState();

  const sendRequest = () => {
    setIsLoading(true);
    request(payload).then(data => {
      if (data && data.ok) {
        setSubmitError([]);
        // eslint-disable-next-line no-console
        console.log(data);
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

    sendRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload, request]);
  return [isLoading, submitError, sendRequest, response];
};

export default useRequest;
