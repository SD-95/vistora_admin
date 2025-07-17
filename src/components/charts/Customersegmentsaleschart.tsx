import React from 'react';
import { Card } from 'react-bootstrap';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const segmentData = [
  { segment: 'New Customers', sales: 42000 },
  { segment: 'Returning Customers', sales: 61000 },
  { segment: 'VIP Customers', sales: 31000 },
  { segment: 'B2B Clients', sales: 50000 },
  { segment: 'Guest Checkouts', sales: 20000 },
];

const COLORS = ['#0d6efd', '#198754', '#6610f2', '#fd7e14', '#6f42c1'];

const Customersegmentsaleschart: React.FC = () => {
  return (
    <Card className="shadow-sm border-0 h-100">
      <Card.Body className="d-flex flex-column h-100 p-3">
        {/* Header */}
        <div className="mb-3">
          <h5 className="fw-semibold mb-1">Customer Segment Sales</h5>
          <small className="text-muted">Sales grouped by customer type</small>
        </div>

        {/* Chart section with fallback height */}
        <div className="flex-grow-1" style={{ minHeight: 240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={segmentData}
              layout="vertical"
              margin={{ top: 0, right: 10, left: 10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                tickFormatter={(val) => `₹${val / 1000}k`}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                type="category"
                dataKey="segment"
                width={110}
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
              <Bar dataKey="sales" barSize={18}>
                {segmentData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Customersegmentsaleschart;
