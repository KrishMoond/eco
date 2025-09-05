import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from '../../services/orderService';

const initialState = {
  orders: [],
  order: null,
  orderStats: {
    totalOrders: 0,
    totalSpent: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0
  },
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  },
  isLoading: false,
  isError: false,
  message: '',
};

// Create order
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, thunkAPI) => {
    try {
      return await orderService.createOrder(orderData);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to create order';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get orders
export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async (params, thunkAPI) => {
    try {
      return await orderService.getOrders(params);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to get orders';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get single order
export const getOrder = createAsyncThunk(
  'orders/getOrder',
  async (id, thunkAPI) => {
    try {
      return await orderService.getOrder(id);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to get order';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Cancel order
export const cancelOrder = createAsyncThunk(
  'orders/cancelOrder',
  async ({ id, reason }, thunkAPI) => {
    try {
      return await orderService.cancelOrder(id, reason);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to cancel order';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get order statistics
export const getOrderStats = createAsyncThunk(
  'orders/getOrderStats',
  async (_, thunkAPI) => {
    try {
      return await orderService.getOrderStats();
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to get order stats';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrders: (state) => {
      state.orders = [];
      state.isError = false;
      state.message = '';
    },
    resetOrder: (state) => {
      state.order = null;
      state.isError = false;
      state.message = '';
    },
    clearOrderError: (state) => {
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Orders
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.pagination = action.payload.pagination;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Order
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(getOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Cancel Order
      .addCase(cancelOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
        // Update the order in the orders array
        state.orders = state.orders.map(order =>
          order._id === action.payload._id ? action.payload : order
        );
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Order Stats
      .addCase(getOrderStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderStats = action.payload;
      })
      .addCase(getOrderStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetOrders, resetOrder, clearOrderError } = orderSlice.actions;
export default orderSlice.reducer;