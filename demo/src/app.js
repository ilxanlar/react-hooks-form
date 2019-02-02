import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { createStore, Provider } from './hooksForm';
import ExampleBasic from './examples/Basic';

function App() {
  const formStore = createStore();

  return (
    <StrictMode>
      <Provider store={formStore}>
        <main className="app">
          <div className="examples">
            <ExampleBasic />
          </div>
        </main>
      </Provider>
    </StrictMode>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
