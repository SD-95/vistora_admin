import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="unauth-wrapper">
      <Container className="text-center">
        <Row className="align-items-center justify-content-center min-vh-100">
          <Col md={6}>
            <div className="unauth-content p-4">
              <h1 className="display-3 fw-bold text-danger">403</h1>
              <h2 className="mb-3">Unauthorized Access</h2>
              <p className="text-muted mb-4">
                You don't have the required permissions to view this page.
              </p>
              <Button variant="danger" onClick={() => navigate('/pages/Login')}>
                Back to Login
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Unauthorized;
