import { useMutation } from '@apollo/client';
import { Button, FormControl } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { registerMutation } from '../graphql-client/mutations';

const Register = () => {
  const initialInputValues: NewUserInput = {
    username: '',
    email: '',
    password: '',
  };
  interface UserMutationResponse {
    code: number;
    success: boolean;
    message: string;
    user: string;
    errors: string;
  }

  interface NewUserInput {
    username: string;
    email: string;
    password: string;
  }

  const [registerUser, { data, error }] = useMutation<
    { register: UserMutationResponse },
    { registerInput: NewUserInput }
  >(registerMutation);

  const onRegisterSubmit = (values: NewUserInput) => {
    return registerUser({
      variables: {
        registerInput: values,
      },
    });
  };
  return (
    <Wrapper>
      {error && <p>Failed to register</p>}
      {data && data.register.success ? <p>success</p> : <p>fail</p>}
      <Formik initialValues={initialInputValues} onSubmit={onRegisterSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <FormControl>
              <InputField
                name="username"
                label="Username"
                placeholder="Enter Username"
                type="text"
              />
              <br />
              <InputField
                name="email"
                label="Email"
                placeholder="Enter Email"
                type="text"
              />
              <br />
              <InputField
                name="password"
                label="Password"
                placeholder="Enter Password"
                type="password"
              />
              <Button
                type="submit"
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
              >
                Register
              </Button>
            </FormControl>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
