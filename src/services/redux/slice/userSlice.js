import {createSlice} from '@reduxjs/toolkit';

const initialState={
    user:"",
    loggedIn:false
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        login:(state, action) =>{
            state.user = action.payload;
        },
        logout:(state) =>{
            state.loggedIn = false;
            state.user = null;
        }
    }
});

export const {login, logout} = userSlice.actions;
export default userSlice.reducer;

