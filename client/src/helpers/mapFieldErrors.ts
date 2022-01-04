import { FieldError } from '../generated/graphql';

export const mapFieldErrors = (errors: FieldError[]) => {
  return errors.reduce(
    (errorsObj, error) => ({
      ...errorsObj,
      [error.field]: error.message,
    }),
    {}
  );
};
