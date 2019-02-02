import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { StoreContext } from './context';

function Provider({ children, store }) {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

Provider.propTypes = {
  store: PropTypes.shape({
    form: PropTypes.func
  }).isRequired
};

export default memo(Provider);
