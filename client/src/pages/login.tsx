import { Button, FormControl } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import { LoginInput, useLoginMutation } from '../generated/graphql';
import { mapFieldErrors } from '../helpers/mapFieldErrors';

const Login = () => {
  const router = useRouter();
  const initialInputValues: LoginInput = {
    usernameOrEmail: '',
    password: '',
  };

  const [loginUser, { loading: _loginUserLoading, data, error }] =
    useLoginMutation();

  const onLoginSubmit = async (
    values: LoginInput,
    { setErrors }: FormikHelpers<LoginInput>
  ) => {
    const response = await loginUser({
      variables: {
        loginInput: values,
      },
    });

    if (response.data?.login.errors) {
      setErrors(mapFieldErrors(response.data.login.errors));
    } else if (response.data?.login.user) {
      router.push('/');
    }
  };
  return (
    <Wrapper>
      {error && <p>Failed to login</p>}
      {data && data.login.success ? <p>success</p> : null}
      <Formik initialValues={initialInputValues} onSubmit={onLoginSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <FormControl>
              <InputField
                name="usernameOrEmail"
                label="Username or Email"
                placeholder="Enter Username or Email"
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
                Login
              </Button>
            </FormControl>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;
