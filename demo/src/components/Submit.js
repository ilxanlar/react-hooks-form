import React from 'react';
import { useFormStatus } from '../hooksForm';

function Submit({ className, text, ...rest }) {
  const { submitting } = useFormStatus();

  return (
    <button className="form-submit" disabled={submitting} type="submit" {...rest}>
      {submitting ? '...' : text}
    </button>
  );
}

export default Submit;
