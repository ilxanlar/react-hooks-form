import get from 'lodash/get';
import set from 'lodash/set';

export default function apiData(params, api) {
  const { formName, formState: state, notifyWatchers, watch } = params;

  api.logState = () => {
    // console.log('VALUES', state.values);
    // console.log('STATUS', state.meta);
    // console.log('LAST_INITIALIZED_VALUES', state.lastInitializedValues);
    // console.log('----------------------------------------------------');
  };

  api.getFlatData = path => state[path];

  api.setFlatData = (path, value) => {
    state[path] = value;
    api.logState();
  };

  api.getDeepData = path => get(state, path);

  api.setDeepData = (path, value) => {
    set(state, path, value);
    api.logState();
  };

  api.getName = () => formName;

  api.setProps = props => (state.props = props);

  api.getFormValues = () => api.getFlatData('values');

  api.watchFormValues = listener => watch(`${formName}/values`, listener);

  api.notifyFormValuesWatchers = () => notifyWatchers(`${formName}/values`, api.getFormValues());

  api.getFormMeta = key => (key ? api.getDeepData(`meta.${key}`) : api.getFlatData('meta'));

  api.watchFormMeta = listener => watch(`${formName}/meta`, listener);

  api.notifyFormMetaWatchers = () => notifyWatchers(`${formName}/meta`, api.getFormMeta());

  api.changeFormMeta = payload => {
    api.setFlatData('meta', {
      ...api.getFormMeta(),
      ...payload
    });
    api.notifyFormMetaWatchers();
  };
}
