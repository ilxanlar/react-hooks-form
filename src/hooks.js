import { useContext, useLayoutEffect, useMemo, useState } from 'react';
import clone from 'lodash/clone';
import getStore from './store';
import FormContext from './context';

function useFormApi(formName) {
  const formContext = useContext(FormContext);
  const name = formName || (formContext ? formContext.name : '');
  const storeContext = getStore();
  return storeContext.form(name);
}

function useForm(formName) {
  const form = useFormApi(formName);

  const realName = form.getName();

  return useMemo(
    () => ({
      getFieldValue: form.getFieldValue,
      changeFieldValue: form.changeFieldValue,
      getFieldMeta: form.getFieldMeta,
      changeFieldMeta: form.changeFieldMeta,
      getMeta: form.getFormMeta,
      getValues: form.getFormValues,
      initialize: form.initialize,
      reset: form.reset,
      submit: form.submit
    }),
    [realName]
  );
}

function useFormFieldMeta(fieldName, formName) {
  const form = useFormApi(formName);
  const [fieldMeta, setFieldMeta] = useState(form.getFieldMeta(fieldName));

  useLayoutEffect(
    () =>
      form.watchFieldMeta(fieldName, meta => {
        setFieldMeta(meta);
      }),
    [fieldName, formName]
  );

  return fieldMeta;
}

function useFormFieldValue(fieldName, formName) {
  const form = useFormApi(formName);
  const [fieldValue, setFieldValue] = useState(form.getFieldValue(fieldName));

  useLayoutEffect(
    () =>
      form.watchFieldValue(fieldName, value => {
        setFieldValue(value);
      }),
    [fieldName, formName]
  );

  return fieldValue;
}

function useFormValues(formName) {
  const form = useFormApi(formName);
  const [values, setValues] = useState(form.getFormValues());

  useLayoutEffect(
    () =>
      form.watchFormValues(payload => {
        setValues(clone(payload));
      }),
    [formName]
  );

  return values;
}

function useFormMeta(formName) {
  const form = useFormApi(formName);
  const [data, setData] = useState(form.getFormMeta());

  useLayoutEffect(
    () =>
      form.watchFormMeta(payload => {
        setData(clone(payload));
      }),
    [formName]
  );

  return data;
}

export { useForm, useFormApi, useFormMeta, useFormValues, useFormFieldMeta, useFormFieldValue };
