import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/Auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import Dashboard from "../../pages/user/Dashboard";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const { auth, setAuth } = useContext(authContext);

  const authCheck = async () => {
    try {
      let res = await axios.get("http://localhost:8000/api/auth/admin-auth", {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      console.log(res);
      
      if (res.data.ok) {
        setOk(true);
        console.log("ok is true");
      } else {
        setOk(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
};

export default AdminRoute;
