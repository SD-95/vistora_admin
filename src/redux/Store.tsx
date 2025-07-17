import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/Authslice';
import userReducer from './slices/Userslice';
import customerReducer from './slices/Customerslice';
import orderReducer from './slices/Orderslice';
import productReducer from './slices/Productslice';
import settingReducer from './slices/Settingslice';



export const store = configureStore({
  reducer: {
    auth: authReducer,        // sign in/out, password management
    user: userReducer,        // role-based user info
    customer: customerReducer,// customer-related data
    product: productReducer,  // product & website info
    order: orderReducer,      // customer orders
    // support: supportReducer,  // ticket + chat
    setting: settingReducer,  // global settings
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
