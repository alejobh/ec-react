import { useState } from 'react';

import { errorApiHandler } from '../../utils/errorHandler';

const useRequest = ({ request }) => {
  const [isLoading, setIsLoading] = useState();
  const [submitError, setSubmitError] = useState();
  const [response, setResponse] = useState();

  const sendRequest = dataPayload => {
    if (isLoading) {
      return;
    }
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
  };

  return [isLoading, submitError, response, sendRequest];
};

export default useRequest;
