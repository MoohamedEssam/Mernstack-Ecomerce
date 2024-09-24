import React, { useContext, useEffect, useState } from "react";
import { authContext } from "../../context/Auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import Dashboard from "../../pages/user/Dashboard";

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  const { auth, setAuth } = useContext(authContext);

  const authCheck = async () => {
    try {
      console.log("Auth token:", auth.token);
      const res = await axios.get("http://localhost:8000/api/auth/user-auth", {
        headers: { Authorization: `Bearer ${auth?.token}` }, // Add auth token to headers
      });

      if (res.data.ok) {
        setOk(true);
        console.log("ok is true");
      } else {
        setOk(false);
        console.log("ok is false");
      }
    } catch (error) {
      console.error(error);
      setOk(false);
    } finally {
      setLoading(false); // Set loading to false when request is complete
    }
  };
  useEffect(() => {
    if (auth.token) {
      authCheck();
    }
  }, [auth?.token]);

  // if (loading) {
  //   return <Spinner />; // Show spinner while loading
  // }

  return ok ? <Outlet /> : <Spinner />; // Redirect to dashboard if not authorized
};

export default PrivateRoute;
