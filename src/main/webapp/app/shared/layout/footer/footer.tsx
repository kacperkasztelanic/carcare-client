import './footer.css';

import React from 'react';
import { Col, Row } from 'reactstrap';

const Footer = props => (
  <div className="footer page-content">
    <Row>
      <Col md="12">
        <p>
          &copy; 2018-2019 <img src="content/images/car.svg" alt="Logo" height="20" /> CarCare
        </p>
      </Col>
    </Row>
  </div>
);

export default Footer;
