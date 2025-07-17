import React from 'react';
import { Row, Col, Card, ListGroup, Badge, Container } from 'react-bootstrap';
import {
    FaTicketAlt, FaClock, FaCheckCircle, FaExclamationCircle,
    FaStopwatch, FaSmile, FaBell, FaSearch, FaPlus, FaRegListAlt,

} from 'react-icons/fa';

const Serviceexecutive: React.FC = () => {


    const ticketSummary = [
        { title: 'Total Tickets', value: 78, icon: <FaTicketAlt />, color: 'primary' },
        { title: 'Pending', value: 12, icon: <FaClock />, color: 'warning' },
        { title: 'Resolved Today', value: 8, icon: <FaCheckCircle />, color: 'success' },
        { title: 'Escalated', value: 1, icon: <FaExclamationCircle />, color: 'danger' },
    ];

    const activeTickets = [
        { id: '#1245', customer: 'John Doe', summary: 'Login issue', priority: 'High', timeOpen: '1h 25m' },
        { id: '#1246', customer: 'Jane Smith', summary: 'Refund request', priority: 'Medium', timeOpen: '2h 10m' },
        { id: '#1247', customer: 'Bob White', summary: 'Account locked', priority: 'Low', timeOpen: '30m' },
    ];

    const schedule = [
        { time: '10:30 AM', activity: 'Follow up with Jane Smith' },
        { time: '12:00 PM', activity: 'Callback: Issue #1247' },
        { time: '3:00 PM', activity: 'Zoom call with product team' },
    ];

    const performance = [
        { label: 'Resolution Rate', value: '92%', icon: <FaCheckCircle className="text-success" /> },
        { label: 'Avg. Response Time', value: '12 min', icon: <FaStopwatch className="text-info" /> },
        { label: 'Customer Feedback', value: '4.6 / 5', icon: <FaSmile className="text-warning" /> },
    ];

    const announcements = [
        'System upgrade on Friday at 10 PM',
        'New ticket escalation protocol effective next week',
        'Join the product webinar at 4 PM today',
    ];

    const tools = [
        { name: 'Create Ticket', icon: <FaPlus />, color: 'primary' },
        { name: 'Search KB', icon: <FaSearch />, color: 'info' },
        { name: 'Chat Access', icon: <FaBell />, color: 'success' },
        { name: 'Ticket List', icon: <FaRegListAlt />, color: 'secondary' },
    ];

    return (
        <Container fluid>

            {/* Summary Cards */}
            <Row className="g-4 mb-4">
                {ticketSummary.map((item, idx) => (
                    <Col md={3} key={idx}>
                        <Card className="p-3 text-center shadow-sm h-100">
                            <div className={`bg-${item.color} text-white rounded-circle d-flex justify-content-center align-items-center mx-auto mb-2`} style={{ width: 50, height: 50 }}>
                                {item.icon}
                            </div>
                            <h6 className="text-muted fw-semibold small">{item.title}</h6>
                            <h4 className={`fw-bold text-${item.color}`}>{item.value}</h4>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Active Tickets + Schedule */}
            <Row className="g-4 mb-4">
                <Col md={6}>
                    <Card className="p-3 shadow-sm h-100">
                        <h6 className="fw-bold mb-3">My Active Tickets</h6>
                        <ListGroup>
                            {activeTickets.map((ticket, i) => (
                                <ListGroup.Item key={i} className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <strong>{ticket.id}</strong> - {ticket.customer}
                                        <div className="text-muted small">{ticket.summary}</div>
                                    </div>
                                    <div className="text-end">
                                        <Badge bg={ticket.priority === 'High' ? 'danger' : ticket.priority === 'Medium' ? 'warning' : 'secondary'}>{ticket.priority}</Badge><br />
                                        <small className="text-muted">{ticket.timeOpen}</small>
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="p-3 shadow-sm h-100">
                        <h6 className="fw-bold mb-3">Today’s Schedule</h6>
                        <ListGroup>
                            {schedule.map((item, i) => (
                                <ListGroup.Item key={i} className="d-flex justify-content-between">
                                    <strong>{item.time}</strong>
                                    <span>{item.activity}</span>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

            {/* Performance + Announcements */}
            <Row className="g-4 mb-4">
                <Col md={6}>
                    <Card className="p-3 shadow-sm h-100">
                        <h6 className="fw-bold mb-3">Performance Snapshot</h6>
                        <ListGroup>
                            {performance.map((item, i) => (
                                <ListGroup.Item key={i} className="d-flex justify-content-between align-items-center">
                                    <span>{item.icon} {item.label}</span>
                                    <Badge bg="light" text="dark">{item.value}</Badge>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="p-3 shadow-sm h-100">
                        <h6 className="fw-bold mb-3">Internal Announcements</h6>
                        <ListGroup>
                            {announcements.map((text, i) => (
                                <ListGroup.Item key={i}>{text}</ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

            {/* Quick Tools */}
            <Row className="g-4">
                <Col>
                    <Card className="p-3 shadow-sm text-center">
                        <h6 className="fw-bold mb-3">Quick Tools</h6>
                        <div className="d-flex justify-content-around flex-wrap gap-3">
                            {tools.map((tool, i) => (
                                <div key={i} className={`bg-${tool.color} text-white rounded p-3 d-flex flex-column align-items-center`} style={{ width: 150 }}>
                                    <div className="fs-3 mb-2">{tool.icon}</div>
                                    <span className="small fw-semibold text-center">{tool.name}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Serviceexecutive;
