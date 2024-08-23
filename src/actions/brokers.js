import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASEURL } from '../baseurl'; // Adjust the path as needed

// Async thunk to fetch all brokers
export const fetchAllBrokers = createAsyncThunk(
    'brokers/fetchAllBrokers',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${BASEURL}/api/v1/brokers`);
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

// Async thunk to fetch a broker by ID
export const fetchBrokerById = createAsyncThunk(
    'brokers/fetchBrokerById',
    async (id, thunkAPI) => {
        try {
            const response = await fetch(`${BASEURL}/api/v1/brokers/${id}`);
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
export const fetchBrokerByPlatforms = createAsyncThunk(
    'brokers/fetchBrokerByPlatforms',
    async (name, thunkAPI) => {
        try {
            const response = await fetch(`${BASEURL}/api/v1/brokers/platforms/${name}`);
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            const data = await response.json();
           console.log(data);
           
            return data;
        } catch (error) {
            console.log(error);
            
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

// Async thunk to create a new broker
export const createBroker = createAsyncThunk(
    'brokers/createBroker',
    async (newBroker, thunkAPI) => {
        try {
            const response = await fetch(`${BASEURL}/api/v1/brokers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBroker),
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

// Async thunk to update a broker
export const updateBroker = createAsyncThunk(
    'brokers/updateBroker',
    async ({ id, updatedBroker }, thunkAPI) => {
        try {
            const response = await fetch(`${BASEURL}/api/v1/brokers/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBroker),
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

// Async thunk to delete a broker
export const deleteBroker = createAsyncThunk(
    'brokers/deleteBroker',
    async (id, thunkAPI) => {
        try {
            const response = await fetch(`${BASEURL}/api/v1/brokers/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            return id; // Return the ID of the deleted broker
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

