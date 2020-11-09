export const isPasswordEqual = (password: string, passwordConfirm) => password === passwordConfirm;

export const emailPattern = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  message: 'email inválido'
};
