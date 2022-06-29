import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: 0
    },
    reducers: {
        increment: state => ( state.value += 1 )

    }

})

export const { increment } = counterSlice.actions

export default counterSlice.reducer