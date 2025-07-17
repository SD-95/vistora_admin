import React from 'react';
import { Card } from 'react-bootstrap';
import {
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  Tooltip,
  Cell,
} from 'recharts';

const rawData = [
  { stage: 'Visitors', value: 8000 },
  { stage: 'Leads', value: 5200 },
  { stage: 'Qualified', value: 3100 },
  { stage: 'Proposals', value: 1800 },
  { stage: 'Closed Deals', value: 750 },
];

const total = rawData[0].value;
const data = rawData.map((item) => ({
  ...item,
  percent: ((item.value / total) * 100).toFixed(1),
}));

const COLORS = ['#0d6efd', '#6610f2', '#198754', '#ffc107', '#dc3545'];

const Salesfunnelchart: React.FC = () => {
  return (
    <Card className="shadow-sm border-0 h-100">
      <Card.Body className="d-flex flex-column h-100 p-3">
        {/* Title */}
        <div className="mb-3">
          <h5 className="fw-semibold mb-1">Sales Funnel</h5>
          <small className="text-muted">From Visitors to Closed Deals</small>
        </div>

        {/* Funnel layout */}
        <div className="d-flex flex-column flex-md-row gap-4 flex-grow-1">
          {/* Left: Chart */}
          <div style={{ flex: 1, minHeight: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip
                  formatter={(value: number) => `₹${value.toLocaleString()}`}
                  labelFormatter={(label) => `Stage: ${label}`}
                />
                <Funnel dataKey="value" data={data}>
                  {data.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>

          {/* Right: Stepwise labels */}
          <div style={{ flex: 1 }} className="d-flex flex-column justify-content-center">
            {data.map((item, index) => (
              <div
                key={index}
                className="d-flex align-items-start gap-2 mb-3"
                style={{
                  backgroundColor: '#f8f9fa',
                  borderLeft: `4px solid ${COLORS[index % COLORS.length]}`,
                  padding: '10px 12px',
                  borderRadius: 6,
                }}
              >
                <div>
                  <div className="fw-semibold text-dark small">{`Step ${index + 1}: ${item.stage}`}</div>
                  <div className="text-muted small">
                    ₹{item.value.toLocaleString()} &nbsp;({item.percent}%)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Salesfunnelchart;
