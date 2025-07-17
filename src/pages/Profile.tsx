import React, { useState } from 'react';
import { Container, Row, Col, Card, Image, Tab, Nav, Form, Button, InputGroup, ListGroup } from 'react-bootstrap';
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaGoogle,
  FaEdit,
  FaThumbsUp,
  FaComment,
  FaShare,
  FaSkype,
  FaEnvelopeOpenText,
  FaComments,
  FaUser
} from 'react-icons/fa';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';

import blog_1 from '../assets/images/profile/blog.jpg'
import blog_2 from '../assets/video/blog_video.mp4'
import { Link } from 'react-router-dom';
import pic from '../assets/images/profile/profile.jpg'

// interface DashboardProfileProps {
//   name: string;
//   role: string;
//   email: string;
//   location: string;
//   imageUrl: string;
//   bio: string;
//   experience: number;
//   dob: string;
//   username: string;
//   skills: string[];
//   socialLinks: {
//     facebook: string;
//     twitter: string;
//     instagram: string;
//     youtube: string;
//     google: string;
//   };
// }

const Profile: React.FC = () => {

    const defaultData = {
    name: "Somes Dash",
    role: "Super Admin",
    email: "somes@example.com",
    location: "Kolkata, India",
    imageUrl: pic,
    bio: "Experienced tech leader with a passion for scalable architecture and product growth.",
    experience: 8,
    dob: "1991-04-18",
    username: "somes_95",
    skills: ['Leadership', 'React', 'TypeScript', 'Node.js'],
    socialLinks: {
      facebook: 'https://facebook.com',
      twitter: 'https://x.com',
      instagram: 'https://instagram.com',
      youtube: 'https://youtube.com',
      google: 'https://google.com',
    }}

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(defaultData);
  const [editData, setEditData] = useState(defaultData);

  // When user clicks “Edit”, preload editData from formData
  const handleEdit = () => {
    setEditData(formData);
    setEditMode(true);
  };

  // Only update formData when Save is clicked
  const handleSave = () => {
    setFormData(editData);
    setEditMode(false);
  };

  // Used during editing
  const handleEditChange = (field: string, value: string | string[]) => {
    setEditData({ ...editData, [field]: value });
  };

  return (
    <Container className="py-4">
      <Card className="border-0 shadow-sm rounded-4 mb-4 overflow-hidden">
        <div
          className="p-4 text-white position-relative"
          style={{ background: '#ff6f61', borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem' }}
        >
          <Button
            variant="light"
            className="text-dark position-absolute"
            style={{ top: '1rem', right: '1rem' }}
            onClick={handleEdit}
          >
            <FaEdit className="me-2" /> {editMode ? 'Cancel' : 'Edit'}
          </Button>

          <Row className="align-items-center">
            <Col md="auto">
              {/* <Image src={imageUrl} roundedCircle width={100} height={100} className="border border-white border-3" /> */}
              <Image
                src={editMode ? editData.imageUrl || '/default-avatar.png' : formData.imageUrl || '/default-avatar.png'}
                roundedCircle
                width={100}
                height={100}
                className="border border-white border-3 shadow-sm"
              />
            </Col>
            <Col>
              <h4 className="mb-1 fw-bold">{formData.name}</h4>
              <div className="text-white-50 mb-1">{formData.role}</div>
              <div className="d-flex align-items-center gap-3">
                <span><FaMapMarkerAlt /> {formData.location}</span>
                <span><FaEnvelope /> {formData.email}</span>
              </div>
              <div className="d-flex gap-3 fs-5 mt-2">
                <Link to={formData.socialLinks.facebook} className="text-white"><FaFacebook /></Link>
                <Link to={formData.socialLinks.twitter} className="text-white"><FaTwitter /></Link>
                <Link to={formData.socialLinks.instagram} className="text-white"><FaInstagram /></Link>
                <Link to={formData.socialLinks.youtube} className="text-white"><FaYoutube /></Link>
                <Link to={formData.socialLinks.google} className="text-white"><FaGoogle /></Link>
              </div>
            </Col>
          </Row>
        </div>

        <Tab.Container defaultActiveKey="profile">
          <Nav variant="tabs" className="bg-white px-4 pt-3 border-bottom">
            <Nav.Item>
              <Nav.Link eventKey="profile" className="fw-semibold text-dark">My Profile</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="timeline" className="fw-semibold text-dark">Timeline</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="team" className="fw-semibold text-dark">Teammates</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content className="p-4">
            <Tab.Pane eventKey="profile">
              <Row className="gy-4">
                <Col md={6}>
                  <h6 className="fw-bold mb-3">Personal Info</h6>
                  {editMode ? (
                    <>
                      <Form.Group className="mb-2">
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                handleEditChange('imageUrl', reader.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <Form.Label>Name</Form.Label>
                        <Form.Control value={editData.name} onChange={(e) => handleEditChange('name', e.target.value)} />
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label>Username</Form.Label>
                        <Form.Control value={editData.username} onChange={(e) => handleEditChange('username', e.target.value)} />
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control type="date" value={editData.dob} onChange={(e) => handleEditChange('dob', e.target.value)} />
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label>Experience (Years)</Form.Label>
                        <Form.Control type="number" value={editData.experience} onChange={(e) => handleEditChange('experience', e.target.value)} />
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label>Location</Form.Label>
                        <Form.Control value={editData.location} onChange={(e) => handleEditChange('location', e.target.value)} />
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={editData.email} onChange={(e) => handleEditChange('email', e.target.value)} />
                      </Form.Group>
                    </>
                  ) : (
                    <>
                      <p><strong>Name:</strong> {formData.name}</p>
                      <p><strong>Username:</strong> {formData.username}</p>
                      <p><strong>Date of Birth:</strong> {formData.dob}</p>
                      <p><strong>Years of Experience:</strong> {formData.experience} Years</p>
                      <p><strong>Location:</strong> {formData.location}</p>
                      <p><strong>Email:</strong> {formData.email}</p>
                    </>
                  )}
                </Col>
                <Col md={6}>
                  <h6 className="fw-bold mb-3">Skills</h6>
                  {editMode ? (
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={editData.skills.join(', ')}
                      onChange={(e) => handleEditChange('skills', e.target.value.split(',').map(s => s.trim()))}
                      placeholder="Enter skills separated by comma"
                    />
                  ) : (
                    <div className="d-flex flex-wrap gap-2">
                      {formData.skills.map((skill, idx) => (
                        <span key={idx} className="badge rounded-pill text-bg-light border px-3 py-2 text-dark">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </Col>
              </Row>

              <div className="mt-4">
                <h6 className="fw-bold mb-2">Bio</h6>
                {editMode ? (
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={editData.bio}
                    onChange={(e) => handleEditChange('bio', e.target.value)}
                  />
                ) : (
                  <p>{formData.bio}</p>
                )}
              </div>

              <div className="mt-3 d-flex gap-2">
                {editMode && (
                  <>
                    <Button onClick={handleSave} style={{ backgroundColor: '#ff6f61', borderColor: '#ff6f61' }}>Save Changes</Button>
                    <Button variant="outline-secondary" onClick={() => setEditMode(false)}>Cancel</Button>
                  </>
                )}
              </div>
            </Tab.Pane>


            <Tab.Pane eventKey="timeline">
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <InputGroup>
                    <Form.Control as="textarea" placeholder="What's on your mind?" rows={2} />
                  </InputGroup>
                  <div className="text-end mt-2">
                    <Button variant="primary" style={{ backgroundColor: '#ff6f61', borderColor: '#ff6f61' }}>
                      Post
                    </Button>
                  </div>
                </Card.Body>
              </Card>

              <VerticalTimeline lineColor="#ff6f61">
                {[1, 2, 3, 4].map((post, _idx) => (
                  <VerticalTimelineElement
                    key={post}
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: '#fff', color: '#333', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '12px', padding: '20px' }}
                    contentArrowStyle={{ borderRight: '7px solid #ff6f61' }}
                    date="2 hrs ago"
                    iconStyle={{ background: '#ff6f61', color: '#fff' }}
                    icon={<FaUser />}
                  >
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className="d-flex align-items-center">
                        <Image src="/default-avatar.png" roundedCircle width={45} height={45} className="me-3" />
                        <div>
                          <h6 className="mb-0">User {post}</h6>
                          <small className="text-muted">Frontend Developer</small>
                        </div>
                      </div>
                      <div className="text-muted small">2 hrs ago</div>
                    </div>

                    {post === 1 ? (
                      <Image src={blog_1} fluid className="rounded mb-3" />
                    ) : post === 2 ? (
                      <video
                        src={blog_2}
                        className="w-100 rounded mb-3"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    ) : (
                      <p className="mb-3">"A beautiful quote that inspires the team to go further and dream bigger."</p>
                    )}

                    <div className="d-flex justify-content-between align-items-center text-muted border-top pt-2">
                      <div className="d-flex gap-3">
                        <span><FaThumbsUp className="me-1" /> 12</span>
                        <span><FaComment className="me-1" /> 4</span>
                        <span><FaShare className="me-1" /> 3</span>
                      </div>
                      <span><FaUser className="me-1" /> 142 views</span>
                    </div>

                    <hr />

                    <InputGroup className="mb-2">
                      <Form.Control placeholder="Write a comment..." />
                      <Button variant="outline-primary">Comment</Button>
                    </InputGroup>

                    <ListGroup variant="flush">
                      <ListGroup.Item className="px-0 py-1 border-0">
                        <strong>Jane:</strong> Awesome post!
                      </ListGroup.Item>
                      <ListGroup.Item className="px-0 py-1 border-0">
                        <strong>Mark:</strong> Love this content!
                      </ListGroup.Item>
                    </ListGroup>
                  </VerticalTimelineElement>
                ))}
              </VerticalTimeline>
            </Tab.Pane>

            <Tab.Pane eventKey="team">
              <Row className="g-4">
                {[...Array(6)].map((_, idx) => (
                  <Col key={idx} md={6} lg={4}>
                    <Card className="shadow-sm border-0 rounded-4 h-100">
                      <Card.Body className="d-flex align-items-center">
                        <Image
                          src="/default-avatar.png"
                          roundedCircle
                          width={64}
                          height={64}
                          className="me-3 border border-2 border-white shadow-sm"
                        />
                        <div className="flex-grow-1">
                          <h6 className="mb-0 fw-semibold">Teammate {idx + 1}</h6>
                          <small className="text-muted d-block mb-2">
                            {idx % 3 === 0 ? 'Developer' : idx % 3 === 1 ? 'Designer' : 'Manager'}
                          </small>
                          <div className="d-flex flex-wrap gap-2">
                            <Button size="sm" variant="outline-primary" className="rounded-pill px-3">
                              <FaComments className="me-1" /> Chat
                            </Button>
                            <Button size="sm" variant="outline-secondary" className="rounded-pill px-3">
                              <FaEnvelopeOpenText className="me-1" /> Mail
                            </Button>
                            <Button size="sm" variant="outline-dark" className="rounded-circle p-2">
                              <FaSkype />
                            </Button>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Card>
    </Container>
  );
};

export default Profile;



{/* <Profile
          name="Somes Dash"
          role="Super Admin"
          email="somes@example.com"
          location="Kolkata, India"
          imageUrl={pic}
          bio="Experienced tech leader with a passion for scalable architecture and product growth."
          experience={8}
          dob="1991-04-18"
          username="somes_95"
          skills={['Leadership', 'React', 'TypeScript', 'Node.js']}
          socialLinks={{
            facebook: 'https://facebook.com',
            twitter: 'https://x.com',
            instagram: 'https://instagram.com',
            youtube: 'https://youtube.com',
            google: 'https://google.com',
          }}
        /> */}