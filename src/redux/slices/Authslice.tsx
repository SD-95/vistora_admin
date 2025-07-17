// src/redux/slices/authSlice.ts

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, UserRole } from '../../types/Authtypes';

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  userEmail: null,
  role: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(
      state,
      action: PayloadAction<{
        token: string;
        userEmail: string;
        role: UserRole;
      }>
    ) {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userEmail = action.payload.userEmail;
      state.role = action.payload.role;

      // Persist to localStorage
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userEmail', action.payload.userEmail);
      localStorage.setItem('role', `${action.payload.role}`);
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.userEmail = null;
      state.role = null;
      state.loading = false;
      state.error = null;

      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('role');
    },
    forgotPassword(state) {
      state.loading = true;
      state.error = null;
    },
    resetPassword(state) {
      state.loading = false;
    },

    // OPTIONAL: load from localStorage
    initializeAuth(state) {
      const token = localStorage.getItem('token');
      const userEmail = localStorage.getItem('userEmail');
      const role = localStorage.getItem('role') as UserRole | null;

      if (token && userEmail && role) {
        state.isAuthenticated = true;
        state.token = token;
        state.userEmail = userEmail;
        state.role = role;
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  forgotPassword,
  resetPassword,
  initializeAuth,
} = authSlice.actions;

export default authSlice.reducer;
