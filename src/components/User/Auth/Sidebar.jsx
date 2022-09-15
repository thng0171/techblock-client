import React from "react";
import { NavLink } from "react-router-dom";

export function Sidebar() {
  const tabClassname = ({ isActive }) => {
    return `px-6 py-3 border-l-4 border-transparent hover:bg-slate-50 ${
      isActive ? " border-l-teal-500 font-semibold" : "bg-white"
    }`;
  };
  return (
    <div className="flex w-72 flex-col py-4">
      <NavLink to="/profile/edit" className={tabClassname}>
        Chỉnh sửa thông tin
      </NavLink>
      <NavLink to="/profile/change-password" className={tabClassname}>
        Đổi mật khẩu
      </NavLink>
    </div>
  );
}
