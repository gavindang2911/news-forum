import { FieldError } from '../generated/graphql';

export const mapFieldErrors = (errors: FieldError[]): {[key: string]: string} => {
  return errors.reduce(
    (errorsObj, error) => ({
      ...errorsObj,
      [error.field]: error.message,
    }),
    {}
  );
};
