import axios from "axios";
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
// let history = useHistory;
const dispatch = useDispatch
export const login = (userdata) => {
  axios
    .post("http://3.238.22.34:80/api/admin/login", userdata)
    .then((res) => {
      console.log(res)
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      
    })
    .catch((err) =>{
    alert('Invalid Credentials')
    console.log(err)}
    //   dispatch({
    //     type: GET_ERRORS,
    //     payload: err.response.data,
    //   })
    // }
    );
};
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
