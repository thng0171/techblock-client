import { createContext, useEffect, useState, useReducer } from "react";
import Reducer from "./Reducer";
import { request } from "../api/axios";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
  token: localStorage.getItem("token") || null,
};
// console.log(INITIAL_STATE.token);

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("token", state.token);
  }, [state.user]);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (state.user) {
      request
        .get(`/user/${state.user._id}`)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        userData,
      }}
    >
      {children}
    </Context.Provider>
  );
};
