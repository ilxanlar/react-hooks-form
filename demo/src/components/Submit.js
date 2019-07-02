import React, { memo } from 'react';
import { useFormMeta } from '../react-hooks-form';

function Submit({ className, text, ...rest }) {
  const { submitting } = useFormMeta();

  return (
    <button className="form-submit" disabled={submitting} type="submit" {...rest}>
      {submitting ? '...' : text}
    </button>
  );
}

export default memo(Submit);
