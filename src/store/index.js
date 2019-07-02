import createApi from './api';
import createListeners from './watch';

export default function getStore() {
  if (typeof window.REACT_HOOKS_FORM === 'undefined') {
    const store = {
      forms: {}
    };

    const { notifyWatchers, watch } = createListeners();

    window.REACT_HOOKS_FORM = {
      form(formName) {
        if (!store.forms[formName]) {
          store.forms[formName] = {
            state: {
              fields: {},
              lastInitializedValues: {},
              props: {},
              meta: {
                submitFailed: false,
                submitSucceeded: false,
                submitting: false
              },
              values: {}
            }
          };

          store.forms[formName].api = createApi({
            formName,
            formState: store.forms[formName].state,
            notifyWatchers,
            onDestroy() {
              delete store.forms[formName];
            },
            watch
          });
        }

        return store.forms[formName].api;
      }
    };
  }

  return window.REACT_HOOKS_FORM;
}
