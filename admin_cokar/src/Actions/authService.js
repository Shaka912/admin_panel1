import axios from "axios";

const API_URL = 'http://3.238.22.34:80/api/admin/'

//login user function

const login =async ({email,password})=> {
    const response =await axios.post(API_URL +'login', {email,password})
    if(response.data){
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    console.log(response.data);
    return response.data
    
}
//register user function
const register = async(userData)=> {
    const response = axios.post(API_URL + 'createadmin', userData)
    if(response.data){
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data
}
const logout = ()=>{
    localStorage.removeItem('user')
}
const authService ={
    register,
    logout,
    login
}
export default authService