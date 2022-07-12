export const required = (value) => (value ? undefined : 'Required');

export const number = (value) =>
  value && (Number.isNaN(Number(value)) || /\D/.test(value))
    ? 'Must be a number'
    : undefined;

    export const email = value => (
      value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z0-9-]{2,63}$/i.test(value)
        ? 'Invalid email address'
        : undefined
    );

export const composeValidators =(...validators) =>(value) => 
      validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    );
