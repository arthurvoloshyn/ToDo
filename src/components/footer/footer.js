import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="info-wrapper text-left">
              <h6 className="heart">
                <span>Created with love</span>
                <i className="material-icons">favorite</i>
              </h6>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="info-wrapper text-right">
              <h6>
                Full code of application
                <a
                  href="https://github.com/ArturW1998/ToDo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  &lt;On gitHub &#8725;&gt;
                </a>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
