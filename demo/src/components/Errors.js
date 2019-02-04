import React from 'react';
import { useFormStatus } from '../hooksForm';

function Errors({ component: ErrorsComponent, ...rest }) {
  const { error, submitFailed } = useFormStatus();

  if (submitFailed) {
    const { message, errors } = error;

    return (
      <div {...rest} className="form-errors">
        {message ? <strong>{message}</strong> : null}

        {Object.keys(errors).length > 0 && (
          <ul>
            {Object.values(errors).map((errorText, key) => (
              <li key={key}>
                {errorText}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return null;
}

export default Errors;
