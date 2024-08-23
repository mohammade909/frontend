import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllPlatforms,
  deletePlatform,
  updatePlatform,
  fetchPlatformById,
  createPlatform
} from "../actions/platform";
// Initial state
const initialState = {
  platforms: [],
  platform: null,
  loading: false,
  error: null,
  message: "",
};

// Create the slice
const platformSlice = createSlice({
  name: "platforms",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAllPlatforms
      .addCase(fetchAllPlatforms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPlatforms.fulfilled, (state, action) => {
        state.loading = false;
        state.platforms = action.payload.platforms;
      })
      .addCase(fetchAllPlatforms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      // fetchPlatformById
      .addCase(fetchPlatformById.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchPlatformById.fulfilled, (state, action) => {
        state.loading = false;
        state.platform = action.payload;
      })
      .addCase(fetchPlatformById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      // createPlatform
      .addCase(createPlatform.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPlatform.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Platform created successfully!";
        state.platforms.push(action.payload);
      })
      .addCase(createPlatform.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      // updatePlatform
      .addCase(updatePlatform.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePlatform.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Platform updated successfully!";
        const index = state.platforms.findIndex(
          (platform) => platform.platform_id === action.payload.platform_id
        );
        if (index !== -1) {
          state.platforms[index] = action.payload;
        }
      })
      .addCase(updatePlatform.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      // deletePlatform
      .addCase(deletePlatform.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePlatform.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Platform deleted successfully!";
        state.platforms = state.platforms.filter(
          (platform) => platform.platform_id !== action.payload
        );
      })
      .addCase(deletePlatform.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const { clearErrors, clearMessage } = platformSlice.actions;
export default platformSlice.reducer;
