import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormApi, useFormFieldValue } from './hooks';

function FormField(props) {
  const {
    component: FieldComponent,
    formName: overrideFormName,
    name: fieldName,
    ...rest
  } = props;

  const form = useFormApi(overrideFormName);
  const fieldValue = useFormFieldValue(fieldName);
  const formName = form.getName();

  useEffect(() => form.registerField(fieldName), [formName, fieldName]);

  const handleChange = (value) => {
    form.changeFieldValue(fieldName, value);
  };

  return (
    <FieldComponent
      {...rest}
      formName={formName}
      name={fieldName}
      onChange={handleChange}
      value={fieldValue}
    />
  );
}

FormField.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  formName: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default memo(FormField);
