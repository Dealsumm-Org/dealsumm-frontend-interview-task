import { createAsyncThunk } from '@reduxjs/toolkit';
import { PaymentsApi } from '../../shared/api/payments.api';

export const loadPyments = createAsyncThunk(
   'payments/load',
   async () => {
      const result = await PaymentsApi.loadPayments();
      return result;
   },
);
