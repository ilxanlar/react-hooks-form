import { useContext, useEffect, useState } from 'react';
import { FormContext, StoreContext } from './context';

function useFormName(formName) {
  const formContext = useContext(FormContext);
  return formName || (formContext ? formContext.name : '');
}

function useFormApi(formName) {
  const name = useFormName(formName);
  const storeContext = useContext(StoreContext);
  const formContext = useContext(FormContext);

  if (storeContext) {
    return storeContext.form(name);
  }

  if (formContext) {
    return formContext.form;
  }

  return undefined;
}

function useForm(formName) {
  const form = useFormApi(formName);

  return {
    changeFieldValue: (...params) => form.changeFieldValue(...params),
    clearFieldValue: (...params) => form.clearFieldValue(...params),
    clearValues: (...params) => form.clearValues(...params),
    getFieldValue: (...params) => form.getFieldValue(...params),
    getMetaValue: (...params) => form.getMetaValue(...params),
    getStatus: (...params) => form.getStatus(...params),
    getValues: (...params) => form.getValues(...params),
    initialize: (...params) => form.initialize(...params),
    reinitialize: (...params) => form.reinitialize(...params),
    submit: (...params) => form.submit(...params),
    validate: (...params) => form.validate(...params),
    watchFieldValue: (...params) => form.watchFieldValue(...params),
    watchMetaValue: (...params) => form.watchMetaValue(...params),
    watchFormValues: (...params) => form.watchFormValues(...params),
    watchStatus: (...params) => form.watchStatus(...params)
  };
}

function useFormFieldValue(fieldName, formName) {
  const form = useFormApi(formName);
  const [fieldValue, setFieldValue] = useState(form.getFieldValue(fieldName));

  useEffect(() => form.watchFieldValue(fieldName, (value) => {
    setFieldValue(value);
  }));

  return fieldValue;
}

function useFormValues(formName) {
  const form = useFormApi(formName);
  const [values, setValues] = useState(form.getValues());

  useEffect(() => form.watchFormValues((value) => {
    setValues(value);
  }));

  return values;
}

function useFormMetaValue(metaName, formName) {
  const form = useFormApi(formName);
  const [metaValue, setMetaValue] = useState(form.getMetaValue(metaName));

  useEffect(() => form.watchMetaValue(metaName, (value) => {
    setMetaValue(value);
  }));

  return metaValue;
}

function useFormIsTouched(formName) {
  return useFormMetaValue('isTouched', formName);
}

function useFormStatus(formName) {
  const form = useFormApi(formName);
  const [status, setStatus] = useState(form.getStatus());

  useEffect(() => form.watchStatus((payload) => {
    setStatus(payload);
  }));

  return status;
}

function useFormSubmit(formName) {
  const form = useFormApi(formName);
  return (onSubmit, options) => form.submit(onSubmit, options);
}

export {
  useForm,
  useFormApi,
  useFormFieldValue,
  useFormIsTouched,
  useFormMetaValue,
  useFormName,
  useFormStatus,
  useFormSubmit,
  useFormValues
};
