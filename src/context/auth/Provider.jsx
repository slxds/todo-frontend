import React, { useEffect, useState } from "react";
import { Context } from "./Context";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Magic } from "magic-sdk";
import { LoginPage } from "../../pages";
import { useNavigate, useLocation } from "react-router-dom";

export const Provider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [jwt, setJWT] = useState(null);
  const [loginInProcess, setLoginInProcess] = useState(false);

  let navigate = useNavigate();
  let location = useLocation();

  const auth = axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
  });

  let state = location.state;
  let from = state ? state.from.pathname : "/";

  useEffect(() => {
    if (!jwt) return;

    let decoded = jwt_decode(jwt);

    setUser({ email: decoded.email, name: decoded.name });
  }, [jwt]);

  const loginWithMagic = async (email) => {
    setLoginInProcess(true);
    let magic = new Magic("pk_live_227249D40AE99DE5");

    try {
      let didToken = await magic.auth.loginWithMagicLink({ email });
      console.log(didToken);
      auth
        .post(
          "/v1.0/login/magic",
          {},
          {
            headers: { Authorization: "Bearer " + didToken },
          }
        )
        .then((res) => {
          console.log(res.data);
          setJWT(res.data.jwt);
          setLoginInProcess(false);
          navigate(from, { replace: true });
        })
        .catch((err) => {
          setLoginInProcess(false);
          console.log(err.message);
        });
    } catch (error) {
      setLoginInProcess(false);
      console.log("aborted by user");
    }
  };

  const logout = () => {
    setUser(null);
    setJWT(null);
  };

  const contextValue = {
    loginWithMagic: loginWithMagic,
    user: user,
    jwt: jwt,
    logout: logout,
    loginInProcess: loginInProcess,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
