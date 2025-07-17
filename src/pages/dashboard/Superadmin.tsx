import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import SA_SPCL_stats from '../../components/charts/SA_SPCL_stats';
import Customersegmentsaleschart from '../../components/charts/Customersegmentsaleschart';
import Salesreturnschart from '../../components/charts/Salesreturnschart';
import Salestrendschart from '../../components/charts/Salestrendschart';
import Salesfunnelchart from '../../components/charts/Salesfunnelchart';
import Revenuebreakdownchart from '../../components/charts/Revenuebreakdownchart';
import Salesbyregionmap from '../../components/charts/Salesbyregionmap';

const Superadmin: React.FC = () => {
  return (
    <Container fluid className="py-4">
      {/* Top Stats */}
      <Row className="mb-4">
        <Col xs={12}>
          <SA_SPCL_stats />
        </Col>
      </Row>

      {/* First Row */}
      <Row className="mb-4">
        <Col xl={4} md={6} className="mb-4 mb-xl-0">
          <div className="h-100 d-flex flex-column">
            <Customersegmentsaleschart />
          </div>
        </Col>
        <Col xl={4} md={6} className="mb-4 mb-xl-0">
          <div className="h-100 d-flex flex-column">
            <Salesreturnschart />
          </div>
        </Col>
        <Col xl={4} md={12}>
          <div className="h-100 d-flex flex-column">
            <Salestrendschart />
          </div>
        </Col>
      </Row>

      {/* Second Row */}
      <Row className="mb-4">
        <Col md={6} className="mb-4 mb-md-0">
          <div className="h-100 d-flex flex-column">
            <Salesfunnelchart />
          </div>
        </Col>
        <Col md={6}>
          <div className="h-100 d-flex flex-column">
            <Revenuebreakdownchart />
          </div>
        </Col>
      </Row>

      {/* Full Width Map */}
      <Row>
        <Col xs={12}>
          <Salesbyregionmap />
        </Col>
      </Row>
    </Container>
  );
};

export default Superadmin;
