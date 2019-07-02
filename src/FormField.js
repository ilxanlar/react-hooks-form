import { createElement, memo, useCallback, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormApi, useFormFieldValue } from './hooks';

function FormField(props) {
  const { component, formName: overrideFormName, name: fieldName, ...rest } = props;

  const form = useFormApi(overrideFormName);
  const fieldValue = useFormFieldValue(fieldName);
  const formName = form.getName();

  useLayoutEffect(() => form.registerField(fieldName, props), [formName, fieldName]);

  const handleBlur = useCallback(
    () => {
      form.blurField(fieldName);
    },
    [formName, fieldName]
  );

  const handleChange = useCallback(
    payload => {
      if (typeof component !== 'string') {
        form.changeFieldValue(fieldName, payload);
      } else if (props.type === 'checkbox') {
        form.changeFieldValue(fieldName, payload.target.checked);
      } else if (props.type === 'radio') {
        form.changeFieldValue(fieldName, payload.target.checked ? props.value : undefined);
      } else if (component === 'select' && props.multiple) {
        const options = payload.target.options;
        const selectedOptions = [];
        for (let i = 0; i < options.length; i++) {
          if (options[i].selected) {
            selectedOptions.push(options[i].value);
          }
        }
        form.changeFieldValue(fieldName, selectedOptions);
      } else {
        form.changeFieldValue(fieldName, payload.target.value);
      }
    },
    [formName, fieldName, component, props.type]
  );

  const handleFocus = useCallback(
    () => {
      form.focusField(fieldName);
    },
    [formName, fieldName]
  );

  const componentProps = {
    ...rest,
    name: fieldName,
    onBlur: handleBlur,
    onChange: handleChange,
    onFocus: handleFocus
  };

  if (typeof component !== 'string') {
    componentProps.formName = formName;
    componentProps.value = fieldValue;
  }

  if (component === 'select' && props.multiple) {
    componentProps.value = fieldValue || [];
  }

  if (component === 'input') {
    if (props.type === 'checkbox') {
      componentProps.checked = !!fieldValue;
    } else if (props.type === 'radio') {
      componentProps.checked = fieldValue === props.value;
    } else if (props.type !== 'file') {
      if (typeof fieldValue === 'undefined') {
        componentProps.value = '';
      } else {
        componentProps.value = fieldValue;
      }
    }
  }

  return createElement(component, componentProps);
}

FormField.propTypes = {
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]).isRequired,
  formName: PropTypes.string,
  name: PropTypes.string.isRequired
};

export default memo(FormField);
