// Initial state
import { createSlice } from '@reduxjs/toolkit';
import {createRiskRule, deleteRiskRule, updateRiskRule, fetchAllRiskRules, fetchRiskRuleById} from '../actions/riskrule' // Adjust the path as needed

const initialState = {
    riskRules: [],
    selectedRiskRule: null,
    status: 'idle',
    error: null,
    message: null,
};

// Create the slice
const riskRulesSlice = createSlice({
    name: 'riskRules',
    initialState,
    reducers: {
        resetSelectedRiskRule: (state) => {
            state.selectedRiskRule = null;
        },
        clearMessage: (state) => {
            state.message = null;
        },
        clearErrors: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllRiskRules.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllRiskRules.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.riskRules = action.payload;
            })
            .addCase(fetchAllRiskRules.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.error;
            })
            .addCase(fetchRiskRuleById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRiskRuleById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedRiskRule = action.payload;
            })
            .addCase(fetchRiskRuleById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.error;
            })
            .addCase(createRiskRule.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createRiskRule.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.riskRules.push(action.payload);
            })
            .addCase(createRiskRule.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.error;
            })
            .addCase(updateRiskRule.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateRiskRule.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.riskRules.findIndex(
                    (rule) => rule.rule_id === action.payload.rule_id
                );
                if (index !== -1) {
                    state.riskRules[index] = action.payload;
                }
            })
            .addCase(updateRiskRule.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.error;
            })
            .addCase(deleteRiskRule.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteRiskRule.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.riskRules = state.riskRules.filter(
                    (rule) => rule.rule_id !== action.payload
                );
            })
            .addCase(deleteRiskRule.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.error;
            });
    },
});

// Export actions and reducer
export const { resetSelectedRiskRule, clearErrors, clearMessage } = riskRulesSlice.actions;

export default riskRulesSlice.reducer;
