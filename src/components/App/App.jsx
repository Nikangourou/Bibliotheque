import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './App.scss';

const App = ({ title }) => (
  <h1 className={classNames(style.monTitre)}>{title}</h1>
);

App.propTypes = {
  title: PropTypes.string,
};

App.defaultProps = {
  title: 'Welcome',
};

export default App;
