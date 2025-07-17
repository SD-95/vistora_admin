import  { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Modal,
  Form,
  Dropdown,
} from "react-bootstrap";
import { BsPaperclip, BsThreeDotsVertical } from "react-icons/bs";
import SunEditor from "suneditor-react";

const PRIMARY_COLOR = "#ff6f61";

type ChatMessage = {
  sender: string;
  name: string;
  avatar: string;
  timestamp: string;
  message: string;
  signature: string;
};

const customer = {
  avatar: "https://via.placeholder.com/50",
  name: "John Doe",
  lastSeen: "Last seen 2 hours ago",
  issue: {
    subject: "Unable to login",
    timestamp: "2025-07-05 10:00 AM",
    description:
      "I'm having trouble logging into my account. I tried resetting the password but still can't access it.",
  },
  ticketId: "TCKT-001",
  status: "Active",
};

const Ticketdescription = () => {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [escalate, setEscalate] = useState(false);
  const [noteChecked, setNoteChecked] = useState(false);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const handleReply = () => {
    const reply = {
      sender: "executive",
      name: "Support Executive",
      avatar: "https://via.placeholder.com/50",
      timestamp: new Date().toLocaleString(),
      message: "Thank you for reaching out. We're looking into your issue.",
      signature: "Support Executive\nXYZ Corp",
    };
    setChatMessages([...chatMessages, reply]);
  };

  return (
    <Container fluid className="p-4">
      <Row>
        <Col md={8}>
          <Card className="mb-4 shadow-sm" style={{ borderRadius: "10px" }}>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-3">
                <img
                  src={customer.avatar}
                  alt="avatar"
                  style={{ width: 50, height: 50, borderRadius: "50%" }}
                />
                <div>
                  <h5 className="mb-0">{customer.name}</h5>
                  <small className="text-muted">{customer.lastSeen}</small>
                </div>
              </div>
              <Badge bg="danger">High Priority</Badge>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="mb-0">
                  <strong>Issue Subject:</strong> {customer.issue.subject}
                </h6>
                <div className="d-flex align-items-center gap-3">
                  <Button variant="light" size="sm">
                    <BsPaperclip />
                  </Button>
                  <small className="text-muted">{customer.issue.timestamp}</small>
                </div>
              </div>
              <hr />
              <div className="mt-3">
                <h4>Issue Description:</h4>
                <p className="mt-2">{customer.issue.description}</p>
              </div>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-end gap-3">
              <Button
                style={{ backgroundColor: PRIMARY_COLOR, border: "none", color: "#fff" }}
                onClick={() => setShowChat(true)}
              >
                Attend Ticket
              </Button>
              <Button
                style={{ backgroundColor: PRIMARY_COLOR, border: "none", color: "#fff" }}
                onClick={() => setShowAssignModal(true)}
              >
                Assign Ticket
              </Button>
            </Card.Footer>
          </Card>

          {showChat && (
            <>
              <Card className="shadow-sm mb-4" style={{ borderRadius: "10px" }}>
                <Card.Body>
                  <SunEditor height="200px" />
                </Card.Body>
                <Card.Footer className="d-flex justify-content-end">
                  <Button
                    style={{ backgroundColor: PRIMARY_COLOR, border: "none", color: "#fff" }}
                    onClick={handleReply}
                  >
                    Reply to the Ticket
                  </Button>
                </Card.Footer>
              </Card>

              <div style={{ backgroundColor: "#f7f8f9", borderRadius: "10px", padding: "1rem" }}>
                {chatMessages.map((msg, index) => (
                  <Card
                    key={index}
                    className="mb-3"
                    style={{ borderRadius: "10px", maxWidth: "70%", marginLeft: msg.sender === "executive" ? "auto" : 0 }}
                  >
                    <Card.Header className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={msg.avatar}
                          alt="avatar"
                          style={{ width: 40, height: 40, borderRadius: "50%" }}
                        />
                        <div>
                          <strong>{msg.name}</strong>
                          <div><small className="text-muted">{customer.lastSeen}</small></div>
                        </div>
                      </div>
                      <small className="text-muted">{msg.timestamp}</small>
                    </Card.Header>
                    <Card.Body>
                      <p>{msg.message}</p>
                      <hr />
                      <div className="text-muted" style={{ fontSize: "0.875rem" }}>{msg.signature}</div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </>
          )}
        </Col>

        <Col md={4}>
          <Card className="shadow-sm" style={{ borderRadius: "10px" }}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="text-center">
                  <img
                    src={customer.avatar}
                    alt="avatar"
                    style={{ width: 60, height: 60, borderRadius: "50%" }}
                  />
                  <h5 className="mt-2 mb-0">{customer.name}</h5>
                  <small className="text-muted">{customer.lastSeen}</small>
                </div>
                <Dropdown align="end">
                  <Dropdown.Toggle className="no_caret" variant="light" style={{ border: "none" }}>
                    <BsThreeDotsVertical />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setShowAssignModal(true)}>Assign</Dropdown.Item>
                    <Dropdown.Item onClick={() => setShowChat(true)}>Reply</Dropdown.Item>
                    <Dropdown.Item>Report</Dropdown.Item>
                    <Dropdown.Item>Mark as Resolved</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <hr />
              <p><strong>Email:</strong> john@example.com</p>
              <p><strong>Mobile:</strong> +91-9876543210</p>
              <p><strong>Address:</strong> 123 Street, City, State</p>
              <hr />
              <p><strong>Ticket ID:</strong> {customer.ticketId}</p>
              <p><strong>Category:</strong> Login</p>
              <p><strong>Type:</strong> Authentication</p>
              <p><strong>Status:</strong> {customer.status}</p>
              <hr />
              <p><strong>Product ID:</strong> PROD-123</p>
              <p><strong>Name:</strong> Product Name</p>
              <p><strong>Category:</strong> Software</p>
              <p><strong>Subcategory:</strong> Web App</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showAssignModal} onHide={() => setShowAssignModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {customer.ticketId} <Badge bg="info" className="ms-2">{customer.status}</Badge>
          </Modal.Title>
          <div className="ms-auto">
            <Form.Check
              type="switch"
              label="Escalate Ticket"
              checked={escalate}
              onChange={(e) => setEscalate(e.target.checked)}
            />
          </div>
        </Modal.Header>
        <Modal.Body>
          {!escalate ? (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Assign to Executive</Form.Label>
                <Form.Select>
                  <option>Select Executive</option>
                  <option>John Executive</option>
                  <option>Jane Manager</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Select Priority</Form.Label>
                <Form.Select>
                  <option>Select Priority</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </Form.Select>
              </Form.Group>
            </>
          ) : (
            <>
              <p className="text-danger">
                The ticket is being escalated to the higher support tier. Ensure all preliminary actions are taken before escalation.
              </p>
              <Form.Check
                type="checkbox"
                label="I confirm to escalate this ticket"
                checked={noteChecked}
                onChange={(e) => setNoteChecked(e.target.checked)}
              />
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="justify-content-end">
          {!escalate ? (
            <Button style={{ backgroundColor: PRIMARY_COLOR, border: "none", color: "#fff" }}>
              Assign
            </Button>
          ) : noteChecked ? (
            <Button variant="danger">Escalate</Button>
          ) : null}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Ticketdescription;
