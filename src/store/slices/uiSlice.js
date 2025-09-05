import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: false,
  mobileMenuOpen: false,
  cartDrawerOpen: false,
  searchModalOpen: false,
  theme: 'light',
  loading: {
    global: false,
    page: false,
    component: {}
  },
  notifications: [],
  modals: {
    confirmDialog: {
      isOpen: false,
      title: '',
      message: '',
      onConfirm: null,
      onCancel: null
    },
    imageViewer: {
      isOpen: false,
      images: [],
      currentIndex: 0
    }
  }
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Sidebar
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    
    // Mobile Menu
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenuOpen: (state, action) => {
      state.mobileMenuOpen = action.payload;
    },
    
    // Cart Drawer
    toggleCartDrawer: (state) => {
      state.cartDrawerOpen = !state.cartDrawerOpen;
    },
    setCartDrawerOpen: (state, action) => {
      state.cartDrawerOpen = action.payload;
    },
    
    // Search Modal
    toggleSearchModal: (state) => {
      state.searchModalOpen = !state.searchModalOpen;
    },
    setSearchModalOpen: (state, action) => {
      state.searchModalOpen = action.payload;
    },
    
    // Theme
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    
    // Loading states
    setGlobalLoading: (state, action) => {
      state.loading.global = action.payload;
    },
    setPageLoading: (state, action) => {
      state.loading.page = action.payload;
    },
    setComponentLoading: (state, action) => {
      const { component, loading } = action.payload;
      state.loading.component[component] = loading;
    },
    
    // Notifications
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    
    // Confirm Dialog
    showConfirmDialog: (state, action) => {
      state.modals.confirmDialog = {
        isOpen: true,
        ...action.payload
      };
    },
    hideConfirmDialog: (state) => {
      state.modals.confirmDialog.isOpen = false;
    },
    
    // Image Viewer
    showImageViewer: (state, action) => {
      state.modals.imageViewer = {
        isOpen: true,
        ...action.payload
      };
    },
    hideImageViewer: (state) => {
      state.modals.imageViewer.isOpen = false;
    },
    setImageViewerIndex: (state, action) => {
      state.modals.imageViewer.currentIndex = action.payload;
    }
  }
});

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleMobileMenu,
  setMobileMenuOpen,
  toggleCartDrawer,
  setCartDrawerOpen,
  toggleSearchModal,
  setSearchModalOpen,
  toggleTheme,
  setTheme,
  setGlobalLoading,
  setPageLoading,
  setComponentLoading,
  addNotification,
  removeNotification,
  clearNotifications,
  showConfirmDialog,
  hideConfirmDialog,
  showImageViewer,
  hideImageViewer,
  setImageViewerIndex
} = uiSlice.actions;

export default uiSlice.reducer;