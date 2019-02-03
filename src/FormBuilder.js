import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormContext } from './context';
import { useFormApi } from './hooks';
import { createLocalStore } from './store';

function generateRandomName() {
  return `_${Math.random().toString(36).substr(2, 9)}`;
}

function FormBuilder(props) {
  const {
    children,
    destroyOnUnmount,
    initialValues,
    name: nameFromProps,
    validate
  } = props;

  const nameRef = useRef(nameFromProps || generateRandomName());
  const name = nameRef.current;
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
  name: PropTypes.string,
  validate: PropTypes.func
};

FormBuilder.defaultProps = {
  destroyOnUnmount: true
};

export default memo(FormBuilder);
