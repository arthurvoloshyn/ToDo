import React from 'react';
import PropTypes from 'prop-types';
import ReduxToastr from 'react-redux-toastr';
import Header from './../../components/header/header';
import Footer from './../../components/footer/footer';

const App = props => {
  const { params, children, location } = props;
  return (
    <div className="App">
      <Header userAlias={params.alias} location={location.pathname} />
      <ReduxToastr newestOnTop={false} preventDuplicates position="top-center" transitionIn="fadeIn" transitionOut="fadeOut" />
      <div className="main">{children}</div>
      <Footer />
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  params: PropTypes.object
};

export default App;
