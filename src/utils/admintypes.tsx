import type { Role } from "./Role";

export interface PermissionSet {
  full_access: boolean;
  can_manage_users: boolean;
  can_manage_orders: boolean;
  can_manage_products: boolean;
  can_manage_finances: boolean;
  can_manage_roles: boolean;
}

export interface ActivityLog {
  action: string;
  timestamp: string;
  ip: string;
}

export type ExtendedActivityLog = {
  action: string;
  timestamp: string;
  ip: string;
  userName: string;
  userId: string;
  userImage: string;
  role: string;
};

export interface SecuritySettings {
  two_factor_enabled: boolean;
  last_password_change: string;
  login_devices: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  mobile: string;
  profile_image: string;
  role: Role;
  joined_date: string;
  last_active: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  skills: string[];
  dashboard_access: 'admin' | 'service';
  permissions: PermissionSet;
  activity_logs: ActivityLog[];
  security: SecuritySettings;
  region: string;
  timezone: string;
  language: string;
}