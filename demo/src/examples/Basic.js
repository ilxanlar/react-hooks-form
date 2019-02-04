import React from 'react';
import { Form, FormField } from '../hooksForm';
import Errors from '../components/Errors';
import Submit from '../components/Submit';
import TextField from '../components/TextField';
import TextAreaField from '../components/TextAreaField';

const initialValues = {
  title: 'Context',
  content: 'In a typical React application, data is passed top-down (parent to child) via props, but this can be cumbersome for certain types of props (e.g. locale preference, UI theme) that are required by many components within an application. Context provides a way to share values like these between components without having to explicitly pass a prop through every level of the tree.'
};

function validate(data) {
  return {
    errors: {
      title: data.title ? '' : 'You must choose a title for your article.',
      content: data.content ? '' : 'You must write something to publish!',
      author: data.author ? '' : 'You must specify who is writing this article.'
    }
  };
}

function handleSubmit(data) {
  console.log(data);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

function handleSubmitSucceed() {
  alert('Submitted successfully!');
}

export default function Basic() {
  return (
    <div className="example">
      <h3>Write a new Article</h3>

      <Form
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onSubmitSucceed={handleSubmitSucceed}
        validate={validate}
      >
        <Errors />
        <FormField component={TextField} label="Title" name="title" />
        <FormField component={TextAreaField} label="Content" name="content" />
        <FormField component={TextField} label="Author" name="author" />
        <FormField component={TextField} label="Tags" name="tags" />
        <Submit text="Publish new Article" />
      </Form>
    </div>
  );
}
