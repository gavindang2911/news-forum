import { Button, Flex, Link, Spinner, useToast } from '@chakra-ui/react';
import { Form, Formik, FormikHelpers } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import InputField from '../components/InputField';
import Layout from '../components/Layout';
import {
  LoginInput,
  MeDocument,
  MeQuery,
  useLoginMutation
} from '../generated/graphql';
import { mapFieldErrors } from '../helpers/mapFieldErrors';
import { initializeApollo } from '../lib/apolloClient';
import { useCheckAuth } from '../utils/useCheckAuth';

const Login = () => {
  const router = useRouter();

  const toast = useToast();

  const { data: authData, loading: authLoading } = useCheckAuth();

  const initialInputValues: LoginInput = {
    usernameOrEmail: '',
    password: '',
  };

  const [loginUser, { loading: _loginUserLoading, error }] =
    useLoginMutation();

  const onLoginSubmit = async (
    values: LoginInput,
    { setErrors }: FormikHelpers<LoginInput>
  ) => {
    const response = await loginUser({
      variables: {
        loginInput: values,
      },
      update(cache, { data }) {
        // const meData = cache.readQuery({ query: MeDocument })
        // console.log('MEDATA', meData)

        if (data?.login.success) {
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: { me: data.login.user },
          });
        }
      },
    });

    if (response.data?.login.errors) {
      setErrors(mapFieldErrors(response.data.login.errors));
    } else if (response.data?.login.user) {
      toast({
        title: 'Welcome',
        description: `${response.data.login.user.username}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      const apolloClient = initializeApollo();
      apolloClient.resetStore();

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
        <Layout wrapperSize="small">
          {error && <p>Failed to login</p>}
          <Formik initialValues={initialInputValues} onSubmit={onLoginSubmit}>
            {({ isSubmitting }) => (
              <Form>
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
                <Flex mt={2}>
                  <NextLink href="/forgot-password">
                    <Link ml="auto">Forgot Password</Link>
                  </NextLink>
                </Flex>
                <Button
                  type="submit"
                  mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </Layout>
      )}
    </>
  );
};

export default Login;
