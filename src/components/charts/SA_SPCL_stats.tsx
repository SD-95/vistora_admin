import React, { useMemo } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { FaUsers, FaChartLine, FaDollarSign, FaCreditCard } from 'react-icons/fa';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';

const SA_SPCL_stats: React.FC = () => {
  const chartData = useMemo(() => {
    return [
      {
        title: 'Total Sales',
        value: '34,945',
        icon: <FaChartLine className="fs-4 text-success" />,
        trend: 'up',
        percent: '1.56%',
        data: [
          { name: 'Jan', value: 10 },
          { name: 'Feb', value: 40 },
          { name: 'Mar', value: 25 },
          { name: 'Apr', value: 60 },
          { name: 'May', value: 45 },
        ],
        color: '#00C49F',
        bgClass: 'bg-success',
      },
      {
        title: 'Total Income',
        value: '37,802',
        icon: <FaDollarSign className="fs-4 text-warning" />,
        trend: 'down',
        percent: '1.56%',
        data: [
          { name: 'Jan', value: 30 },
          { name: 'Feb', value: 50 },
          { name: 'Mar', value: 28 },
          { name: 'Apr', value: 42 },
          { name: 'May', value: 38 },
        ],
        color: '#FF8042',
        bgClass: 'bg-warning',
      },
      {
        title: 'Order Paid',
        value: '34,945',
        icon: <FaCreditCard className="fs-4 text-info" />,
        trend: 'up',
        percent: '1.56%',
        data: [
          { name: 'Jan', value: 20 },
          { name: 'Feb', value: 60 },
          { name: 'Mar', value: 30 },
          { name: 'Apr', value: 55 },
          { name: 'May', value: 40 },
        ],
        color: '#0088FE',
        bgClass: 'bg-info',
      },
      {
        title: 'Total Visitors',
        value: '34,945',
        icon: <FaUsers className="fs-4 text-danger" />,
        trend: 'down',
        percent: '1.56%',
        data: [
          { name: 'Jan', value: 15 },
          { name: 'Feb', value: 35 },
          { name: 'Mar', value: 20 },
          { name: 'Apr', value: 30 },
          { name: 'May', value: 25 },
        ],
        color: '#FF6384',
        bgClass: 'bg-danger',
      },
    ];
  }, []);

  const renderSparkline = (data: any[], color: string) => (
    <div style={{ height: '50px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <defs>
            <filter id={`shadow-${color}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor={color} floodOpacity="0.8" />
            </filter>
          </defs>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            filter={`url(#shadow-${color})`}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <Row className="g-4">
      {chartData.map((card, idx) => (
        <Col xs={12} sm={6} lg={6} xl={3} key={idx}>
          <Card className="shadow-sm border-0 h-100">
            <Card.Body className="d-flex flex-column justify-content-between p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <div
                    className={`rounded-circle ${card.bgClass} bg-opacity-10 p-3 shadow-sm d-flex align-items-center justify-content-center`}
                  >
                    {card.icon}
                  </div>
                  <div className="ms-3">
                    <div className="fw-semibold text-muted small">{card.title}</div>
                    <div
                      className={`fw-bold fs-5 ${
                        card.trend === 'up' ? 'text-success' : 'text-danger'
                      }`}
                    >
                      {card.value}
                    </div>
                  </div>
                </div>
                <div
                  className={`d-flex align-items-center gap-1 ${
                    card.trend === 'up' ? 'text-success' : 'text-danger'
                  }`}
                >
                  {card.trend === 'up' ? <FaArrowTrendUp /> : <FaArrowTrendDown />}
                  <span className="small">{card.percent}</span>
                </div>
              </div>
              {renderSparkline(card.data, card.color)}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default SA_SPCL_stats;
