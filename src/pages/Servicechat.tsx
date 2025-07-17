import React, { useState, useRef, useEffect } from 'react';
import {
    Container,
    Row,
    Col,
    Image,
    ListGroup,
    Form,
    InputGroup,
    Button,
    Dropdown,
} from 'react-bootstrap';
import {
    FiSend,
    FiMoreVertical,
    FiMenu,
} from 'react-icons/fi';
import { SlClose } from "react-icons/sl";
import { motion, AnimatePresence } from 'framer-motion';
import { AiTwotoneAppstore } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { GoSmiley } from "react-icons/go";

const PRIMARY = '#ff6f61';

const ServiceChat: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState('Jane Doe');
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([
        { sender: 'Jane Doe', text: 'Hello! How can I help you today?', timestamp: '10:00 AM' },
        { sender: 'me', text: 'I need help with my order.', timestamp: '10:01 AM' },
        { sender: 'Jane Doe', text: 'Sure! Please provide your order ID.', timestamp: '10:02 AM' },
    ]);
    const [showSidebar, setShowSidebar] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);
    const chatEndRef = useRef<HTMLDivElement | null>(null);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        const now = new Date();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setMessages([...messages, { sender: 'me', text: newMessage, timestamp: time }]);
        setNewMessage('');
    };

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 1200;
            setIsMobile(mobile);
            if (!mobile) {
                setShowSidebar(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const users = [
        {
            name: 'Jane Doe',
            avatar: 'https://i.pravatar.cc/150?img=1',
            lastMessage: 'Sure! Please provide your order ID.',
            lastTime: '10:32 AM',
            unreadCount: 2,
        },
    ];

    return (
        <div className="bg-light py-3 w-100" style={{ height: '80vh', overflowX: 'hidden' }}>
            <Container fluid className="h-100 p-0">
                <Row className="h-100 g-3 w-100 m-0">
                    {/* Sidebar (Desktop) */}
                    {!isMobile && (
                        <Col md={3} className="bg-white border shadow-sm d-none d-xl-flex flex-column rounded-4 p-0" style={{ borderRadius: 15 }} >
                            <div className="px-4 py-3 border-bottom bg-white sticky-top d-flex justify-content-between align-items-center" style={{ zIndex: 1 }}>
                                <h5 className="mb-0 fw-bold text-dark">Service Connect</h5>

                                {/* Highlighted Add Icon */}
                                <div
                                    className="d-flex align-items-center justify-content-center rounded-circle shadow-sm"
                                    style={{
                                        width: 30,
                                        height: 30,
                                        backgroundColor: '#fff',
                                        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {/* <MdLibraryAdd  /> */}
                                    <IoIosAddCircle size={25} color="#ff6f61" />
                                </div>
                            </div>
                            <div className="flex-grow-1 overflow-auto px-3 py-2">
                                <div className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Search user..."
                                        className="shadow-sm rounded-pill px-3"
                                        style={{
                                            border: '1px solid #dee2e6',
                                            fontSize: '0.9rem',
                                        }}
                                    />
                                </div>
                                <ListGroup variant="flush">
                                    {users.map((user, i) => (
                                        <ListGroup.Item
                                            key={i}
                                            action
                                            onClick={() => setSelectedUser(user.name)}
                                            active={selectedUser === user.name}
                                            className="border-0 mb-2 p-2 rounded-3 d-flex align-items-center position-relative"
                                            style={{
                                                backgroundColor: selectedUser === user.name ? '#f0f0f5' : '#fff',
                                                boxShadow: selectedUser === user.name ? '0 3px 10px rgba(0,0,0,0.05)' : 'none',
                                                transition: 'all 0.2s ease-in-out',
                                                cursor: 'pointer',
                                                flexWrap: 'nowrap',
                                            }}
                                        >
                                            {/* Left: Avatar + Info */}
                                            <div className="d-flex align-items-center gap-3 flex-grow-1 overflow-hidden">
                                                <div className="position-relative flex-shrink-0">
                                                    <Image
                                                        src={user.avatar}
                                                        roundedCircle
                                                        width={45}
                                                        height={45}
                                                        className="border border-light shadow-sm"
                                                    />
                                                    <span
                                                        className="position-absolute"
                                                        style={{
                                                            width: 10,
                                                            height: 10,
                                                            backgroundColor: '#28a745',
                                                            border: '2px solid white',
                                                            borderRadius: '50%',
                                                            bottom: 0,
                                                            right: 0,
                                                        }}
                                                    />
                                                </div>

                                                {/* Text Info */}
                                                <div className="d-flex flex-column overflow-hidden">
                                                    <div className="fw-semibold text-dark text-truncate">{user.name}</div>
                                                    <div
                                                        className="text-muted text-truncate"
                                                        style={{ fontSize: '0.85rem', maxWidth: '150px' }}
                                                    >
                                                        {user.lastMessage || 'Last message preview...'}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right: Time + Badge */}
                                            <div className="d-flex flex-column align-items-end flex-shrink-0 ms-2">
                                                <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                                                    {user.lastTime || '10:45 AM'}
                                                </small>
                                                <span
                                                    className="badge bg-danger mt-1"
                                                    style={{ fontSize: '0.65rem', padding: '0.3em 0.5em' }}
                                                >
                                                    {user.unreadCount || 2}
                                                </span>
                                            </div>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </div>
                        </Col>
                    )}

                    {/* Chat Panel */}
                    <Col className="d-flex flex-column position-relative overflow-hidden" style={{ flex: 1 }}>
                        <div className="d-flex flex-column h-100 bg-white rounded-4 shadow-sm position-relative" style={{ borderRadius: 15, overflow: 'hidden' }}>

                            {/* Mobile Sidebar strictly inside the card container */}
                            <AnimatePresence>
                                {isMobile && showSidebar && (
                                    <motion.div
                                        initial={{ x: -250 }}
                                        animate={{ x: 0 }}
                                        exit={{ x: -250 }}
                                        transition={{ duration: 0.3 }}
                                        className="position-absolute top-0 start-0 h-100 bg-white shadow p-3"
                                        style={{ width: 250, zIndex: 10, borderTopRightRadius: 15, borderBottomRightRadius: 15 }}
                                    >
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h5 className="mb-0">Service Connect</h5>
                                            <Button
                                                variant="light"
                                                className="rounded-circle"
                                                onClick={() => setShowSidebar(false)}
                                                style={{ color: PRIMARY }}
                                            >
                                                <SlClose size={20} color="#ff6f61" />
                                            </Button>
                                        </div>

                                        {/* Horizontal Divider */}
                                        <hr className="my-2" />

                                        {/* Search + Add Button */}
                                        <div className="d-flex align-items-center gap-2 mb-3">
                                            <Form.Control
                                                type="text"
                                                placeholder="Search user..."
                                                className="shadow-sm rounded-pill px-3"
                                                style={{
                                                    fontSize: '0.9rem',
                                                    flexGrow: 1,
                                                    border: '1px solid #dee2e6',
                                                }}
                                            />
                                            <div
                                                className="d-flex align-items-center justify-content-center rounded-circle shadow-sm"
                                                style={{
                                                    width: 36,
                                                    height: 25,
                                                    backgroundColor: '#fff',
                                                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <IoIosAddCircle size={22} color="#ff6f61" />
                                            </div>
                                        </div>
                                        <ListGroup variant="flush">
                                            {users.map((user, i) => (
                                                <ListGroup.Item
                                                    key={i}
                                                    action
                                                    onClick={() => setSelectedUser(user.name)}
                                                    active={selectedUser === user.name}
                                                    className="border-0 mb-2 p-2 rounded-3 d-flex align-items-center position-relative"
                                                    style={{
                                                        backgroundColor: selectedUser === user.name ? '#f0f0f5' : '#fff',
                                                        boxShadow: selectedUser === user.name ? '0 3px 10px rgba(0,0,0,0.05)' : 'none',
                                                        transition: 'all 0.2s ease-in-out',
                                                        cursor: 'pointer',
                                                        flexWrap: 'nowrap',
                                                    }}
                                                >
                                                    {/* Left: Avatar + Info */}
                                                    <div className="d-flex align-items-center gap-3 flex-grow-1 overflow-hidden">
                                                        <div className="position-relative flex-shrink-0">
                                                            <Image
                                                                src={user.avatar}
                                                                roundedCircle
                                                                width={45}
                                                                height={45}
                                                                className="border border-light shadow-sm"
                                                            />
                                                            <span
                                                                className="position-absolute"
                                                                style={{
                                                                    width: 10,
                                                                    height: 10,
                                                                    backgroundColor: '#28a745',
                                                                    border: '2px solid white',
                                                                    borderRadius: '50%',
                                                                    bottom: 0,
                                                                    right: 0,
                                                                }}
                                                            />
                                                        </div>

                                                        {/* Text Info */}
                                                        <div className="d-flex flex-column overflow-hidden">
                                                            <div className="fw-semibold text-dark text-truncate">{user.name}</div>
                                                            <div
                                                                className="text-muted text-truncate"
                                                                style={{ fontSize: '0.85rem', maxWidth: '150px' }}
                                                            >
                                                                {user.lastMessage || 'Last message preview...'}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Right: Time + Badge */}
                                                    <div className="d-flex flex-column align-items-end flex-shrink-0 ms-2">
                                                        <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                                                            {user.lastTime || '10:45 AM'}
                                                        </small>
                                                        <span
                                                            className="badge bg-danger mt-1"
                                                            style={{ fontSize: '0.65rem', padding: '0.3em 0.5em' }}
                                                        >
                                                            {user.unreadCount || 2}
                                                        </span>
                                                    </div>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Header */}
                            <div className="d-flex justify-content-between align-items-center p-3 border-bottom rounded-top">
                                <div className="d-flex align-items-center gap-2">
                                    {/* ✅ Show only on <1200px */}
                                    <span className="d-xl-none">
                                        <Button variant="link" className="p-0 me-2" onClick={() => setShowSidebar(true)}>
                                            <FiMenu size={20} color="#ff6f61" />
                                        </Button>
                                    </span>

                                    <div className="position-relative" style={{ width: 40, height: 40 }}>
                                        <Image
                                            src="https://i.pravatar.cc/150?img=1"
                                            roundedCircle
                                            width={40}
                                            height={40}
                                            className="border border-2 border-success"
                                        />

                                        {/* Active dot */}
                                        <span
                                            className="position-absolute"
                                            style={{
                                                width: 10,
                                                height: 10,
                                                bottom: 0,
                                                right: 0,
                                                backgroundColor: '#28a745',
                                                border: '2px solid #fff',
                                                borderRadius: '50%',
                                                boxShadow: '0 0 0 2px rgba(40, 167, 69, 0.3)',
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <div className="fw-semibold">{selectedUser}</div>
                                        <small className="text-muted">Active now</small>
                                    </div>
                                </div>

                                <div className="d-flex gap-3 text-muted fs-5">
                                    <Dropdown align="end">
                                        <Dropdown.Toggle
                                            as="div"
                                            id="dropdown-custom"
                                            style={{ cursor: 'pointer' }}
                                            className="d-flex align-items-center text-muted fs-5 no_caret"
                                        >
                                            <FiMoreVertical />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => console.log('View Profile')}>View Profile</Dropdown.Item>
                                            <Dropdown.Item onClick={() => console.log('Mute Notifications')}>Mute Notifications</Dropdown.Item>
                                            <Dropdown.Item onClick={() => console.log('Delete Chat')}>Delete Chat</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="flex-grow-1 p-4 overflow-auto d-flex flex-column" style={{ background: '#f9f9f9' }}>
                                {messages.map((msg, i) => {
                                    const isMe = msg.sender === 'me';
                                    return (
                                        <div key={i} className={`d-flex ${isMe ? 'justify-content-end' : 'justify-content-start'} mb-3`}>
                                            <div className={`chat-bubble ${isMe ? 'chat-mine' : 'chat-recipient'} d-flex flex-column`} style={{ maxWidth: '70%', position: 'relative' }}>
                                                <div>{msg.text}</div>
                                                <div className="text-end mt-1">
                                                    <small style={{ fontSize: '0.7rem', color: isMe ? 'rgba(255,255,255,0.8)' : '#6c757d' }}>{msg.timestamp}</small>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={chatEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-3 border-top">
                                <Form onSubmit={handleSend}>
                                    <div className="d-flex align-items-center gap-2">
                                        <div className="d-flex align-items-center justify-content-center rounded-circle shadow-sm" style={{ width: 36, height: 36, backgroundColor: '#fff' }}>
                                            <GoSmiley size={20} />
                                        </div>
                                        <InputGroup className="flex-grow-1 rounded-pill border shadow-sm overflow-hidden">
                                            <Form.Control placeholder="Type a message..." className="border-0 px-3" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                                            <Button type="submit" style={{ backgroundColor: PRIMARY, border: 'none', borderRadius: '0', padding: '0 1rem' }}>
                                                <FiSend />
                                            </Button>
                                        </InputGroup>
                                        <div className="d-flex align-items-center justify-content-center rounded-circle shadow-sm" style={{ width: 36, height: 36, backgroundColor: '#fff' }}>
                                            <AiTwotoneAppstore size={20} />
                                        </div>
                                    </div>
                                </Form>
                            </div>

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ServiceChat; 