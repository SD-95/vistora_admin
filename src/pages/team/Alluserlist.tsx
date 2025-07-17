import React, { useState, useMemo, useEffect } from 'react';
import {
  Table, Container, Badge, Button, Modal, Row, Col, Image, Form, Card, Offcanvas,
  Tabs,
  Tab,
  Pagination
} from 'react-bootstrap';
import Swal from 'sweetalert2';
import { XCircle } from 'react-bootstrap-icons';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { addUser, updateUser, deleteUser } from '../../redux/slices/Userslice';
import type { TeamMember } from '../../utils/admintypes';
import type { Role } from '../../utils/Role';
import { FaCamera } from 'react-icons/fa';


const statusVariant = {
  Active: 'success',
  Inactive: 'secondary',
  Suspended: 'danger',
};

const primaryColor = '#ff6f61';

const Alluserlist: React.FC = () => {
  const dispatch = useAppDispatch();
  const allUsers = useAppSelector((state) => state.user.users);
  const currentUserRole = useAppSelector((state) => state.auth.role);

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'members' | 'admins' | 'activity'>('members');
  const [formData, setFormData] = useState<Omit<TeamMember, 'id' | 'joined_date' | 'profile_image' | 'status' | 'last_active' | 'activity_logs' | 'security' | 'skills'>>({
    name: '',
    email: '',
    mobile: '',
    role: '' as Role,
    region: '',
    timezone: '',
    language: 'English',
    dashboard_access: 'admin',
    permissions: {
      full_access: false,
      can_manage_users: false,
      can_manage_orders: false,
      can_manage_products: false,
      can_manage_finances: false,
      can_manage_roles: false,
    },
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');

  const [_selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState<string>('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setSelectedImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredMembers = useMemo(() => {
    if (!currentUserRole) return [];

    const memberRoles = ['team', 'serviceexecutive'];
    const adminRoles = ['superadmin', 'admin'];

    return allUsers
      .filter((member) => {
        const inCurrentTab =
          (activeTab === 'admins' && currentUserRole === 'superadmin' && adminRoles.includes(member.role)) ||
          (activeTab === 'members' &&
            ((currentUserRole === 'superadmin' && memberRoles.includes(member.role)) ||
              (currentUserRole === 'admin' && memberRoles.includes(member.role)) ||
              (currentUserRole === 'team' && member.role === 'serviceexecutive')));

        const matchesSearch =
          member.name.toLowerCase().includes(search.toLowerCase()) ||
          member.email.toLowerCase().includes(search.toLowerCase());

        const matchesRole = filterRole ? member.role === filterRole : true;
        const matchesStatus = filterStatus ? member.status === filterStatus : true;

        return inCurrentTab && matchesSearch && matchesRole && matchesStatus;
      })
      .sort((a, b) => new Date(b.joined_date).getTime() - new Date(a.joined_date).getTime());
  }, [allUsers, search, filterRole, filterStatus, activeTab, currentUserRole]);

  useEffect(() => {
    if (currentUserRole !== 'superadmin' && activeTab === 'admins') {
      setActiveTab('members');
    }
  }, [currentUserRole, activeTab]);

  const hasPermissionToModify = (targetRole: Role): boolean => {
    if (currentUserRole === 'superadmin') return true;
    if (currentUserRole === 'admin') return ['team', 'serviceexecutive'].includes(targetRole);
    if (currentUserRole === 'team') return targetRole === 'serviceexecutive';
    return false;
  };

  const handleSubmit = () => {
    const imageUrl = selectedImagePreview || selectedMember?.profile_image || 'https://via.placeholder.com/100';
    const newMember: TeamMember = {
      ...formData,
      id: (Math.random() * 100000).toFixed(0),
      joined_date: new Date().toISOString().split('T')[0],
      profile_image: imageUrl,
      status: selectedMember?.status || 'Active',
      last_active: new Date().toISOString(),
      skills: skills,
      activity_logs: [
        { timestamp: '2025-07-10T10:00:00Z', action: 'Logged in from Chrome (Windows)', ip: '192.168.1.1' },
        { timestamp: '2025-07-10T10:15:00Z', action: 'Updated profile picture', ip: '192.168.1.1' },
        { timestamp: '2025-07-10T10:20:00Z', action: 'Changed password', ip: '192.168.1.1' },
        { timestamp: '2025-07-10T10:25:00Z', action: 'Assigned role: Admin', ip: '192.168.1.1' },
        { timestamp: '2025-07-10T10:30:00Z', action: 'Logged out', ip: '192.168.1.1' }
      ],
      security: {
        two_factor_enabled: false,
        last_password_change: new Date().toISOString().split('T')[0],
        login_devices: [],
      },
    };

    if (showEditModal && selectedMember && hasPermissionToModify(selectedMember.role)) {
      dispatch(updateUser({ ...newMember, id: selectedMember.id }));
    } else if (!showEditModal && hasPermissionToModify(newMember.role)) {
      dispatch(addUser(newMember));
    }

    setShowAddModal(false);
    setShowEditModal(false);
  };

  const confirmDelete = (id: string, role: Role) => {
    if (!hasPermissionToModify(role)) return;

    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(id));
        setShowViewModal(false);
        setSelectedMember(null);
        Swal.fire('Deleted!', 'The user has been deleted.', 'success');
      }
    });
  };

  const handleView = (member: TeamMember) => {
    setSelectedMember(member);
    setShowViewModal(true);
  };

  const handleEdit = (member: TeamMember) => {
    if (!hasPermissionToModify(member.role)) return;
    setSelectedMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      mobile: member.mobile,
      role: member.role,
      region: member.region,
      timezone: member.timezone,
      language: member.language,
      permissions: member.permissions,
      dashboard_access: member.dashboard_access,
    });
    setSelectedImageFile(null);
    setSelectedImagePreview('');
    setSkills(member.skills || []);
    setShowEditModal(true);
  };

  const handleAddNew = () => {
    setFormData({
      name: '',
      email: '',
      mobile: '',
      role: '' as Role,
      region: '',
      timezone: '',
      language: 'English',
      dashboard_access: 'admin',
      permissions: {
        full_access: false,
        can_manage_users: false,
        can_manage_orders: false,
        can_manage_products: false,
        can_manage_finances: false,
        can_manage_roles: false,
      },
    });
    setSkills([]);
    setShowAddModal(true);
  };

  const handleChange = (field: string, value: any) => {
    if (field.startsWith('permissions.')) {
      const perm = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        permissions: { ...prev.permissions, [perm]: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSkillAdd = () => {
    if (skillInput.trim()) {
      setSkills(prev => [...prev, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleSkillRemove = (skill: string) => {
    setSkills(prev => prev.filter(s => s !== skill));
  };

  const handleSuspend = (member: TeamMember) => {
    if (!hasPermissionToModify(member.role)) return;

    Swal.fire({
      title: 'Suspend User?',
      text: `Are you sure you want to suspend ${member.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, suspend',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateUser({ ...member, status: 'Suspended' }));
        Swal.fire('Suspended!', `${member.name} has been suspended.`, 'success');
      }
    });
  };

  return (
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between align-items-center">
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k as 'members' | 'admins' | 'activity')}
          className="mb-3 border-0"
          id="custom-tab-style"
          mountOnEnter
          unmountOnExit
        >
          <Tab
            eventKey="members"
            title={
              <h5
                style={{
                  cursor: 'pointer',
                  color: activeTab === 'members' ? 'black' : '#000',
                  fontWeight: activeTab === 'members' ? 'bold' : 'normal',
                  position: 'relative',
                  display: 'inline-block',
                  paddingBottom: '4px',
                }}
                className="mb-0"
              >
                Members
                {activeTab === 'members' && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-4px', // Controls how far below the text the underline appears
                      left: 0,
                      height: '3px',
                      width: '100%',
                      backgroundColor: 'red',
                    }}
                  />
                )}
              </h5>
            }
          />

          {currentUserRole === 'superadmin' && (
            <Tab
              eventKey="admins"
              title={
                <h5
                  style={{
                    cursor: 'pointer',
                    color: activeTab === 'admins' ? 'black' : '#000',
                    fontWeight: activeTab === 'admins' ? 'bold' : 'normal',
                    position: 'relative',
                    display: 'inline-block',
                    paddingBottom: '4px',
                  }}
                  className="mb-0"
                >
                  Admin
                  {activeTab === 'admins' && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-4px',
                        left: 0,
                        height: '3px',
                        width: '100%',
                        backgroundColor: 'red',
                      }}
                    />
                  )}
                </h5>
              }
            />
          )}

          {currentUserRole === 'superadmin' && (
            <Tab
              eventKey="activity"
              title={
                <h5
                  style={{
                    cursor: 'pointer',
                    color: activeTab === 'activity' ? 'black' : '#000',
                    fontWeight: activeTab === 'activity' ? 'bold' : 'normal',
                    position: 'relative',
                    display: 'inline-block',
                    paddingBottom: '4px',
                  }}
                  className="mb-0"
                >
                  User Activity
                  {activeTab === 'activity' && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-4px',
                        left: 0,
                        height: '3px',
                        width: '100%',
                        backgroundColor: 'red',
                      }}
                    />
                  )}
                </h5>
              }
            />
          )}
        </Tabs>

        <div className="text-end">
          <div>Total Members: <strong>{allUsers.length}</strong></div>
          <div>Active Members: <strong>{allUsers.filter(m => m.status === 'Active').length}</strong></div>
        </div>
      </div>

      {activeTab !== 'activity' && (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex gap-3 align-items-center">
              <h4 className="fw-bold mb-0">{activeTab === 'members' ? 'Members' : 'Admins'}</h4>
              <Button size='sm' style={{ backgroundColor: primaryColor, borderColor: primaryColor }} onClick={handleAddNew}>Add New</Button>
              <Button size='sm' variant="outline-secondary" className="d-none d-lg-inline">Import Members</Button>
              <Button size='sm' variant="outline-secondary" className="d-none d-lg-inline">Export Members (Excel)</Button>
            </div>
            <Button size='sm' variant="outline-dark" onClick={() => setFilterVisible(true)}>Filter</Button>
          </div>
          <hr className='pb-2 mb-3' />
        </>
      )}

      <Card className="p-3 shadow-sm">
        {!currentUserRole ? (
          <div className="text-center py-5 text-muted">Loading user role...</div>
        ) : filteredMembers.length === 0 ? (
          activeTab === 'activity' ? (
            <Card className="shadow-sm border-0">

              {/* Headings Row */}
              <Row className="text-muted fw-semibold mb-2 px-2 d-none d-md-flex">
                <Col md={3}>User</Col>
                <Col md={2}>Login Time</Col>
                <Col md={2}>Device</Col>
                <Col md={2}>IP Address</Col>
                <Col md={3}>Activity</Col>
              </Row>

              {/* Activities List */}
              <div className="d-flex flex-column gap-3">
                {allUsers.flatMap(user =>
                  user.activity_logs.map((log, index) => {
                    const loginTime = new Date(
                      new Date(log.timestamp).getTime() - 15 * 60 * 1000 // dummy 15 mins before log
                    ).toLocaleTimeString();

                    const lastSeen = new Date(log.timestamp).toLocaleTimeString();

                    return (
                      <Row
                        key={`${user.id}-${index}`}
                        className="align-items-center p-3 bg-light rounded shadow-sm mx-0"
                      >
                        {/* User Info */}
                        <Col xs={12} md={3} className="d-flex align-items-center gap-3 mb-2 mb-md-0">
                          <Image
                            src={user.profile_image}
                            roundedCircle
                            width={48}
                            height={48}
                            style={{ objectFit: 'cover', border: '2px solid #ff6f61' }}
                          />
                          <div>
                            <div className="fw-bold" style={{ color: '#ff6f61' }}>{user.name}</div>
                            <div className="text-muted small text-capitalize">{user.role}</div>
                          </div>
                        </Col>

                        {/* Login Time */}
                        <Col xs={6} md={2} className="text-muted small">
                          <div>{loginTime}</div>
                        </Col>

                        {/* Device Info */}
                        <Col xs={6} md={2} className="text-muted small">
                          <div>{log.action.split('from ')[1]?.split(')')[0] || 'Unknown'}</div>
                        </Col>

                        {/* IP Address */}
                        <Col xs={6} md={2} className="text-muted small">
                          <div>{log.ip}</div>
                        </Col>

                        {/* Activity */}
                        <Col xs={12} md={3} className="mt-2 mt-md-0">
                          <div
                            className="border rounded px-3 py-2"
                            style={{
                              borderColor: '#ff6f61',
                              borderWidth: '2px',
                              borderStyle: 'solid',
                              backgroundColor: '#fff8f6',
                            }}
                          >
                            <div className="fw-semibold">{log.action}</div>
                            <small className="text-muted d-block mt-1">
                              <strong>Last Seen:</strong> {lastSeen}
                            </small>
                          </div>
                        </Col>
                      </Row>
                    );
                  })
                )}
              </div>
            </Card>

          ) : (
            <div className="text-center py-5 text-muted">No matching members found.</div>
          )
        ) : (
          <Table responsive hover className="align-middle">
            <thead>
              <tr className="text-muted">
                <th>#</th>
                <th>Service ID</th>
                <th>Member</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Status</th>
                <th>Role</th>
                <th>Date Joined</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, index) => (
                <tr key={member.id}>
                  <td>{index + 1}</td>
                  <td>{member.id}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <Image src={member.profile_image} width={36} height={36} rounded style={{ borderRadius: 10 }} />
                      <span>{member.name}</span>
                    </div>
                  </td>
                  <td>{member.mobile}</td>
                  <td>{member.email}</td>
                  <td><Badge bg={statusVariant[member.status]}>{member.status}</Badge></td>
                  <td>{member.role}</td>
                  <td>{member.joined_date}</td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <Button size="sm" variant="light" className="rounded-circle border" onClick={() => handleView(member)}>👁️</Button>
                      {hasPermissionToModify(member.role) && (
                        <>
                          <Button size="sm" variant="light" className="rounded-circle border" onClick={() => handleEdit(member)}>✏️</Button>
                          <Button size="sm" variant="light" className="rounded-circle border" onClick={() => handleSuspend(member)}>⛔</Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <div className="d-flex justify-content-end mt-2">
          <Pagination className="custom-pagination">
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item>10</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last />
          </Pagination>
        </div>
      </Card>

      <Offcanvas show={filterVisible} onHide={() => setFilterVisible(false)} placement="end">
        <Offcanvas.Header className="d-flex justify-content-between align-items-center w-100">
          <Offcanvas.Title>Filter Members</Offcanvas.Title>
          <Button variant="" onClick={() => setFilterVisible(false)}>
            <XCircle size={24} />
          </Button>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-lg-none mb-3 d-flex flex-column gap-2">
            <Button variant="outline-secondary">Import Members</Button>
            <Button variant="outline-secondary">Export Members (Excel)</Button>
          </div>
          <Form.Group className="mb-3">
            <Form.Label>Search</Form.Label>
            <Form.Control
              type="text"
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
              <option value="">All Roles</option>
              <option value="superadmin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="team">Team Member</option>
              <option value="serviceexecutive">Service Executive</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </Form.Select>
          </Form.Group>
        </Offcanvas.Body>
      </Offcanvas>

      <Modal show={showAddModal || showEditModal} onHide={() => { setShowAddModal(false); setShowEditModal(false); }} centered size="lg" scrollable>
        <Modal.Header closeButton style={{ backgroundColor: primaryColor, color: '#fff' }} closeVariant="white">
          <Modal.Title>{showEditModal ? `Edit Member - ${selectedMember?.id}` : 'Add New Member'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-3 align-items-start">
            <Col md={2} className="text-center position-relative">
              <Form.Label className="mb-2 fw-semibold">Profile Image</Form.Label>
              <div
                style={{
                  width: 90,
                  height: 90,
                  margin: '0 auto',
                  position: 'relative',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                  border: '2px solid #f1f1f1',
                }}
              >
                <Image
                  src={selectedImagePreview || selectedMember?.profile_image || 'https://via.placeholder.com/100'}
                  width="100%"
                  height="100%"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <Form.Label
                htmlFor="image-upload"
                style={{
                  position: 'absolute',
                  bottom: -10,
                  right: 'calc(50% - 45px)',
                  width: 30,
                  height: 30,
                  backgroundColor: '#ff6f61',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  zIndex: 5,
                }}
              >
                <FaCamera size={14} color="#fff" />
              </Form.Label>

              <Form.Control
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </Col>
            <Col md={10}>
              <Row className="g-3">
                <Col md={6}><Form.Label>Service ID</Form.Label><Form.Control value={selectedMember?.id || 'Auto-generated'} disabled /></Col>
                <Col md={6}><Form.Label>Full Name</Form.Label><Form.Control value={formData.name} onChange={e => handleChange('name', e.target.value)} /></Col>
                <Col md={6}><Form.Label>Email Address</Form.Label><Form.Control value={formData.email} onChange={e => handleChange('email', e.target.value)} /></Col>
                <Col md={6}><Form.Label>Mobile Number</Form.Label><Form.Control value={formData.mobile} onChange={e => handleChange('mobile', e.target.value)} /></Col>
                <Col md={6}>
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={selectedMember?.status || 'Active'}
                    onChange={(e) => {
                      if (selectedMember) {
                        setSelectedMember({ ...selectedMember, status: e.target.value as "Active" | "Inactive" | "Suspended" });
                      }
                    }}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </Form.Select>
                </Col>
                <Col md={6}><Form.Label>Join Date</Form.Label><Form.Control value={selectedMember?.joined_date || new Date().toISOString().split('T')[0]} disabled /></Col>
                <Col md={6}><Form.Label>Assign Role</Form.Label><Form.Select value={formData.role} onChange={e => handleChange('role', e.target.value)}><option value="">Select role</option><option value="superadmin">Super Admin</option><option value="admin">Admin</option><option value="team">Team Member</option><option value="serviceexecutive">Service Executive</option></Form.Select></Col>
                <Col md={4}><Form.Label>Region</Form.Label><Form.Control value={formData.region} onChange={e => handleChange('region', e.target.value)} /></Col>
                <Col md={4}><Form.Label>Timezone</Form.Label><Form.Control value={formData.timezone} onChange={e => handleChange('timezone', e.target.value)} /></Col>
                <Col md={4}><Form.Label>Language</Form.Label><Form.Select value={formData.language} onChange={e => handleChange('language', e.target.value)}><option>English</option><option>Hindi</option><option>Spanish</option></Form.Select></Col>
                <Col md={12}>
                  <Form.Label>Skills</Form.Label>
                  <div className="d-flex gap-2 flex-wrap">
                    {skills.map((skill, idx) => (
                      <Badge pill bg="secondary" key={idx} className="d-flex align-items-center">
                        {skill} <span onClick={() => handleSkillRemove(skill)} className="ms-1" style={{ cursor: 'pointer' }}>×</span>
                      </Badge>
                    ))}
                    <Form.Control
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' ? (e.preventDefault(), handleSkillAdd()) : null}
                      placeholder="Type and press enter"
                    />
                  </div>
                </Col>
                <Col md={6} className="mt-3">
                  <Form.Label>Assign Dashboard</Form.Label>
                  <Form.Check type="switch" label="Admin Dashboard" checked={formData.dashboard_access === 'admin'} onChange={() => handleChange('dashboard_access', 'admin')} />
                  <Form.Check type="switch" label="Service Dashboard" checked={formData.dashboard_access === 'service'} onChange={() => handleChange('dashboard_access', 'service')} />
                </Col>
              </Row>
            </Col>
          </Row>

          {currentUserRole === 'superadmin' && (
            <>
              <h5 className="fw-bold mt-4">Permissions</h5>
              <Row>
                {Object.entries(formData.permissions).map(([perm, value]) => (
                  <Col md={4} key={perm} className="mb-2">
                    <Form.Check
                      type="switch"
                      label={perm.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      checked={value}
                      onChange={e => handleChange(`permissions.${perm}`, e.target.checked)}
                    />
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowAddModal(false); setShowEditModal(false); }}>Cancel</Button>
          <Button style={{ backgroundColor: primaryColor, borderColor: primaryColor }} onClick={handleSubmit}>
            {showEditModal ? 'Save Changes' : 'Add Member'}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} centered size="lg" scrollable>
        <Modal.Header closeButton style={{ backgroundColor: primaryColor, color: '#fff' }} closeVariant="white">
          <Modal.Title>
            {selectedMember?.name} ({selectedMember?.id})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='mb-4'>
          {selectedMember && (
            <>
              <Row className="align-items-center mb-4">
                <Col md={3} className="text-center">
                  <Image src={selectedMember.profile_image} roundedCircle width={80} height={80} />
                </Col>
                <Col md={9}>
                  <Row>
                    <Col md={6}><strong>Email:</strong> {selectedMember.email}</Col>
                    <Col md={6}><strong>Mobile:</strong> {selectedMember.mobile}</Col>
                    <Col md={6}><strong>Role:</strong> {selectedMember.role}</Col>
                    <Col md={6}><strong>Status:</strong> {selectedMember.status}</Col>
                    <Col md={6}><strong>Region:</strong> {selectedMember.region}</Col>
                    <Col md={6}><strong>Timezone:</strong> {selectedMember.timezone}</Col>
                    <Col md={6}><strong>Language:</strong> {selectedMember.language}</Col>
                    <Col md={6}><strong>Join Date:</strong> {selectedMember.joined_date}</Col>
                  </Row>
                </Col>
              </Row>

              {['superadmin', 'admin'].includes(currentUserRole!) && (
                <>
                  <h5 className="mb-3">Permissions</h5>
                  <Row>
                    {Object.entries(selectedMember.permissions).map(([perm, value]) => (
                      <Col md={4} key={perm} className="mb-2">
                        <Form.Check
                          type="switch"
                          label={perm.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          checked={value}
                          disabled
                        />
                      </Col>
                    ))}
                  </Row>
                </>
              )}

              {(currentUserRole === 'superadmin' || currentUserRole === 'admin') && (
                <div className="mt-5 p-3 border rounded bg-light">
                  <h5 className="text-danger">Delete User</h5>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Select User</Form.Label>
                      <Form.Control value={selectedMember.name} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Reason for Deletion</Form.Label>
                      <Form.Select>
                        <option>Violation of Terms</option>
                        <option>Inactive Account</option>
                        <option>Requested by User</option>
                        <option>Other</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Summary</Form.Label>
                      <Form.Control as="textarea" rows={2} placeholder="Explain the reason in brief" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Deleted By</Form.Label>
                      <Form.Control value="Current Admin" disabled />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Role</Form.Label>
                      <Form.Control value={currentUserRole} disabled />
                    </Form.Group>
                    <Button variant="danger" onClick={() => confirmDelete(selectedMember.id, selectedMember.role)}>Delete User</Button>
                  </Form>
                </div>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Alluserlist;