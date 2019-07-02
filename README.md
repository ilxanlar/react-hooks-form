# React Hooks Form

React Hooks Form offers an easy way to manage your forms in React.
It's built using the famous React Hooks!


### Documentation

You can find the complete documentation [here](https://ilxanlar.github.io/react-hooks-form).


### Usage

Install via NPM or Yarn:

```
npm install react-hooks-form --save
yarn add react-hooks-form
```


The following code snippet is a basic example of using React Hooks Form.

```jsx harmony
import React from 'react'
import { Form, FormField } from 'react-hooks-form'

async function handleSubmit(values) {
  try {
    await _myApiRequest(values)
  } catch (error) {
    alert(error.message)
  }
}

function SignUpForm() {
  return (
    <Form onSubmit={handleSubmit}>
      <FormField component="input" name="fullName" type="text" />
      <FormField component="input" name="email" type="text" />
      <FormField component="input" name="password" type="password" />
      <button type="submit">Sign Up</button>
    </Form>
  )
}
```


### Hooks

```js
// Hook to field value
const amount = useFormFieldValue('amount')

// Hook to field error, focus status and ...
const {
  active,
  error,
  invalid,
  visited
} = useFormFieldMeta('amount')

// Hook to get form all values
const values = useFormValues()

// Hook to form submission status, errors and ...
const {
  submitting,
  submitFailed,
  submitSucceeded,
  error
} = useFormMeta()

// Hook to access form API
const formApi = useForm() // There are plenty of methods
```
