import React, { memo } from 'react';

function TextField({ label, onChange, value }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="form-field">
      {label ? <label>{label}</label> : null}
      <input type="text" onChange={handleChange} value={value || ''} />
    </div>
  );
}

export default memo(TextField);
