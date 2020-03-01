import React from 'react';
import { Link } from 'react-router';

const errorPage = () => {
  return (
    <div className="not-found">
      <div className="text">
        <h1>404</h1>
        <h2>Page not found</h2>
        <Link to="/" className="link">Back on the main page</Link>
      </div>
    </div>
  );
};

export default errorPage;
