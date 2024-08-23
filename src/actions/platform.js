import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASEURL } from '../baseurl'; // Adjust the path as needed

// Async thunk to fetch all platforms
export const fetchAllPlatforms = createAsyncThunk(
    'platforms/fetchAllPlatforms',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${BASEURL}/api/v1/platforms`);
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

// Async thunk to fetch a platform by ID
export const fetchPlatformById = createAsyncThunk(
    'platforms/fetchPlatformById',
    async (id, thunkAPI) => {
        try {
            const response = await fetch(`${BASEURL}/api/v1/platforms/${id}`);
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

// Async thunk to create a new platform
export const createPlatform = createAsyncThunk(
    'platforms/createPlatform',
    async (newPlatform, thunkAPI) => {
        try {
            const response = await fetch(`${BASEURL}/api/v1/platforms`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPlatform),
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

// Async thunk to update a platform
export const updatePlatform = createAsyncThunk(
    'platforms/updatePlatform',
    async ({ id, updatedPlatform }, thunkAPI) => {
        try {
            const response = await fetch(`${BASEURL}/api/v1/platforms/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedPlatform),
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

// Async thunk to delete a platform
export const deletePlatform = createAsyncThunk(
    'platforms/deletePlatform',
    async (id, thunkAPI) => {
        try {
            const response = await fetch(`${BASEURL}/api/v1/platforms/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            return id; // Return the ID of the deleted platform
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);
