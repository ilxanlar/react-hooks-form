import React from 'react';
import { Form, FormField } from '../hooksForm';
import Errors from '../components/Errors';
import TextField from '../components/TextField';
import TextAreaField from '../components/TextAreaField';

const initialValues = {
  title: 'Article title'
};

function validate(data) {
  return {
    errors: {
      title: data.title ? '' : 'Article must have a title.',
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
        name="createArticle"
        onSubmit={handleSubmit}
        onSubmitSucceed={handleSubmitSucceed}
        validate={validate}
      >
        <Errors />
        <FormField component={TextField} label="Title" name="title" />
        <FormField component={TextAreaField} label="Content" name="content" />
        <FormField component={TextField} label="Author" name="author" />
        <FormField component={TextField} label="Tags" name="tags" />
        <button type="submit">Publish</button>
      </Form>
    </div>
  );
}
