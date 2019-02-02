import React from 'react';
import { FormBuilder, FormField } from '../src';

function TextInput({ onChange, value }) {
  return (
    <input
      type="text"
      onChange={onChange}
      value={value}
    />
  );
}

function SimpleForm() {
  return (
    <FormBuilder>
      <FormField component={TextInput} name="email" />
    </FormBuilder>
  );
}

test('TESTING', () => {
  expect(1).toBe(1);
});
