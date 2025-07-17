import React from 'react';
import { Card } from 'react-bootstrap';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const returnsData = [
  { month: 'Jan', returns: 120 },
  { month: 'Feb', returns: 100 },
  { month: 'Mar', returns: 135 },
  { month: 'Apr', returns: 160 },
  { month: 'May', returns: 145 },
  { month: 'Jun', returns: 130 },
  { month: 'Jul', returns: 110 },
  { month: 'Aug', returns: 90 },
  { month: 'Sep', returns: 105 },
  { month: 'Oct', returns: 115 },
  { month: 'Nov', returns: 100 },
  { month: 'Dec', returns: 85 },
];

const Salesreturnschart: React.FC = () => {
  return (
    <Card className="shadow-sm border-0 h-100">
      <Card.Body className="d-flex flex-column h-100 p-3">
        {/* Title */}
        <div className="mb-3">
          <h5 className="fw-semibold mb-1">Sales Returns Trend</h5>
          <small className="text-muted">Monthly return statistics</small>
        </div>

        {/* Chart Section */}
        <div className="flex-grow-1" style={{ minHeight: 240 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={returnsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorReturns" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc3545" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#dc3545" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis fontSize={12} />
              <Tooltip formatter={(value: number) => `${value} Returns`} />
              <Area
                type="monotone"
                dataKey="returns"
                stroke="#dc3545"
                fillOpacity={1}
                fill="url(#colorReturns)"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Salesreturnschart;
