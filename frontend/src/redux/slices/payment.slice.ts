import { createSlice } from '@reduxjs/toolkit';
import { PaymentInterface } from '../../shared/models/paymentModels/paymentModel';
import { PaymentStateInterface } from '../../shared/models/paymentModels/paymentStateModel';
import { TenantsInterface } from '../../shared/models/tenantsModel';
import { loadPyments } from '../actions';

const initialState: PaymentStateInterface = {
   loading: false,
   payments: [],
   tenants: [],
   error: null,
};

export const paymentSlice = createSlice({
   name: 'payment',
   initialState,
   reducers: {
   },
   extraReducers: (builder) => {
      builder
         .addCase(loadPyments.pending, (state) => {
            state.loading = true;
         })
         .addCase(loadPyments.fulfilled, (state, action) => {
            const data = action.payload.data;
            state.loading = false;
            if (data !== null) {
               state.payments = data.payments;
               state.tenants = data.tenants;
            }
         })
         .addCase(loadPyments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
            state.payments = [];
         })
   },
});

export default paymentSlice.reducer;
