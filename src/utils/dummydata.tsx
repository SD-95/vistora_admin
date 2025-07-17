import type { dummydatatype } from "./Types";
import profile from '../assets/images/profile/profile.jpg';
import item1 from '../assets/images/product/item1.jpg';
import item2 from '../assets/images/product/item2.jpg';
import item3 from '../assets/images/product/item3.jpg';
import item4 from '../assets/images/product/item4.jpg';
import item5 from '../assets/images/product/item5.jpg';
import chair1 from '../assets/images/product/chair1.jpg';
import chair2 from '../assets/images/product/chair2.jpg';
import chair3 from '../assets/images/product/chair3.jpg';
import chair4 from '../assets/images/product/chair4.jpg';
import chair5 from '../assets/images/product/chair5.jpg';

export const dummydata: dummydatatype = [
    {
        user_profile: {
            id: '1',
            name: 'Alice Johnson',
            profile_image: profile,
            email: 'alice@example.com',
            mobile: 9876543210,
            joined_date: '2024-03-21',
            last_active: '2024-06-25',
            status: 'Active',
            kyc_verified: true,
            total_orders: 12,
            address: {
                line: '123 Main Street',
                city: 'Mumbai',
                state: 'MH',
                country: 'India',
                zip_code: 400001,
            },
            preferences: {
                preferred_language: 'English',
                preferred_currency: 'INR',
                interested_categories: ['electronics', 'smart gadgets', 'fitness'],
                notification_opt_in: true,
            },
            kyc_details: {
                pan_number: 'ABCDE1234F',
                aadhar_number: '1234-5678-9012',
                verified_on: '2025-04-01',
            },
            loyalty: {
                points_earned: 520,
                points_redeemed: 200,
                points_available: 320,
                tier: 'Silver',
            },
            referral: {
                referral_code: 'ALICE100',
                total_referred: 3,
                referral_bonus: 300,
            },
            login_sessions: [
                {
                    device: 'Chrome on Windows',
                    ip: '103.21.244.0',
                    login_time: '2025-06-25 09:14',
                    location: 'Mumbai, India',
                },
                {
                    device: 'iOS App',
                    ip: '103.24.11.88',
                    login_time: '2025-06-24 20:05',
                    location: 'Mumbai, India',
                },
            ],
        },
        order_details: [
            {
                ordered_username: 'Alice Johnson',
                order_id: 'VISTR_OR_ID_001',
                ordered_email: 'alice@example.com',
                date: '2025-06-20',
                product: {
                    id: 'PROD_001',
                    name: 'Smart Watch Series 9',
                    price: 149,
                    category: 'Wearables',
                    image: item1,
                    color: 'Midnight Black',
                    size: 'Standard',
                    stockLeft: 15,
                    rating: 4.5,
                    review_count: 142,
                    stockStatus: 'In Stock',
                },
                quantity: 1,
                coupon_applied: 'NEWUSER10',
                order_status: 'confirmed',
                delivery_status: 'intransit',
                payment_status: 'paid',
                payment_source: 'upi',
                shipping_address: {
                    line: '123 Main Street',
                    city: 'Mumbai',
                    state: 'MH',
                    country: 'India',
                    zip_code: 700001,
                },
                billing_address: {
                    line: '123 Main Street',
                    city: 'Mumbai',
                    state: 'MH',
                    country: 'India',
                    zip_code: 700001,
                },
                live_tracking: {
                    order_placed: true,
                    dispatched: true,
                    in_transit: true,
                    out_for_delivery: false,
                    delivered: false,
                    estimated_delivery: '2025-06-30',
                    current_location: 'Delhi Hub',
                },
                return_info: {
                    is_return_requested: true,
                    return_reason: 'Defective product',
                    return_status: 'Under Review',
                    requested_on: '2025-06-25',
                    approved_on: null,
                    refund_amount: 149,
                    refund_method: 'upi',
                },
                payment_history: [
                    {
                        payment_id: 'PAY12345',
                        date: '2025-06-20',
                        amount: 149,
                        method: 'upi',
                        status: 'Success',
                    },
                ],
                support_tickets: [
                    {
                        ticket_id: 'SUPP001',
                        subject: 'Need help with return',
                        status: 'Open',
                        created_on: '2025-06-25',
                        last_updated: '2025-06-26',
                    },
                ],
                review: {
                    rating: 5,
                    comment: 'Excellent product!',
                    reviewed_on: '2025-06-22',
                },
            },
        ],
        offers_applied: [
            {
                offer_id: 'OFFER001',
                title: '10% off on UPI Payments',
                valid_till: '2025-07-01',
                applied: true,
            },
            {
                offer_id: 'OFFER002',
                title: 'Free Shipping over ₹500',
                valid_till: '2025-12-31',
                applied: false,
            },
        ],
        coupon_info: [
            {
                coupon_code: 'NEWUSER10',
                discount_percent: 10,
                applied_on: '2025-06-20',
                valid_till: '2025-06-30',
            },
        ],
        wishlist: [
            {
                product_id: 'PROD_099',
                name: 'Wireless Earbuds Pro',
                price: 89,
                image: item1,
            },
        ],
        cart: [
            {
                product_id: 'PROD_105',
                name: 'Bluetooth Speaker',
                qty: 1,
                price: 59,
                image: item1,
            },
        ],
        saved_addresses: [
            {
                type: 'Home',
                address: '123 Main Street, Mumbai, MH, India - 400001',
                is_default: true,
            },
            {
                type: 'Office',
                address: '456 Tech Park, Navi Mumbai, MH, India - 400706',
                is_default: false,
            },
        ],
        notifications: [
            {
                id: 'NT001',
                title: 'Order Shipped',
                message: 'Your order VISTR_OR_ID_001 has been shipped.',
                seen: false,
                date: '2025-06-26',
            },
        ],
        webProducts: [
            {
                id: 'PROD_001',
                name: 'ErgoComfort Mesh Office Chair',
                subtitle: 'High-back ergonomic chair with lumbar support',
                images: [chair1, chair2, chair3, chair4, chair5],
                websitePrice: 6499,
                originalPrice: 8999,
                brand: 'ComfortEase',
                sku: 'CE-ERG-OC-2025',
                category: 'Furniture',
                subcategory: 'Office Chairs',
                type: 'Home & Living',
                stock: 35,
                availability: 'In Stock',
                color: 'Black',
                size: 'Standard',
                warranty: '1 Year Manufacturer Warranty',
                dimensions: '48 x 60 x 110 cm',
                weight: '15.5 kg',
                material: 'Mesh, Plastic, Metal Frame',
                batteryLife: '',
                connectivity: '',
                compatibility: [],
                manufacturingDate: '2025-01-13',
                expiryDate: '-',
                returnPolicy: '10 Days Replacement Only',
                features: [
                    'Adjustable armrests and headrest',
                    'Breathable mesh backrest',
                    '360° swivel mechanism',
                    'Heavy-duty metal base',
                    'Tilt lock function',
                ],
                description:
                    'ErgoComfort Mesh Office Chair is designed to provide optimal comfort and support during long working hours. Its adjustable features ensure a personalized seating experience, while the breathable mesh back keeps you cool. Perfect for professionals seeking style and support in their workspaces.',
                offers: [
                    { title: '10% Instant Discount on Credit Cards', validTill: '2025-07-31' },
                    { title: 'No Cost EMI Available', validTill: '2025-12-31' },
                    { title: 'Extra ₹500 Off on First Purchase', validTill: '2025-08-15' },
                ],
                deliveryInfo: {
                    estimatedDelivery: '2025-07-18',
                    deliveryCharge: 'Free',
                    shippedBy: 'ComfortEase Warehouse',
                    courierPartner: 'Delhivery Express',
                },
                ratings: {
                    averageRating: 4.3,
                    totalRatings: 314,
                    totalReviews: 121,
                },
                specifications: [
                    { label: 'Seat Material', value: 'High-density Foam' },
                    { label: 'Adjustability', value: 'Height, Armrest, Headrest, Recline' },
                    { label: 'Frame Material', value: 'Alloy Steel' },
                    { label: 'Caster Type', value: 'Smooth PU Wheels' },
                    { label: 'Weight Capacity', value: '120 kg' },
                ],
            },
            {
                id: 'PROD_002',
                name: 'SmartPulse Pro Watch',
                subtitle: 'Advanced fitness and lifestyle smartwatch with AMOLED display',
                images: [item1, item2, item3, item4, item5],
                websitePrice: 7499,
                originalPrice: 9999,
                brand: 'TechNova',
                sku: 'TN-SPW-ALPHA-2025',
                category: 'Electronics',
                subcategory: 'Smart Watches',
                type: 'Wearable Tech',
                stock: 58,
                availability: 'In Stock',
                color: 'Midnight Black',
                size: 'Universal Fit',
                warranty: '1 Year Manufacturer Warranty',
                dimensions: '4.5 x 3.8 x 1.1 cm',
                weight: '42 g',
                material: 'Aluminum, Silicone, Gorilla Glass',
                batteryLife: 'Up to 10 Days',
                connectivity: 'Bluetooth 5.3, Wi-Fi',
                compatibility: ['Android 8.0+', 'iOS 12+'],
                manufacturingDate: '2025-05-22',
                expiryDate: '-',
                returnPolicy: '7 Days Return or Replacement',
                features: [
                    '1.78" AMOLED always-on display',
                    'Heart rate, SpO2, and sleep monitoring',
                    'Built-in GPS and voice assistant',
                    '100+ sports modes with auto detection',
                    'IP68 water resistance',
                ],
                description:
                    'SmartPulse Pro Watch is your perfect companion for fitness, lifestyle, and productivity. Featuring an ultra-clear AMOLED display and packed with health and activity tracking features, it keeps you connected and in control wherever you go. Sleek, lightweight, and powerful—tailored for modern living.',
                offers: [
                    { title: '₹1000 Cashback on Select UPI Payments', validTill: '2025-08-31' },
                    { title: 'Free Strap Set on Prepaid Orders', validTill: '2025-07-30' },
                    { title: 'No Cost EMI on Debit & Credit Cards', validTill: '2025-12-31' },
                ],
                deliveryInfo: {
                    estimatedDelivery: '2025-07-17',
                    deliveryCharge: 'Free',
                    shippedBy: 'TechNova Fulfillment Center',
                    courierPartner: 'Blue Dart Priority',
                },
                ratings: {
                    averageRating: 4.5,
                    totalRatings: 912,
                    totalReviews: 348,
                },
                specifications: [
                    { label: 'Display Type', value: 'AMOLED, Always-on' },
                    { label: 'Battery Backup', value: 'Up to 10 Days' },
                    { label: 'Sensors', value: 'Heart Rate, SpO2, Accelerometer, Gyroscope' },
                    { label: 'Water Resistance', value: 'IP68 Rated' },
                    { label: 'Processor', value: 'Dual-core 1.2GHz' },
                ],
            }
        ]
    }
];
