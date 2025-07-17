import React, { useEffect, useState } from 'react';
import {
  Table, Button, Modal, Form, Row, Col, Pagination, Badge,
  InputGroup, Collapse, Card, Tooltip, OverlayTrigger,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import {
  setOrders, setSelectedOrder, updateOrder, deleteOrder,
  setInvoiceData,
} from '../../redux/slices/Orderslice';
import { dummydata } from '../../utils/dummydata';
import { orderStatusVariant, paymentStatusVariant, userStatusVariant, type OrderDetails, type OrderStatus } from '../../utils/Types';
import { FaEye, FaFileInvoice, FaRegEdit, FaSearch } from 'react-icons/fa';
import { IoCloseCircleSharp, IoCloseSharp } from "react-icons/io5";
import { TbLayoutBottombarCollapseFilled, TbLayoutNavbarCollapseFilled } from 'react-icons/tb';
import { MdOutlineDeleteSweep } from "react-icons/md";
import { DateRangePicker } from 'rsuite';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import no_data from '../../assets/images/product/No_data.jpg';
import type { RootState } from '../../redux/Store';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const Orderslist: React.FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.order.orders);
  const selectedOrder = useSelector((state: RootState) => state.order.selectedOrder);

  const [showModal, setShowModal] = useState(false);
  const [showsummeryModal, setshowsummeryModal] = useState(false);
  const [modified, setModified] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [activeTimeline, setActiveTimeline] = useState<string | null>(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [filters, setFilters] = useState({
    deliveryStatus: '',
    orderStatus: '',
    customerName: '',
    email: '',
    dateRange: [] as [Date, Date] | [],
    minPrice: '',
    maxPrice: '',
    searchQuery: '',
  });

  const customer = dummydata[0];
  const navigate = useNavigate();

  useEffect(() => {
    const formattedOrders = dummydata[0].order_details.map(order => ({ ...order, note: '' }));
    dispatch(setOrders(formattedOrders));
  }, [dispatch]);

  const handleViewInvoice = (order: OrderDetails | null) => {
    if (!order || !customer?.user_profile) return;
    dispatch(setInvoiceData({ order, customer: customer.user_profile }));
    navigate('/pages/orders/Invoicepage');
  };

  const handleUpdateClick = (order: OrderDetails) => {
    dispatch(setSelectedOrder({ ...order }));
    setShowModal(true);
    setModified(false);
  };

  const handleFieldChange = (field: keyof OrderDetails | 'note', value: any) => {
    if (!selectedOrder) return;
    const updated = { ...selectedOrder, [field]: value };
    dispatch(setSelectedOrder(updated));
    setModified(true);
  };

  const saveChanges = () => {
    if (!selectedOrder) return;
    dispatch(updateOrder(selectedOrder));
    setShowModal(false);
    dispatch(setSelectedOrder(null));
  };

  const closeModal = () => {
    setShowModal(false);
    dispatch(setSelectedOrder(null));
  };

  const toggleTimeline = (key: string) => {
    setActiveTimeline(prev => (prev === key ? null : key));
  };

  const isAllSelected = orders.length > 0 && selectedOrderIds.length === orders.length;

  const toggleSelectAll = () => {
    setSelectedOrderIds(isAllSelected ? [] : orders.map(order => order.order_id));
  };

  const toggleSelectOne = (orderId: string) => {
    setSelectedOrderIds(prev =>
      prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedOrderIds.length === 0) return;

    Swal.fire({
      title: `Delete ${selectedOrderIds.length} order(s)?`,
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete them!',
    }).then((result) => {
      if (result.isConfirmed) {
        selectedOrderIds.forEach(id => dispatch(deleteOrder(id)));
        setSelectedOrderIds([]);
        setDeleteMode(false);
      }
    });
  };

  const filterOrders = () => {
    return orders.filter(order => {
      const fullName = order.ordered_username?.toLowerCase() || '';
      const query = filters.searchQuery.toLowerCase();
      const totalPrice = order.product.price * order.quantity;

      return (
        (order.order_id.toLowerCase().includes(query) ||
          fullName.includes(query) ||
          order.order_status.toLowerCase().includes(query)) &&
        (!filters.deliveryStatus || order.delivery_status === filters.deliveryStatus) &&
        (!filters.orderStatus || order.order_status === filters.orderStatus) &&
        (!filters.customerName || fullName.includes(filters.customerName.toLowerCase())) &&
        (!filters.email || order.ordered_email?.toLowerCase().includes(filters.email.toLowerCase())) &&
        (filters.dateRange.length === 0 ||
          (new Date(order.date) >= filters.dateRange[0] && new Date(order.date) <= filters.dateRange[1])) &&
        (!filters.minPrice || totalPrice >= parseFloat(filters.minPrice)) &&
        (!filters.maxPrice || totalPrice <= parseFloat(filters.maxPrice))
      );
    });
  };

  const exportToExcel = async (data: OrderDetails[]) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Orders');

    worksheet.columns = [
      { header: 'Order ID', key: 'order_id', width: 15 },
      { header: 'Product Name', key: 'productName', width: 25 },
      { header: 'Category', key: 'category', width: 15 },
      { header: 'Customer', key: 'ordered_username', width: 20 },
      { header: 'Email', key: 'ordered_email', width: 25 },
      { header: 'Date', key: 'date', width: 20 },
      { header: 'Order Status', key: 'order_status', width: 15 },
      { header: 'Payment Status', key: 'payment_status', width: 15 },
      { header: 'Quantity', key: 'quantity', width: 10 },
      { header: 'Total', key: 'total', width: 15 },
    ];

    data.forEach(order => {
      worksheet.addRow({
        order_id: order.order_id,
        productName: order.product.name,
        category: order.product.category,
        ordered_username: order.ordered_username,
        ordered_email: order.ordered_email || 'N/A',
        date: new Date(order.date).toLocaleString(),
        order_status: order.order_status,
        payment_status: order.payment_status,
        quantity: order.quantity,
        total: (order.product.price * order.quantity).toFixed(2),
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const fileName = `Vistora_orderList_${new Date().toISOString().split('T')[0]}.xlsx`;
    saveAs(new Blob([buffer]), fileName);
  };

  const paginatedOrders = () => {
    const filtered = filterOrders();
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filtered.slice(startIndex, startIndex + itemsPerPage);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  return (
    <div className="p-4">
      <h3 className="mb-4 fw-bold text-danger">
        Order Management
      </h3>

      <div className="mb-4 p-3 bg-white border rounded-4 shadow-sm">
        <Row className="g-3 align-items-center mb-3">
          {/* Top Search & Actions */}
          <Col md={6}>
            <InputGroup>
              <InputGroup.Text><FaSearch /></InputGroup.Text>
              <Form.Control
                placeholder="Search by name, ID or status..."
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
              />
            </InputGroup>
          </Col>

          <Col md={6} className="text-md-end d-flex justify-content-end gap-2">
            <Button variant="success" onClick={() => exportToExcel(filterOrders())}>📤 Export to Excel</Button>
            <Button
              variant="danger"
              onClick={() => {
                if (deleteMode) {
                  // Just cancel the delete mode and clear selections
                  setDeleteMode(false);
                  setSelectedOrderIds([]);
                } else {
                  // Enter selection mode
                  setDeleteMode(true);
                }
              }}
            >
              {deleteMode ? <IoCloseCircleSharp /> : <MdOutlineDeleteSweep />}
            </Button>
            <Button variant="outline-secondary" onClick={() => setShowFilters(!showFilters)}>
              {showFilters ? <TbLayoutNavbarCollapseFilled /> : <TbLayoutBottombarCollapseFilled />}
            </Button>
          </Col>
        </Row>

        {/* Selection status bar */}
        {deleteMode && selectedOrderIds.length > 0 && (
          <Row className="align-items-center justify-content-between mb-3 px-2">
            <Col><strong>{selectedOrderIds.length} selected</strong></Col>
            <Col className="text-end">
              <Button
                variant="danger"
                onClick={() => {
                  Swal.fire({
                    title: 'Are you sure?',
                    text: `You are about to delete ${selectedOrderIds.length} orders.`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete!',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      handleDeleteSelected();
                    }
                  });
                }}
              >
                Delete
              </Button>
            </Col>
          </Row>
        )}

        {/* Collapsible filter section with animation */}
        <Collapse in={showFilters}>
          <div>
            <Row className="g-3 mb-3">
              <Col md={3}>
                <Form.Select
                  value={filters.deliveryStatus}
                  onChange={(e) => setFilters({ ...filters, deliveryStatus: e.target.value })}
                >
                  <option value="">Delivery Status</option>
                  <option value="placed">Placed</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shifted">Shipped</option>
                  <option value="intransit">In Transit</option>
                  <option value="outfordelivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                </Form.Select>
              </Col>

              <Col md={3}>
                <Form.Select
                  value={filters.orderStatus}
                  onChange={(e) => setFilters({ ...filters, orderStatus: e.target.value })}
                >
                  <option>Order Status</option>
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </Form.Select>
              </Col>

              <Col md={3}>
                <Form.Control
                  type="text"
                  value={filters.customerName}
                  placeholder="Customer Name"
                  onChange={(e) => setFilters({ ...filters, customerName: e.target.value })}
                />
              </Col>

              <Col md={3}>
                <Form.Control
                  type="email"
                  value={filters.email}
                  placeholder="Email"
                  onChange={(e) => setFilters({ ...filters, email: e.target.value })}
                />
              </Col>

              <Col md={6}>
                <DateRangePicker
                  character=" to "
                  style={{ width: '100%' }}
                  placeholder="Select date range"
                  onChange={(val) => setFilters({ ...filters, dateRange: val ? val : [] })}
                />
              </Col>

              <Col md={3}>
                <InputGroup>
                  <InputGroup.Text>Min ₹</InputGroup.Text>
                  <Form.Control
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                  />
                </InputGroup>
              </Col>

              <Col md={3}>
                <InputGroup>
                  <InputGroup.Text>Max ₹</InputGroup.Text>
                  <Form.Control
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                  />
                </InputGroup>
              </Col>
            </Row>
          </div>
        </Collapse>
      </div>

      <div className="table-responsive border rounded-4 shadow-sm">
        <Table hover className="mb-0">
          <thead className="table-light text-center">
            <tr>
              {deleteMode ? (
                <th>
                  <Form.Check type="checkbox" checked={isAllSelected} onChange={toggleSelectAll} />
                </th>
              ) : (
                <th>#</th>
              )}
              <th>Order ID</th>
              <th>Product</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Ordered date</th>
              <th>Order Status</th>
              <th>Amount</th>
              <th>Payment status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {paginatedOrders().map((order, idx) => {
              const isBlurred = deleteMode && (isAllSelected || selectedOrderIds.includes(order.order_id));
              return (
                <tr
                  key={order.order_id}
                  className="align-middle"
                  style={isBlurred ? { filter: 'blur(3px)', opacity: 0.6 } : {}}
                >
                  {deleteMode ? (
                    <td>
                      <Form.Check
                        type="checkbox"
                        checked={selectedOrderIds.includes(order.order_id)}
                        onChange={() => toggleSelectOne(order.order_id)}
                      />
                    </td>
                  ) : (
                    <td>{idx + 1}</td>
                  )}
                  <td>
                    <Link
                      to="#"
                      onClick={() => {
                        dispatch(setSelectedOrder(order)); // ✅ from Redux
                        setshowsummeryModal(true);         // ✅ modal state
                      }}
                      className="text-primary-underline"
                    >
                      {order.order_id}
                    </Link>
                  </td>
                  <td>
                    <div className="fw-semibold">{order.product.name}</div>
                    <div className="text-muted small">{order.product.category}</div>
                  </td>
                  <td>{order.ordered_username}</td>
                  <td className="text-primary-underline">{order.ordered_email}</td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td><Badge bg={orderStatusVariant[order.order_status]}>{order.order_status}</Badge></td>
                  <td className="fw-semibold">₹{(order.product.price * order.quantity).toFixed(2)}</td>
                  <td><Badge bg={paymentStatusVariant[order.payment_status]}>{order.payment_status}</Badge></td>
                  <td>
                    <Button size="sm" className="me-1" onClick={() => handleUpdateClick(order)}><FaRegEdit /></Button>
                    <Button
                      as={Link as any}
                      to="/pages/orders/Orderdetails"
                      onClick={() =>
                        dispatch(setInvoiceData({ order, customer: customer.user_profile }))
                      }
                      size="sm"
                      className="me-1"
                    >
                      <FaEye />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          {paginatedOrders().length === 0 && (
            <tr>
              <td colSpan={12}>
                <div className="text-center py-5">
                  <img src={no_data} alt="No Data" style={{ width: 160, opacity: 0.5 }} />
                  <div className="mt-3 text-muted">No orders match the current filters.</div>
                </div>
              </td>
            </tr>
          )}
        </Table>
      </div>

      {filterOrders().length > itemsPerPage && (
        <div className="d-flex justify-content-end mt-4">
          <Pagination className="custom-pagination">
            <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
            {Array.from({ length: Math.ceil(filterOrders().length / itemsPerPage) }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={currentPage === i + 1}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filterOrders().length / itemsPerPage)))}
              disabled={currentPage === Math.ceil(filterOrders().length / itemsPerPage)}
            />
            <Pagination.Last
              onClick={() => setCurrentPage(Math.ceil(filterOrders().length / itemsPerPage))}
              disabled={currentPage === Math.ceil(filterOrders().length / itemsPerPage)}
            />
          </Pagination>
        </div>
      )}

      {/* order summery modal */}
      <Modal show={showsummeryModal} onHide={() => setshowsummeryModal(false)} size='lg' scrollable>
        <Modal.Header
          className="bg-gradient fw-bold d-flex justify-content-between align-items-center"
          style={{ background: 'linear-gradient(90deg, #ff416c, #ff4b2b)' }}
        >
          <div>🧾 Order Summary for {selectedOrder?.order_id}</div>
          <div className="d-flex align-items-center gap-2">
            <Button onClick={() => handleViewInvoice(selectedOrder)} variant="light" size="sm">
              <FaFileInvoice className="me-2" />View Invoice
            </Button>
            <Button size="sm" className="border-0" onClick={() => setshowsummeryModal(false)}>
              <IoCloseSharp />
            </Button>
          </div>
        </Modal.Header>

        <Modal.Body>
          <Card className="border-0 rounded-4">
            <Card.Body>
              <Row className="mb-5 align-items-center">
                <Col md={6} className="d-flex align-items-center">
                  <img
                    src={customer.user_profile.profile_image}
                    alt="avatar"
                    className="rounded-circle me-3 border border-3 border-danger"
                    width={70}
                    height={70}
                  />
                  <div>
                    <h5 className="mb-1 fw-semibold">{customer.user_profile.name}</h5>
                    <p className="mb-0 text-muted">{customer.user_profile.email}</p>
                    <p className="mb-0 text-muted">+91 {customer.user_profile.mobile}</p>
                    <Badge bg={userStatusVariant[customer.user_profile.status]} className="mt-1">
                      {customer.user_profile.status.toUpperCase()}
                    </Badge>
                  </div>
                </Col>
                <Col md={6} className="text-md-end mt-4 mt-md-0">
                  <h6 className="mb-1 text-muted">
                    Order ID: <span className="text-dark">{selectedOrder?.order_id}</span>
                  </h6>
                  <h6 className="mb-1 text-muted">
                    Date: <span className="text-dark">{new Date(selectedOrder?.date || '').toLocaleString()}</span>
                  </h6>
                  <h6 className="mb-1 text-muted">
                    Status: <Badge bg={selectedOrder?.order_status ? orderStatusVariant[selectedOrder.order_status as OrderStatus] : 'secondary'}>
                      {selectedOrder?.order_status ?? 'N/A'}
                    </Badge>
                  </h6>
                  <h6 className="mb-0 text-muted">
                    Payment: <Badge bg={paymentStatusVariant[selectedOrder?.payment_status || 'pending']}>
                      {selectedOrder?.payment_status}
                    </Badge>
                  </h6>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={6} className="pe-md-5 border-end text-start">
                  <h6 className="fw-bold text-uppercase mb-3">Shipping Address</h6>
                  <p className="mb-1">{selectedOrder?.shipping_address.line}</p>
                  <p className="mb-1">{selectedOrder?.shipping_address.city}, {selectedOrder?.shipping_address.state}</p>
                  <p className="mb-1">{selectedOrder?.shipping_address.country} - {selectedOrder?.shipping_address.zip_code}</p>
                </Col>
                <Col md={6} className="ps-md-5 text-end">
                  <h6 className="fw-bold text-uppercase mb-3">Billing Address</h6>
                  <p className="mb-1">{selectedOrder?.billing_address.line}</p>
                  <p className="mb-1">{selectedOrder?.billing_address.city}, {selectedOrder?.billing_address.state}</p>
                  <p className="mb-1">{selectedOrder?.billing_address.country} - {selectedOrder?.billing_address.zip_code}</p>
                </Col>
              </Row>

              <h5 className="fw-bold text-danger mb-3">🛍 Product Details</h5>
              <Table responsive hover bordered className="rounded shadow-sm mb-0">
                <thead className="table-dark text-white">
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
                    <td>{selectedOrder?.product.name}</td>
                    <td>{selectedOrder?.product.category}</td>
                    <td>{selectedOrder?.product.color}</td>
                    <td>{selectedOrder?.product.size}</td>
                    <td>{selectedOrder?.quantity}</td>
                    <td>₹{selectedOrder?.product.price.toFixed(2)}</td>
                    <td className="fw-bold">
                      ₹{((selectedOrder?.product?.price ?? 0) * (selectedOrder?.quantity ?? 1)).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </Table>

              <Row className="g-0 mt-4">
                <Col md={6} className="pe-md-4 border-end">
                  <h6 className="fw-bold mb-3">📦 Order Timeline</h6>
                  {Object.entries(selectedOrder?.live_tracking || {}).map(([stage, status], index) => (
                    typeof status === 'boolean' && (
                      <div key={stage} style={{ borderTop: index !== 0 ? '1px solid #dee2e6' : 'none' }}>
                        <Card className="border-0 rounded-0 shadow-none">
                          <Card.Header
                            onClick={() => toggleTimeline(stage)}
                            className={`d-flex justify-content-between align-items-center bg-white px-3 py-2 ${activeTimeline === stage ? 'bg-light' : ''}`}
                            style={{ cursor: 'pointer' }}
                          >
                            <span className="fw-semibold">{`${index + 1}. ${stage.replace('_', ' ').toUpperCase()}`}</span>
                            <span className="text-muted small">{selectedOrder?.live_tracking?.estimated_delivery}</span>
                          </Card.Header>
                          <motion.div
                            initial={false}
                            animate={{ height: activeTimeline === stage ? 'auto' : 0, opacity: activeTimeline === stage ? 1 : 0 }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                            style={{ overflow: 'hidden' }}
                          >
                            <div className="px-4 pb-3 pt-2">
                              <p className="text-muted small mb-0">
                                Details for <strong>{stage}</strong> will be displayed here...
                              </p>
                            </div>
                          </motion.div>
                        </Card>
                      </div>
                    )
                  ))}
                </Col>

                <Col md={6} className="ps-md-4">
                  <h6 className="mb-3 fw-bold">💳 Payment Summary</h6>
                  <ul className="list-unstyled mb-0">
                    <li className="d-flex justify-content-between mb-2">
                      <span>Subtotal:</span>
                      <strong>
                        ₹{((selectedOrder?.product?.price ?? 0) * (selectedOrder?.quantity ?? 1)).toFixed(2)}
                      </strong>
                    </li>
                    <li className="d-flex justify-content-between mb-2"><span>Delivery Charge:</span><strong>₹40.00</strong></li>
                    <li className="d-flex justify-content-between mb-2"><span>Handling Fee:</span><strong>₹10.00</strong></li>
                    <li className="d-flex justify-content-between mb-2"><span>Packing Fee:</span><strong>₹20.00</strong></li>
                    <li className="d-flex justify-content-between mb-2">
                      <span>Coupon Discount:</span>
                      <strong className="text-success">
                        - ₹{selectedOrder?.coupon_applied ? ((selectedOrder.product.price * selectedOrder.quantity) * 0.1).toFixed(2) : '0.00'}
                      </strong>
                    </li>
                    <li className="d-flex justify-content-between mb-2"><span>Extra Discount:</span><strong className="text-success">- ₹5.00</strong></li>
                    <li className="d-flex justify-content-between border-top pt-2">
                      <span>Total:</span>
                      {selectedOrder && (
                        <strong className="text-danger">
                          ₹{(
                            (selectedOrder.product.price * selectedOrder.quantity) +
                            40 + 10 + 20 -
                            (selectedOrder.coupon_applied ? selectedOrder.product.price * selectedOrder.quantity * 0.1 : 0) -
                            5
                          ).toFixed(2)}
                        </strong>
                      )}
                    </li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal
        size="lg"
        show={showModal}
        onHide={closeModal}
        backdrop="static"
        className="z-top"
      >
        <Modal.Header closeButton className="bg-light border-bottom-0">
          <Modal.Title className="fw-bold text-danger">
            Update Order: {selectedOrder?.order_id}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedOrder && (
            <>
              <Card className="mb-3 shadow-sm border-0 bg-light-subtle">
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-1">Product: {selectedOrder.product.name}</h5>
                    <div className="text-muted small">Qty: {selectedOrder.quantity}</div>
                  </div>
                  <div className="text-end">
                    <div className="small text-muted">Order Date</div>
                    <strong>{new Date(selectedOrder.date).toLocaleString()}</strong>
                  </div>
                </Card.Body>
              </Card>

              <Row className="mb-4 text-center">
                <Col>
                  <span className="fw-semibold me-2">Status:</span>
                  <Badge bg={orderStatusVariant[selectedOrder.order_status]}>
                    {selectedOrder.order_status}
                  </Badge>
                </Col>
                <Col>
                  <span className="fw-semibold me-2">Payment:</span>
                  <Badge bg={paymentStatusVariant[selectedOrder.payment_status]}>
                    {selectedOrder.payment_status}
                  </Badge>
                </Col>
              </Row>

              <Form>
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="order_status">
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        value={selectedOrder.order_status}
                        onChange={(e) =>
                          handleFieldChange('order_status', e.target.value)
                        }
                      >
                        {Object.keys(orderStatusVariant).map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group controlId="payment_status">
                      <Form.Label>Payment Status</Form.Label>
                      <Form.Select
                        value={selectedOrder.payment_status}
                        onChange={(e) =>
                          handleFieldChange('payment_status', e.target.value)
                        }
                      >
                        {Object.keys(paymentStatusVariant).map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="quantity" className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    min={1}
                    value={selectedOrder.quantity}
                    onChange={(e) =>
                      handleFieldChange('quantity', parseInt(e.target.value, 10))
                    }
                  />
                </Form.Group>

                <Form.Group controlId="note">
                  <Form.Label>Note</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Any special instructions or notes..."
                    value={selectedOrder.note || ''}
                    onChange={(e) => handleFieldChange('note', e.target.value)}
                  />
                </Form.Group>
              </Form>
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          {modified && (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Save the updates</Tooltip>}
            >
              <Button variant="primary" onClick={saveChanges}>
                💾 Save Changes
              </Button>
            </OverlayTrigger>
          )}
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default Orderslist;
