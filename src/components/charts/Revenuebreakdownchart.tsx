import React, { useState } from 'react';
import { Card, Badge } from 'react-bootstrap';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';

const rawData = [
  { name: 'Product Sales', value: 540000 },
  { name: 'Subscriptions', value: 220000 },
  { name: 'Services', value: 140000 },
  { name: 'Ads & Affiliates', value: 100000 },
];

const total = rawData.reduce((sum, d) => sum + d.value, 0);
const data = rawData.map((item) => ({
  ...item,
  percent: (item.value / total) * 100,
}));

const COLORS = ['#0d6efd', '#6610f2', '#198754', '#fd7e14'];

const Revenuebreakdownchart: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const getBadgeVariant = (percent: number): string => {
    if (percent >= 30) return 'success';
    if (percent >= 10) return 'warning';
    return 'danger';
  };

  return (
    <Card className="shadow-sm border-0 h-100">
      <Card.Body className="d-flex flex-column h-100 p-3">
        {/* Title */}
        <div className="mb-3">
          <h5 className="fw-semibold mb-1">Revenue Breakdown</h5>
          <small className="text-muted">Distribution by revenue stream</small>
        </div>

        <div className="d-flex flex-column flex-md-row gap-4 flex-grow-1">
          {/* Left: Chart */}
          <div style={{ flex: 1, minHeight: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={110}
                  paddingAngle={2}
                  onClick={(_, index) => handleClick(index)}
                  isAnimationActive
                >
                  {data.map((_entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="#fff"
                      strokeWidth={1}
                      style={{
                        filter:
                          index === activeIndex
                            ? 'drop-shadow(0 0 10px rgba(0,0,0,0.3))'
                            : 'none',
                        transform: index === activeIndex ? 'scale(1.05)' : 'scale(1)',
                        transformOrigin: 'center',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        opacity:
                          activeIndex === null || activeIndex === index ? 1 : 0.6,
                      }}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Right: Labels */}
          <div className="d-flex flex-column justify-content-center gap-3 flex-1">
            {data.map((item, index) => (
              <div
                key={index}
                onClick={() => handleClick(index)}
                className="d-flex justify-content-between align-items-center px-3 py-2 rounded text-white shadow-sm"
                style={{
                  backgroundColor: COLORS[index % COLORS.length],
                  cursor: 'pointer',
                  transform: activeIndex === index ? 'scale(1.03)' : 'scale(1)',
                  boxShadow:
                    activeIndex === index
                      ? '0 0 12px rgba(0,0,0,0.2)'
                      : 'none',
                  transition: 'all 0.2s ease',
                  opacity: activeIndex === null || activeIndex === index ? 1 : 0.7,
                }}
              >
                <div>
                  <div className="fw-semibold">{item.name}</div>
                  <div className="small">₹{item.value.toLocaleString()}</div>
                </div>
                <Badge bg={getBadgeVariant(item.percent)} className="fs-6 px-2">
                  {item.percent.toFixed(1)}%
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Revenuebreakdownchart;
