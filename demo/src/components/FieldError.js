import React, { memo } from 'react';
import { useFormFieldMeta } from '../react-hooks-form';

function FieldError({ name }) {
  const meta = useFormFieldMeta(name);

  if (meta.invalid && meta.visited) {
    return (
      <div className="field-error">
        {meta.error}
      </div>
    );
  }

  return null;
}

export default memo(FieldError);
