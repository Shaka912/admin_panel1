import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../Actions/authService";
const user = JSON.parse(localStorage.getItem('user'))

const initialState ={
    user: user ? user: null,
    isError:false,
    isloading:false,
    isSuccess:false,
    message:''
}

//register user

export const register = createAsyncThunk('auth/register', async (userData, thunkAPI)=>{
    try {
        return await authService.register(userData)
    } catch (error) {
        const message = (error.response && error.response.data &&error.response.data.message) ||
        error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})
// login user 
export const login = createAsyncThunk('auth/login',  ({email,password}, thunkAPI)=>{
    try {
        
        return authService.login({email,password})
        
    } catch (error) {
        const message = (error.response && error.response.data &&error.response.data.message) ||
        error.message || error.toString();
        console.log(error)
    
        return thunkAPI.rejectWithValue(message);
    }
})
//Logout
export const logout = createAsyncThunk('auth/logout', async()=>{
    await authService.logout()
})
export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        reset:(state)=>{
            state.isError=false
            state.isSuccess= false
            state.isloading= false
            state.message= ''
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(register.pending,(state)=>{
                state.isloading = true
            })
            .addCase(register.fulfilled,(state,action)=>{
                state.isloading=false;
                state.isSuccess= true;
                state.user = action.payload;
            })
            .addCase(register.rejected,(state,action)=>{
                state.isloading = false;
                state.isError= true;
                state.message = action.payload;
                state.user = null
            })
            .addCase(login.pending,(state)=>{
                state.isloading = true
            })
            .addCase(login.fulfilled,(state,action)=>{
                state.isloading=false;
                state.isSuccess= true;
                state.user = action.payload;
            })
            .addCase(login.rejected,(state,action)=>{
                state.isloading = false;
                state.isError= true;
                state.message = action.payload;
                state.user = null
            })
            .addCase(logout.fulfilled,(state)=>{
                state.user = null
            })

    }
})

export const {reset}= authSlice.actions;
export default authSlice.reducer