function createListeners() {
  const listeners = {};

  return {
    notifyWatchers(name, payload) {
      if (name in listeners && listeners[name].length > 0) {
        for (let i = 0; i < listeners[name].length; i++) {
          listeners[name][i](payload);
        }
      }
    },

    watch(name, listener) {
      if (!(name in listeners)) {
        listeners[name] = [];
      }

      if (typeof listener !== 'function') {
        throw new Error('Expected listeners to be a function.');
      }

      listeners[name].push(listener);

      return () => {
        listeners[name].splice(listeners[name].indexOf(listener), 1);
      };
    }
  };
}

function initialState() {
  return {
    error: undefined,
    fields: {},
    lastInitializedValues: {},
    meta: {
      isTouched: false
    },
    submitFailed: false,
    submitSucceeded: false,
    submitting: false,
    values: {}
  };
}

function api(params) {
  const {
    formName,
    formState: state,
    notifyWatchers,
    onDestroy,
    watch
  } = params;

  function notifyFieldValueWatchers(fieldName, fieldValue) {
    return notifyWatchers(`${formName}/field/${fieldName}`, fieldValue);
  }

  function notifyFormValuesWatchers(formValues) {
    return notifyWatchers(`${formName}/values`, formValues);
  }

  function notifyMetaValueWatchers(metaName, metaValue) {
    return notifyWatchers(`${formName}/meta/${metaName}`, metaValue);
  }

  function notifyStatusWatchers(payload) {
    return notifyWatchers(`${formName}/status`, payload);
  }

  function setIsTouched(touched) {
    if (state.meta.isTouched !== touched) {
      state.meta.isTouched = touched;
      notifyMetaValueWatchers('isTouched', touched);
    }
  }

  return {
    changeFieldValue(fieldName, fieldValue) {
      state.values[fieldName] = fieldValue;
      notifyFieldValueWatchers(fieldName, this.getFieldValue(fieldName));
      notifyFormValuesWatchers(this.getValues());
      setIsTouched(true);
    },

    clearFieldValue(fieldName) {
      this.changeFieldValue(fieldName, undefined);
    },

    clearValues() {
      this.initialize({});
    },

    destroy() {
      onDestroy();
      this.forEachField((fieldName, fieldValue) => {
        notifyFieldValueWatchers(fieldName, fieldValue);
      });
      notifyFormValuesWatchers(this.getValues());
      notifyStatusWatchers(this.getStatus());
      this.forEachMeta((metaName, metaValue) => {
        notifyMetaValueWatchers(metaName, metaValue);
      });
    },

    forEachField(callback) {
      const fields = Object.keys(state.fields);

      for (let i = 0; i < fields.length; i++) {
        callback(fields[i], this.getFieldValue(fields[i]));
      }
    },

    forEachMeta(callback) {
      const meta = Object.keys(state.meta);

      for (let i = 0; i < meta.length; i++) {
        callback(meta[i], this.getMetaValue(meta[i]));
      }
    },

    getFieldValue(fieldName) {
      return state.values[fieldName];
    },

    getMetaValue(metaName) {
      return state.meta[metaName];
    },

    getName() {
      return formName;
    },

    getStatus() {
      return {
        error: state.error,
        submitting: state.submitting,
        submitSucceeded: state.submitSucceeded,
        submitFailed: state.submitFailed
      };
    },

    getValidator() {
      return state.validator;
    },

    getValues() {
      return state.values;
    },

    initialize(values, untouchForm = false) {
      this.setInitialValues(values);
      this.forEachField((fieldName, fieldValue) => {
        notifyFieldValueWatchers(fieldName, fieldValue);
      });
      notifyFormValuesWatchers(this.getValues());
      this.forEachField((metaName, metaValue) => {
        notifyMetaValueWatchers(metaName, metaValue);
      });
      if (untouchForm) {
        setIsTouched(false);
      }
    },

    isInitialized() {
      return !state.lastInitializedValues;
    },

    registerField(fieldName) {
      state.fields[fieldName] = {};

      return () => {
        if (fieldName && fieldName in state.fields) {
          delete state.fields[fieldName];
        }
      };
    },

    registerValidator(validator) {
      state.validator = validator;
    },

    reinitialize() {
      this.initialize(state.lastInitializedValues, true);
    },

    setInitialValues(values) {
      state.values = { ...values };
      state.lastInitializedValues = { ...values };
    },

    setMetaValue(metaName, metaValue) {
      state.meta[metaName] = metaValue;
      notifyMetaValueWatchers(metaName, this.getMetaValue(metaName));
    },

    submit(onSubmit, options) {
      if (this.validate()) {
        const { onComplete, onFail, onSucceed } = options || {};

        this.submitting();

        onSubmit(this.getValues())
          .then((response) => {
            this.submitSucceeded();
            this.reinitialize();
            if (typeof onSucceed === 'function') {
              onSucceed(response);
            }
            if (typeof onComplete === 'function') {
              onComplete();
            }
          })
          .catch((error) => {
            this.submitFailed(error);
            if (typeof onFail === 'function') {
              onFail(error);
            }
            if (typeof onComplete === 'function') {
              onComplete();
            }
          });
      }
    },

    submitting() {
      state.error = undefined;
      state.submitting = true;
      state.submitFailed = false;
      state.submitSucceeded = false;
      notifyStatusWatchers(this.getStatus());
    },

    submitFailed(error) {
      state.error = error;
      state.submitting = false;
      state.submitFailed = true;
      state.submitSucceeded = false;
      notifyStatusWatchers(this.getStatus());
    },

    submitSucceeded() {
      state.error = undefined;
      state.submitting = false;
      state.submitFailed = false;
      state.submitSucceeded = true;
      notifyStatusWatchers(this.getStatus());
    },

    validate() {
      if (typeof this.getValidator() === 'function') {
        const validationErrors = this.getValidator()(this.getValues());

        if (validationErrors) {
          const { message, errors } = validationErrors;

          if (message || (errors && Object.values(errors).find(err => err))) {
            this.submitFailed({
              message,
              errors
            });

            return false;
          }
        }
      }

      return true;
    },

    watchFieldValue(fieldName, listener) {
      return watch(`${formName}/field/${fieldName}`, listener);
    },

    watchFormValues(listener) {
      return watch(`${formName}/values`, listener);
    },

    watchMetaValue(metaName, listener) {
      return watch(`${formName}/meta/${metaName}`, listener);
    },

    watchStatus(listener) {
      return watch(`${formName}/status`, listener);
    }
  };
}

function createLocalStore(formName) {
  const { notifyWatchers, watch } = createListeners();

  const store = {
    form: {
      scope: 'local',
      state: initialState()
    }
  };

  store.form.api = api({
    formName,
    formState: store.form.state,
    notifyWatchers,
    onDestroy() {
      delete store.form;
    },
    scope: store.form.scope,
    watch
  });

  return store.form.api;
}

function createGlobalStore() {
  const store = {
    forms: {}
  };

  const { notifyWatchers, watch } = createListeners();

  return {
    form(formName) {
      if (!store.forms[formName]) {
        store.forms[formName] = {
          scope: 'global',
          state: initialState()
        };

        store.forms[formName].api = api({
          formName,
          formState: store.forms[formName].state,
          notifyWatchers,
          onDestroy() {
            delete store.forms[formName];
          },
          scope: store.forms[formName].scope,
          watch
        });
      }

      return store.forms[formName].api;
    }
  };
}

export { createGlobalStore, createLocalStore };
