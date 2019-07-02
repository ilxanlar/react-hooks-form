import addDataApi from './api.data';
import addFieldApi from './api.field';
import addFormApi from './api.form';

export default function createApi(params) {
  const api = {};
  addDataApi(params, api);
  addFieldApi(params, api);
  addFormApi(params, api);
  return api;
}
