import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@mui/system";
import Card from "../Components/Card";
import OutlinedCard from "../Components/Card";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const u = JSON.parse(localStorage.getItem("user"));
  const [data1, setdata1] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);
  // useEffect(() => {
  console.log(u.info.name);

  // }, [])
  useEffect(() => {
    setloading(true);
    const token = u.info.token;
    const config = {
      headers: { Authorization: token },
    };
    function getData() {
      axios
        .get("http://3.238.22.34:80/api/admin/getusers", config)
        .then((res) => {
          let ab = res.data.users;
          let newdata = ab.slice(0, 3);
          setdata1(newdata);
          setloading(false);
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    }
    getData();
  }, []);
  return (
    <>
      <h1 className="text-4xl font-semibold p-5">Welcome {u.info.name}</h1>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Container>
        <h1 className="text-center py-8 font-bold text-3xl">Home</h1>
        <div className="flex-row md:flex justify-between grid mx-6">
          {data1.map((item) => (
            <OutlinedCard
              key={item.id}
              pic={item.photo}
              name={item.name}
              email={item.email}
              gender={item.gender}
            />
          ))}
        </div>
        <div className="flex justify-center mt-5">
          <button className="m-7 h-14 w-56 bg-cyan-300 rounded-lg font-bold text-lg ">
            See More
          </button>
        </div>
      </Container>
      <div className="bg-slate-200">
        <div className="p-5">
          <h1 className="text-5xl font-sans font-bold text-center">Actions</h1>
          <div className="border-solid border-4  border-black w-96 h-52 p-2 mt-10">
            <h2 className="mt-5 text-xl font-bold text-center">
              Send Push notification
            </h2>

            <div className="flex flex-row mt-4">
              <h2 className="mr-4 font-bold text-lg">Send message:</h2>
              <input></input>
            </div>
            <div className="flex justify-center mt-4">
              <button className="bg-blue-600 rounded-lg w-24 h-12 text-lg font-bold">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
