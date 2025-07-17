import { useState, type ChangeEvent, useRef, useEffect } from "react";
import { Container, Card, Table, Form, InputGroup, Row, Col, Badge, Image, Pagination, Modal, Button, ListGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Plus, X } from "lucide-react";
import Swal from 'sweetalert2';
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoCloseCircleSharp } from "react-icons/io5";
import { RiPlayListAddFill } from "react-icons/ri";
import type { webProducttype } from "../../utils/Types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addProduct, deleteProduct, initializeProducts } from "../../redux/slices/Productslice";

import no_data from '../../assets/images/product/No_data.jpg'
import { dummydata } from "../../utils/dummydata";

const PRIMARY_COLOR = "#ff6f61";

const initialProduct: webProducttype = {
    id: "",
    name: "",
    subtitle: "",
    images: [],
    websitePrice: 0,
    originalPrice: 0,
    brand: "",
    sku: "",
    category: "",
    subcategory: "",
    type: "",
    stock: 0,
    availability: "In Stock",
    color: "",
    size: "",
    warranty: "",
    dimensions: "",
    weight: "",
    material: "",
    batteryLife: "",
    connectivity: "",
    compatibility: [],
    manufacturingDate: "",
    expiryDate: "",
    returnPolicy: "",
    features: [],
    description: "",
    offers: [],
    deliveryInfo: {
        estimatedDelivery: "",
        deliveryCharge: "",
        shippedBy: "",
        courierPartner: "",
    },
    ratings: {
        averageRating: 0,
        totalRatings: 0,
        totalReviews: 0,
    },
    specifications: [],
};
const Productlist = () => {
    const [search, setSearch] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [product, setProduct] = useState<webProducttype>({ ...initialProduct });
    const [newFeature, setNewFeature] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectMode, setSelectMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.product.webProducts);

    useEffect(() => {
        if (products.length === 0) {
            const defaultProducts = dummydata[0]?.webProducts?.slice(0, 2) ?? [];
            dispatch(initializeProducts(defaultProducts));
        }
    }, []);

    const filteredProducts = products.filter((p) =>
        Object.values(p).some((val) =>
            typeof val === "string" || typeof val === "number"
                ? val.toString().toLowerCase().includes(search.toLowerCase())
                : false
        )
    );

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        const newImages = Array.from(files)
            .slice(0, 5 - product.images.length)
            .map((file) => URL.createObjectURL(file));
        setProduct((prev) => ({ ...prev, images: [...prev.images, ...newImages] }));
    };

    const handleRemoveImage = (index: number) => {
        const updatedImages = [...product.images];
        updatedImages.splice(index, 1);
        setProduct((prev) => ({ ...prev, images: updatedImages }));
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddFeature = () => {
        if (newFeature.trim()) {
            setProduct((prev) => ({
                ...prev,
                features: [...prev.features, newFeature.trim()],
            }));
            setNewFeature("");
        }
    };

    const handleRemoveFeature = (index: number) => {
        const updated = [...product.features];
        updated.splice(index, 1);
        setProduct((prev) => ({ ...prev, features: updated }));
    };

    const handleSaveProduct = () => {
        if (!product.id || !product.name) {
            alert("Product ID and Name are required.");
            return;
        }

        dispatch(addProduct(product));
        setShowAddModal(false);
        setProduct({ ...initialProduct });
        setNewFeature("");
    };

    const generateProductId = (products: webProducttype[]): string => {
        const existingIds = products
            .map(p => p.id)
            .filter(id => /^PROD_\d+$/.test(id)) // only match IDs like PROD_001
            .map(id => parseInt(id.split('_')[1])) // extract the numeric part
            .sort((a, b) => a - b);

        let nextIdNum = 1;
        for (const num of existingIds) {
            if (num === nextIdNum) {
                nextIdNum++;
            } else {
                break;
            }
        }

        return `PROD_${String(nextIdNum).padStart(3, '0')}`;
    };

    const toggleSelectMode = () => {
        setSelectMode(prev => !prev);
        setSelectedIds([]); // Reset selection
    };

    const handleSelectOne = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedIds.length === filteredProducts.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredProducts.map(p => p.id));
        }
    };

    const handleDeleteSelected = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                selectedIds.forEach(id => {
                    dispatch(deleteProduct(id));
                });
                Swal.fire('Deleted!', 'Selected products have been deleted.', 'success');
                setSelectedIds([]);
                setSelectMode(false);
            }
        });
    };

    return (
        <Container fluid className="py-4 px-3">
            <Card className="shadow p-4" style={{ borderRadius: "20px" }}>
                <Row className="align-items-center justify-content-between mb-3 gy-2">
                    <Col xs={12} md="auto" className="d-flex align-items-center gap-3 flex-wrap">
                        <h4 className="mb-0">Product List</h4>
                        <Button
                            size="sm"
                            className="text-white px-3 border-0"
                            style={{ backgroundColor: PRIMARY_COLOR }}
                            onClick={() => {
                                const nextId = generateProductId(products);
                                setProduct({ ...initialProduct, id: nextId });
                                setShowAddModal(true);
                            }}
                        >
                            + Add Product
                        </Button>
                    </Col>

                    {/* Your new delete + search layout here */}
                    <Col xs={12} md={6} lg={4} className="d-flex align-items-center gap-2">
                        <Button size="sm"
                            variant="danger"
                            className="flex-shrink-0"
                            onClick={toggleSelectMode}
                            title={selectMode ? "Cancel Selection" : "Select Items to Delete"}
                        >
                            {selectMode ? <IoCloseCircleSharp /> : <RiDeleteBin5Line />}
                        </Button>

                        <Form.Control
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Col>
                </Row>
                {filteredProducts.length === 0 ? (
                    <div className="text-center mt-4">
                        <img
                            src={no_data}
                            alt="No products found"
                            style={{ maxWidth: "300px", width: "100%", marginBottom: "1rem" }}
                        />
                        <p className="text-muted">No products found.</p>
                    </div>
                ) : (
                    <>
                        {selectMode && selectedIds.length > 0 && (
                            <div className="d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded shadow-sm border">
                                <span className="fw-semibold">{selectedIds.length} item(s) selected</span>
                                <Button variant="danger" onClick={handleDeleteSelected}>
                                    <RiDeleteBin5Line className="me-2" />
                                    Delete Selected
                                </Button>
                            </div>
                        )}
                        <Table responsive hover bordered className="align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>
                                        {selectMode && (
                                            <Form.Check
                                                type="checkbox"
                                                checked={selectedIds.length === filteredProducts.length}
                                                onChange={handleSelectAll}
                                            />
                                        )}
                                        {!selectMode && "#"}
                                    </th>
                                    <th>Product ID</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Subcategory</th>
                                    <th>Type</th>
                                    <th>Stock Qty</th>
                                    <th>Status</th>
                                    <th>Size</th>
                                    <th>Brand</th>
                                    <th>MFGD</th>
                                    <th>EXPD</th>
                                    <th>Return Policy</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((p, index) => (
                                    <tr
                                        key={p.id}
                                        className={selectMode && selectedIds.includes(p.id) ? "table-active" : ""}
                                        style={selectMode && selectedIds.includes(p.id) ? { filter: "blur(5px)" } : {}}
                                    >
                                        <td>
                                            {selectMode ? (
                                                <Form.Check
                                                    type="checkbox"
                                                    checked={selectedIds.includes(p.id)}
                                                    onChange={() => handleSelectOne(p.id)}
                                                />
                                            ) : (
                                                index + 1
                                            )}
                                        </td>
                                        <td>
                                            <Link to={`/pages/products/Productview/${p.id}`} style={{ color: PRIMARY_COLOR, textDecoration: "underline" }}>
                                                {p.id}
                                            </Link>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center gap-2">
                                                <Image src={p.images[0]} rounded style={{ width: 48, height: 48 }} />
                                                <span>{p.name}</span>
                                            </div>
                                        </td>
                                        <td>{p.category}</td>
                                        <td>{p.subcategory}</td>
                                        <td>{p.type}</td>
                                        <td>{p.stock}</td>
                                        <td>
                                            <Badge bg={p.availability === "In Stock" ? "success" : "danger"}>
                                                {p.availability}
                                            </Badge>
                                        </td>
                                        <td>{p.size}</td>
                                        <td>{p.brand}</td>
                                        <td>{p.manufacturingDate}</td>
                                        <td>{p.expiryDate || "N/A"}</td>
                                        <td>{p.returnPolicy}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                )}
                <div className="d-flex justify-content-end mt-1">
                    <Pagination className="custom-pagination">
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item active>1</Pagination.Item>
                        <Pagination.Item>2</Pagination.Item>
                        <Pagination.Item>3</Pagination.Item>
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>
                </div>
            </Card>

            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="xl" centered scrollable>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-4">
                        <Form.Label><strong>Product Images (max 5)</strong></Form.Label>
                        <div className="d-flex flex-wrap gap-3">
                            {product.images.length < 5 && (
                                <div onClick={() => fileInputRef.current?.click()} className="d-flex justify-content-center align-items-center border rounded-circle"
                                    style={{ width: 100, height: 100, cursor: "pointer", backgroundColor: "#f8f9fa", position: "relative" }} >
                                    <Plus size={32} color={PRIMARY_COLOR} />
                                    <Form.Control type="file" ref={fileInputRef} accept="image/*" multiple style={{ display: "none" }} onChange={handleImageUpload} />
                                </div>
                            )}
                            {product.images.map((img, idx) => (
                                <div key={idx} style={{ position: "relative" }}>
                                    <Image src={img} roundedCircle style={{ width: 100, height: 100, objectFit: "cover", border: "2px solid #dee2e6" }} />
                                    <div
                                        onClick={() => handleRemoveImage(idx)}
                                        style={{ position: "absolute", top: -6, right: -6, backgroundColor: "white", borderRadius: "50%", boxShadow: "0 0 6px rgba(0,0,0,0.15)", cursor: "pointer" }} >
                                        <X size={16} className="text-danger m-1" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Row>
                        <Col md={3}><Form.Group className="mb-3"><Form.Label>Product ID</Form.Label><Form.Control name="id" value={product.id} readOnly /></Form.Group></Col>
                        <Col md={3}><Form.Group className="mb-3"><Form.Label>Name</Form.Label><Form.Control name="name" value={product.name} onChange={handleChange} /></Form.Group></Col>
                        <Col md={3}><Form.Group className="mb-3"><Form.Label>Subtitle</Form.Label><Form.Control name="subtitle" value={product.subtitle} onChange={handleChange} /></Form.Group></Col>
                        <Col md={3}><Form.Group className="mb-3"><Form.Label>Website Price</Form.Label><Form.Control type="number" name="websitePrice" value={product.websitePrice} onChange={handleChange} /></Form.Group></Col>
                        <Col md={3}><Form.Group className="mb-3"><Form.Label>Original Price</Form.Label><Form.Control type="number" name="originalPrice" value={product.originalPrice} onChange={handleChange} /></Form.Group></Col>
                        <Col md={3}><Form.Group className="mb-3"><Form.Label>Brand</Form.Label><Form.Control name="brand" value={product.brand} onChange={handleChange} /></Form.Group></Col>
                        <Col md={3}><Form.Group className="mb-3"><Form.Label>SKU</Form.Label><Form.Control name="sku" value={product.sku} onChange={handleChange} /></Form.Group></Col>
                        <Col md={3}><Form.Group className="mb-3"><Form.Label>Category</Form.Label><Form.Select name="category" value={product.category} onChange={handleChange}><option>Select Category</option><option>Electronics</option><option>Apparel</option></Form.Select></Form.Group></Col>
                        <Col md={3}><Form.Group className="mb-3"><Form.Label>Subcategory</Form.Label><Form.Select name="subcategory" value={product.subcategory} onChange={handleChange}><option>Select Subcategory</option><option>Phones</option><option>Shirts</option></Form.Select></Form.Group></Col>
                        <Col md={3}><Form.Group className="mb-3"><Form.Label>Type</Form.Label><Form.Select name="type" value={product.type} onChange={handleChange}><option>Select Type</option><option>New</option><option>Refurbished</option></Form.Select></Form.Group></Col>
                        <Col md={3}><Form.Group className="mb-3"><Form.Label>Stock</Form.Label><Form.Control type="number" name="stock" value={product.stock} onChange={handleChange} /></Form.Group></Col>
                        <Col md={3}><Form.Group className="mb-3"><Form.Label>Availability</Form.Label><Form.Select name="availability" value={product.availability} onChange={handleChange}><option>In Stock</option><option>Out of Stock</option></Form.Select></Form.Group></Col>
                        <Col md={3}><Form.Group className="mb-3"><Form.Label>Color</Form.Label><Form.Select name="color" value={product.color} onChange={handleChange}><option>Black</option><option>White</option><option>Red</option></Form.Select></Form.Group></Col>
                        <Col md={3}><Form.Group className="mb-3"><Form.Label>Size</Form.Label><Form.Control name="size" value={product.size} onChange={handleChange} /></Form.Group></Col>
                        <Col md={3}><Form.Group className="mb-3"><Form.Label>Warranty</Form.Label><Form.Select name="warranty" value={product.warranty} onChange={handleChange}><option>6 Months</option><option>1 Year</option><option>2 Years</option></Form.Select></Form.Group></Col>
                        <Col md={3}><Form.Group className="mb-3"><Form.Label>Dimensions</Form.Label><Form.Control name="dimensions" value={product.dimensions} onChange={handleChange} /></Form.Group></Col>
                        <Col md={3}><Form.Group className="mb-3"><Form.Label>Weight</Form.Label><Form.Control name="weight" value={product.weight} onChange={handleChange} /></Form.Group></Col>
                        <Col md={3}><Form.Group className="mb-3"><Form.Label>Material</Form.Label><Form.Control name="material" value={product.material} onChange={handleChange} /></Form.Group></Col>
                        <Col md={3}><Form.Group className="mb-3"><Form.Label>Battery Life</Form.Label><Form.Control name="batteryLife" value={product.batteryLife} onChange={handleChange} /></Form.Group></Col>
                        <Col md={3}><Form.Group className="mb-3"><Form.Label>Connectivity</Form.Label><Form.Control name="connectivity" value={product.connectivity} onChange={handleChange} /></Form.Group></Col>
                        <Col md={3}><Form.Group className="mb-3"><Form.Label>Manufacturing Date</Form.Label><Form.Control type="date" name="manufacturingDate" value={product.manufacturingDate} onChange={handleChange} /></Form.Group></Col>
                        <Col md={3}><Form.Group className="mb-3"><Form.Label>Expiry Date</Form.Label><Form.Control type="date" name="expiryDate" value={product.expiryDate} onChange={handleChange} /></Form.Group></Col>
                        <Col md={3}><Form.Group className="mb-3"><Form.Label>Return Policy</Form.Label><Form.Control type="text" name="returnPolicy" value={product.returnPolicy} onChange={handleChange} /></Form.Group></Col>
                    </Row>

                    {/* --- Features --- */}
                    <Row>
                        <Col md={6}>
                            <Form.Label><strong>Key Features</strong></Form.Label>
                            <ListGroup className="mb-3">
                                {product.features.map((feature, index) => (
                                    <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                        {feature}
                                        <Button variant="outline-danger" size="sm" onClick={() => handleRemoveFeature(index)}>x</Button>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <InputGroup className="mb-3">
                                <Form.Control placeholder="Add a new feature" value={newFeature} onChange={(e) => setNewFeature(e.target.value)} />
                                <Button onClick={handleAddFeature}>Add</Button>
                            </InputGroup>
                        </Col>

                        {/* --- Description --- */}
                        <Col md={6}>
                            <Form.Label><strong>Description</strong></Form.Label>
                            <Form.Control as="textarea" rows={6} name="description" value={product.description} onChange={handleChange} />
                        </Col>
                    </Row>

                    {/* --- Compatibility (Badges Input) --- */}
                    <Row className="mb-3">
                        <Col>
                            <Form.Label><strong>Compatibility</strong></Form.Label>
                            <InputGroup>
                                <Form.Control placeholder="Enter compatibility and press Enter" onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        const value = e.currentTarget.value.trim();
                                        if (value && !(product.compatibility ?? []).includes(value)) {
                                            setProduct(prev => ({
                                                ...prev,
                                                compatibility: [...(prev.compatibility ?? []), value]
                                            }));
                                            e.currentTarget.value = '';
                                        }
                                    }
                                }} />
                            </InputGroup>
                            <div className="mt-2 d-flex gap-2 flex-wrap">
                                {(product.compatibility ?? []).map((item, idx) => (
                                    <Badge key={idx} pill bg="secondary" className="position-relative me-2">
                                        <span >{item}</span>
                                        <X
                                            size={18}
                                            className="position-absolute bg-white rounded-circle p-1 text-danger shadow-sm"
                                            style={{ right: '-10px', top: '-6px', cursor: 'pointer' }}
                                            onClick={() => {
                                                setProduct(prev => ({
                                                    ...prev,
                                                    compatibility: (prev.compatibility ?? []).filter((_, i) => i !== idx)
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
                                <Form.Select
                                    name="offers"
                                    onChange={(e) => {
                                        const selected = e.target.value;
                                        const offerMap: Record<string, { title: string; validTill: string }> = {
                                            '10% Instant Discount on Credit Cards': {
                                                title: '10% Instant Discount on Credit Cards',
                                                validTill: '2025-07-31',
                                            },
                                            'No Cost EMI Available': {
                                                title: 'No Cost EMI Available',
                                                validTill: '2025-12-31',
                                            },
                                            'Extra ₹500 Off on First Purchase': {
                                                title: 'Extra ₹500 Off on First Purchase',
                                                validTill: '2025-08-15',
                                            },
                                        };

                                        const offerObj = offerMap[selected];
                                        if (
                                            offerObj &&
                                            !product.offers.some((o) => o.title === offerObj.title)
                                        ) {
                                            setProduct((prev) => ({
                                                ...prev,
                                                offers: [...(prev.offers ?? []), offerObj],
                                            }));
                                        }
                                    }}
                                >
                                    <option value="">Select Offer</option>
                                    <option value="10% Instant Discount on Credit Cards">10% Instant Discount on Credit Cards</option>
                                    <option value="No Cost EMI Available">No Cost EMI Available</option>
                                    <option value="Extra ₹500 Off on First Purchase">Extra ₹500 Off on First Purchase</option>
                                </Form.Select>
                            </Form.Group>
                            <div className="mt-2 d-flex gap-2 flex-wrap">
                                {product.offers.map((offer, idx) => (
                                    <Badge key={idx} pill bg="info" className="position-relative">
                                        {offer.title}
                                        <X
                                            size={18}
                                            className="position-absolute bg-white rounded-circle p-1 text-danger shadow-sm"
                                            style={{ right: '-10px', top: '-6px', cursor: 'pointer' }}
                                            onClick={() => {
                                                setProduct((prev) => ({
                                                    ...prev,
                                                    offers: prev.offers.filter((_, i) => i !== idx),
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
                        <Col md={3}><Form.Label>Estimated Delivery</Form.Label><Form.Control type="date" name="estimatedDelivery" value={product.deliveryInfo.estimatedDelivery} onChange={(e) => setProduct(prev => ({ ...prev, deliveryInfo: { ...prev.deliveryInfo, estimatedDelivery: e.target.value } }))} /></Col>
                        <Col md={3}><Form.Label>Delivery Charge</Form.Label><Form.Control name="deliveryCharge" value={product.deliveryInfo.deliveryCharge} onChange={(e) => setProduct(prev => ({ ...prev, deliveryInfo: { ...prev.deliveryInfo, deliveryCharge: e.target.value } }))} /></Col>
                        <Col md={3}><Form.Label>Shipped By</Form.Label><Form.Select name="shippedBy" value={product.deliveryInfo.shippedBy} onChange={(e) => setProduct(prev => ({ ...prev, deliveryInfo: { ...prev.deliveryInfo, shippedBy: e.target.value } }))}><option>Amazon</option><option>Flipkart</option></Form.Select></Col>
                        <Col md={3}><Form.Label>Courier Partner</Form.Label><Form.Select name="courierPartner" value={product.deliveryInfo.courierPartner} onChange={(e) => setProduct(prev => ({ ...prev, deliveryInfo: { ...prev.deliveryInfo, courierPartner: e.target.value } }))}><option>Delhivery</option><option>BlueDart</option></Form.Select></Col>
                    </Row>

                    {/* --- Ratings --- */}
                    <Row className="mb-3">
                        <Col><h5>Ratings:</h5></Col>
                        <Col md={3}><Form.Label>Average Rating</Form.Label><Form.Control type="number" name="averageRating" value={product.ratings.averageRating} onChange={(e) => setProduct(prev => ({ ...prev, ratings: { ...prev.ratings, averageRating: Number(e.target.value) } }))} /></Col>
                        <Col md={3}><Form.Label>Total Ratings</Form.Label><Form.Control type="number" name="totalRatings" value={product.ratings.totalRatings} onChange={(e) => setProduct(prev => ({ ...prev, ratings: { ...prev.ratings, totalRatings: Number(e.target.value) } }))} /></Col>
                        <Col md={3}><Form.Label>Total Reviews</Form.Label><Form.Control type="number" name="totalReviews" value={product.ratings.totalReviews} onChange={(e) => setProduct(prev => ({ ...prev, ratings: { ...prev.ratings, totalReviews: Number(e.target.value) } }))} /></Col>
                    </Row>

                    {/* --- Specifications --- */}
                    <Row className="mt-4">
                        <Col>
                            <Row className="align-items-center mb-2">
                                <Col xs={12} md={6}>
                                    <Form.Label><strong>Technical Specifications</strong></Form.Label>
                                </Col>
                                <Col xs={12} md={6} className="text-md-end mt-2 mt-md-0">
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="add-spec-tooltip">Add Specification</Tooltip>}
                                    >
                                        <Button
                                            variant=""
                                            size="sm"
                                            onClick={() => {
                                                setProduct((prev) => ({
                                                    ...prev,
                                                    specifications: [...(prev.specifications ?? []), { label: "", value: "" }],
                                                }));
                                            }}
                                        >
                                            <RiPlayListAddFill />
                                        </Button>
                                    </OverlayTrigger>
                                </Col>
                            </Row>
                            <Table bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Label</th>
                                        <th>Value</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product.specifications.map((spec, idx) => (
                                        <tr key={idx}>
                                            <td>
                                                <Form.Control
                                                    type="text"
                                                    value={spec.label}
                                                    onChange={(e) => {
                                                        const updated = [...product.specifications];
                                                        updated[idx].label = e.target.value;
                                                        setProduct((prev) => ({ ...prev, specifications: updated }));
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Form.Control
                                                    type="text"
                                                    value={spec.value}
                                                    onChange={(e) => {
                                                        const updated = [...product.specifications];
                                                        updated[idx].value = e.target.value;
                                                        setProduct((prev) => ({ ...prev, specifications: updated }));
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => {
                                                        const updated = product.specifications.filter((_, i) => i !== idx);
                                                        setProduct((prev) => ({ ...prev, specifications: updated }));
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleSaveProduct} style={{ backgroundColor: PRIMARY_COLOR, border: "none" }}>Save Product</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default Productlist;