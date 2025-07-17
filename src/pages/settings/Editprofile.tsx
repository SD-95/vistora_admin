import React from 'react';
import { Form, Button } from 'react-bootstrap';
import type { TeamMember } from '../../utils/admintypes';

interface EditProfileFormProps {
  user: TeamMember;
  onSave?: (updated: TeamMember) => void;
}

const Editprofileform: React.FC<EditProfileFormProps> = ({ user }) => {
  return (
    <Form>
      {/* Profile Picture */}
      <Form.Group className="mb-3">
        <Form.Label>Profile Picture</Form.Label>
        <div className="d-flex align-items-center gap-3">
          <img
            src={user.profile_image}
            alt="Profile"
            className="rounded-circle"
            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
          />
          <Form.Control
            type="file"
            name="profileImage"
            accept="image/*"
          />
        </div>
      </Form.Group>

      {/* Full Name */}
      <Form.Group className="mb-3">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter full name"
          defaultValue={user.name}
        />
      </Form.Group>

      {/* Email */}
      <Form.Group className="mb-3">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          defaultValue={user.email}
        />
      </Form.Group>

      {/* Mobile */}
      <Form.Group className="mb-3">
        <Form.Label>Mobile Number</Form.Label>
        <Form.Control
          type="tel"
          name="mobile"
          placeholder="Enter phone"
          defaultValue={user.mobile}
        />
      </Form.Group>

      {/* Region */}
      <Form.Group className="mb-3">
        <Form.Label>Region</Form.Label>
        <Form.Control
          type="text"
          name="region"
          placeholder="Enter region"
          defaultValue={user.region}
        />
      </Form.Group>

      {/* Timezone */}
      <Form.Group className="mb-3">
        <Form.Label>Timezone</Form.Label>
        <Form.Control
          type="text"
          name="timezone"
          placeholder="Enter timezone"
          defaultValue={user.timezone}
        />
      </Form.Group>

      {/* Language */}
      <Form.Group className="mb-4">
        <Form.Label>Preferred Language</Form.Label>
        <Form.Select
          name="language"
          defaultValue={user.language}
        >
          <option>English</option>
          <option>Hindi</option>
          <option>Spanish</option>
          <option>French</option>
          <option>Other</option>
        </Form.Select>
      </Form.Group>

      <Button type="submit" variant="custom">
        Save Changes
      </Button>
    </Form>
  );
};

export default Editprofileform;
