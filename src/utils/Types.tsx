// 📁 types.ts
import type { Role } from './Role';

// 🔹 Enums & Constants

export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'shipped'
  | 'intransit'
  | 'outfordelivery'
  | 'delivered';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type PaymentMethod = 'upi' | 'card' | 'netbanking' | 'wallet' | 'cod';
export type UserStatus = 'Active' | 'Inactive' | 'Blocked';

export const orderStatusVariant: Record<OrderStatus, string> = {
  placed: 'secondary',
  confirmed: 'info',
  shipped: 'primary', // renamed from shifted to shipped
  intransit: 'warning',
  outfordelivery: 'dark',
  delivered: 'success',
} as const;

export const paymentStatusVariant: Record<PaymentStatus, string> = {
  pending: 'warning',
  paid: 'success',
  failed: 'danger',
  refunded: 'secondary',
} as const;

export const userStatusVariant: Record<UserStatus, string> = {
  Active: 'success',
  Inactive: 'secondary',
  Blocked: 'danger',
} as const;

export const paymentHistoryStatusVariant: Record<'Success' | 'Failed' | 'Pending', string> = {
  Success: 'success',
  Failed: 'danger',
  Pending: 'warning',
} as const;

export const STOCK_STATUS = ['In Stock', 'Out of Stock', 'Limited Stock'] as const;
export type StockStatus = typeof STOCK_STATUS[number];

// 🔹 Shared Interfaces

export interface Address {
  line: string;
  city: string;
  state: string;
  country: string;
  zip_code: number;
}

export interface LoginSession {
  device: string;
  ip: string;
  login_time: string; // ISO string preferred
  location: string;
}

export interface Preferences {
  preferred_language: string;
  preferred_currency: string;
  interested_categories: string[];
  notification_opt_in: boolean;
}

export interface KycDetails {
  pan_number: string;
  aadhar_number: string;
  verified_on: string;
}

export interface LoyaltyDetails {
  points_earned: number;
  points_redeemed: number;
  points_available: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
}

export interface ReferralDetails {
  referral_code: string;
  total_referred: number;
  referral_bonus: number;
}

// 🔹 Core Entities

export interface UserProfile {
  id: string;
  name: string;
  profile_image: string;
  email: string;
  mobile: number;
  joined_date: string;
  last_active: string;
  status: UserStatus;
  kyc_verified: boolean;
  total_orders: number;
  address: Address;
  preferences: Preferences;
  kyc_details: KycDetails;
  loyalty: LoyaltyDetails;
  referral: ReferralDetails;
  login_sessions: LoginSession[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  color: string;
  size: string;
  stockLeft: number;
  rating: number;
  review_count: number;
  stockStatus: StockStatus;
}

export interface LiveTracking {
  order_placed: boolean;
  dispatched: boolean;
  in_transit: boolean;
  out_for_delivery: boolean;
  delivered: boolean;
  estimated_delivery: string;
  current_location: string;
}

export interface ReturnInfo {
  is_return_requested: boolean;
  return_reason: string;
  return_status: 'Under Review' | 'Approved' | 'Rejected' | 'Completed';
  requested_on: string;
  approved_on: string | null;
  refund_amount: number;
  refund_method: PaymentMethod;
  notes?: string;
}

export interface PaymentHistory {
  payment_id: string;
  date: string;
  amount: number;
  method: PaymentMethod;
  status: 'Success' | 'Failed' | 'Pending';
}

export interface SupportTicket {
  ticket_id: string;
  subject: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  created_on: string;
  last_updated: string;
}

export interface Review {
  rating: number;
  comment: string;
  reviewed_on: string;
}

export interface OrderDetails {
  ordered_username: string;
  ordered_email: string;
  order_id: string;
  date: string;
  product: Product;
  quantity: number;
  coupon_applied: string;
  order_status: OrderStatus;
  delivery_status: OrderStatus; // unified with OrderStatus
  payment_status: PaymentStatus;
  payment_source: PaymentMethod;
  shipping_address: Address;
  billing_address: Address;
  live_tracking: LiveTracking;
  return_info: ReturnInfo;
  payment_history: PaymentHistory[];
  support_tickets: SupportTicket[];
  review: Review;
  note?: string;
}

// 🔹 Marketing & Engagement

export interface Offer {
  offer_id: string;
  title: string;
  valid_till: string;
  applied: boolean;
}

export interface Coupon {
  coupon_code: string;
  discount_percent: number;
  applied_on: string;
  valid_till: string;
}

export interface WishlistItem {
  product_id: string;
  name: string;
  price: number;
  image: string;
}

export interface CartItem {
  product_id: string;
  name: string;
  qty: number;
  price: number;
  image: string;
}

export interface SavedAddress {
  type: 'Home' | 'Office' | 'Other';
  address: string;
  is_default: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  seen: boolean;
  date: string;
}

// 🔹 Web Product Catalog

export interface webProducttype {
  id: string;
  name: string;
  subtitle: string;
  images: string[];
  websitePrice: number;
  originalPrice: number;
  brand: string;
  sku: string;
  category: string;
  subcategory: string;
  type: string;
  stock: number;
  availability: StockStatus;
  color: string;
  size: string;
  warranty: string;
  dimensions: string;
  weight: string;
  material: string;
  batteryLife?: string;
  connectivity?: string;
  compatibility?: string[];
  manufacturingDate: string;
  expiryDate?: string;
  returnPolicy: string;
  features: string[];
  description: string;
  offers: {
    title: string;
    validTill: string;
  }[];
  deliveryInfo: {
    estimatedDelivery: string;
    deliveryCharge: string;
    shippedBy: string;
    courierPartner: string;
  };
  ratings: {
    averageRating: number;
    totalRatings: number;
    totalReviews: number;
  };
  specifications: {
    label: string;
    value: string;
  }[];
}

// 🔹 Root Customer Data Structure

export interface DummyCustomerData {
  user_profile: UserProfile;
  order_details: OrderDetails[];
  offers_applied: Offer[];
  coupon_info: Coupon[];
  wishlist: WishlistItem[];
  cart: CartItem[];
  saved_addresses: SavedAddress[];
  notifications: Notification[];
  webProducts: webProducttype[];
}

export type dummydatatype = DummyCustomerData[];

// 🔹 Analytics / Dashboard Interfaces

export interface ActivityItem {
  id: string;
  type: 'login' | 'purchase' | 'signup' | 'error';
  message: string;
  time: string;
}

export interface CustomerActivityFeedProps {
  role: Role;
  activities: ActivityItem[];
}

export interface CustomerDetailsModalProps {
  show: boolean;
  onHide: () => void;
  customer: DummyCustomerData | null;
  role: Role;
}

export interface CustomerListTableProps {
  customers: dummydatatype;
  role: Role;
  onBlockToggle: (customerId: string) => void;
}

export interface AggregatedProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  stockLeft: number;
  totalSold: number;
  stockStatus: StockStatus;
}
