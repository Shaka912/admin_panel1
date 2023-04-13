import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Navbar from "./Components/Navbar";
// import PrivateRoute from "./Components/PrivateRoute";
// import setAuthToken from "./utils/setAuthToken";
import store from "./store";
import { Provider } from "react-redux";
import Users from "./Pages/Users";
function App() {
  return (
    <>
      <Provider store={store}>
        <div>
          <Router>
          <Navbar />
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/user" element={<Users />} />
              <Route exact path="/dashboard" element={<Home />} />
            </Routes>
          </Router>
          <ToastContainer />
        </div>
      </Provider>
    </>
  );
}

export default App;
