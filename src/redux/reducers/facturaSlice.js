import { createSlice } from '@reduxjs/toolkit';

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: {
    client: {
      nombreEmpresa: '',
      nif: '',
      direccion: '',
      correoElectronico: '',
    },
    provider: {
      nombreEmpresa: '',
      nif: '',
      direccion: '',
      correoElectronico: '',
    },
    concepts: [],
  },
  reducers: {
    setClientData: (state, action) => {
      state.client = { ...state.client, ...action.payload };
    },
    setProviderData: (state, action) => {
      state.provider = { ...state.provider, ...action.payload };
    },
    addConcept: (state, action) => {
      state.concepts.push(action.payload);
    },
    updateConcept: (state, action) => {
      const { conceptIndex, updatedConcept } = action.payload;
      state.concepts[conceptIndex] = updatedConcept;
    },
    calculateTotal: (state) => {
      const total = state.concepts.reduce((acc, concept) => acc + concept.price, 0);
      state.total = total;
    },
  },
});

export const {
  setClientData,
  setProviderData,
  addConcept,
  updateConcept,
  calculateTotal,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
