import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userSlice",
    initialState: {},
    reducers: {
        sendRequest() { },
        setUser(state, action) {
            const userData = action.payload;
            return { ...state, ...userData };
        }
    }
});

export const { sendRequest, setUser } = userSlice.actions;

export default userSlice.reducer;
