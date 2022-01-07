import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';

interface InputFieldProps {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  textarea?: boolean;
}

const InputField = ({textarea, ...props}: InputFieldProps) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
      {textarea ? (
        <Textarea {...field} id={field.name} {...props} height={60} />
      ) : (
        <Input {...field} id={field.name} {...props}></Input>
      )}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default InputField;
