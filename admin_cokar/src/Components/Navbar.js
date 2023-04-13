
import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useSelector,useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout,reset } from "../slice/authSlice";
function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.auth)
    const [nav, setnav] = useState(false);
    const handleNav = () => {
      setnav(!nav);
    };
    const onLogout = ()=>{
      dispatch(logout());
      dispatch(reset());
      navigate('/')
    }
  return (
    <nav className=" w-full overflow-auto flex justify-between items-center h-24  mx-auto px-3 bg-pink-500 ">
    <Link to={'/dashboard'}>
      <h1 className="text-2xl md:text-4xl  font-bold">Coka - Admin</h1>
      </Link>
    {user?(
      <>
      <div className="hidden md:flex">
      <ul className="text-black hidden md:flex ">
        <li className="p-4 text-2xl font-bold mx-5">
          <Link to={'/dashboard'}> Dashboard</Link>
        </li>

        <li className="p-4 text-2xl font-bold mx-5">
          <Link to={'/user'}>Users</Link>
        </li>
        <li className="p-4 text-2xl font-bold mx-5">
          <a href="#">Settings</a>
        </li>
      </ul>
      <button className="rounded bg-lime-400 text-black px-4 py-0 text-lg font-semibold" onClick={onLogout}>
        Logout
      </button>
    </div>
     </>
     // 
    ):(
      <h1 className="text-center md:text-3xl font-bold mr-16">This is a Private Route only Authorized personal can access it</h1>
    )}
    
    <div className="md:hidden">
      <button className="mx-3 " onClick={handleNav}>
        {!nav ? (
          <AiOutlineClose size={26} color={"black"} />
        ) : (
          <AiOutlineMenu size={26} color={"black"} />
        )}
      </button>
      <div
        className={
          !nav
            ? "fixed left-0 top-0 h-full w-[40%] border-r  border-r-gray-500 bg-bg_color2 ease-in-out duration-300"
            : "fixed left-[-100%]"
        }
      >
        <ul className="pt-24 uppercase">
          <li className="p-4 text-lg font-bold border-b">
            <a href="#">Home</a>
          </li>
          <li className="p-4 text-lg font-bold border-b">
            <a href="#">User</a>
          </li>
          <li className="p-4 text-lg font-bold">
            <a href="#">Settings</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar