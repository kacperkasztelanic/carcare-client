import './footer.css';

import React from 'react';
import { Col, Row } from 'reactstrap';

const Footer = props => (
  <div className="footer page-content">
    <Row>
      <Col md="12">
        <p>
          &copy; 2018 CarCare developed by Kacper Kasztelanic
        </p>
      </Col>
    </Row>
  </div>
);

export default Footer;
