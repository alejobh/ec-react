import { useState, useEffect } from 'react';

const useRequest = resource => {
  const [isLoading, setIsLoading] = useState();
  const [submitErrors, setSubmitErrors] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submit, setSubmit] = useState({});
  const [response, setResponse] = useState({});

  useEffect(() => {
    if (!Object.entries(submit).length) {
      return;
    }

    setIsLoading(true);
    resource(submit).then(data => {
      if (!data.ok && data.data.errors && data.data.errors.full_messages) {
        setSubmitErrors(data.data.errors.full_messages);
      } else {
        setIsSuccess(true);
        setResponse(data);
        setSubmitErrors([]);
        // eslint-disable-next-line no-console
        console.log(data);
      }
      setIsLoading(false);
    });
  }, [resource, submit]);
  return [isLoading, submitErrors, setSubmit, isSuccess, response];
};

export default useRequest;
