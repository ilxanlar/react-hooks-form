import React from 'react';
import { Form } from '../hooksForm';
import Example from '../components/Example';
import Errors from '../components/Errors';
import Submit from '../components/Submit';
import TextField from '../components/TextField';
import TextAreaField from '../components/TextAreaField';

const initialValues = {
  title: 'Article title',
  content: 'Article content'
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

export default function InitialValues() {
  return (
    <div>
      <h1>Setting Initial Values</h1>

      <Example>
        <h3>Edit an Article</h3>
        <Form initialValues={initialValues} name="editArticle" onSubmit={handleSubmit} validate={validate}>
          <Errors />
          <TextField label="Title" name="title" />
          <TextAreaField label="Content" name="content" />
          <TextField label="Author" name="author" />
          <TextField label="Tags" name="tags" />
          <Submit text="Publish" />
        </Form>
      </Example>
    </div>
  );
}
