// src/pages/Loginpage.tsx
import React, { useState, useEffect } from 'react';
import { Form, Button, FloatingLabel, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import loginImage from '../assets/images/authentication/signin.jpg';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from 'react-simple-captcha';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loginFailure, loginStart, loginSuccess } from '../redux/slices/Authslice';
import type { UserRole } from '../types/Authtypes';

const Loginpage: React.FC = () => {
  const [serviceId, setServiceId] = useState('');
  const [password, setPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [remember, setRemember] = useState(false);
  const [validated, setValidated] = useState(false);

  // Field validation states
  const [serviceIdInvalid, setServiceIdInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [captchaInvalid, setCaptchaInvalid] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isAuthenticated, role, loading, error } = useAppSelector((state) => state.auth);

  const from = (location.state as any)?.from?.pathname;

  useEffect(() => {
    loadCaptchaEnginge(6, '#f0f0f0', '#333');
  }, []);

  useEffect(() => {
    if (isAuthenticated && role) {
      const dest =
        from && from !== '/pages/Login'
          ? from
          : ['superadmin', 'admin', 'team'].includes(role)
            ? '/pages/dashboard/superadmin'
            : '/pages/dashboard/serviceexecutive';
      navigate(dest, { replace: true });
    }
  }, [isAuthenticated, role, navigate, from]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    setServiceIdInvalid(false);
    setPasswordInvalid(false);
    setCaptchaInvalid(false);

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    dispatch(loginStart());

    // Validate captcha
    if (!validateCaptcha(captchaInput, false)) {
      dispatch(loginFailure('Captcha is incorrect'));
      setCaptchaInvalid(true);
      loadCaptchaEnginge(6, '#f0f0f0', '#333'); // regenerate
      return;
    }

    const userMap: Record<string, { password: string; role: string }> = {
      'super@vistora.com': { password: 'super123', role: 'superadmin' },
      'admin@vistora.com': { password: 'admin123', role: 'admin' },
      'team@vistora.com': { password: 'team123', role: 'team' },
      'service@vistora.com': { password: 'service123', role: 'serviceexecutive' },
    };

    const normalizedId = serviceId.trim().toLowerCase();
    const user = userMap[normalizedId];
    if (!user || user.password !== password) {
      dispatch(loginFailure('Invalid credentials'));
      if (!userMap[serviceId]) {
        setServiceIdInvalid(true);
      } else {
        setPasswordInvalid(true);
      }
      return;
    }

    const fakeToken = 'mockedToken123';
    dispatch(
      loginSuccess({
        token: fakeToken,
        userEmail: serviceId,
        role: user.role as UserRole,
      })
    );

    if (remember) {
      localStorage.setItem('token', fakeToken);
      localStorage.setItem('userEmail', serviceId);
      localStorage.setItem('role', user.role);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-image-wrapper">
          <img src={loginImage} alt="Login Visual" />
        </div>

        <div className="login-form-wrapper">
          <h3>Welcome Back</h3>
          <p className="text-muted">Login to your dashboard</p>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <FloatingLabel label="Username / Service ID" className="mb-3">
              <Form.Control
                type="text"
                required
                value={serviceId}
                isInvalid={serviceIdInvalid}
                onChange={(e) => {
                  setServiceId(e.target.value);
                  setServiceIdInvalid(false);
                }}
              />
              <Form.Control.Feedback type="invalid">
                Invalid email / service ID
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel label="Password" className="mb-3">
              <Form.Control
                type="password"
                required
                value={password}
                isInvalid={passwordInvalid}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordInvalid(false);
                }}
              />
              <Form.Control.Feedback type="invalid">
                Incorrect password
              </Form.Control.Feedback>
            </FloatingLabel>

            <Row className="align-items-center mb-3">
              <Col md={7}>
                <FloatingLabel label="Enter Captcha" className="mb-0">
                  <Form.Control
                    type="text"
                    required
                    value={captchaInput}
                    isInvalid={captchaInvalid}
                    onChange={(e) => {
                      setCaptchaInput(e.target.value);
                      setCaptchaInvalid(false);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    Captcha is incorrect
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col md={5}>
                <LoadCanvasTemplate reloadColor="#ff6f61" />
              </Col>
            </Row>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <Form.Check
                type="checkbox"
                label="Remember me"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <a href="#" className="text-decoration-none text-primary small">
                Trouble logging in?
              </a>
            </div>

            <div className="d-grid">
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
