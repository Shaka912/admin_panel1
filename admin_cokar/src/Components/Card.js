import React from "react";
const img = require("../Assets/logo.png");
function Card({name,pic,email,gender}) {
  return (
    <>
      <div className="h-96 w-80 bg-pink-200 rounded-xl mb-5">
        <div className="p-2">
          <div className="flex-row flex">
            <img src={pic?pic:null} height="70" width="100" className="p-2 rounded-full" />
            <h3 className="font-sans font-bold text-2xl p-3 ml-5 underline">{name?name:null}</h3>
          </div>
          <div className="border-t-2 border-black mt-3">
            <h3 className="p-2 font-medium text-xl ">
                Gender: {gender?gender:null}
            </h3>
            <h3 className="p-2 font-medium text-xl">Email: {email?email:null}</h3>
            <h3 className="p-2 font-medium text-xl">About me: hello i am good man</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
