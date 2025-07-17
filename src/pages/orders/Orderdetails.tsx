import React, { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    Table,
    Image,
    Badge,
    Button,
    OverlayTrigger,
    Tooltip,
    Modal,
    Form,
} from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../../redux/Store';
import {
    orderStatusVariant,
    paymentStatusVariant,
    paymentHistoryStatusVariant,
    userStatusVariant,
} from '../../utils/Types';
import empty_data from '../../assets/images/product/empty.jpg';

const primaryColor = '#ff6f61';

const Orderdetails: React.FC = () => {
    const navigate = useNavigate();

    const { selectedOrder: order, selectedCustomer: user } = useSelector(
        (state: RootState) => state.order
    );

    const [showRefundModal, setShowRefundModal] = useState(false);
    const [showReturnModal, setShowReturnModal] = useState(false);
    const [reason, setReason] = useState('');
    const [notes, setNotes] = useState('');
    const [activeStep, setActiveStep] = useState<number | null>(null);

    if (!order || !user) {
        return (
            <Container className="mt-5 d-flex flex-column align-items-center justify-content-center text-center">
                <Image
                    src={empty_data}
                    alt="No Data"
                    fluid
                    className="mb-4"
                    style={{ maxWidth: '100%', height: 'auto', filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.1))' }}
                />
                <h4 className="text-danger">No Order Data Found</h4>
                <Button onClick={() => navigate(-1)} variant="outline-dark" className="mt-3">
                    🔙 Go Back
                </Button>
            </Container>
        );
    }


    const handleRefundSubmit = () => {
        console.log('Refund Submitted:', { reason, notes, type: 'refund' });
        setReason('');
        setNotes('');
        setShowRefundModal(false);
    };

    const handleReturnSubmit = () => {
        console.log('Return Submitted:', { reason, notes, type: 'return' });
        setReason('');
        setNotes('');
        setShowReturnModal(false);
    };

    const fullAddress = (addr: typeof order.shipping_address) =>
        `${addr.line}, ${addr.city}, ${addr.state}, ${addr.country} - ${addr.zip_code}`;

    const timelineSteps = [
        { label: 'Order Placed', completed: order.live_tracking.order_placed, time: '2025-06-20 10:00' },
        { label: 'Dispatched', completed: order.live_tracking.dispatched, time: '2025-06-21 14:00' },
        { label: 'In Transit', completed: order.live_tracking.in_transit, time: '2025-06-22 08:30' },
        { label: 'Out for Delivery', completed: order.live_tracking.out_for_delivery, time: 'N/A' },
    ];

    const completedStepsCount = timelineSteps.filter(step => step.completed).length;
    const progressWidth = completedStepsCount <= 1
        ? 0
        : ((completedStepsCount - 1) / (timelineSteps.length - 1)) * 100;

    const handleViewInvoice = () => {
        navigate('/pages/orders/Invoicepage');
    };

    const sectionStyle = {
        borderLeft: `4px solid ${primaryColor}`,
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '24px',
        backgroundColor: '#fff',
        boxShadow: '0 0 12px rgba(0, 0, 0, 0.05)',
    };

    const headerStyle = {
        color: primaryColor,
        fontWeight: 600,
        marginBottom: '12px',
    };

    return (
        <Container fluid className="p-4 bg-light">
            <style>
                {`
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(0, 128, 0, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(0, 128, 0, 0); }
            100% { box-shadow: 0 0 0 0 rgba(0, 128, 0, 0); }
          }
        `}
            </style>

            {/* Order Summary */}
            <Card className="mb-4 p-4" style={{ borderLeft: `6px solid ${primaryColor}` }}>
                <Table borderless className="mb-0">
                    <tbody>
                        <tr>
                            <td><strong style={{ color: primaryColor }}>Order ID:</strong> {order.order_id}</td>
                            <td><strong>Order Date:</strong> {order.date}</td>
                            <td><strong>Status:</strong> <Badge bg={orderStatusVariant[order.order_status]}>{order.order_status}</Badge></td>
                            <td><strong>Payment:</strong> <Badge bg={paymentStatusVariant[order.payment_status]}>{order.payment_status}</Badge></td>
                        </tr>
                    </tbody>
                </Table>
            </Card>

            {/* Customer, Shipping & Billing */}
            <Row>
                <Col md={4}>
                    <div style={sectionStyle}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h6 style={headerStyle}>Customer</h6>
                            <Badge bg={userStatusVariant[user.status]}>
                                {user.status}
                            </Badge>
                        </div>
                        <Image
                            src={user.profile_image}
                            roundedCircle
                            width={70}
                            height={70}
                            className="mb-2"
                            style={{
                                objectFit: 'cover',
                                border: `3px solid var(--bs-${userStatusVariant[user.status]})`,
                                padding: '0px',
                            }}
                        />
                        <p className="mb-1"><strong>{user.name}</strong></p>
                        <p className="text-primary-underline mb-1">{user.email}</p>
                        <p className="mb-1">+91 {user.mobile}</p>
                    </div>
                </Col>
                <Col md={4}>
                    <div style={sectionStyle}>
                        <h6 style={headerStyle}>Shipping Address</h6>
                        <p>{fullAddress(order.shipping_address)}</p>
                    </div>
                </Col>
                <Col md={4}>
                    <div style={sectionStyle}>
                        <h6 style={headerStyle}>Billing Address</h6>
                        <p>{fullAddress(order.billing_address)}</p>
                    </div>
                </Col>
            </Row>

            {/* Product Info */}
            <div style={sectionStyle}>
                <div className="d-flex justify-content-between align-items-center">
                    <h5 style={headerStyle}>Ordered Product</h5>
                    <Button variant="outline-primary" size="sm" onClick={handleViewInvoice}>View Invoice</Button>
                </div>
                <Table responsive hover>
                    <thead className="table-light">
                        <tr>
                            <th>Order ID</th>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Color</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-primary-underline">{order.order_id}</td>
                            <td><Image src={order.product.image} rounded width={50} className="me-2" /> {order.product.name}</td>
                            <td>{order.quantity}</td>
                            <td>{order.product.color}</td>
                            <td>{order.product.size}</td>
                            <td>₹{order.product.price}</td>
                            <td><Badge bg={orderStatusVariant[order.order_status]}>{order.order_status}</Badge></td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            {/* Payment Summary */}
            <div style={sectionStyle}>
                <h5 style={headerStyle}>Payment Summary</h5>
                <Table responsive borderless hover>
                    <tbody>
                        <tr>
                            <td><strong>Payment ID:</strong> <span className="text-primary-underline">{order.payment_history[0].payment_id}</span></td>
                            <td><strong>Reference No:</strong> <span className="text-primary-underline">REF-{order.payment_history[0].payment_id.slice(-5)}</span></td>
                            <td><strong>Method:</strong> {order.payment_source.toUpperCase()}</td>
                            <td><strong>Total:</strong> ₹{order.product.price * order.quantity}</td>
                            <td><strong>Status:</strong> <Badge bg={paymentStatusVariant[order.payment_status]}>{order.payment_status}</Badge></td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            {/* Timeline */}
            <div style={sectionStyle}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 style={headerStyle}>Order Timeline</h5>
                    <Badge bg="primary">{timelineSteps[Math.max(completedStepsCount - 1, 0)].label}</Badge>
                </div>
                <div className="position-relative mb-3" style={{ height: '6px', backgroundColor: '#ddd', borderRadius: '4px' }}>
                    <div
                        style={{
                            height: '100%',
                            width: `${progressWidth}%`,
                            backgroundColor: primaryColor,
                            borderRadius: '4px',
                            transition: 'width 0.4s ease-in-out',
                        }}
                    />
                    {timelineSteps.map((step, idx) => (
                        <OverlayTrigger
                            key={idx}
                            placement="top"
                            overlay={<Tooltip>{step.label}: {step.time}</Tooltip>}
                        >
                            <div
                                onClick={() => setActiveStep(idx)}
                                style={{
                                    width: '15px',
                                    height: '15px',
                                    borderRadius: '50%',
                                    backgroundColor: step.completed ? 'green' : '#bbb',
                                    border: '2px solid white',
                                    position: 'absolute',
                                    top: '-4px',
                                    left: `${(idx / (timelineSteps.length - 1)) * 100}%`,
                                    transform: 'translateX(-50%)',
                                    cursor: 'pointer',
                                    animation: completedStepsCount - 1 === idx ? 'pulse 1.5s infinite' : 'none',
                                }}
                            />
                        </OverlayTrigger>
                    ))}
                </div>
                {activeStep !== null && (
                    <Card className="p-3 mt-3 shadow-sm position-relative">
                        <X size={18} onClick={() => setActiveStep(null)} style={{ position: 'absolute', top: 12, right: 12, cursor: 'pointer' }} />
                        <h6>{timelineSteps[activeStep].label}</h6>
                        <p>Timestamp: {timelineSteps[activeStep].time}</p>
                        <p>Location: {order.live_tracking.current_location}</p>
                    </Card>
                )}
            </div>

            {/* Return & Refund */}
            <div style={sectionStyle}>
                <div className="d-flex justify-content-between">
                    <h5 style={headerStyle}>Return & Refund</h5>
                    <div>
                        <Button variant="outline-danger" className="me-2" onClick={() => setShowReturnModal(true)}>Return</Button>
                        <Button variant="outline-success" onClick={() => setShowRefundModal(true)}>Refund</Button>
                    </div>
                </div>
                <Table bordered hover className="mt-3">
                    <thead className="table-light">
                        <tr>
                            <th>Return Requested</th>
                            <th>Reason</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Return ID</th>
                            <th>Refund Amount</th>
                            <th>Method</th>
                            <th>Reference ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Yes</td>
                            <td>{order.return_info.return_reason}</td>
                            <td>{order.return_info.notes}</td>
                            <td>{order.return_info.return_status}</td>
                            <td className="text-primary-underline">RET-{order.order_id.slice(-4)}</td>
                            <td>₹{order.return_info.refund_amount}</td>
                            <td>{order.return_info.refund_method.toUpperCase()}</td>
                            <td className="text-primary-underline">REF-{order.order_id.slice(-4)}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>

            {/* Review & Refund History */}
            <Row>
                <Col md={4}>
                    <div style={sectionStyle}>
                        <h5 style={headerStyle}>Customer Review</h5>
                        <div className="d-flex align-items-center mb-2">
                            <Image src={order.product.image} roundedCircle width={40} height={40} className="me-2" />
                            <strong>{order.review.rating} ⭐</strong>
                        </div>
                        <p className="mb-0">"{order.review.comment}"</p>
                    </div>
                </Col>
                <Col md={8}>
                    <div style={sectionStyle}>
                        <h5 style={headerStyle}>Refund History</h5>
                        <Table responsive borderless hover>
                            <thead className="table-light">
                                <tr>
                                    <th>Payment ID</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Method</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.payment_history.map((p, i) => (
                                    <tr key={i}>
                                        <td className="text-primary-underline">{p.payment_id}</td>
                                        <td>{p.date}</td>
                                        <td>₹{p.amount}</td>
                                        <td>{p.method.toUpperCase()}</td>
                                        <td><Badge bg={paymentHistoryStatusVariant[p.status]}>{p.status}</Badge></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>

            {/* Support Tickets */}
            <div style={sectionStyle}>
                <h5 style={headerStyle}>Support Tickets</h5>
                <Table responsive hover>
                    <thead className="table-light">
                        <tr>
                            <th>Ticket ID</th>
                            <th>Concern Type</th>
                            <th>Subject</th>
                            <th>Assigned To</th>
                            <th>Status</th>
                            <th>Created</th>
                            <th>Last Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.support_tickets.map((ticket, i) => (
                            <tr key={i}>
                                <td className="text-primary-underline">{ticket.ticket_id}</td>
                                <td>Return</td> {/* or ticket.concern_type if it's in the interface */}
                                <td>{ticket.subject}</td>
                                <td>Support Agent</td> {/* or ticket.assigned_to if it's in the interface */}
                                <td><Badge bg="info">{ticket.status}</Badge></td>
                                <td>{ticket.created_on}</td> {/* fixed from created_at */}
                                <td>{ticket.last_updated}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* Refund Modal */}
            <Modal show={showRefundModal} onHide={() => setShowRefundModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>🧾 Refund Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Reason</Form.Label>
                        <Form.Select onChange={(e) => setReason(e.target.value)}>
                            <option value="">-- Select Reason --</option>
                            <option value="damaged">Product Damaged</option>
                            <option value="wrong-item">Wrong Item Received</option>
                            <option value="not-required">No Longer Required</option>
                            <option value="late-delivery">Late Delivery</option>
                            <option value="other">Other</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Additional Notes</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={(e) => setNotes(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowRefundModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleRefundSubmit}>Submit Request</Button>
                </Modal.Footer>
            </Modal>

            {/* Return Modal */}
            <Modal show={showReturnModal} onHide={() => setShowReturnModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>📦 Return Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Reason</Form.Label>
                        <Form.Select onChange={(e) => setReason(e.target.value)}>
                            <option value="">-- Select Reason --</option>
                            <option value="defective">Defective Product</option>
                            <option value="incorrect-size">Incorrect Size</option>
                            <option value="changed-mind">Changed My Mind</option>
                            <option value="delay">Delivery Delay</option>
                            <option value="other">Other</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Additional Notes</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={(e) => setNotes(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowReturnModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleReturnSubmit}>Submit Request</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Orderdetails;
