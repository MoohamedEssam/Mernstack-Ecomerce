import React, { useContext } from "react";
import SideBar from "./SideBar";
import { authContext } from "../../context/Auth";

const AdminPanel = () => {
  const { auth, setAuth } = useContext(authContext);
  return (
    <div className="grid w-full grid-cols-12 h-[85vh]">
      <div className="col-span-1 md:col-span-3  bg-white drop-shadow-sm">
        <SideBar />
      </div>
      <div className="col-span-11 md:col-span-8 w-[90%]">
        <div className="mt-5 md:mt-10 ml-5  flex flex-col  shadow-md  py-3 w-full  border-1 gap-y-5">
          <h1>Admin Name : {auth?.user.name}</h1>
          <h1>Admin Email : {auth?.user.email}</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
