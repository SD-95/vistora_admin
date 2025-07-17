import React, { useState, useEffect, type ChangeEvent, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Badge, Button, ListGroup, Table, Form, Modal, InputGroup, Image } from "react-bootstrap";
import { dummydata } from "../../utils/dummydata";
import type { webProducttype } from "../../utils/Types";
import { Plus, X } from "react-bootstrap-icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { editProduct, initializeProducts } from "../../redux/slices/Productslice";

const PRIMARY_COLOR = "#ff6f61";

const Productview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [mainImage, setMainImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);


  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.webProducts);

  const [showEditModal, setShowEditModal] = useState(false);
  const [product, setProduct] = useState<webProducttype | null>(null);
  const [editedProduct, setEditedProduct] = useState<webProducttype | null>(null);
  const [newFeature, setNewFeature] = useState("");

  // Initialize products from dummy if empty
  useEffect(() => {
    if (products.length === 0) {
      const defaultProducts = dummydata[0]?.webProducts?.slice(0, 2) ?? [];
      dispatch(initializeProducts(defaultProducts));
    }
  }, []);

  // Load selected product by ID
  useEffect(() => {
    const found = products.find((p) => p.id === id);
    if (found) {
      setProduct(found);
      setMainImage(found.images[0]);
    }
  }, [products, id]);

  const handleEditChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editedProduct) {
      setEditedProduct({ ...editedProduct, [name]: value });
    }
  };

  const openEditModal = () => {
    if (product) {
      setEditedProduct({ ...product });
      setShowEditModal(true);
    }
  };

  const saveEditedProduct = () => {
    if (editedProduct) {
      dispatch(editProduct(editedProduct));
      setProduct(editedProduct);
      setShowEditModal(false);
    }
  };


  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !editedProduct) return;
    const urls = Array.from(files)
      .slice(0, 5 - editedProduct.images.length)
      .map((file) => URL.createObjectURL(file));
    setEditedProduct(prev => prev ? { ...prev, images: [...prev.images, ...urls] } : prev);
    if (!mainImage && urls.length) setMainImage(urls[0]);
  };

  const handleRemoveImage = (idx: number) => {
    if (!editedProduct) return;
    setEditedProduct(prev => {
      if (!prev) return prev;
      const imgs = [...prev.images];
      imgs.splice(idx, 1);
      return { ...prev, images: imgs };
    });
  };

  if (!product) {
    return (
      <Container className="mt-5 text-center">
        <Image src="/notfound.svg" alt="Not found" fluid style={{ maxWidth: 300 }} />
        <p className="mt-3 text-muted">Product not found.</p>
      </Container>
    );
  }
  
  return (
    <Container fluid className="py-4 px-3">

      <Card className="shadow p-4" style={{ borderRadius: "20px" }}>
        <Row>
          <Col md={5} className="mb-4">
            <Card className="shadow-sm border-0 p-3" style={{ borderRadius: "16px", background: "#f8f9fa" }}>
              <div className="text-center">
                <img
                  src={mainImage}
                  alt="main-product"
                  className="img-fluid"
                  style={{ borderRadius: "12px", maxHeight: "420px", width: "100%", objectFit: "contain" }}
                />
              </div>
              <div className="d-flex justify-content-center gap-2 mt-3 flex-wrap">
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`thumb-${idx}`}
                    className={`img-thumbnail border rounded ${mainImage === img ? "border-primary" : ""}`}
                    style={{ width: "64px", height: "64px", objectFit: "cover", cursor: "pointer" }}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            </Card>
          </Col>

          <Col md={7}>
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div>
                <h2 className="fw-bold mb-1">{product.name}</h2>
                <h5 className="text-muted mb-2">{product.subtitle}</h5>
              </div>
              <Button onClick={openEditModal} size="sm" style={{ backgroundColor: PRIMARY_COLOR, border: "none" }}>
                Edit
              </Button>
            </div>

            <div className="d-flex align-items-center mb-3">
              <Badge bg="success" className="me-2">{product.availability}</Badge>
              <span className="text-warning fw-semibold">
                {product.ratings.averageRating} ★ ({product.ratings.totalReviews} reviews)
              </span>
            </div>

            <h3 className="text-danger mb-3">
              ₹{product.websitePrice}
              <span className="fs-5 text-muted ms-2 text-decoration-line-through">₹{product.originalPrice}</span>
            </h3>

            <Table responsive borderless className="mb-4">
              <tbody>
                <tr>
                  <td><strong>Brand</strong></td><td>{product.brand}</td>
                  <td><strong>SKU</strong></td><td>{product.sku}</td>
                </tr>
                <tr>
                  <td><strong>Category</strong></td><td>{product.category}</td>
                  <td><strong>Subcategory</strong></td><td>{product.subcategory}</td>
                </tr>
                <tr>
                  <td><strong>Type</strong></td><td>{product.type}</td>
                  <td><strong>Stock</strong></td><td>{product.stock}</td>
                </tr>
                <tr>
                  <td><strong>Color</strong></td><td>{product.color}</td>
                  <td><strong>Size</strong></td><td>{product.size}</td>
                </tr>
                <tr>
                  <td><strong>Warranty</strong></td><td>{product.warranty}</td>
                  <td><strong>Material</strong></td><td>{product.material || "N/A"}</td>
                </tr>
                <tr>
                  <td><strong>Dimensions</strong></td><td>{product.dimensions}</td>
                  <td><strong>Weight</strong></td><td>{product.weight}</td>
                </tr>
                <tr>
                  <td><strong>Battery Life</strong></td><td>{product.batteryLife || "N/A"}</td>
                  <td><strong>Connectivity</strong></td><td>{product.connectivity || "N/A"}</td>
                </tr>
                <tr>
                  <td><strong>Compatibility</strong></td>
                  <td colSpan={3}>
                    {Array.isArray(product.compatibility) && product.compatibility.filter(Boolean).length > 0
                      ? product.compatibility.join(", ")
                      : "N/A"}
                  </td>
                </tr>
                <tr>
                  <td><strong>Return Policy</strong></td><td colSpan={3}>{product.returnPolicy}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>

        <Row>
          <Col md={6} className="mt-4">
            <h5 className="mb-2">Key Features</h5>
            <ListGroup variant="flush" className="mb-4">
              {product.features.map((feature, idx) => (
                <ListGroup.Item key={idx} className="ps-0 border-0">✅ {feature}</ListGroup.Item>
              ))}
            </ListGroup>

            <h5 className="mb-3">Delivery Information</h5>
            <Table striped bordered hover size="sm">
              <tbody>
                <tr>
                  <td><strong>Estimated Delivery</strong></td>
                  <td>{product.deliveryInfo.estimatedDelivery || "N/A"}</td>
                </tr>
                <tr>
                  <td><strong>Delivery Charge</strong></td>
                  <td>{product.deliveryInfo.deliveryCharge || "N/A"}</td>
                </tr>
                <tr>
                  <td><strong>Shipped By</strong></td>
                  <td>{product.deliveryInfo.shippedBy || "N/A"}</td>
                </tr>
                <tr>
                  <td><strong>Courier Partner</strong></td>
                  <td>{product.deliveryInfo.courierPartner || "N/A"}</td>
                </tr>
              </tbody>
            </Table>

            <h5 className="mb-3">Offers</h5>
            {product.offers?.length > 0 ? (
              <ul className="list-unstyled">
                {product.offers.map((offer, idx) => (
                  <li key={idx} className="mb-2">
                    <Badge bg="info" className="me-2">{offer.title}</Badge>
                    <span className="text-muted small">(Valid till {offer.validTill})</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No current offers.</p>
            )}
          </Col>

          <Col md={6} className="mt-4">
            <h5 className="mb-3">Product Specifications</h5>
            <Table striped bordered hover size="sm">
              <tbody>
                <tr>
                  <td><strong>Product ID</strong></td>
                  <td>{product.id}</td>
                </tr>
                <tr>
                  <td><strong>Manufacturing Date</strong></td>
                  <td>{product.manufacturingDate}</td>
                </tr>
                <tr>
                  <td><strong>Expiry Date</strong></td>
                  <td>{product.expiryDate || "N/A"}</td>
                </tr>
              </tbody>
            </Table>

            <h5 className="mb-3">Technical Specifications</h5>
            {product.specifications?.length > 0 ? (
              <Table striped bordered hover size="sm">
                <tbody>
                  {product.specifications.map((spec, idx) => (
                    <tr key={idx}>
                      <td><strong>{spec.label}</strong></td>
                      <td>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p className="text-muted">No specifications available.</p>
            )}

            <h5 className="mb-2 mt-4">Product Description</h5>
            <p className="text-muted">{product.description}</p>
          </Col>
        </Row>
      </Card>

      {/* EDIT MODAL */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="xl" centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editedProduct && (
            <>
              <div className="mb-4">
                <Form.Label><strong>Product Images (max 5)</strong></Form.Label>
                <div className="d-flex flex-wrap gap-3">
                  {editedProduct && editedProduct.images.length < 5 && (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="d-flex justify-content-center align-items-center border rounded-circle"
                      style={{ width: 100, height: 100, cursor: "pointer", backgroundColor: "#f8f9fa", position: "relative" }}
                    >
                      <Plus size={32} color={PRIMARY_COLOR} />
                      <Form.Control
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        multiple
                        style={{ display: "none" }}
                        onChange={handleImageUpload}
                      />
                    </div>
                  )}

                  {editedProduct?.images.map((img, idx) => (
                    <div key={idx} style={{ position: "relative" }}>
                      <Image
                        src={img}
                        roundedCircle
                        style={{
                          width: 100,
                          height: 100,
                          objectFit: "cover",
                          border: "2px solid #dee2e6",
                        }}
                      />
                      <div
                        onClick={() => handleRemoveImage(idx)}
                        style={{
                          position: "absolute",
                          top: -6,
                          right: -6,
                          backgroundColor: "white",
                          borderRadius: "50%",
                          boxShadow: "0 0 6px rgba(0,0,0,0.15)",
                          cursor: "pointer",
                        }}
                      >
                        <X size={16} className="text-danger m-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Row>
                <Col md={3}><Form.Group className="mb-3"><Form.Label>Product_ID</Form.Label><Form.Control name="name" value={editedProduct.id} onChange={handleEditChange} /></Form.Group></Col>
                <Col md={3}><Form.Group className="mb-3"><Form.Label>Name</Form.Label><Form.Control name="name" value={editedProduct.name} onChange={handleEditChange} /></Form.Group></Col>
                <Col md={3}><Form.Group className="mb-3"><Form.Label>Subtitle</Form.Label><Form.Control name="subtitle" value={editedProduct.subtitle} onChange={handleEditChange} /></Form.Group></Col>
                <Col md={3}><Form.Group className="mb-3"><Form.Label>Website Price</Form.Label><Form.Control type="number" name="websitePrice" value={editedProduct.websitePrice} onChange={handleEditChange} /></Form.Group></Col>
                <Col md={3}><Form.Group className="mb-3"><Form.Label>Original Price</Form.Label><Form.Control type="number" name="originalPrice" value={editedProduct.originalPrice} onChange={handleEditChange} /></Form.Group></Col>
                <Col md={3}><Form.Group className="mb-3"><Form.Label>Brand</Form.Label><Form.Control name="brand" value={editedProduct.brand} onChange={handleEditChange} /></Form.Group></Col>
                <Col md={3}><Form.Group className="mb-3"><Form.Label>SKU</Form.Label><Form.Control name="sku" value={editedProduct.sku} onChange={handleEditChange} /></Form.Group></Col>
                <Col md={3}><Form.Group className="mb-3"><Form.Label>Category</Form.Label><Form.Select name="category" value={editedProduct.category} onChange={handleEditChange}><option>Select Category</option><option>Electronics</option><option>Apparel</option></Form.Select></Form.Group></Col>
                <Col md={3}><Form.Group className="mb-3"><Form.Label>Subcategory</Form.Label><Form.Select name="subcategory" value={editedProduct.subcategory} onChange={handleEditChange}><option>Select Subcategory</option><option>Phones</option><option>Shirts</option></Form.Select></Form.Group></Col>
                <Col md={3}><Form.Group className="mb-3"><Form.Label>Type</Form.Label><Form.Select name="type" value={editedProduct.type} onChange={handleEditChange}><option>Select Type</option><option>New</option><option>Refurbished</option></Form.Select></Form.Group></Col>
                <Col md={3}><Form.Group className="mb-3"><Form.Label>Stock</Form.Label><Form.Control type="number" name="stock" value={editedProduct.stock} onChange={handleEditChange} /></Form.Group></Col>
                <Col md={3}><Form.Group className="mb-3"><Form.Label>Availability</Form.Label><Form.Select name="availability" value={editedProduct.availability} onChange={handleEditChange}><option>In Stock</option><option>Out of Stock</option></Form.Select></Form.Group></Col>
                <Col md={3}><Form.Group className="mb-3"><Form.Label>Color</Form.Label><Form.Select name="color" value={editedProduct.color} onChange={handleEditChange}><option>Black</option><option>White</option><option>Red</option></Form.Select></Form.Group></Col>
                <Col md={3}><Form.Group className="mb-3"><Form.Label>Size</Form.Label><Form.Control name="size" value={editedProduct.size} onChange={handleEditChange} /></Form.Group></Col>
                <Col md={3}><Form.Group className="mb-3"><Form.Label>Warranty</Form.Label><Form.Select name="warranty" value={editedProduct.warranty} onChange={handleEditChange}><option>6 Months</option><option>1 Year</option><option>2 Years</option></Form.Select></Form.Group></Col>
                <Col md={3}><Form.Group className="mb-3"><Form.Label>Dimensions</Form.Label><Form.Control name="dimensions" value={editedProduct.dimensions} onChange={handleEditChange} /></Form.Group></Col>
                <Col md={3}><Form.Group className="mb-3"><Form.Label>Weight</Form.Label><Form.Control name="weight" value={editedProduct.weight} onChange={handleEditChange} /></Form.Group></Col>
                <Col md={3}><Form.Group className="mb-3"><Form.Label>Material</Form.Label><Form.Control name="material" value={editedProduct.material} onChange={handleEditChange} /></Form.Group></Col>
                <Col md={3}><Form.Group className="mb-3"><Form.Label>Battery Life</Form.Label><Form.Control name="batteryLife" value={editedProduct.batteryLife} onChange={handleEditChange} /></Form.Group></Col>
                <Col md={3}><Form.Group className="mb-3"><Form.Label>Connectivity</Form.Label><Form.Control name="connectivity" value={editedProduct.connectivity} onChange={handleEditChange} /></Form.Group></Col>
                <Col md={3}><Form.Group className="mb-3"><Form.Label>Manufacturing Date</Form.Label><Form.Control type="date" name="manufacturingDate" value={editedProduct.manufacturingDate} onChange={handleEditChange} /></Form.Group></Col>
                <Col md={3}><Form.Group className="mb-3"><Form.Label>Expiry Date</Form.Label><Form.Control type="date" name="expiryDate" value={editedProduct.expiryDate} onChange={handleEditChange} /></Form.Group></Col>
                <Col md={3}><Form.Group className="mb-3"><Form.Label>Return Policy</Form.Label><Form.Control type="text" name="returnPolicy" value={editedProduct.returnPolicy} onChange={handleEditChange} /></Form.Group></Col>
              </Row>

              {/* --- Features --- */}
              <Row>

                <Col md={6}>
                  <Form.Label><strong>Key Features</strong></Form.Label>
                  <ListGroup className="mb-3">
                    {editedProduct?.features.map((feature, index) => (
                      <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                        {feature}
                        <Button variant="outline-danger" size="sm" onClick={() => {
                          const updated = [...editedProduct.features];
                          updated.splice(index, 1);
                          setEditedProduct(prev => ({ ...prev!, features: updated }));
                        }}>x</Button>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Add a new feature"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && newFeature.trim()) {
                          setEditedProduct(prev => ({
                            ...prev!,
                            features: [...(prev?.features ?? []), newFeature.trim()]
                          }));
                          setNewFeature('');
                        }
                      }}
                    />
                    <Button onClick={() => {
                      if (newFeature.trim()) {
                        setEditedProduct(prev => ({
                          ...prev!,
                          features: [...(prev?.features ?? []), newFeature.trim()]
                        }));
                        setNewFeature('');
                      }
                    }}>Add</Button>
                  </InputGroup>
                </Col>

                {/* --- Description --- */}

                <Col md={6}>
                  <Form.Label><strong>Description</strong></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    name="description"
                    value={editedProduct.description}
                    onChange={handleEditChange}
                  />
                </Col>
              </Row>

              {/* --- Compatibility (Badges Input) --- */}
              <Row className="mb-3">

                <Col>
                  <Form.Label><strong>Compatibility</strong></Form.Label>
                  <InputGroup>
                    <Form.Control
                      placeholder="Enter compatibility and press Enter"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const value = e.currentTarget.value.trim();
                          if (value && !(editedProduct.compatibility ?? []).includes(value)) {
                            setEditedProduct(prev => ({
                              ...prev!,
                              compatibility: [...(prev?.compatibility ?? []), value]
                            }));
                            e.currentTarget.value = '';
                          }
                        }
                      }}
                    />
                  </InputGroup>
                  <div className="mt-2 d-flex gap-2 flex-wrap">
                    {(editedProduct.compatibility ?? []).map((item, idx) => (
                      <Badge key={idx} pill bg="secondary" className="position-relative me-2">
                        <span>{item}</span>
                        <X size={18} className="position-absolute bg-white rounded-circle p-1 text-danger shadow-sm"
                          style={{ right: '-10px', top: '-6px', cursor: 'pointer' }}
                          onClick={() => {
                            setEditedProduct(prev => ({
                              ...prev!,
                              compatibility: prev?.compatibility?.filter((_, i) => i !== idx) ?? []
                            }));
                          }}
                        />
                      </Badge>
                    ))}
                  </div>
                </Col>
              </Row>

              {/* --- Offers --- */}
              <Row className="mb-3">

                <Col>
                  <Form.Group>
                    <Form.Label><strong>Offers</strong></Form.Label>
                    <Form.Select onChange={(e) => {
                      const selected = e.target.value;
                      const offerMap: Record<string, { title: string; validTill: string }> = {
                        '10% Instant Discount on Credit Cards': { title: '10% Instant Discount on Credit Cards', validTill: '2025-07-31' },
                        'No Cost EMI Available': { title: 'No Cost EMI Available', validTill: '2025-12-31' },
                        'Extra ₹500 Off on First Purchase': { title: 'Extra ₹500 Off on First Purchase', validTill: '2025-08-15' },
                      };

                      const offerObj = offerMap[selected];
                      if (offerObj && !editedProduct.offers.some(o => o.title === offerObj.title)) {
                        setEditedProduct(prev => ({
                          ...prev!,
                          offers: [...(prev?.offers ?? []), offerObj]
                        }));
                      }
                    }}>
                      <option value="">Select Offer</option>
                      <option value="10% Instant Discount on Credit Cards">10% Instant Discount on Credit Cards</option>
                      <option value="No Cost EMI Available">No Cost EMI Available</option>
                      <option value="Extra ₹500 Off on First Purchase">Extra ₹500 Off on First Purchase</option>
                    </Form.Select>
                  </Form.Group>
                  <div className="mt-2 d-flex gap-2 flex-wrap">
                    {editedProduct.offers.map((offer, idx) => (
                      <Badge key={idx} pill bg="info" className="position-relative">
                        {offer.title}
                        <X size={18} className="position-absolute bg-white rounded-circle p-1 text-danger shadow-sm"
                          style={{ right: '-10px', top: '-6px', cursor: 'pointer' }}
                          onClick={() => {
                            setEditedProduct(prev => ({
                              ...prev!,
                              offers: prev?.offers?.filter((_, i) => i !== idx) ?? []
                            }));
                          }}
                        />
                      </Badge>
                    ))}
                  </div>
                </Col>
              </Row>

              {/* --- Delivery Info --- */}

              <Row className="mb-3">
                <Col><h5>Delivery Info</h5></Col>

                <Col md={3}>
                  <Form.Label>Estimated Delivery</Form.Label>
                  <Form.Control
                    type="date"
                    name="estimatedDelivery"
                    value={editedProduct.deliveryInfo?.estimatedDelivery ?? ""}
                    onChange={(e) =>
                      setEditedProduct((prev) => ({
                        ...prev!,
                        deliveryInfo: { ...prev!.deliveryInfo, estimatedDelivery: e.target.value }
                      }))
                    }
                  />
                </Col>

                <Col md={3}>
                  <Form.Label>Delivery Charge</Form.Label>
                  <Form.Control
                    name="deliveryCharge"
                    value={editedProduct.deliveryInfo?.deliveryCharge ?? ""}
                    onChange={(e) =>
                      setEditedProduct((prev) => ({
                        ...prev!,
                        deliveryInfo: { ...prev!.deliveryInfo, deliveryCharge: e.target.value }
                      }))
                    }
                  />
                </Col>

                <Col md={3}>
                  <Form.Label>Shipped By</Form.Label>
                  <Form.Select
                    name="shippedBy"
                    value={editedProduct.deliveryInfo?.shippedBy ?? ""}
                    onChange={(e) =>
                      setEditedProduct((prev) => ({
                        ...prev!,
                        deliveryInfo: { ...prev!.deliveryInfo, shippedBy: e.target.value }
                      }))
                    }
                  >
                    <option>Amazon</option>
                    <option>Flipkart</option>
                  </Form.Select>
                </Col>

                <Col md={3}>
                  <Form.Label>Courier Partner</Form.Label>
                  <Form.Select
                    name="courierPartner"
                    value={editedProduct.deliveryInfo?.courierPartner ?? ""}
                    onChange={(e) =>
                      setEditedProduct((prev) => ({
                        ...prev!,
                        deliveryInfo: { ...prev!.deliveryInfo, courierPartner: e.target.value }
                      }))
                    }
                  >
                    <option>Delhivery</option>
                    <option>BlueDart</option>
                  </Form.Select>
                </Col>
              </Row>

              {/* --- Ratings --- */}

              <Row className="mb-3">
                <Col><h5>Ratings</h5></Col>

                <Col md={3}>
                  <Form.Label>Average Rating</Form.Label>
                  <Form.Control
                    type="number"
                    value={editedProduct.ratings?.averageRating ?? ""}
                    onChange={(e) =>
                      setEditedProduct((prev) => ({
                        ...prev!,
                        ratings: { ...prev!.ratings, averageRating: Number(e.target.value) }
                      }))
                    }
                  />
                </Col>

                <Col md={3}>
                  <Form.Label>Total Ratings</Form.Label>
                  <Form.Control
                    type="number"
                    value={editedProduct.ratings?.totalRatings ?? ""}
                    onChange={(e) =>
                      setEditedProduct((prev) => ({
                        ...prev!,
                        ratings: { ...prev!.ratings, totalRatings: Number(e.target.value) }
                      }))
                    }
                  />
                </Col>

                <Col md={3}>
                  <Form.Label>Total Reviews</Form.Label>
                  <Form.Control
                    type="number"
                    value={editedProduct.ratings?.totalReviews ?? ""}
                    onChange={(e) =>
                      setEditedProduct((prev) => ({
                        ...prev!,
                        ratings: { ...prev!.ratings, totalReviews: Number(e.target.value) }
                      }))
                    }
                  />
                </Col>
              </Row>

              {/* --- Specifications --- */}

              <Row className="mb-3">
                <Col>
                  <Form.Label><strong>Technical Specifications</strong></Form.Label>
                  <Table bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>TH (Label)</th>
                        <th>TD (Value)</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {editedProduct.specifications?.map((spec, index) => (
                        <tr key={index}>
                          <td>
                            <Form.Control
                              type="text"
                              value={spec.label}
                              onChange={(e) => {
                                const updated = [...editedProduct.specifications];
                                updated[index].label = e.target.value;
                                setEditedProduct((prev) => ({ ...prev!, specifications: updated }));
                              }}
                            />
                          </td>
                          <td>
                            <Form.Control
                              type="text"
                              value={spec.value}
                              onChange={(e) => {
                                const updated = [...editedProduct.specifications];
                                updated[index].value = e.target.value;
                                setEditedProduct((prev) => ({ ...prev!, specifications: updated }));
                              }}
                            />
                          </td>
                          <td>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => {
                                const updated = editedProduct.specifications?.filter((_, i) => i !== index);
                                setEditedProduct((prev) => ({ ...prev!, specifications: updated }));
                              }}
                            >
                              Remove
                            </Button>
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={3}>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() =>
                              setEditedProduct((prev) => ({
                                ...prev!,
                                specifications: [
                                  ...(prev?.specifications ?? []),
                                  { label: "", value: "" }
                                ]
                              }))
                            }
                          >
                            + Add Specification
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: PRIMARY_COLOR, border: "none" }} onClick={saveEditedProduct}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Productview;
