import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../../services/productService';

const initialState = {
  products: [],
  product: null,
  featuredProducts: [],
  relatedProducts: [],
  filters: {
    categories: [],
    brands: [],
    priceRange: { minPrice: 0, maxPrice: 1000 }
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  },
  isLoading: false,
  isError: false,
  message: '',
};

// Get all products
export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (params, thunkAPI) => {
    try {
      return await productService.getProducts(params);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to get products';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get single product
export const getProduct = createAsyncThunk(
  'products/getProduct',
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to get product';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get featured products
export const getFeaturedProducts = createAsyncThunk(
  'products/getFeaturedProducts',
  async (limit, thunkAPI) => {
    try {
      return await productService.getFeaturedProducts(limit);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to get featured products';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Search products
export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async (params, thunkAPI) => {
    try {
      return await productService.searchProducts(params);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to search products';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get products by category
export const getProductsByCategory = createAsyncThunk(
  'products/getProductsByCategory',
  async ({ category, params }, thunkAPI) => {
    try {
      return await productService.getProductsByCategory(category, params);
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to get products by category';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProducts: (state) => {
      state.products = [];
      state.isError = false;
      state.message = '';
    },
    resetProduct: (state) => {
      state.product = null;
      state.relatedProducts = [];
      state.isError = false;
      state.message = '';
    },
    clearProductError: (state) => {
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Products
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
        state.filters = action.payload.filters;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Product
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload.product;
        state.relatedProducts = action.payload.relatedProducts;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Featured Products
      .addCase(getFeaturedProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeaturedProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featuredProducts = action.payload;
      })
      .addCase(getFeaturedProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Search Products
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Products by Category
      .addCase(getProductsByCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
        state.pagination = action.payload.pagination;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetProducts, resetProduct, clearProductError } = productSlice.actions;
export default productSlice.reducer;