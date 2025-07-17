import React from 'react';
import { Card } from 'react-bootstrap';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const data = [
  { month: 'Jan', sales: 18500, orders: 150 },
  { month: 'Feb', sales: 19800, orders: 265 },
  { month: 'Mar', sales: 22000, orders: 495 },
  { month: 'Apr', sales: 21000, orders: 580 },
  { month: 'May', sales: 26500, orders: 620 },
  { month: 'Jun', sales: 27500, orders: 430 },
  { month: 'Jul', sales: 29000, orders: 245 },
  { month: 'Aug', sales: 30500, orders: 755 },
  { month: 'Sep', sales: 29800, orders: 640 },
  { month: 'Oct', sales: 33500, orders: 675 },
  { month: 'Nov', sales: 35800, orders: 690 },
  { month: 'Dec', sales: 38200, orders: 505 },
];

const Salestrendschart: React.FC = () => {
  return (
    <Card className="shadow-sm border-0 h-100">
      <Card.Body className="d-flex flex-column h-100 p-3">
        {/* Header */}
        <div className="mb-3">
          <h5 className="fw-semibold mb-1">Sales & Orders Trends</h5>
          <small className="text-muted">Monthly sales and order comparison</small>
        </div>

        {/* Chart Section */}
        <div className="flex-grow-1" style={{ minHeight: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d6efd" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0d6efd" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#198754" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#198754" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={12} />
              <YAxis tickFormatter={(value) => `₹${value / 1000}k`} fontSize={12} />
              <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#0d6efd"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorSales)"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#198754"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorOrders)"
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Salestrendschart;
