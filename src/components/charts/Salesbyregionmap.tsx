import React, { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from 'react-leaflet';
import { Card, Badge } from 'react-bootstrap';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Data
const salesData = [
  { region: 'Delhi', lat: 28.6139, lng: 77.209, sales: 185000 },
  { region: 'Mumbai, Maharashtra', lat: 19.076, lng: 72.8777, sales: 172000 },
  { region: 'Bengaluru, Karnataka', lat: 12.9716, lng: 77.5946, sales: 155000 },
  { region: 'Chennai, Tamil Nadu', lat: 13.0827, lng: 80.2707, sales: 134000 },
  { region: 'Kolkata, West Bengal', lat: 22.5726, lng: 88.3639, sales: 128000 },
  { region: 'Hyderabad, Telangana', lat: 17.385, lng: 78.4867, sales: 145000 },
  { region: 'Ahmedabad, Gujarat', lat: 23.0225, lng: 72.5714, sales: 112000 },
  { region: 'Pune, Maharashtra', lat: 18.5204, lng: 73.8567, sales: 97000 },
  { region: 'Jaipur, Rajasthan', lat: 26.9124, lng: 75.7873, sales: 89000 },
  { region: 'Lucknow, Uttar Pradesh', lat: 26.8467, lng: 80.9462, sales: 79000 },
  { region: 'Bhopal, Madhya Pradesh', lat: 23.2599, lng: 77.4126, sales: 74000 },
  { region: 'Patna, Bihar', lat: 25.5941, lng: 85.1376, sales: 65000 },
  { region: 'Bhubaneswar, Odisha', lat: 20.2961, lng: 85.8245, sales: 88000 },
  { region: 'Cuttack, Odisha', lat: 20.4625, lng: 85.8828, sales: 66000 },
  { region: 'Rourkela, Odisha', lat: 22.2604, lng: 84.8536, sales: 59000 },
  { region: 'Berhampur, Odisha', lat: 19.3149, lng: 84.7941, sales: 53000 },
  { region: 'Sambalpur, Odisha', lat: 21.4669, lng: 83.9812, sales: 48000 },
];

// Create icon
const createIcon = (value: number, active = false) =>
  new L.DivIcon({
    html: `
      <div style="
        background-color: ${active ? '#0d6efd' : '#ff6f61'};
        color: white;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
        transform: scale(${active ? 1.2 : 1});
      ">
        ₹${(value / 1000).toFixed(0)}k
      </div>
    `,
    iconSize: [60, 30],
    className: '',
  });

const FocusMap: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
  const map = useMap();
  map.setView([lat, lng], map.getZoom(), { animate: true });
  return null;
};

const Salesbyregionmap: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const totalSales = salesData.reduce((sum, d) => sum + d.sales, 0);

  const handleClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const getBadgeColor = (percent: number) => {
    if (percent >= 12) return 'success';
    if (percent >= 6) return 'warning';
    return 'danger';
  };

  return (
    <Card className="shadow-sm border-0 h-100">
      <Card.Body className="p-3 d-flex flex-column h-100">
        {/* Header */}
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <div>
            <h5 className="fw-semibold mb-1">Sales by Region</h5>
            <small className="text-muted">Click a region to focus and highlight</small>
          </div>
          <Badge bg="light" text="dark" className="px-3 py-2 rounded-pill">
            FY 2024-25
          </Badge>
        </div>

        {/* Layout */}
        <div className="row g-3 flex-grow-1">
          {/* Left: Map */}
          <div className="col-md-7">
            <div className="h-100 rounded shadow-sm border">
              <MapContainer
                center={[22.9734, 78.6569]}
                zoom={5.2}
                scrollWheelZoom={true}
                className="rounded"
                style={{ height: '100%', minHeight: 450, width: '100%' }}
                maxBounds={[
                  [6, 68],
                  [37, 97],
                ]}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                />

                {salesData.map((loc, idx) => (
                  <Marker
                    key={idx}
                    position={[loc.lat, loc.lng]}
                    icon={createIcon(loc.sales, idx === activeIndex)}
                  >
                    <Tooltip
                      direction="top"
                      offset={[0, -10]}
                      opacity={1}
                      permanent={false}
                      className="custom-tooltip"
                    >
                      <div
                        className="text-white text-center small px-2 py-1"
                        style={{
                          background: '#0d6efd',
                          borderRadius: 8,
                          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                        }}
                      >
                        <div className="fw-semibold">{loc.region}</div>
                        <div>₹{loc.sales.toLocaleString()}</div>
                      </div>
                    </Tooltip>
                    {idx === activeIndex && <FocusMap lat={loc.lat} lng={loc.lng} />}
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          {/* Right: List */}
          <div className="col-md-5 overflow-auto" style={{ maxHeight: 460 }}>
            <div className="d-flex flex-column gap-3">
              {salesData.map((item, idx) => {
                const percent = (item.sales / totalSales) * 100;
                return (
                  <div
                    key={idx}
                    onClick={() => handleClick(idx)}
                    className={`p-3 rounded border d-flex justify-content-between align-items-center shadow-sm ${idx === activeIndex ? 'border-primary bg-light' : 'border-light'
                      }`}
                    style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                  >
                    <div>
                      <div className="fw-semibold">{item.region}</div>
                      <div className="text-muted small">₹{item.sales.toLocaleString()}</div>
                    </div>
                    <Badge bg={getBadgeColor(percent)} className="fs-6 px-2">
                      {percent.toFixed(1)}%
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Salesbyregionmap;
