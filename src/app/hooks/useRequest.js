import { useEffect } from 'react';

import useLazyRequest from './useLazyRequest';

const useRequest = ({ request, payload }) => {
  const [isLoading, submitError, response, sendRequest] = useLazyRequest({ request });

  useEffect(() => {
    if (!isLoading && !response) {
      sendRequest(payload);
    }
  }, [payload, isLoading, sendRequest, response]);

  return [isLoading, submitError, response, sendRequest];
};

export default useRequest;
