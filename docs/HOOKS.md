# Hooks

We expose some react hooks that might be really useful.
Please keep in mind that in all hooks, You can skip passing **formName** if you're inside the form component tree.


## useFormFieldValue(fieldName[, formName])

Use this hook to get the value of a field.

```jsx harmony
function Subtotal({ price }) {
  const qty = useFormFieldValue('qty');

  return (
    <span>Subtotal is {qty * price} dollars!</span>
  );
}
```


## useFormValues([formName])

Use this hook to get the whole form values.

```jsx harmony
function FormLog() {
  const formValues = useFormValues();
  console.log(formValues);
  return 'This component logs form data to the console.';
}
```


## useFormStatus([formName])

This hook returns the form status flags: `submitting`, `submitSucceeded`, `submitFailed` and `error` as an object:

This is a example of showing form errors:

```jsx harmony
function FormErrors() {
  const { error, submitFailed } = useFormStatus();

  if (submitFailed) {
    return (
      <p>{error.message}</p>
    );
  }
  
  return null;
}
```

Or suppose you want to add a loading status on the button while the form is being sent:

```jsx harmony
function Submit({ text }) {
  const { submitting } = useFormStatus();

  return (
    <button type="submit">
      {submitting ? 'Saving...' : text}
    </button>
  );
}
```

You can do more and show a success message to the user by the help of`submitSucceeded` property on the status returned.


## useFormMetaValue(metaName[, formName])

This hook gives you the meta values of a form. Currently there is only one meta value and that is `isTouched`, but we plan to add more details later.

For example, suppose you want to prevent user from going to another page when the form values are changed compared to initial values.

```jsx harmony
function PreventTransition({ formName }) {
  const isTouched = useFormMetaValue('isTouched', formName);

  return (
    <Prompt
      message="Are you sure you want to leave this page?"
      when={isTouched}
    />
  );
}
```

By the way, there is a shortcut hook for this, you can `useFormIsTouched`:

```
const isTouched = useFormIsTouched('someFormName');
```


## useForm([formName])

This hook exposes the form API and you can do much with it.

```jsx harmony
function RemoteSubmitButton() {
  const form = useFormApi('someFormName');

  const handleClick = () => {
    form.submit((data) => {
      // Make your api request here
      return new Promise(...);
    });
  };

  return (
    <button onClick={handleClick}>
      Click to submit
    </button>
  );
}
```

You can find all available methods in the following table:

| Method                        |
| ----------------------------- |
| changeFieldValue(name, value) |
| clearFieldValue(name)         |
| clearValues()                 |
| getFieldValue(name)           |
| getMetaValue(name)            |
| getStatus()                   |
| getValues()                   |
| initialize(initialValues)     |
| reinitialize()                |
| submit(onSubmit, options)     |
| validate()                    |
| watchFieldValue()             |
| watchMetaValue()              |
| watchFormValues()             |
| watchStatus()                 |
