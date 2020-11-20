import { useEffect } from 'react';

import useLazyRequest from './useLazyRequest';

const useRequest = ({ request, payload }) => {
  const [isLoading, submitError, response, sendRequest] = useLazyRequest({ request });

  useEffect(() => {
    sendRequest(payload);
  }, [payload, sendRequest]);

  return [isLoading, submitError, response, sendRequest];
};

export default useRequest;
