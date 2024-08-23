import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllPackages,
  fetchPackageById,
  createPackage,
  updatePackage,
  deletePackage,
} from "../actions/package"; // Adjust the path as needed

const packageSlice = createSlice({
  name: "packages",
  initialState: {
    packages: [],
    package: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPackages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllPackages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.packages = action.payload;
      })
      .addCase(fetchAllPackages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      })
      .addCase(fetchPackageById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPackageById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.package = action.payload;
      })
      .addCase(fetchPackageById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error;
      })
      .addCase(createPackage.fulfilled, (state, action) => {
        state.packages.push(action.payload);
      })
      .addCase(updatePackage.fulfilled, (state, action) => {
        const index = state.packages.findIndex(
          (pkg) => pkg.package_id === action.payload.package_id
        );
        if (index !== -1) {
          state.packages[index] = action.payload;
        }
      })
      .addCase(deletePackage.fulfilled, (state, action) => {
        state.packages = state.packages.filter(
          (pkg) => pkg.package_id !== action.payload
        );
      });
  },
});

export default packageSlice.reducer;
