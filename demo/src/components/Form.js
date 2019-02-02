import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormBuilder, useFormApi } from '../hooksForm';

function RealForm({ children, name, onSubmit }) {
  const form = useFormApi(name);

  const handleSubmit = (event) => {
    event.preventDefault();
    form.submit(onSubmit);
  };

  return (
    <form onSubmit={handleSubmit}>
      {children}
    </form>
  );
}

function Form(props) {
  const {
    children,
    name,
    onSubmit,
    ...formProps
  } = props;

  return (
    <FormBuilder {...formProps} name={name}>
      <RealForm name={name} onSubmit={onSubmit}>
        {children}
      </RealForm>
    </FormBuilder>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default memo(Form);
