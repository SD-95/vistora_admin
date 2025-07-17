import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { OrderDetails, UserProfile } from '../../utils/Types';

interface OrderState {
  orders: OrderDetails[];
  selectedOrder: OrderDetails | null;
  selectedCustomer: UserProfile | null;
}

const initialState: OrderState = {
  orders: [],
  selectedOrder: null,
  selectedCustomer: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<OrderDetails[]>) => {
      state.orders = action.payload;
    },
    addOrder: (state, action: PayloadAction<OrderDetails>) => {
      state.orders.push(action.payload);
    },
    updateOrder: (state, action: PayloadAction<OrderDetails>) => {
      const index = state.orders.findIndex(
        (order) => order.order_id === action.payload.order_id
      );
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
    deleteOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(
        (order) => order.order_id !== action.payload
      );
    },
    setSelectedOrder: (state, action: PayloadAction<OrderDetails | null>) => {
      state.selectedOrder = action.payload;
    },
    setSelectedCustomer: (state, action: PayloadAction<UserProfile | null>) => {
      state.selectedCustomer = action.payload;
    },

    setInvoiceData: (
      state,
      action: PayloadAction<{ order: OrderDetails; customer: UserProfile }>
    ) => {
      state.selectedOrder = action.payload.order;
      state.selectedCustomer = action.payload.customer;
    },
  },
});

export const {
  setOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  setSelectedOrder,
  setSelectedCustomer,
  setInvoiceData, // ✅ Exported here
} = orderSlice.actions;

export default orderSlice.reducer;
