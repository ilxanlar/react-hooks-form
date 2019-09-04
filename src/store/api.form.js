import clone from 'lodash/clone';

export default function apiForm(params, api) {
  const { onDestroy } = params;

  api.setInitialValues = (values = {}) => {
    api.setFlatData('values', clone(values));
    api.setFlatData('lastInitializedValues', clone(values));
    api.validateForm();
  };

  // @TODO: Support keepDirty
  // @TODO: setIsVisitedAndNotify(false)
  api.initialize = (values, options = {}) => {
    const mergedOptions = {
      unvisitFields: false,
      ...options
    };

    api.setInitialValues(typeof values === 'function' ? values(api.getFormValues()) : values);

    api.forEachField(api.notifyFieldValueWatchers);

    api.notifyFormValuesWatchers();

    api.validateForm({
      visited: !mergedOptions.unvisitFields
    });

    // @TODO: Reset fields meta
  };

  api.isInitialized = () => !api.getFlatData('lastInitializedValues');

  api.reset = () => {
    api.initialize(clone(api.getFlatData('lastInitializedValues')), {
      unvisitFields: true
    });
  };

  api.submitting = () => {
    api.changeFormMeta({
      submitting: true
    });
  };

  api.submitFailed = error => {
    api.changeFormMeta({
      result: undefined,
      submitting: false,
      submitSucceeded: false,
      submitFailed: true,
      error
    });
  };

  api.submitSucceeded = result => {
    api.changeFormMeta({
      result,
      submitting: false,
      submitSucceeded: true,
      submitFailed: false,
      error: undefined
    });
  };

  api.submit = (params = {}) => {
    let error = api.validateForm({ visited: true });

    if (typeof error !== 'undefined') {
      api.submitFailed(error);
    } else {
      const onSubmit = api.getDeepData('props.onSubmit');
      const onFail = api.getDeepData('props.onFail');
      const onSucceed = api.getDeepData('props.onSucceed');
      const onComplete = api.getDeepData('props.onComplete');

      api.submitting();

      api.forEachField(field => {
        if (!api.getFieldMeta(field, 'visited')) {
          api.changeFieldMeta(field, 'visited', true);
        }
      });

      onSubmit(api.getFormValues())
        .then(result => {
          api.submitSucceeded(result);
          if (typeof params.onSucceed === 'function') {
            params.onSucceed(result);
          }
          if (typeof onSucceed === 'function') {
            onSucceed(result);
          }
          if (typeof params.onComplete === 'function') {
            params.onComplete();
          }
          if (typeof onComplete === 'function') {
            onComplete();
          }
        })
        .catch(error => {
          if (error && error.errors) {
            api.updateFieldErrors(error.errors, {
              isServerSideError: true
            });
          }
          api.submitFailed(error);
          if (typeof params.onFail === 'function') {
            params.onFail(error);
          }
          if (typeof onFail === 'function') {
            onFail(error);
          }
          if (typeof params.onComplete === 'function') {
            params.onComplete();
          }
          if (typeof onComplete === 'function') {
            onComplete();
          }
        });
    }
  };

  api.destroy = () => {
    onDestroy();
    api.forEachField(field => {
      api.notifyFieldValueWatchers(field);
      api.notifyFieldMetaWatchers(field);
    });
    api.notifyFormValuesWatchers();
    api.notifyFormMetaWatchers();
  };
}
