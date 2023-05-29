import { configureStore } from '@reduxjs/toolkit';
import invoiceSlice  from "./reducers/facturaSlice"

const store = configureStore({
  reducer: {
    factura: invoiceSlice
  },
});

export default store;
