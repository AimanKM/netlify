export const required = (value) => (value ? undefined : 'Required');

export const number = (value) =>
  value && (Number.isNaN(Number(value)) || /\D/.test(value))
    ? 'Must be a number'
    : undefined;

export const composeValidators =(...validators) =>(value) => 
      validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );
