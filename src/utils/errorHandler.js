import { t } from 'i18next';

export const errorApiHandler = response => {
  let error = t('Errors:apiError');

  const { data } = response;

  if (data && data.errors && data.errors.fullMessages && data.errors.fullMessages.length) {
    error = data.errors.fullMessages[0];
  }

  return error;
};
