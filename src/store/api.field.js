import isEqual from 'lodash/isEqual';

export default function apiField(params, api) {
  const { formName, formState: state, notifyWatchers, watch } = params;

  api.getFieldMeta = (field, meta) => {
    const allMeta = state.fields[field] ? state.fields[field].meta : {};
    return meta ? allMeta[meta] : allMeta;
  };

  api.getFieldValue = field => api.getDeepData(`values.${field}`);

  api.watchFieldMeta = (field, listener) => watch(`${formName}/field/${field}/meta`, listener);

  api.notifyFieldMetaWatchers = field =>
    notifyWatchers(`${formName}/field/${field}/meta`, api.getFieldMeta(field));

  api.changeFieldMeta = (field, meta, value) => {
    if (typeof meta === 'string') {
      if (!isEqual(api.getFieldMeta(field)[meta], value)) {
        state.fields[field].meta = {
          ...state.fields[field].meta,
          [meta]: value
        };
        api.notifyFieldMetaWatchers(field);
      }
    } else if (Object.keys(meta).some(key => !isEqual(api.getFieldMeta(field)[key], meta[key]))) {
      state.fields[field].meta = {
        ...state.fields[field].meta,
        ...meta
      };
      api.notifyFieldMetaWatchers(field);
    }
  };

  api.watchFieldValue = (field, listener) => watch(`${formName}/field/${field}/value`, listener);

  api.notifyFieldValueWatchers = field =>
    notifyWatchers(`${formName}/field/${field}/value`, api.getFieldValue(field));

  api.updateFieldErrors = (
    errors,
    { extraFieldMeta, isServerSideError, fieldJustChanged } = {}
  ) => {
    api.forEachField(field => {
      if (!api.getFieldMeta(field, 'isServerSideError') || field === fieldJustChanged) {
        const payload = { ...extraFieldMeta };
        const fieldErrors = errors ? errors[field] : undefined;

        if (fieldErrors) {
          payload.invalid = true;
          payload.error = fieldErrors;
          payload.isServerSideError = isServerSideError;
        } else {
          payload.invalid = false;
          payload.error = undefined;
        }

        api.changeFieldMeta(field, payload);
      }
    });
  };

  // Validation API
  api.validateForm = (extraFieldMeta = {}) => {
    const validator = api.getDeepData('props.validate');

    if (typeof validator === 'function') {
      const { errors, ...rest } = validator(api.getFormValues()) || {};

      api.updateFieldErrors(errors, { extraFieldMeta });

      if (errors && Object.values(errors).some(err => err)) {
        return {
          errors,
          ...rest
        };
      }
    } else {
      api.forEachField(field => {
        if (!api.getFieldMeta(field, 'visited')) {
          api.changeFieldMeta(field, {
            visited: true
          });
        }
      });
    }
  };

  api.registerField = (field, props = {}) => {
    state.fields[field] = {
      lastAsyncValidation: {},
      meta: {},
      props
    };
    // syncValidateField(field);
    return () => {
      // @TODO: Decide about unregistering fields
    };
  };

  api.changeFieldValue = (field, value) => {
    state.fields[field].meta.isServerSideError = false;
    if (typeof value === 'function') {
      api.setDeepData(`values.${field}`, value(api.getFieldValue(field), api.getFormValues()));
    } else {
      api.setDeepData(`values.${field}`, value);
    }
    api.validateForm();
    api.notifyFieldValueWatchers(field);
    api.notifyFormValuesWatchers();
    if (api.getDeepData('props.visitOnChange') && !api.getFieldMeta(field, 'visited')) {
      api.changeFieldMeta(field, {
        visited: true
      });
    }
  };

  api.focusField = field => {
    if (!api.getFieldMeta(field, 'active')) {
      api.changeFieldMeta(field, {
        active: true
      });
    }
  };

  api.blurField = field => {
    const payload = {};
    if (api.getDeepData('props.visitOnBlur') && !api.getFieldMeta(field, 'visited')) {
      payload.visited = true;
    }
    if (api.getFieldMeta(field, 'active')) {
      payload.active = false;
    }
    if (Object.keys(payload).length > 0) {
      api.changeFieldMeta(field, payload);
    }
  };

  api.forEachField = callback => {
    const fields = Object.keys(api.getFlatData('fields'));
    for (let i = 0; i < fields.length; i++) {
      callback(fields[i]);
    }
  };
}
