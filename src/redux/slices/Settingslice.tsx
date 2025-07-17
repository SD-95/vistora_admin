import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Role } from '../../utils/Role';

// 🔒 Define permission structure for each role
export type RolePermission = {
  canEditUsers: boolean;
  canDeleteOrders: boolean;
  canIssueRefunds: boolean;
  canViewReports: boolean;
  canChangeSettings: boolean;
  canManageProducts: boolean;
};

// ⚙️ Define the entire settings state
export interface SettingsState {
  permissions: Record<Role, RolePermission>;
  theme: 'light' | 'dark';
  language: string;
  notificationEnabled: boolean;
  autoUpdateEnabled: boolean;
  timezone: string;
  maintenanceMode: boolean;
}

// 🧱 Initial permissions for each role
const defaultPermissions: Record<Role, RolePermission> = {
  superadmin: {
    canEditUsers: true,
    canDeleteOrders: true,
    canIssueRefunds: true,
    canViewReports: true,
    canChangeSettings: true,
    canManageProducts: true,
  },
  admin: {
    canEditUsers: true,
    canDeleteOrders: true,
    canIssueRefunds: true,
    canViewReports: true,
    canChangeSettings: true,
    canManageProducts: true,
  },
  team: {
    canEditUsers: false,
    canDeleteOrders: false,
    canIssueRefunds: true,
    canViewReports: true,
    canChangeSettings: false,
    canManageProducts: true,
  },
  serviceexecutive: {
    canEditUsers: false,
    canDeleteOrders: false,
    canIssueRefunds: false,
    canViewReports: false,
    canChangeSettings: false,
    canManageProducts: false,
  },
};

// 🟢 Initial state
const initialState: SettingsState = {
  permissions: defaultPermissions,
  theme: 'light',
  language: 'en',
  notificationEnabled: true,
  autoUpdateEnabled: false,
  timezone: 'Asia/Kolkata',
  maintenanceMode: false,
};

// ⚙️ Create the settings slice
const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    // ✅ Update permissions for a specific role
    updatePermission(
      state,
      action: PayloadAction<{
        role: Role;
        permission: Partial<RolePermission>;
      }>
    ) {
      const { role, permission } = action.payload;
      state.permissions[role] = {
        ...state.permissions[role],
        ...permission,
      };
    },

    // ✅ Toggle dark/light theme
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.theme = action.payload;
    },

    // ✅ Change language
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },

    // ✅ Toggle notification setting
    toggleNotification(state) {
      state.notificationEnabled = !state.notificationEnabled;
    },

    // ✅ Toggle auto-update setting
    toggleAutoUpdate(state) {
      state.autoUpdateEnabled = !state.autoUpdateEnabled;
    },

    // ✅ Set timezone
    setTimezone(state, action: PayloadAction<string>) {
      state.timezone = action.payload;
    },

    // ✅ Enable or disable maintenance mode
    toggleMaintenanceMode(state) {
      state.maintenanceMode = !state.maintenanceMode;
    },

    // ✅ Reset all permissions for all roles
    resetPermissions(state) {
      state.permissions = defaultPermissions;
    },
  },
});

// 📤 Export actions and reducer
export const {
  updatePermission,
  setTheme,
  setLanguage,
  toggleNotification,
  toggleAutoUpdate,
  setTimezone,
  toggleMaintenanceMode,
  resetPermissions,
} = settingsSlice.actions;

export default settingsSlice.reducer;
