import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
    name: "post",
    initialState: {
        value: [],
    },
    reducers: {
        addPost: (state, action) => {
            state.value.unshift(action.payload);
        },
        addAllPost: (state, action) => {
            state.value = action.payload;
        },
        updatePost: (state, action) => {
            const objIndex = state.value.findIndex((obj => obj.id == action.payload.id));
            state.value[objIndex] = action.payload;
        }
    },
})

export const {addAllPost, addPost, updatePost} = postSlice.actions;

export const selectPost = (state) => state.post.value;

export default postSlice.reducer;