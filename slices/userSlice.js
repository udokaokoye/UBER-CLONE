import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userInfo: {
        id: null,
        name: null,
        email: null,
        phone: null,
    }
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setuserInfo: (state, action) => {
            state.userInfo = action.payload
        },
    }
});

export const {setuserInfo} = userSlice.actions;

// ! Selectors
export const selectUserInfo = (state) => state.user.userInfo

export default userSlice.reducer;