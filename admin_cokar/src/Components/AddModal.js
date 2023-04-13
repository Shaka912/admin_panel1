import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios, { AxiosHeaders } from "axios";
import { setusercreated, selectusercreated } from "../slice/dataSlice";
import { useDispatch, useSelector } from "react-redux";
import { DotLoader } from "react-spinners";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
export default function AddModal(props) {
  // const {usercreater, setusercreated} =
  const dispatch = useDispatch();
  const created = useSelector(selectusercreated);
  const u = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  // const [value, setvalue] = React.useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   bio: "",
  //   dob: "",
  //   gender: "",
  //   longitude: "",
  //   latitude: "",
  //   image: "",
  // });
  const [disable, setdisable] = React.useState(false);
  const [email, setemail] = React.useState("");
  const [name, setname] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [bio, setbio] = React.useState("");
  const [dob, setdob] = React.useState("");
  const [latitude, setlatitude] = React.useState("");
  const [gender, setgender] = React.useState("");
  const [longitude, setlongitude] = React.useState("");
  const [image, setimage] = React.useState(null);
  const [video, setvideo] = React.useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlesub = async (e) => {
    e.preventDefault();
    const token = u.info.token;
    if (created === true) {
      disable(!created);
    }
    setloading(true);
    setdisable(true);
    console.log(token);
    console.log(image);
    console.log(video);
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("name", name);
    formdata.append("dob", dob);
    formdata.append("gender", gender);
    formdata.append("bio", bio);
    formdata.append("latitude", latitude);
    formdata.append("longitude", longitude);
    formdata.append("file", image);
    formdata.append("video", video);
    let config1 = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://3.238.22.34:80/api/admin/user-add",
      headers: {
        Authorization: token,

        // "Content-Type": "multipart/form-data",
        // "Accept":"application/json"
      },
      data: formdata,
    };
    try {
      const response = await axios.post(
        "http://3.238.22.34:80/api/admin/user-add",
        formdata,
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        dispatch(setusercreated(!created));
        setdisable(false);
        setloading(false);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      setdisable(false);
      setOpen(false);
    }
  };
  const handlefile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setimage(file);
    };
    reader.readAsDataURL(file);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setvideo(file);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} size="large">
        Create User
      </Button>
     
        
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create User</DialogTitle>
        <form onSubmit={handlesub}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              required
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <TextField
              id="password"
              label="Password"
              type="text"
              margin="dense"
              required
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <TextField
              id="name"
              label="Name"
              type="text"
              margin="dense"
              required
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <TextField
              id="gender"
              label="Gender"
              type="text"
              margin="dense"
              required
              value={gender}
              onChange={(e) => setgender(e.target.value)}
            />
            <TextField
              id="dob"
              label="Date of Birth"
              type="date"
              margin="dense"
              required
              value={dob}
              onChange={(e) => setdob(e.target.value)}
            />

            <TextField
              id="bio"
              label="Bio"
              type="text"
              margin="dense"
              required
              value={bio}
              onChange={(e) => setbio(e.target.value)}
            />
            <TextField
              id="latitude"
              label="Latitude"
              type="text"
              margin="dense"
              required
              value={latitude}
              onChange={(e) => setlatitude(e.target.value)}
            />
            <TextField
              id="longitude"
              label="Longitude"
              type="text"
              margin="dense"
              required
              value={longitude}
              onChange={(e) => setlongitude(e.target.value)}
            />
            {/* <TextField
              id="pic"
              label="DP"
              type="file"
              margin="dense"
              required
              value={image}
              onChange={handlefile}
            /> */}
            <input
              id="pic"
              type="file"
              onChange={handlefile}
              accept="image/*"
            />
            <input
              id="video"
              type="file"
              onChange={handleVideoChange}
              accept="video/*"
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" disabled={disable}>
              Add User
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
