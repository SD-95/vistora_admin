import React, { useState } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';

const Workinghourssettings: React.FC = () => {
  const [workingHours, setWorkingHours] = useState({
    timezone: 'Asia/Kolkata',
    startHour: '09:00',
    endHour: '18:00',
    workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    breaksEnabled: true,
    breakStart: '13:00',
    breakEnd: '14:00',
    overtimeAllowed: false,
    notificationsOnShiftStart: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;

    if (type === 'checkbox') {
      const checked = (target as HTMLInputElement).checked;
      setWorkingHours(prev => ({ ...prev, [name]: checked }));
    } else {
      setWorkingHours(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saved Working Hours Settings:', workingHours);
  };

  return (
    <Card className="p-4">
      <h4 className="settings-title">⏰ Working Hours</h4>
      <p className="settings-description">
        Define the standard operating hours for your team or platform.
      </p>

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Timezone</Form.Label>
              <Form.Select
                name="timezone"
                value={workingHours.timezone}
                onChange={handleChange}
              >
                <option value="Asia/Kolkata">Asia/Kolkata</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Europe/London">Europe/London</option>
                <option value="Asia/Tokyo">Asia/Tokyo</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                name="startHour"
                value={workingHours.startHour}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                name="endHour"
                value={workingHours.endHour}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Working Days</Form.Label>
          <Form.Check
            inline
            label="Mon"
            type="checkbox"
            name="Monday"
            checked={workingHours.workingDays.includes('Monday')}
            onChange={() => toggleDay('Monday')}
          />
          <Form.Check
            inline
            label="Tue"
            type="checkbox"
            name="Tuesday"
            checked={workingHours.workingDays.includes('Tuesday')}
            onChange={() => toggleDay('Tuesday')}
          />
          <Form.Check
            inline
            label="Wed"
            type="checkbox"
            name="Wednesday"
            checked={workingHours.workingDays.includes('Wednesday')}
            onChange={() => toggleDay('Wednesday')}
          />
          <Form.Check
            inline
            label="Thu"
            type="checkbox"
            name="Thursday"
            checked={workingHours.workingDays.includes('Thursday')}
            onChange={() => toggleDay('Thursday')}
          />
          <Form.Check
            inline
            label="Fri"
            type="checkbox"
            name="Friday"
            checked={workingHours.workingDays.includes('Friday')}
            onChange={() => toggleDay('Friday')}
          />
          <Form.Check
            inline
            label="Sat"
            type="checkbox"
            name="Saturday"
            checked={workingHours.workingDays.includes('Saturday')}
            onChange={() => toggleDay('Saturday')}
          />
          <Form.Check
            inline
            label="Sun"
            type="checkbox"
            name="Sunday"
            checked={workingHours.workingDays.includes('Sunday')}
            onChange={() => toggleDay('Sunday')}
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Check
              type="switch"
              name="breaksEnabled"
              label="Enable Lunch Break"
              checked={workingHours.breaksEnabled}
              onChange={handleChange}
            />
          </Col>
          {workingHours.breaksEnabled && (
            <>
              <Col md={3}>
                <Form.Label>Break Start</Form.Label>
                <Form.Control
                  type="time"
                  name="breakStart"
                  value={workingHours.breakStart}
                  onChange={handleChange}
                />
              </Col>
              <Col md={3}>
                <Form.Label>Break End</Form.Label>
                <Form.Control
                  type="time"
                  name="breakEnd"
                  value={workingHours.breakEnd}
                  onChange={handleChange}
                />
              </Col>
            </>
          )}
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <Form.Check
              type="switch"
              name="overtimeAllowed"
              label="Allow Overtime Beyond Set Hours"
              checked={workingHours.overtimeAllowed}
              onChange={handleChange}
            />
          </Col>
          <Col md={6}>
            <Form.Check
              type="switch"
              name="notificationsOnShiftStart"
              label="Send Notification at Shift Start"
              checked={workingHours.notificationsOnShiftStart}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Button type="submit" variant="custom">
          Save Working Hours Settings
        </Button>
      </Form>
    </Card>
  );

  function toggleDay(day: string) {
    setWorkingHours(prev => {
      const days = prev.workingDays.includes(day)
        ? prev.workingDays.filter(d => d !== day)
        : [...prev.workingDays, day];
      return { ...prev, workingDays: days };
    });
  }
};

export default Workinghourssettings;
