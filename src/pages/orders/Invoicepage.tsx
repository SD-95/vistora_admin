// import React, { useRef } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Button, Card, Container, Row, Col, Table, Image, Badge } from 'react-bootstrap';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import companyLogo from '../../assets/images/logo/circle_logo.png';
// import signature from '../../assets/images/logo/signature.png';
// import stamp from '../../assets/images/logo/stamp.png';
// import logo from '../../assets/images/logo/circle_logo.png';
// import type { OrderDetails, UserProfile } from '../../utils/Types';

// interface InvoiceProps {
//   order: OrderDetails;
//   customer: UserProfile;
// }

// const Invoicepage: React.FC = () => {
//   const { state } = useLocation();
//   const { order, customer } = state as InvoiceProps;

//   const invoiceRef = useRef<HTMLDivElement>(null);

//   const handleDownload = async () => {
//     if (!invoiceRef.current) return;

//     const canvas = await html2canvas(invoiceRef.current, {
//       scale: 2,
//       useCORS: true,
//       backgroundColor: '#ffffff'
//     });

//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     pdf.save(`Invoice_${order.order_id}.pdf`);
//   };

//   return (
//     <>
//       {/* Hidden version used for PDF rendering */}
//       <div style={{ position: 'absolute', top: 0, left: 0, opacity: 0, pointerEvents: 'none', zIndex: -1 }}>
//         <div ref={invoiceRef} style={{ width: '794px', padding: '40px', backgroundColor: 'white' }}>
//           <InvoiceContent order={order} customer={customer} />
//         </div>
//       </div>

//       {/* Visible version */}
//       <Container className="p-5 bg-white rounded-4 border" style={{ maxWidth: '794px', margin: '0 auto' }}>
//         <div className="text-end mb-3">
//           <Button variant="outline-dark" onClick={handleDownload}>
//             🧾 Download Invoice (PDF)
//           </Button>
//         </div>

//         <InvoiceContent order={order} customer={customer} />
//       </Container>
//     </>
//   );
// };

// const InvoiceContent: React.FC<InvoiceProps> = ({ order, customer }) => {
//   const subtotal = order.product.price * order.quantity;
//   const discount = order.coupon_applied ? subtotal * 0.1 : 0;
//   const total = subtotal - discount;

//   const paymentStatusVariant: Record<string, string> = {
//     paid: 'success',
//     pending: 'warning',
//     failed: 'danger',
//     refunded: 'info',
//   };

//   return (
//     <>
//       <Row className="align-items-center mb-4">
//         <Col md={6}>
//           <Image src={companyLogo} alt="Company Logo" height={60} />
//           <h4 className="mt-2">Vistora E-Commerce Pvt. Ltd.</h4>
//           <p className="text-muted">www.vistora.com</p>
//         </Col>
//         <Col md={6} className="text-md-end">
//           <h2 className="fw-bold">Invoice</h2>
//           <p className="mb-1"><strong>Order ID:</strong> {order.order_id}</p>
//           <p><strong>Date:</strong> {order.date}</p>
//         </Col>
//       </Row>

//       <Row className="mb-4">
//         <Col md={4}>
//           <h5>Billing To:</h5>
//           <p className="mb-1 fw-semibold">{customer.name}</p>
//           <p className="mb-1">{customer.email}</p>
//           <p className="mb-1">+91 {customer.mobile}</p>
//         </Col>
//         <Col md={4}>
//           <h5>Shipping Address:</h5>
//           <p className="mb-1">{order.shipping_address.line}</p>
//           <p className="mb-1">{order.shipping_address.city}, {order.shipping_address.state}</p>
//           <p className="mb-1">{order.shipping_address.country} - {order.shipping_address.zip_code}</p>
//         </Col>
//         <Col md={4} className="text-md-end">
//           <p className="mb-1"><strong>Courier:</strong> BlueDart</p>
//           <p className="mb-1"><strong>Tracking No:</strong> BLU123456789</p>
//           <p className="mb-0">
//             <strong>Track:</strong>{' '}
//             <a href="https://bluedart.com/tracking?trackid=BLU123456789" target="_blank" rel="noopener noreferrer">
//               Track Shipment
//             </a>
//           </p>
//         </Col>
//       </Row>

//       <Card className="mb-4" style={{ boxShadow: 'none', border: 'none' }}>
//         <Card.Body>
//           <Table responsive bordered hover>
//             <thead className="table-light">
//               <tr>
//                 <th>Product</th>
//                 <th>Category</th>
//                 <th>Color</th>
//                 <th>Size</th>
//                 <th>Qty</th>
//                 <th>Price</th>
//                 <th>Subtotal</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>{order.product.name}</td>
//                 <td>{order.product.category}</td>
//                 <td>{order.product.color}</td>
//                 <td>{order.product.size}</td>
//                 <td>{order.quantity}</td>
//                 <td>₹{order.product.price.toFixed(2)}</td>
//                 <td>₹{subtotal.toFixed(2)}</td>
//               </tr>
//             </tbody>
//           </Table>

//           <Row className="justify-content-end position-relative">
//             <Col md={6} className="position-relative">
//               <div className="position-absolute" style={{ top: '50px', left: '60px', opacity: 0.08, zIndex: 0 }}>
//                 <Image src={logo} roundedCircle height={250} width={250} alt="Vistora Logo" />
//                 <h3 className="fw-bold text-dark">Vistora E-commerce Pvt. Ltd</h3>
//               </div>
//             </Col>
//             <Col md={6} className="ms-auto text-end">
//               <Table borderless>
//                 <tbody>
//                   <tr>
//                     <td><strong>Subtotal:</strong></td>
//                     <td>₹{subtotal.toFixed(2)}</td>
//                   </tr>
//                   <tr>
//                     <td><strong>Discount:</strong></td>
//                     <td>- ₹{discount.toFixed(2)}</td>
//                   </tr>
//                   <tr className="fs-5 fw-bold border-top">
//                     <td><strong>Total:</strong></td>
//                     <td>₹{total.toFixed(2)}</td>
//                   </tr>
//                 </tbody>
//               </Table>

//               <div className="mb-3">
//                 <strong>Payment Status: </strong>
//                 <Badge bg={paymentStatusVariant[order.payment_status]} className="ms-2">
//                   {order.payment_status.toUpperCase()}
//                 </Badge>
//               </div>

//               <div className="mb-3">
//                 <strong>Payment Method:</strong> {order.payment_source.toUpperCase()}
//               </div>

//               <div className="mb-3">
//                 <strong>Open Box Delivery:</strong> {order.live_tracking.out_for_delivery ? 'Yes' : 'No'}
//               </div>
//             </Col>
//           </Row>
//         </Card.Body>
//       </Card>

//       <Row className="mt-5 align-items-center">
//         <Col md={6}>
//           <p className="text-muted small">Thank you for shopping with us.</p>
//         </Col>
//         <Col md={6} className="text-end">
//           <Image src={signature} alt="Signature" height={60} className="mb-1" />
//           <p className="mb-0"><strong>Authorized Signatory</strong></p>
//           <Image src={stamp} alt="Company Stamp" height={80} className="mt-2" />
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default Invoicepage;


import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button, Card, Container, Row, Col, Table, Image } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import companyLogo from '../../assets/images/logo/circle_logo.png';
import signature from '../../assets/images/logo/signature.png';
import stamp from '../../assets/images/logo/stamp.png';
import logo from '../../assets/images/logo/circle_logo.png';
import type { RootState } from '../../redux/Store';
import { paymentStatusVariant, type PaymentStatus } from '../../utils/Types';


const InvoicePage: React.FC = () => {
  const { selectedOrder: order, selectedCustomer: customer } = useSelector(
    (state: RootState) => state.order
  );

  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!invoiceRef.current || !order) return;

    const canvas = await html2canvas(invoiceRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Invoice_${order.order_id}.pdf`);
  };

  if (!order || !customer) {
    return <p className="text-center text-danger mt-5">No invoice data found.</p>;
  }

  const subtotal = order.product.price * order.quantity;
  const discount = order.coupon_applied ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  return (
    <>
      {/* Hidden PDF-only version */}
      <div style={{ position: 'absolute', top: 0, left: 0, opacity: 0, pointerEvents: 'none', zIndex: -1 }}>
        <div ref={invoiceRef} style={{ width: '794px', padding: '40px', backgroundColor: 'white' }}>
          <InvoiceContent order={order} customer={customer} subtotal={subtotal} discount={discount} total={total} />
        </div>
      </div>

      {/* Visible version */}
      <Container className="p-5 bg-white rounded-4 border" style={{ maxWidth: '794px', margin: '0 auto' }}>
        <div className="text-end mb-3">
          <Button variant="outline-dark" onClick={handleDownload}>
            🧾 Download Invoice (PDF)
          </Button>
        </div>

        <InvoiceContent order={order} customer={customer} subtotal={subtotal} discount={discount} total={total} />
      </Container>
    </>
  );
};

interface InvoiceContentProps {
  order: any;
  customer: any;
  subtotal: number;
  discount: number;
  total: number;
}

const InvoiceContent: React.FC<InvoiceContentProps> = ({ order, customer, subtotal, discount, total }) => {
  return (
    <>
      <Row className="align-items-center mb-4">
        <Col md={6}>
          <Image src={companyLogo} alt="Company Logo" height={60} />
          <h4 className="mt-2">Vistora E-Commerce Pvt. Ltd.</h4>
          <p className="text-muted">www.vistora.com</p>
        </Col>
        <Col md={6} className="text-md-end">
          <h2 className="fw-bold">Invoice</h2>
          <p className="mb-1"><strong>Order ID:</strong> {order.order_id}</p>
          <p><strong>Date:</strong> {order.date}</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <h5>Billing To:</h5>
          <p className="mb-1 fw-semibold">{customer.name}</p>
          <p className="mb-1">{customer.email}</p>
          <p className="mb-1">+91 {customer.mobile}</p>
        </Col>
        <Col md={4}>
          <h5>Shipping Address:</h5>
          <p className="mb-1">{order.shipping_address.line}</p>
          <p className="mb-1">{order.shipping_address.city}, {order.shipping_address.state}</p>
          <p className="mb-1">{order.shipping_address.country} - {order.shipping_address.zip_code}</p>
        </Col>
        <Col md={4} className="text-md-end">
          <p className="mb-1"><strong>Courier:</strong> BlueDart</p>
          <p className="mb-1"><strong>Tracking No:</strong> BLU123456789</p>
          <p className="mb-0">
            <strong>Track:</strong>{' '}
            <a href="https://bluedart.com/tracking?trackid=BLU123456789" target="_blank" rel="noopener noreferrer">
              Track Shipment
            </a>
          </p>
        </Col>
      </Row>

      <Card className="mb-4" style={{ boxShadow: 'none', border: 'none' }}>
        <Card.Body>
          <Table responsive bordered hover>
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Color</th>
                <th>Size</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{order.product.name}</td>
                <td>{order.product.category}</td>
                <td>{order.product.color}</td>
                <td>{order.product.size}</td>
                <td>{order.quantity}</td>
                <td>₹{order.product.price.toFixed(2)}</td>
                <td>₹{subtotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </Table>

          <Row className="justify-content-end position-relative">
            <Col md={6} className="position-relative">
              <div className="position-absolute" style={{ top: '50px', left: '60px', opacity: 0.08, zIndex: 0 }}>
                <Image src={logo} roundedCircle height={250} width={250} alt="Vistora Logo" />
                <h3 className="fw-bold text-dark">Vistora E-commerce Pvt. Ltd</h3>
              </div>
            </Col>
            <Col md={6} className="ms-auto text-end">
              <Table borderless>
                <tbody>
                  <tr>
                    <td><strong>Subtotal:</strong></td>
                    <td>₹{subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td><strong>Discount:</strong></td>
                    <td>- ₹{discount.toFixed(2)}</td>
                  </tr>
                  <tr className="fs-5 fw-bold border-top">
                    <td><strong>Total:</strong></td>
                    <td>₹{total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </Table>

              <div className="mb-3">
                <strong>Payment Status: </strong>
                <span className={`badge bg-${paymentStatusVariant[order.payment_status as PaymentStatus]} ms-2`}>
                  {order.payment_status.toUpperCase()}
                </span>
              </div>

              <div className="mb-3">
                <strong>Payment Method:</strong> {order.payment_source.toUpperCase()}
              </div>

              <div className="mb-3">
                <strong>Open Box Delivery:</strong> {order.live_tracking.out_for_delivery ? 'Yes' : 'No'}
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Row className="mt-5 align-items-center">
        <Col md={6}>
          <p className="text-muted small">Thank you for shopping with us.</p>
        </Col>
        <Col md={6} className="text-end">
          <Image src={signature} alt="Signature" height={60} className="mb-1" />
          <p className="mb-0"><strong>Authorized Signatory</strong></p>
          <Image src={stamp} alt="Company Stamp" height={80} className="mt-2" />
        </Col>
      </Row>
    </>
  );
};

export default InvoicePage;
