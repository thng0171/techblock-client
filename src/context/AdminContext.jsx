import React, { createContext, useContext, useState } from "react";

export const StateContext = createContext();

const INITIAL_STATE = {
  currentPage: "",
};
export const AdminContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const [notifcation, setNotifcation] = useState(false);
  const [userProfile, setUserProfile] = useState(false);
  // const [currentPage, setCurrentPage] = useState(INITIAL_STATE.currentPage);
  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        screenSize,
        setScreenSize,
        notifcation,
        setNotifcation,
        userProfile,
        setUserProfile,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useAdminContext = () => useContext(StateContext);
