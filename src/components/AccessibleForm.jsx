import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const AccessibleFormWithFieldErrorAudio = () => {
  const initialValues = { email: '', password: '' };

  const [focusedField, setFocusedField] = useState('');

  const speakError = (message) => {
    const utterance = new SpeechSynthesisUtterance(message);
    speechSynthesis.speak(utterance);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
      }}
    >
      {({ errors, touched, handleChange, handleBlur }) => {
        useEffect(() => {
          if (focusedField === 'email' && errors.email && touched.email) {
            speakError(errors.email);
          }
          if (
            focusedField === 'password' &&
            errors.password &&
            touched.password
          ) {
            speakError(errors.password);
          }
        }, [errors, touched, focusedField]);

        return (
          <Form>
            <div>
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                aria-describedby="emailError"
                aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                onChange={handleChange}
                onBlur={(e) => {
                  handleBlur(e);
                  setFocusedField('');
                }}
                onFocus={() => setFocusedField('email')}
              />
              {errors.email && touched.email && (
                <div id="emailError" style={{ color: 'red' }}>
                  {errors.email}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                aria-describedby="passwordError"
                aria-invalid={
                  errors.password && touched.password ? 'true' : 'false'
                }
                onChange={handleChange}
                onBlur={(e) => {
                  handleBlur(e);
                  setFocusedField('');
                }}
                onFocus={() => setFocusedField('password')}
              />
              {errors.password && touched.password && (
                <div id="passwordError" style={{ color: 'red' }}>
                  {errors.password}
                </div>
              )}
            </div>

            <button type="submit">Submit</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AccessibleFormWithFieldErrorAudio;
