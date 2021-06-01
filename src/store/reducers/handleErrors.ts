import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface handleErrorTypes {
    isOnloading: boolean,
    errorMessage: string,
    responseMessage: string
}


const initialErrorState: handleErrorTypes = {
    isOnloading: false,
    errorMessage: '',
    responseMessage: ''
};



const handleErrorSlice = createSlice({
    name: 'requestResponses',
    initialState: initialErrorState,
    reducers: {
        setErorrMessage(state, action) {
            state.errorMessage = action.payload;
        },
        setResponseMessage(state, action) {
            state.responseMessage = action.payload;
        },
        failureCase(state, { payload }: PayloadAction<{ error: string}>){
            state.isOnloading = false
            state.errorMessage = payload.error || 'Something went bad'
            state.responseMessage = ''
        },
        initialCase(state){
            state.isOnloading = true
            state.errorMessage = ''
            state.responseMessage = ''
        },
        registerSuccessCase(state, { payload }: PayloadAction<{code: number}>){
            const { code } = payload
            if (code === 201 || code === 200) {
                state.responseMessage = "201"
            } if( code === 422)
       { state.responseMessage= "Data validation Failed"}
        }
        
    },
});

export const handleErrorsActions = handleErrorSlice.actions;

export default handleErrorSlice.reducer;