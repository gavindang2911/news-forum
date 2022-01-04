import { Button, FormControl } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import InputField from '../components/InputField';
import Wrapper from '../components/Wrapper';

const Register = () => {
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={(values) => console.log(values)}
      >
        {({isSubmitting}) => (
          <Form>
            <FormControl>
              <InputField
                name="username"
                label='Username'
                placeholder="Enter Username"
              />
              <br/>
              <InputField
                name="password"
                label='Password'
                placeholder="Enter Password"
                // type='password'
              />
              <Button type='submit' mt={4} colorScheme='teal' isLoading={isSubmitting}>Register</Button>
            </FormControl>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
