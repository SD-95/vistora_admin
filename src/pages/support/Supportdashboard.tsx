import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Form,
  Pagination,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const PRIMARY_COLOR = "#ff6f61";
const CARD_BG = "#fff";

const tickets = [
  {
    id: 1,
    ticketID: "TCKT-001",
    subject: "Login issue",
    username: "John Doe",
    concernType: "Login",
    email: "john@example.com",
    status: "Active",
  },
  {
    id: 2,
    ticketID: "TCKT-002",
    subject: "Billing Error",
    username: "Jane Smith",
    concernType: "Billing",
    email: "jane@example.com",
    status: "Resolved",
  },
  {
    id: 3,
    ticketID: "TCKT-003",
    subject: "App Crash",
    username: "Mike Johnson",
    concernType: "Bug",
    email: "mike@example.com",
    status: "Escalated",
  }
];

const StatusCard = ({ title, count, icon }: { title: string; count: number; icon: string }) => (
  <Card style={{ background: CARD_BG, borderLeft: `6px solid ${PRIMARY_COLOR}`, borderRadius: "1rem" }} className="shadow-sm p-3">
    <Card.Body>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <Card.Title className="mb-0" style={{ color: PRIMARY_COLOR, fontWeight: 600 }}>{title}</Card.Title>
          <h4 className="mt-2 mb-0">{count}</h4>
        </div>
        <div style={{ fontSize: "2rem", color: PRIMARY_COLOR }}>
          <i className={icon}></i>
        </div>
      </div>
    </Card.Body>
  </Card>
);

const Supportdashboard: React.FC = () => {
  const [search, setSearch] = useState("");

  const countByStatus = (status: string) =>
    tickets.filter((t) => t.status.toLowerCase() === status.toLowerCase()).length;

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.ticketID.toLowerCase().includes(search.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
      ticket.username.toLowerCase().includes(search.toLowerCase()) ||
      ticket.concernType.toLowerCase().includes(search.toLowerCase()) ||
      ticket.email.toLowerCase().includes(search.toLowerCase()) ||
      ticket.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container fluid className="p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <Row className="mb-4">
        <Col><h2 style={{ color: PRIMARY_COLOR }}>Support Dashboard</h2></Col>
      </Row>

      <Row className="mb-4" xs={1} sm={2} md={3} lg={3}>
        <Col><StatusCard title="Active Tickets" count={countByStatus("Active") } icon="bi bi-lightning" /></Col>
        <Col><StatusCard title="Resolved Tickets" count={countByStatus("Resolved") } icon="bi bi-check-circle" /></Col>
        <Col><StatusCard title="Escalated Tickets" count={countByStatus("Escalated") } icon="bi bi-exclamation-circle" /></Col>
      </Row>

      <Card style={{ background: CARD_BG, borderRadius: "1rem", overflow: 'visible' }} className="shadow-sm">
        <Card.Header style={{ backgroundColor: PRIMARY_COLOR, color: "#fff" }}>
          <div className="d-flex justify-content-between align-items-center">
            <strong>Ticket List</strong>
            <Form.Control
              type="text"
              placeholder="Search tickets..."
              style={{ maxWidth: "300px" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </Card.Header>

        <Card.Body style={{ overflow: 'visible', position: 'relative' }}>
          <div style={{ overflowX: 'auto' }}>
            <Table responsive bordered hover className="mb-0">
              <thead style={{ backgroundColor: "#f1f1f1" }}>
                <tr>
                  <th>#</th>
                  <th>Ticket ID</th>
                  <th>Subject</th>
                  <th>Username</th>
                  <th>Concern Type</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket, index) => (
                  <tr key={ticket.id}>
                    <td>{index + 1}</td>
                    <td><Link to='/pages/support/Ticketdescription'className="text-primary-underline">{ticket.ticketID}</Link></td>
                    <td>{ticket.subject}</td>
                    <td>{ticket.username}</td>
                    <td>{ticket.concernType}</td>
                    <td>{ticket.email}</td>
                    <td>
                      <Badge bg={
                        ticket.status === "Active"
                          ? "warning"
                          : ticket.status === "Resolved"
                          ? "success"
                          : "danger"
                      }>
                        {ticket.status}
                      </Badge>
                    </td>
                  
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="d-flex justify-content-end mt-3">
            <Pagination className="mb-0 custom-pagination">
  <Pagination.Prev disabled style={{ color: PRIMARY_COLOR, border: '1px solid #dee2e6' }} />
  <Pagination.Item
    active
    style={{
      backgroundColor: PRIMARY_COLOR,
      borderColor: PRIMARY_COLOR,
      color: "#fff",
      fontWeight: 600
    }}
  >
    1
  </Pagination.Item>
  <Pagination.Item
    style={{
      borderColor: PRIMARY_COLOR,
      color: PRIMARY_COLOR,
      fontWeight: 500
    }}
  >
    2
  </Pagination.Item>
  <Pagination.Next style={{ color: PRIMARY_COLOR, border: '1px solid #dee2e6' }} />
</Pagination>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Supportdashboard;