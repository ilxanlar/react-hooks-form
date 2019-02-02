import React, { memo } from 'react';

function TextAreaField({ label, onChange, value }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="form-field">
      {label ? <label>{label}</label> : null}
      <textarea onChange={handleChange} value={value || ''} />
    </div>
  );
}

export default memo(TextAreaField);
