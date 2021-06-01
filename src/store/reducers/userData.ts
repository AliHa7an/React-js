import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userDataTypes {
    id: string,
    name: string,
    email: string,
    gender: string,
    status: string
}

interface userSlice  { userData: userDataTypes }

const initialUserState: userSlice = { userData: { id: '', name: '', email: '', gender: '', status: '' },  };

const userDataSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: 
    {
        registerRequest() { },
        loginRequest() { },
        editProfileRequest() { },
        setUserData(state, { payload }: PayloadAction<any>) {
            state.userData = { ...payload }
        }
    },
});

export const userDataActions = userDataSlice.actions;

export default userDataSlice.reducer;