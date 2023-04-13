import {createSlice} from "@reduxjs/toolkit"

const initialState ={
    usercreated:false,
    
}
export const userSlice = createSlice({
    name:'data',
    initialState,
    reducers: {
        setusercreated:(state,action)=>
             action.payload
        ,
       
    }
})
export const {setusercreated} = userSlice.actions;

export const selectusercreated = (state) => state.data;
export default userSlice.reducer;