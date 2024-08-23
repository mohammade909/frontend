import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {BASEURL} from '../baseurl' // Adjust the path as needed

// Async thunk to fetch all packages
export const fetchAllPackages = createAsyncThunk(
    'packages/fetchAllPackages',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${BASEURL}/api/v1/packages`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

// Async thunk to fetch a package by ID
export const fetchPackageById = createAsyncThunk(
    'packages/fetchPackageById',
    async (id, thunkAPI) => {
        try {
            const response = await fetch(`${BASEURL}/api/v1/packages/${id}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

// Async thunk to create a new package
export const createPackage = createAsyncThunk(
    'packages/createPackage',
    async (newPackage, thunkAPI) => {
        try {
            const response = await fetch(`${BASEURL}/api/v1/packages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPackage),
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData

                );
                
                throw new Error(errorData.message);
            }
            const data = await response.json();
            console.log(data);
            
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

// Async thunk to update a package
export const updatePackage = createAsyncThunk(
    'packages/updatePackage',
    async ({ id, updatedPackage }, thunkAPI) => {
        try {
            const response = await fetch(`${BASEURL}/api/packages/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPackage),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

// Async thunk to delete a package
export const deletePackage = createAsyncThunk(
    'packages/deletePackage',
    async (id, thunkAPI) => {

        try {
            const response = await fetch(`${BASEURL}/api/v1/packages/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            return id; // Return the ID of the deleted package
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);
