import React, { memo } from 'react';
import PropTypes from 'prop-types';
import FormBuilder from './FormBuilder';
import { useFormApi } from './hooks';

function Fields(props) {
  const {
    children,
    className,
    onSubmit,
    onSubmitComplete,
    onSubmitFail,
    onSubmitSucceed
  } = props;

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
  initialValues: PropTypes.object,
  name: PropTypes.string,
  onSubmit: PropTypes.func,
  onSubmitComplete: PropTypes.func,
  onSubmitFail: PropTypes.func,
  onSubmitSucceed: PropTypes.func,
  validate: PropTypes.func
};

Form.defaultProps = {
  destroyOnUnmount: true
};

export default memo(Form);
