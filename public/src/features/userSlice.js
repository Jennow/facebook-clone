import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        value: [],
    },
    reducers: {
        addUser: (state, action) => {
            state.value.push(action.payload);
        },
        addAllUser: (state, action) => {
            state.value = action.payload;
        }
    },
})

export const {addAllUser, addUser} = userSlice.actions;

export const selectUser = (state) => state.user.value;

export default userSlice.reducer;