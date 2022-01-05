import { Button, Flex, FormControl, Spinner } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';
import {
  MeDocument,
  MeQuery,
  RegisterInput,
  useRegisterMutation,
} from '../generated/graphql';
import { mapFieldErrors } from '../helpers/mapFieldErrors';
import { useCheckAuth } from '../utils/useCheckAuth';

const Register = () => {
  const router = useRouter();
  const { data: authData, loading: authLoading } = useCheckAuth();

  const initialInputValues: RegisterInput = {
    username: '',
    email: '',
    password: '',
  };

  const [registerUser, { loading: _registerUserLoading, data, error }] =
    useRegisterMutation();

  const onRegisterSubmit = async (
    values: RegisterInput,
    { setErrors }: FormikHelpers<RegisterInput>
  ) => {
    const response = await registerUser({
      variables: {
        registerInput: values,
      },
      update(cache, { data }) {
        // const meData = cache.readQuery({ query: MeDocument })
        // console.log('MEDATA', meData)

        if (data?.register.success) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: { me: data.register.user },
          });
        }
      },
    });

    if (response.data?.register.errors) {
      setErrors(mapFieldErrors(response.data.register.errors));
    } else if (response.data?.register.user) {
      router.push('/');
    }
  };
  return (
    <>
      {authLoading || (!authLoading && authData?.me) ? (
        <Flex justifyContent="center" alignItems="center" minH="100vh">
          <Spinner />
        </Flex>
      ) : (
        <Wrapper>
          {error && <p>Failed to register</p>}
          {data && data.register.success ? <p>success</p> : <p>fail</p>}
          <Formik
            initialValues={initialInputValues}
            onSubmit={onRegisterSubmit}
          >
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
      )}
    </>
  );
};

export default Register;
