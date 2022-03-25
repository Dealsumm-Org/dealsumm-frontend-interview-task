import { configureStore } from '@reduxjs/toolkit';
import paymentReducer from './slices/payment.slice';

export const store = configureStore({
   reducer: {
      payment: paymentReducer
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
   }),
});
