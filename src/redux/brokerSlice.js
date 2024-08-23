import { createSlice } from "@reduxjs/toolkit";
import { createBroker, fetchAllBrokers, fetchBrokerById, updateBroker, deleteBroker, fetchBrokerByPlatforms } from "../actions/brokers";
const brokerSlice = createSlice({
    name: 'brokers',
    initialState: {
        brokers: [],
        loading: false,
        error: null,
        message:'',
        platforms:[]
    },
    
        reducers: {
            clearErrors: (state) => {
              state.error = null;
            },
            clearMessage: (state) => {
              state.message = null;
            },
          },

    extraReducers: (builder) => {
        // Handle fetch all brokers
        builder.addCase(fetchAllBrokers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAllBrokers.fulfilled, (state, action) => {
            state.brokers = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchAllBrokers.rejected, (state, action) => {
            state.error = action.payload.error;
            state.loading = false;
        });
        builder.addCase(fetchBrokerByPlatforms.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchBrokerByPlatforms.fulfilled, (state, action) => {
            state.platforms = action.payload.data;
            state.loading = false;
        });
        builder.addCase(fetchBrokerByPlatforms.rejected, (state, action) => {
            state.error = action.payload.error;
            state.loading = false;
        });

        // Handle fetch broker by ID
        builder.addCase(fetchBrokerById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchBrokerById.fulfilled, (state, action) => {
            const index = state.brokers.findIndex((broker) => broker.broker_id === action.payload.broker_id);
            if (index !== -1) {
                state.brokers[index] = action.payload;
            } else {
                state.brokers.push(action.payload);
            }
            state.loading = false;
        });
        builder.addCase(fetchBrokerById.rejected, (state, action) => {
            state.error = action.payload.error;
            state.loading = false;
        });

        // Handle create broker
        builder.addCase(createBroker.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createBroker.fulfilled, (state, action) => {
            state.brokers.push(action.payload);
            state.loading = false;
            state.message = 'Broker created successfully';
        });
        builder.addCase(createBroker.rejected, (state, action) => {
            state.error = action.payload.error;
            state.loading = false;
        });

        // Handle update broker
        builder.addCase(updateBroker.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateBroker.fulfilled, (state, action) => {
            const index = state.brokers.findIndex((broker) => broker.broker_id === action.payload.broker_id);
            if (index !== -1) {
                state.brokers[index] = action.payload;
            }
            state.loading = false;
            state.message = 'Broker updated successfully';
        });
        builder.addCase(updateBroker.rejected, (state, action) => {
            state.error = action.payload.error;
            state.loading = false;
        });

        // Handle delete broker
        builder.addCase(deleteBroker.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteBroker.fulfilled, (state, action) => {
            state.brokers = state.brokers.filter((broker) => broker.broker_id !== action.payload);
            state.loading = false;
            state.message = 'Broker deleted successfully';
        });
        builder.addCase(deleteBroker.rejected, (state, action) => {
            state.error = action.payload.error;
            state.loading = false;
        });
    },
});
export const { clearErrors, clearMessage } = brokerSlice.actions;
export default brokerSlice.reducer;
