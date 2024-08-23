import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASEURL } from '../baseurl'; // Adjust the path as needed

// Async thunk to fetch all risk rules
export const fetchAllRiskRules = createAsyncThunk(
    'riskRules/fetchAllRiskRules',
    async (_, thunkAPI) => {
        try {
            const response = await fetch(`${BASEURL}/api/v1/risk-rules`);
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

// Async thunk to fetch a risk rule by ID
export const fetchRiskRuleById = createAsyncThunk(
    'riskRules/fetchRiskRuleById',
    async (id, thunkAPI) => {
        try {
            const response = await fetch(`${BASEURL}/api/v1/risk-rules/${id}`);
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

// Async thunk to create a new risk rule
export const createRiskRule = createAsyncThunk(
    'riskRules/createRiskRule',
    async (newRiskRule, thunkAPI) => {
        try {
            const response = await fetch(`${BASEURL}/api/v1/risk-rules`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRiskRule),
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

// Async thunk to update a risk rule
export const updateRiskRule = createAsyncThunk(
    'riskRules/updateRiskRule',
    async ({ id, updatedRiskRule }, thunkAPI) => {
        try {
            const response = await fetch(`${BASEURL}/api/v1/risk-rules/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedRiskRule),
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

// Async thunk to delete a risk rule
export const deleteRiskRule = createAsyncThunk(
    'riskRules/deleteRiskRule',
    async (id, thunkAPI) => {
        try {
            const response = await fetch(`${BASEURL}/api/v1/risk-rules/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            return id; // Return the ID of the deleted risk rule
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

