import React, { memo, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import FormContext from './context';
import { useFormApi } from './hooks';

function generateRandomName() {
  return `_${Math.random()
    .toString(36)
    .substr(2, 9)}`;
}

function FormBuilder(props) {
  const {
    children,
    destroyOnUnmount,
    enableReinitialize,
    initialValues,
    keepDirtyOnReinitialize,
    name: nameFromProps,
    onChange,
    visitOnBlur,
    visitOnChange,
    validate
  } = props;

  const isFirstReInit = useRef(true);
  const nameRef = useRef(nameFromProps || generateRandomName());
  const name = nameRef.current;
  const form = useFormApi(name);

  const context = {
    name,
    form
  };

  if (!form.isInitialized() && initialValues) {
    form.setInitialValues(initialValues);
  }

  form.setProps(props);

  useLayoutEffect(
    () => {
      if (initialValues) {
        form.initialize(initialValues);
      }

      return () => {
        if (destroyOnUnmount) {
          form.destroy();
        }
      };
    },
    [name]
  );

  // Handle re-initialize
  useLayoutEffect(
    () => {
      if (isFirstReInit.current) {
        isFirstReInit.current = false;
      } else if (enableReinitialize && initialValues) {
        form.initialize(initialValues, keepDirtyOnReinitialize);
      }
    },
    [name, initialValues]
  );

  return <FormContext.Provider value={context}>{children}</FormContext.Provider>;
}

FormBuilder.propTypes = {
  destroyOnUnmount: PropTypes.bool,
  enableReinitialize: PropTypes.bool,
  initialValues: PropTypes.object,
  // keepDirtyOnReinitialize: PropTypes.bool, // @TODO:
  name: PropTypes.string,
  // onChange: PropTypes.func, // @TODO:
  validate: PropTypes.func,
  visitOnBlur: PropTypes.bool,
  visitOnChange: PropTypes.bool
};

FormBuilder.defaultProps = {
  enableReinitialize: false,
  destroyOnUnmount: true,
  keepDirtyOnReinitialize: false,
  visitOnBlur: true,
  visitOnChange: false
};

export default memo(FormBuilder);
