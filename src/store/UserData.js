import { createSlice } from '@reduxjs/toolkit';

const initialUserState = { userData: { id: '', name: '', email: '', gender: '', status: '' } };

const userDataSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUserData(state, action) {
            state.userData = { ...action.payload }
        }
    },
});

export const userDataActions = userDataSlice.actions;

export default userDataSlice.reducer;