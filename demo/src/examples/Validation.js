import React, { memo } from 'react';
import { Form, FormField } from '../react-hooks-form';
import FieldError from '../components/FieldError';
import FormState from '../components/FormState';
import Submit from '../components/Submit';
import { validateEmail } from '../helpers/validation';

function validate(values) {
  return {
    errors: {
      email: validateEmail(values.email)
    }
  };
}

function handleSubmit(values) {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        reject({
          errors: {
            email: 'Email is already in use.',
            password: 'Password too weak'
          }
        });
        // alert(`FORM VALUES:\n${JSON.stringify(values, null, 4)}`);
        // resolve();
      },
      500
    );
  });
}

function Validation() {
  return (
    <Form name="signUp" onSubmit={handleSubmit} validate={validate}>
      <div className="form-row">
        <label>Email</label>
        <FormField component="input" name="email" type="email" />
        <FieldError name="email" />
      </div>

      <div className="form-row">
        <label>Password</label>
        <FormField component="input" name="password" type="password" />
      </div>

      <div className="form-row">
        <label>Categories</label>
        <FormField component="select" name="category" multiple>
          <option value="programming">Programming</option>
          <option value="design">Design</option>
          <option value="marketing">Marketing</option>
          <option value="sales">Sales</option>
        </FormField>
      </div>

      <div className="form-row">
        <label>Gender</label>
        <label>
          <FormField component="input" name="gender" type="radio"
                     value="female" />
          &nbsp; Female
        </label>
        <label>
          <FormField component="input" name="gender" type="radio"
                     value="male" />
          &nbsp; Male
        </label>
      </div>

      <div className="form-row">
        <label>
          <FormField component="input" name="subscribe" type="checkbox" />
          &nbsp; Subscribe to newsletter
        </label>
      </div>

      <Submit text="Sign Me Up" />

      <br />
      <br />

      <FormState />
    </Form>
  );
}

export default memo(Validation);
