import type { DummyCustomerData, dummydatatype } from "../utils/Types";

export interface CustomerState {
  customers: dummydatatype;               
  selectedCustomer: DummyCustomerData | null;
}
