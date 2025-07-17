import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'react-bootstrap-icons';

const Welcome: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleLoginClick = () => {
    navigate('/pages/Login');
  };

  const welcomeVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -100 },
  };

  const loginVariants = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 100 },
  };

  return (
    <div
      className="vh-100 d-flex justify-content-center align-items-center text-dark position-relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #ffe1db, #fff5f2, #ffffff)' }}
    >
      <AnimatePresence mode="wait">
        {showWelcome ? (
          <motion.div
            key="welcome"
            variants={welcomeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1 }}
            className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center"
          >
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
              <div className="text-center w-100 d-flex flex-column justify-content-center align-items-center px-3" style={{ maxWidth: '850px' }}>
                <div className="bg-white rounded-4 shadow-lg py-3 px-4 w-100 d-flex flex-column justify-content-center align-items-center">
                  <h1 className="display-5 fw-bold mb-2">
                    <span className="d-block">Welcome to</span>
                    <span style={{ color: '#ff6f61' }}>Vistora Admin Console</span>
                  </h1>
                  <p className="fs-5 mb-2 text-secondary">Your all-in-one smart business console</p>
                  <p className="mb-2 text-muted px-2 px-md-4">
                    Take control of your digital ecosystem with a powerful platform built for clarity,
                    efficiency, and scale. Whether you're a super admin, team leader, or service user —
                    Vistora simplifies operations, so you can focus on what matters most.
                  </p>
                  <p className="fw-semibold text-uppercase mt-2" style={{ color: '#ff6f61' }}>
                    Smart • Secure • Scalable
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            variants={loginVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1 }}
            className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center"
          >
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
              <div className="text-center w-100 d-flex flex-column justify-content-center align-items-center px-3" style={{ maxWidth: '600px' }}>
                <div className="bg-white rounded-4 shadow-lg py-4 px-5 w-100 d-flex flex-column justify-content-center align-items-center">
                  <h2 className="fw-bold mb-3">Let’s Get You Started</h2>
                  <p className="text-muted mb-4 px-2 px-md-4">
                    Log in to manage your dashboard and streamline your business operations.
                  </p>
                  <motion.div
                    whileHover="hover"
                    initial="rest"
                    animate="rest"
                    variants={{
                      rest: { x: 0 },
                      hover: { x: 6 },
                    }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="d-flex align-items-center"
                  >
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleLoginClick}
                      className="rounded-pill px-5 py-2 shadow-lg d-flex align-items-center gap-2"
                      style={{ backgroundColor: '#ff6f61', borderColor: '#ff6f61' }}
                    >
                      Go to Login
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      >
                        <ArrowRight />
                      </motion.span>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Welcome;
