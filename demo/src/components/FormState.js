import React from 'react';
import { useFormValues } from '../react-hooks-form';

export default function FormState({ name }) {
  const values = useFormValues(name);

  return (
    <div className="form-state">
      <pre>
        {JSON.stringify(values, null, 2)}
      </pre>
    </div>
  );
}
