import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { dummydata } from '../../utils/dummydata';
import type { CustomerState } from '../../types/Customertypes';
import type { DummyCustomerData, dummydatatype } from '../../utils/Types';


const initialState: CustomerState = {
  customers: dummydata,
  selectedCustomer: null,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomers(state, action: PayloadAction<dummydatatype>) {
      state.customers = action.payload;
    },
    addCustomer(state, action: PayloadAction<DummyCustomerData>) {
      state.customers.push(action.payload);
    },
    updateCustomer(state, action: PayloadAction<DummyCustomerData>) {
      const index = state.customers.findIndex(c => c.user_profile.id === action.payload.user_profile.id);
      if (index !== -1) {
        state.customers[index] = action.payload;
      }
    },
    deleteCustomer(state, action: PayloadAction<string>) {
      state.customers = state.customers.filter(c => c.user_profile.id !== action.payload);
    },
    setSelectedCustomer(state, action: PayloadAction<DummyCustomerData | null>) {
      state.selectedCustomer = action.payload;
    },
    toggleCustomerBlockStatus(state, action: PayloadAction<string>) {
      const customer = state.customers.find(c => c.user_profile.id === action.payload);
      if (customer) {
        customer.user_profile.status =
          customer.user_profile.status === 'Blocked' ? 'Active' : 'Blocked';
      }
    },
  },
});

export const {
  setCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
  setSelectedCustomer,
  toggleCustomerBlockStatus,
} = customerSlice.actions;

export default customerSlice.reducer;
