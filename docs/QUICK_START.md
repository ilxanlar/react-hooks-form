# Quick Start


### Installation

```
npm install react-hooks-form --save
or
yarn add react-hooks-form
```


### Configuration

All you have to do is creating a store and wrapping your app with `Provider` like so:

```jsx harmony
import React from 'react';
import { createStore, Provider } from 'react-hooks-form';

function App() {
  const formStore = createStore();

  return (
    <Provider store={formStore}>
      // You app...
    </Provider>
  );
}
```


## Usage

If you're making a simple form, it's really easy with react-hooks-form:

```jsx harmony
import React from 'react';
import { Form, FormField } from 'react-hooks-form';

function TextInput({ label, onChange, value }) {
  return (
    <div className="form-row">
      <label>{label}</label>
      <input type="text" onChange={onChange} value={value || ''} />
    </div>
  );
}

function CreateArticle() {
  const handleSubmit = formData => {
    // Do what you're gonna do with the form data
    // But you must return a Promise
    return new Promise((resolve, reject) => {
      console.log(formData);
      setTimeout(resolve, 2000); // Fake async action
    });
  };

  return (
    <Form name="createArticle" onSubmit={handleSubmit}>
      <FormField component={TextInput} name="title" label="Title" />
      <FormField component={TextInput} name="content" label="Content" />
      <FormField component={TextInput} name="author" label="Author" />
      <FormField component={TextInput} name="tags" label="Tags" />
      <button type="submit">Publish</button>
    </Form>
  );
}
```
