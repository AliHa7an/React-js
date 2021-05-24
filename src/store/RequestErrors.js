import { createSlice } from '@reduxjs/toolkit';

const initialErrorState = {
    isOnloading: false,
    errorMessage: null
};

const requestSlice = createSlice({
    name: 'requestErrors',
    initialState: initialErrorState,
    reducers: {
        setOnLoading(state) {
            state.isOnloading = true;
        },
        setErorrMessage(state, action) {
            state.errorMessage = action.payload;
        },
    },
});

export const requestActions = requestSlice.actions;

export default requestSlice.reducer;