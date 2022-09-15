import React, { useEffect } from "react";
import { MdNotifications } from "react-icons/md";
import { HiMenuAlt2 } from "react-icons/hi";
import { useAdminContext } from "../../../context/AdminContext";
import Avatar from "@mui/material/Avatar";
import { Context } from "../../../context/Context";
import { useContext } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

export default function Topbar() {
  const { userData, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.href = "/"
  };
  function Notification() {
    return <div className="absolute flex items-center">notif</div>;
  }
  function UserMenu({ user, userProfile }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <div>
        <IconButton size="small" id="basic-button" onClick={handleClick}>
          <Avatar
            sx={{ width: 32, height: 32 }}
            src={`${import.meta.env.VITE_IMAGE_URL}${user?.profilePicture}`}
          />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>
            <Link to="setting">Tài khoản của tôi</Link>
          </MenuItem>
          <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
        </Menu>
      </div>
      // <div className="relative flex h-full items-center gap-1">
      //   <div className="h-full w-full p-3">
      //     <img
      //       className="h-full w-full overflow-hidden rounded-full ring-1 ring-slate-300"
      //       alt=""
      //       src={
      //         user.profilePicture ||
      //         "https://api.lorem.space/image/face?w=150&h=150"
      //       }
      //     />
      //   </div>
      //   <button onClick={handleUserProfile} className="flex items-center gap-1">
      //     {user.fullname} <HiChevronDown className={userProfile && 'rotate-180 duration-150'} size={20} />
      //   </button>
      //   {userProfile && (
      //     <div className="absolute inset-x-0 right-0 top-full border bg-white p-2 shadow-md">
      //       <button className="text-sm" onClick={handleLogout}>
      //           LOGOUT
      //       </button>
      //     </div>
      //   )}
      // </div>
    );
  }
  const {
    activeMenu,
    setActiveMenu,
    screenSize,
    setScreenSize,
    notifcation,
    setNotifcation,
    userProfile,
    setUserProfile,
  } = useAdminContext();

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenSize < 1024) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleMenu = () => setActiveMenu(!activeMenu);
  const handleNotification = () => setNotifcation(!notifcation);
  return (
    <div className="flex h-16 items-center justify-between border-b bg-white px-2 text-slate-600 lg:px-6">
      {/* left */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleMenu}
          className="rounded-full p-3  duration-200 hover:bg-gray-100 active:scale-95"
        >
          <HiMenuAlt2 size={24} />
        </button>
        {!activeMenu && (
          <div className="inline text-xl font-bold text-slate-800">
            TECHBLOCK
          </div>
        )}
      </div>
      {/* right */}
      <div className="flex h-full items-center justify-between gap-2">
        {/* notification */}
        <button
          onClick={handleNotification}
          className="relative rounded-full p-3 hover:bg-gray-100"
        >
          <span className="absolute right-2.5 top-2.5 inline-flex h-2 w-2 rounded-full bg-red-400" />
          <MdNotifications size={24} />
        </button>
        <UserMenu user={userData} userProfile={userProfile} />
      </div>
    </div>
  );
}
