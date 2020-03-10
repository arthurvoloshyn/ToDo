import React from 'react';
import PropTypes from 'prop-types';
import ReduxToastr from 'react-redux-toastr';

import Header from '~/components/header/header';
import Footer from '~/components/footer/footer';

const App = ({ params, children, location }) => (
  <div className="App">
    <Header userAlias={params.alias} location={location.pathname} />
    <ReduxToastr newestOnTop={false} preventDuplicates position="top-center" transitionIn="fadeIn" transitionOut="fadeOut" />
    <main className="main">{children}</main>
    <Footer />
  </div>
);

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  params: PropTypes.shape({
    alias: PropTypes.string
  })
};

App.defaultProps = {
  params: {},
  location: {
    pathname: '/'
  }
};

export default App;
