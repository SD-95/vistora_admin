import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, InputGroup, ListGroup, Image, Button, Modal, Badge, Dropdown, Offcanvas, CloseButton } from 'react-bootstrap';
import {
    FaSearch,
    FaInbox,
    FaPaperPlane,
    FaRegFileAlt,
    FaTrash,
    FaStar,
    FaEnvelope,
    FaEllipsisV,
    FaExclamationCircle,
    FaArchive,
    FaHome,
    FaBriefcase,
    FaUserFriends,
    FaPaperclip,
    FaDownload,
    FaReply,
    FaRegStar,
    FaBan,
} from 'react-icons/fa';
import {
    HiOutlineReply,
    HiOutlineArrowNarrowRight,
    HiOutlineArrowCircleLeft,
} from "react-icons/hi";
import { TbLayoutSidebarRightCollapseFilled, TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { Link } from 'react-router-dom';

const Mailpage: React.FC = () => {
    const users = [
        { name: "Alice", avatar: "/default-avatar.png" },
        { name: "Bob", avatar: "/default-avatar.png" },
        { name: "Charlie", avatar: "/default-avatar.png" }
    ];
    const [showCompose, setShowCompose] = useState(false);
    const [toEmails, setToEmails] = useState<string[]>([]);
    const [toInput, setToInput] = useState('');
    const [cc, setCc] = useState('');
    const [bcc, setBcc] = useState('');
    const [subject, setSubject] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [isMobileSidebarVisible, setIsMobileSidebarVisible] = useState(false);
    const [isBelow1054, setIsBelow1054] = useState(false);

    const handleToKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === 'Enter' || e.key === ',') && toInput.trim()) {
            e.preventDefault();
            setToEmails([...toEmails, toInput.trim()]);
            setToInput('');
        }
    };

    const handleToRemove = (email: string) => {
        setToEmails(toEmails.filter(item => item !== email));
    };

    useEffect(() => {
        const handleResize = () => {
            setIsBelow1054(window.innerWidth < 1054);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <div className="mail-app m-3">
            {/* Sidebar */}
            <Card className="mail-sidebar custom-scroll shadow-sm">
                <div className="p-3">
                    <div className="mb-3">
                        <h6 className="text-muted fw-bold mb-1">Email</h6>
                        <small className="text-dark">stark1992@gmail.com</small>
                    </div>

                    <Button className="w-100 mb-3 compose-btn" onClick={() => setShowCompose(true)}>
                        + Compose Mail
                    </Button>

                    <h6 className="text-muted fw-bold mt-4 mb-2">Mails</h6>
                    <ListGroup variant="flush">
                        {[
                            { icon: <FaEnvelope className="me-2" />, label: 'All Mails', badge: '12456', badgeClass: 'bg-primary' },
                            { icon: <FaInbox className="me-2" />, label: 'Inbox', badge: '8', badgeClass: 'bg-success' },
                            { icon: <FaPaperPlane className="me-2" />, label: 'Sent' },
                            { icon: <FaRegFileAlt className="me-2" />, label: 'Drafts' },
                            { icon: <FaExclamationCircle className="me-2" />, label: 'Spam', badge: '5', badgeClass: 'bg-danger' },
                            { icon: <FaStar className="me-2" />, label: 'Important' },
                            { icon: <FaTrash className="me-2" />, label: 'Trash' },
                            { icon: <FaArchive className="me-2" />, label: 'Archive' },
                            { icon: <FaStar className="me-2" />, label: 'Starred', badge: '12', badgeClass: 'bg-warning text-dark' }
                        ].map((item, idx) => (
                            <ListGroup.Item key={idx} action className="d-flex justify-content-between align-items-center">
                                <div>{item.icon}{item.label}</div>
                                {item.badge ? (
                                    <span className={`badge ${item.badgeClass}`}>{item.badge}</span>
                                ) : (
                                    <span className="invisible">badge</span>
                                )}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    {/* Settings */}
                    <div className="mt-4">
                        <h6 className="text-muted fw-bold mb-2">Settings</h6>
                        <ul className="list-unstyled ps-2 mb-0">
                            <li>
                                <Link to="/pages/Settings" className="text-decoration-none text-dark d-block py-1">Settings</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Labels */}
                    <div className="mt-4">
                        <h6 className="text-muted fw-bold mb-2">Labels</h6>
                        <ul className="list-unstyled ps-2 mb-0">
                            <li className="d-flex align-items-center gap-2 py-1"><FaEnvelope /> Mail</li>
                            <li className="d-flex align-items-center gap-2 py-1"><FaHome /> Home</li>
                            <li className="d-flex align-items-center gap-2 py-1"><FaBriefcase /> Work</li>
                            <li className="d-flex align-items-center gap-2 py-1"><FaUserFriends /> Friends</li>
                        </ul>
                    </div>

                    {/* Recent Users */}
                    <div className="mt-4">
                        <h6 className="text-muted fw-bold mb-2">Recent Users</h6>
                        <ul className="list-unstyled ps-2 mb-0">
                            {users.map((user, idx) => (
                                <li key={idx} className="d-flex align-items-center gap-2 py-1">
                                    <Image src={user.avatar} roundedCircle width={32} height={32} />
                                    <span className="text-dark">{user.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Card>

            {/* Main Mail Panel */}
            <Card className="main-panel custom-scroll shadow-sm flex-grow-1 position-relative">
                <Row className="gx-0">
                    <Col lg={12}>
                        <div className="p-2">
                            {/* combine with both mobile view email toggle + Mail Controls & List */}

                            <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
                                {/* Toggle Button */}
                                {isBelow1054 && !isMobileSidebarVisible && (
                                    <div className="d-flex justify-content-start mb-2">
                                        <Button
                                            variant="light"
                                            className="border-0"
                                            onClick={() => setIsMobileSidebarVisible(true)}
                                        >
                                            <TbLayoutSidebarRightCollapseFilled size={22} />
                                        </Button>
                                    </div>
                                )}

                                {/* Mail Controls & List */}
                                <Card className="flex-grow-1 shadow-sm" style={{ borderRadius: '20px' }}>
                                    <Card.Body className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                                        <div className="d-flex align-items-center gap-2">
                                            <Form.Check />
                                            <span>All Mails</span>
                                        </div>
                                        <div className="mail-center flex-grow-1 px-2">
                                            <InputGroup className="search-input-group">
                                                <InputGroup.Text><FaSearch /></InputGroup.Text>
                                                <Form.Control placeholder="Search Email" />
                                            </InputGroup>
                                        </div>
                                        <div className="mail-right">
                                            <Dropdown>
                                                <Dropdown.Toggle variant="light" className="no_caret p-1 border-0">
                                                    <FaEllipsisV />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu align="start">
                                                    <Dropdown.Item>Recent</Dropdown.Item>
                                                    <Dropdown.Item>Unread</Dropdown.Item>
                                                    <Dropdown.Item>Mark as Read</Dropdown.Item>
                                                    <Dropdown.Item>Spam</Dropdown.Item>
                                                    <Dropdown.Item>Delete All</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>

                            {/* Slide-in Mobile Sidebar */}
                            {isBelow1054 && isMobileSidebarVisible && (
                                <div className="mobile-slide-sidebar">
                                    <Card className="h-100 border-0 shadow-sm">

                                        {/* Header row with email info (left) and close icon (right) */}
                                        <div className="d-flex justify-content-between align-items-center p-3 pb-1">
                                            {/* Left: Email Info */}
                                            <div>
                                                <h6 className="text-muted fw-bold mb-1">Email</h6>
                                                <small className="text-dark">stark1992@gmail.com</small>
                                            </div>

                                            {/* Right: Collapse Button */}
                                            <Button
                                                variant="light"
                                                className="border-0"
                                                onClick={() => setIsMobileSidebarVisible(false)}
                                            >
                                                <TbLayoutSidebarLeftCollapseFilled size={22} />
                                            </Button>
                                        </div>

                                        {/* Horizontal separator */}
                                        <hr className="mt-0 mb-3" />

                                        {/* Sidebar content goes here */}
                                        <div className="p-3 pt-0">
                                            <Button className="w-100 mb-3 compose-btn" onClick={() => setShowCompose(true)}>
                                                + Compose Mail
                                            </Button>

                                            <h6 className="text-muted fw-bold mt-4 mb-2">Mails</h6>
                                            <ListGroup variant="flush">
                                                {[
                                                    { icon: <FaEnvelope className="me-2" />, label: 'All Mails', badge: '12456', badgeClass: 'bg-primary' },
                                                    { icon: <FaInbox className="me-2" />, label: 'Inbox', badge: '8', badgeClass: 'bg-success' },
                                                    { icon: <FaPaperPlane className="me-2" />, label: 'Sent' },
                                                    { icon: <FaRegFileAlt className="me-2" />, label: 'Drafts' },
                                                    { icon: <FaExclamationCircle className="me-2" />, label: 'Spam', badge: '5', badgeClass: 'bg-danger' },
                                                    { icon: <FaStar className="me-2" />, label: 'Important' },
                                                    { icon: <FaTrash className="me-2" />, label: 'Trash' },
                                                    { icon: <FaArchive className="me-2" />, label: 'Archive' },
                                                    { icon: <FaStar className="me-2" />, label: 'Starred', badge: '12', badgeClass: 'bg-warning text-dark' }
                                                ].map((item, idx) => (
                                                    <ListGroup.Item key={idx} action className="d-flex justify-content-between align-items-center">
                                                        <div>{item.icon}{item.label}</div>
                                                        {item.badge ? (
                                                            <span className={`badge ${item.badgeClass}`}>{item.badge}</span>
                                                        ) : (
                                                            <span className="invisible">badge</span>
                                                        )}
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>

                                            {/* Settings */}
                                            <div className="mt-4">
                                                <h6 className="text-muted fw-bold mb-2">Settings</h6>
                                                <ul className="list-unstyled ps-2 mb-0">
                                                    <li>
                                                        <Link to="/pages/Settings" className="text-decoration-none text-dark d-block py-1">Settings</Link>
                                                    </li>
                                                </ul>
                                            </div>

                                            {/* Labels */}
                                            <div className="mt-4">
                                                <h6 className="text-muted fw-bold mb-2">Labels</h6>
                                                <ul className="list-unstyled ps-2 mb-0">
                                                    <li className="d-flex align-items-center gap-2 py-1"><FaEnvelope /> Mail</li>
                                                    <li className="d-flex align-items-center gap-2 py-1"><FaHome /> Home</li>
                                                    <li className="d-flex align-items-center gap-2 py-1"><FaBriefcase /> Work</li>
                                                    <li className="d-flex align-items-center gap-2 py-1"><FaUserFriends /> Friends</li>
                                                </ul>
                                            </div>

                                            {/* Recent Users */}
                                            <div className="mt-4">
                                                <h6 className="text-muted fw-bold mb-2">Recent Users</h6>
                                                <ul className="list-unstyled ps-2 mb-0">
                                                    {users.map((user, idx) => (
                                                        <li key={idx} className="d-flex align-items-center gap-2 py-1">
                                                            <Image src={user.avatar} roundedCircle width={32} height={32} />
                                                            <span className="text-dark">{user.name}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            )}

                            <ListGroup className='inbox_content m-2'>
                                {[1, 2, 3].map((mail) => (
                                    <ListGroup.Item

                                        key={mail}
                                        className={`d-flex align-items-start justify-content-between border-0 border-bottom px-3 py-3 ${mail % 2 === 0 ? 'bg-light' : ''}`}
                                    >
                                        <div className="d-flex">
                                            <Form.Check className="me-2 mt-1" />
                                            <Image src="/default-avatar.png" roundedCircle width={40} height={40} className="me-3" />
                                            <div>
                                                <div className="d-flex align-items-center gap-2 mb-1">
                                                    <strong onClick={() => setShowPreview(true)}>Charlotte</strong>
                                                    <span className="badge bg-info text-white text-capitalize">social</span>
                                                </div>
                                                <div className="fw-semibold">Your package is on the way</div>
                                                <small className="text-muted">Please track your order below to get latest status...</small>
                                            </div>
                                        </div>

                                        <div className="text-end">
                                            <div className="d-flex align-items-center justify-content-end gap-2">
                                                <FaPaperclip className="text-muted" />
                                                <small className="text-muted">2:45 PM</small>
                                                <span className="badge bg-light text-muted border border-secondary-subtle fw-normal">Today</span>
                                            </div>
                                            <FaStar className="text-warning mt-2" />
                                        </div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    </Col>
                </Row>
            </Card>

            {/* compose mail modal */}

            <Modal
                show={showCompose}
                onHide={() => { }}
                backdrop="static"
                keyboard={false}
                centered
                dialogClassName="compose-mail-modal"
            >
                <Modal.Header className="border-0 px-4 pt-4 pb-2">
                    <Modal.Title className="fw-semibold text-dark fs-5">Compose Mail</Modal.Title>
                    <Button variant="light" className="close-btn" onClick={() => setShowCompose(false)}>
                        &times;
                    </Button>
                </Modal.Header>
                <hr className="my-0" />
                <Modal.Body className="px-4 py-3">
                    <Form>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="fromEmail">
                                    <Form.Label className="text-muted small mb-1">From</Form.Label>
                                    <Form.Control type="email" value="stark1992@gmail.com" disabled className="input-flat" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="toEmail">
                                    <Form.Label className="text-muted small mb-1">To</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter recipient email"
                                        value={toInput}
                                        onChange={(e) => setToInput(e.target.value)}
                                        onKeyDown={handleToKeyDown}
                                        className="input-flat"
                                    />
                                    <div className="mt-2 d-flex flex-wrap gap-2">
                                        {toEmails.map(email => (
                                            <Badge key={email} bg="secondary" pill>
                                                {email} <span className="ms-1" style={{ cursor: 'pointer' }} onClick={() => handleToRemove(email)}>&times;</span>
                                            </Badge>
                                        ))}
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="ccEmail">
                                    <Form.Label className="text-muted small mb-1">CC</Form.Label>
                                    <Form.Control type="text" placeholder="Enter CC" value={cc} onChange={e => setCc(e.target.value)} className="input-flat" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="bccEmail">
                                    <Form.Label className="text-muted small mb-1">BCC</Form.Label>
                                    <Form.Control type="text" placeholder="Enter BCC" value={bcc} onChange={e => setBcc(e.target.value)} className="input-flat" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group controlId="subject" className="mb-3">
                            <Form.Label className="text-muted small mb-1">Subject</Form.Label>
                            <Form.Control type="text" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} className="input-flat" />
                        </Form.Group>

                        <Form.Group controlId="messageContent">
                            <Form.Label className="text-muted small mb-1">Content</Form.Label>
                            <Form.Control as='textarea'></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <hr className="my-0" />

                <Modal.Footer className="justify-content-end px-4 py-3 border-0">
                    <Button variant="secondary" className="me-2" onClick={() => setShowCompose(false)}>Cancel</Button>
                    <Button variant="primary" className="send-btn px-4">Send</Button>
                </Modal.Footer>
            </Modal>

            {/* Mail body view offcanvas */}

            <Offcanvas
                show={showPreview}
                onHide={() => setShowPreview(false)}
                placement="end"
                backdrop
                scroll
                className="mail-preview-offcanvas"
            >
                <Offcanvas.Header className="justify-content-between align-items-center">
                    {/* Left: Avatar and Info */}
                    <div className="d-flex align-items-start gap-3">
                        <Image src="/avatar.jpg" roundedCircle width={40} height={40} />

                        <div>
                            <div className="fw-bold">Charlotte</div>

                            {/* To */}
                            <div className="text-muted small">
                                <strong className="me-1">To:</strong> Charlotte7974@gmail.com
                            </div>

                            {/* CC & BCC in one row on md+ screens, stacked on sm */}
                            <div className="d-flex flex-column flex-md-row gap-2">
                                <div className="text-muted small">
                                    <strong className="me-1">CC:</strong> contact@udonmail.com
                                </div>
                                <div className="text-muted small">
                                    <strong className="me-1">BCC:</strong> secure@udonadmin.com
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Icons */}
                    <div className="d-flex align-items-center gap-3 ms-auto">
                        {/* Icons for LG and above */}
                        <div className="d-none d-lg-flex align-items-center gap-3">
                            <FaRegStar className="text-muted item_decor" title="Star" />
                            <FaArchive className="text-muted item_decor" title="Archive" />
                            <FaBan className="text-muted item_decor" title="Spam" />
                            <FaTrash className="text-muted item_decor" title="Delete" />
                            <FaReply className="text-muted item_decor" title="Reply" onClick={() => setIsReplying(true)} />
                        </div>

                        {/* Dropdown for below 992px */}
                        <div className="d-flex d-lg-none align-items-center">
                            <Dropdown align="end">
                                <Dropdown.Toggle
                                    variant="light"
                                    className="no_caret border-0 p-0 d-flex align-items-center text-muted"
                                    style={{ background: 'none' }}
                                >
                                    <FaEllipsisV />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item><FaRegStar className="me-2" /> Star</Dropdown.Item>
                                    <Dropdown.Item><FaArchive className="me-2" /> Archive</Dropdown.Item>
                                    <Dropdown.Item><FaBan className="me-2" /> Spam</Dropdown.Item>
                                    <Dropdown.Item><FaTrash className="me-2" /> Delete</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setIsReplying(true)}><FaReply className="me-2" /> Reply</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                        {/* Always show Close button */}
                        <CloseButton onClick={() => setShowPreview(false)} />
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>

                    {isReplying ? (
                        <>
                            {/* Reply Box */}
                            <div className="border rounded p-3">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    {/* Left: Title */}
                                    <div className="fw-bold">Reply:</div>

                                    {/* Right: Icons */}
                                    <div className="d-flex gap-3">
                                        <Button size="sm" variant="outline-primary" title="Reply"><HiOutlineReply title="Reply" />Reply</Button>
                                        <Button size="sm" variant="outline-success" title="Forward"><HiOutlineArrowNarrowRight />Forward </Button>
                                        <Button size="sm" variant="outline-secondary" title="Return" onClick={() => setIsReplying(false)}><HiOutlineArrowCircleLeft title="Return" />Return</Button>
                                    </div>
                                </div>

                                {/* Textarea */}
                                <textarea
                                    className="form-control mb-2"
                                    rows={4}
                                    placeholder="Write your reply..."
                                />

                                {/* Bottom-right action buttons */}
                                <div className="d-flex justify-content-end gap-2">
                                    <Button size="sm" variant="outline-secondary" title="Save as Draft"> Draft </Button>
                                    <Button size="sm" variant="primary" title="Send Reply"> Send </Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="p-3 rounded-4 border bg-light-subtle">

                                {/* Header */}
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="fw-bold">History of planets are discovered yesterday.</h5>
                                    <small className="text-muted">Oct-22-2022, 03:05PM</small>
                                </div>

                                {/* Body */}
                                <div className="mb-3">
                                    <p>Hi, Mr Stark Greetings 👋</p>
                                    <p>
                                        Earth, our home, is the third planet from the sun. While scientists continue to hunt for clues of life
                                        beyond Earth, our home planet remains the only place in the universe where we’ve ever identified living
                                        organisms.
                                    </p>
                                    <p>
                                        Earth has a diameter of roughly 8,000 miles (13,000 kilometers) and is mostly round because gravity
                                        generally pulls matter into a ball. But the spin of our home planet causes it to be squashed at its poles
                                        and swollen at the equator, making the true shape of the Earth an “oblate spheroid.”
                                    </p>
                                    <p>Regards, <br /> Charlotte</p>
                                </div>

                                {/* Attachments */}
                                <div className="mb-2">
                                    <div className="fw-bold mb-2">
                                        <FaPaperclip className="me-2" /> Attachments (1.8mb):
                                    </div>
                                    <div className="d-flex flex-wrap gap-2 align-items-center">
                                        <div className="border rounded p-2 d-flex flex-column align-items-start">
                                            <div className="fw-semibold">Earth_Archeology.pdf</div>
                                            <small className="text-muted">0.85MB</small>
                                        </div>
                                        <div className="border rounded p-2 d-flex flex-column align-items-start">
                                            <div className="fw-semibold">Planets_Image.jpg</div>
                                            <small className="text-muted">457KB</small>
                                        </div>
                                        <Button size="sm" variant="outline-success" className="ms-auto">
                                            <FaDownload className="me-1" /> Download All
                                        </Button>
                                    </div>
                                </div>

                            </div>
                        </>

                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default Mailpage;
