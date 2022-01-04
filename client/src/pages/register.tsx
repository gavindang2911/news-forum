import { Button, FormControl } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { RegisterInput, useRegisterMutation } from '../generated/graphql';

const Register = () => {
  const initialInputValues: RegisterInput = {
    username: '',
    email: '',
    password: '',
  };

  const [registerUser, { loading: _registerUserLoading, data, error }] =
    useRegisterMutation();

  const onRegisterSubmit = async (values: RegisterInput) => {
    const response = await registerUser({
      variables: {
        registerInput: values,
      },
    });

    console.log('Response', response);
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
