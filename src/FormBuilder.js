import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormContext } from './context';
import { useFormApi } from './hooks';
import { createLocalStore } from './store';

function FormBuilder(props) {
  const {
    children,
    destroyOnUnmount,
    initialValues,
    name,
    validate
  } = props;

  const localForm = useRef();
  const globalForm = useFormApi(name);

  let form;

  if (globalForm) {
    form = globalForm;
  } else {
    if (!localForm.current) {
      localForm.current = createLocalStore(name);
    }
    form = localForm.current;
  }

  const context = {
    name,
    form
  };

  if (!form.isInitialized() && initialValues) {
    form.setInitialValues(initialValues);
  }

  if (validate) {
    form.registerValidator(validate);
  }

  useEffect(() => {
    if (initialValues) {
      form.initialize(initialValues);
    }

    return () => {
      if (destroyOnUnmount) {
        form.destroy();
      }
    };
  }, [name]);

  return (
    <FormContext.Provider value={context}>{children}</FormContext.Provider>
  );
}

FormBuilder.propTypes = {
  destroyOnUnmount: PropTypes.bool,
  initialValues: PropTypes.object,
  name: PropTypes.string.isRequired,
  validate: PropTypes.func
};

FormBuilder.defaultProps = {
  destroyOnUnmount: true
};

export default memo(FormBuilder);
