import { useState, useEffect } from 'react';

import { errorApiHandler } from '../../utils/errorHandler';

const useRequest = ({ request, payload }) => {
  const [isLoading, setIsLoading] = useState();
  const [submitError, setSubmitError] = useState([]);

  const sendRequest = () => {
    setIsLoading(true);
    request(payload).then(response => {
      if (response && response.ok) {
        setSubmitError([]);
        // eslint-disable-next-line no-console
        console.log(response);
      } else {
        setSubmitError(errorApiHandler(response));
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (!payload || !Object.entries(payload).length) {
      return;
    }

    sendRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload, request]);
  return [isLoading, submitError, sendRequest];
};

export default useRequest;
