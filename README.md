# React Hooks Form

This is a simple react form management package based on the new famous Hooks API.


### Installation

```
npm install react-hooks-form --save
yarn add react-hooks-form
```


### Usage

```jsx harmony
import React from 'react';
import { Form, FormField } from 'react-hooks-form';
import TextInput from './TextInput'; // Your custom input

function App() {
  function handleSubmit(data) {
    return fetch('https://api.example.com/article', {
      body: JSON.stringify(data),
      method: 'post'
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormField component={TextInput} name="title" label="Title" />
      <FormField component={TextInput} name="content" label="Content" />
      <FormField component={TextInput} name="author" label="Author" />
      <FormField component={TextInput} name="tags" label="Tags" />
      <button type="submit">Publish</button>
    </Form>
  );
}
```

Read more about react-hooks-form in the documentation:

- [Components](docs/COMPONENTS.md)
- [Hooks](docs/HOOKS.md)
