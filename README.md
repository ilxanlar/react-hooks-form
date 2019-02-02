# Hooks Form

This is a simple react form management package based on the new famous Hooks API.

```jsx harmony
import React from 'react';
import { Form } from 'react-hooks-form';

function createNewArticle(data) {
  return fetch('/article', {
    body: JSON.stringify(data),
    method: 'post'
  });
}

function CreateArticle() {
  return (
    <Form name="createArticle" onSubmit={createNewArticle}>
      ...
    </Form>
  );
}
```

Read more about react-hooks-form in the documentation:

- [Quick Start](docs/QUICK_START.md)
- [Components](docs/COMPONENTS.md)
- [Hooks](docs/HOOKS.md)
