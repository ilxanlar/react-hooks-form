import React, { memo } from 'react';
import { useFormMeta } from '../react-hooks-form';

function FormErrors({ name, ...rest }) {
  const { error, submitFailed } = useFormMeta(name);

  if (submitFailed && error) {
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

export default memo(FormErrors);
