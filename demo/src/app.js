import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import ExampleValidation from './examples/Validation';

ReactDOM.render(
  (
    <StrictMode>
      <main className="app">
        <ExampleValidation />
      </main>
    </StrictMode>
  ),
  document.getElementById('root')
);
