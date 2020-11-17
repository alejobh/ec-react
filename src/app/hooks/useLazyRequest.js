import { useState } from 'react';

import { errorApiHandler } from '../../utils/errorHandler';

const useLazyRequest = ({ request }) => {
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
  return [isLoading, submitError, response, sendRequest];
};

export default useLazyRequest;
