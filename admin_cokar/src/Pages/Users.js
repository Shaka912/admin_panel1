import React, { useLayoutEffect, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FiKey, FiTrash2 } from "react-icons/fi";
import axios from "axios";

import { toast, ToastContainer } from "react-toastify";
import AddModal from "../Components/AddModal";
import { useSelector, useDispatch } from "react-redux";
import { setusercreated, selectusercreated } from "../slice/dataSlice";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
function Users() {
  const navigate = useNavigate();
  const u = JSON.parse(localStorage.getItem("user"));
  const [data1, setdata1] = useState([]);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const created = useSelector(selectusercreated);
  useLayoutEffect(() => {
    if (!u) {
      navigate("/");
    }
  }, [u]);
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
          setdata1(ab);
          setloading(false);
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    }
    getData();
  }, []);
  useEffect(() => {
    if (created === true) {
      toast("User have been Created Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });

      // setTimeout(() => {
      //    dispatch(!created)
      // }, 10000);
    }
  }, [created]);
  // useEffect(() => {

  // console.log(created)

  // }, [data1])

  const columns = [
    {
      name: "Profile Pic",
      selector: "path",
      cell: (row) => (
        <img src={row.photo} alt="User" height="100" width="100" />
      ),
    },
    {
      name: "Email",
      selector: (row) => (row.email ? row.email : "null"),
    },
    {
      name: "Name",
      selector: "name",
      width: "250px",
    },
    {
      name: "Birthday",
      selector: (row) => (row.dob !== null ? row.dob : "null"),
    },
    {
      name: "Gender",
      selector: (row) => (row.gender !== null ? row.gender : "null"),
      width: "140px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <button onClick={() => handleDelete(row.id)}>
          <FiTrash2 />
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  const handleDelete = (id) => {
    const token = u.info.token;
    const config = {
      headers: { Authorization: token },
    };
    setloading(true);
    axios
      .delete(`http://3.238.22.34:80/api/admin/deleteuser/${id}`, config)
      .then((res) => {
        if (res.status === 200) {
          toast("User have been deleted Successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          setloading(false)
        }
      })
      .catch((error) => {
        console.log(error);
        setloading(false);
      });
  };
  const deleteRow = async (id) => {
    try {
      setloading(true);
      await axios.delete(`https://your-api-url/delete/${id}`);
      const newData = await axios.get("https://your-api-url/get-data");
      setdata1(newData.data);
      setShowDeleteMessage(true);
    } catch (error) {
      console.error(error);
    }
  };
  const customStyles = {
    rows: {
      style: {
        minHeight: "100x", // override the row height
        maxHeight: "250px",
        borderBottomStyle: "solid",
        borderBottomWidth: "2px",
        borderBottomColor: "black",
      },
    },
    headCells: {
      style: {
        fontSize: "26px",
        padding: "12px",
        marginLeft: "5px",
        marginRight: "5px",
        borderRightStyle: "solid",
        borderRightWidth: "2px",
        borderRightColor: "black",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
        fontSize: "20px",
        borderBottomStyle: "solid",
        borderBottomWidth: "2px",
        borderBottomColor: "black",
      },
    },
    table: {
      style: {
        marginTop: "25px",
        padding: "16px",
        backgroundColor: "rgb(252 231 243 / var(--tw-bg-opacity))",
        border: "2px",
      },
    },
    column: {
      style: {
        marginLeft: "3px",
        marginRight: "3px",
      },
    },
  };
  return (
    <>
      <div className="bg-pink-100">
        <div>
          <h1 className="text-center p-6 text-2xl mx md:text-4xl">
            Application Users List
          </h1>
        </div>
        <DataTable
          data={data1}
          columns={columns}
          pagination
          customStyles={customStyles}
        />
        <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <h1 className="md:text-5xl font-semibold p-6">Add User</h1>
          <AddModal />
        </div>
      </div>
    </>
  );
}

export default Users;
