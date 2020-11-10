import { t } from 'i18next';

export const errorApiHandler = response => {
  let error = t('Errors:apiError');

  const { data } = response;

  if (data && data.errors && Array.isArray(data.errors) && data.errors.length) {
    error = data.errors[0];
  }

  if (data && data.errors && data.errors.full_messages && data.errors.full_messages.length) {
    error = data.errors.full_messages[0];
  }

  return error;
};
