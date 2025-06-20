import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn:false,
    user:null,
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action) => {
            const payload = action.payload;
            if(payload){
                state.isLoggedIn = true;
                state.user = payload;
            }
        },
        removeUser:(state) => {
            state.isLoggedIn = false;
            state.user = null;
        }
    },
});

export const {setUser,removeUser} = userSlice.actions;
export default userSlice.reducer;