# Components


## Form

This is the component you need to build a form, basically you do this:

```jsx harmony
function SimpleForm() {
  function handleSubmit(data) {
    // Do something with data
  }

  return (
    <Form name="createArticle" onSubmit={handleSubmit}>
      // fields...
    </Form>
  );
}
```

The following table shows the available props you can pass to Form component:

| Prop             | Type              |  |
| ---------------- | ----------------- | --- |
| destroyOnUnmount | bool              | Reset everything to initial state or not |
| initialValues    | object            | Values to initialize form with |
| name             | string (required) | Form name which is required |
| onSubmit         | func              | A function which receives form data and returns a Promise. Read more about onSubmit below this table |
| onSubmitComplete | func              | Fired whether form submission is successful or not |
| onSubmitFail     | func              | Fired when submission fails |
| onSubmitSucceed  | func              | Fired when submission succeeds |
| validate         | func              | A function which receives form data and validates data. Read more about validate below this table |

#### onSubmit

This should be a function that receives form data and returns a Promise.
If the returned Promise resolves, then submission is successful:
If the returned Promise rejects, it should reject with an error object in shape of

```
{
  message: 'A generic error message',
  errors: {
    fieldName1: 'field1 error',
    fieldName2: 'field2 error',
    ...
  }
}
```

One of `message` or `errors` properties should be present in error object.
This error object is exactly what you get from `useFormStatus()`!

#### validate

This is a function that receives form data and returns error object if validation fails.
Error should be as mentioned in **onSubmit** section.

```
function validate(data) {
  const errors = {
    email: data.email ? '' : 'Email is required',
    password: data.password ? '' : 'Password is required'
  };

  return {
    message: Object.keys(errors).length > 0
      ? 'Some fields have errors' : '',
    errors: errors
  };
}
```


## FormField

Use this component to build a field, you need to pass you input component to FormField:

```jsx harmony
function TextInput(props) {
  // Your custom input component
  // It will receive three special props (name, onChange, value)
  // which are provided by the FormField component

  const { onChange, required, type, value } = props;

  return (
    <input
      onChange={event => onChange(event.target.value)}
      required={required}
      type={type}
      value={value}
    />
  );
}

// Render your form
function SignUpForm() {
  return (
    <Form name="signUp">
      <FormField
        component={TextInput}
        name="fullName"
        // Any other prop you pass will be passed to TextInput
        min={5}
        max={50}
        type="text"
      />

      <FormField
        component={TextInput}
        name="email"
        // Any other prop you pass will be passed to TextInput
        type="email"
        required
      />

      <FormField
        component={TextInput}
        name="password"
        // Any other prop you pass will be passed to TextInput
        type="password"
        required
      />
    </Form>
  );
}
```
