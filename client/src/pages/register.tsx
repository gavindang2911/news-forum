import React from 'react';
import { Formik, Form } from 'formik';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import Wrapper from '../components/Wrapper';

const Register = () => {
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, handleChange }) => (
          <Form>
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                placeholder="Enter Username"
                value={values.username}
                onChange={handleChange}
              />
              <Input
                id="password"
                placeholder="Enter password"
                value={values.password}
                onChange={handleChange}
                type='password'
              />
            </FormControl>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
