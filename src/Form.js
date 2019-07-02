import React, { memo } from 'react';
import PropTypes from 'prop-types';
import FormBuilder from './FormBuilder';
import { useFormApi } from './hooks';

function Fields(props) {
  const { children, className, onSubmit, onSubmitComplete, onSubmitFail, onSubmitSucceed } = props;

  const form = useFormApi();

  function handleSubmit(event) {
    event.preventDefault();

    form.submit(onSubmit, {
      onComplete: onSubmitComplete,
      onFail: onSubmitFail,
      onSucceed: onSubmitSucceed
    });
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  );
}

function Form(props) {
  return (
    <FormBuilder {...props}>
      <Fields {...props} />
    </FormBuilder>
  );
}

Form.propTypes = {
  className: PropTypes.string,
  destroyOnUnmount: PropTypes.bool,
  enableReinitialize: PropTypes.bool,
  initialValues: PropTypes.object,
  // keepDirtyOnReinitialize: PropTypes.bool, // @TODO:
  name: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onSubmitComplete: PropTypes.func,
  onSubmitFail: PropTypes.func,
  onSubmitSucceed: PropTypes.func,
  // onChange: PropTypes.func, // @TODO:
  validate: PropTypes.func,
  visitOnBlur: PropTypes.bool,
  visitOnChange: PropTypes.bool
};

Form.defaultProps = {
  enableReinitialize: false,
  destroyOnUnmount: true,
  keepDirtyOnReinitialize: false,
  visitOnBlur: true,
  visitOnChange: false
};

export default memo(Form);
