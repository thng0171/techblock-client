import React from "react";
import {
  MdArticle,
  MdDashboard,
  MdCategory,
  MdComment,
  MdGroup,
  MdSettings,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useAdminContext } from "../../../context/AdminContext";

export default function Sidebar() {
  const { activeMenu, setActiveMenu, screenSize } = useAdminContext();
  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 1024) {
      setActiveMenu(false);
    }
  };

  return (
    <>
      {/* overlay */}
      {activeMenu && (
        <div
          onClick={handleCloseSideBar}
          className="fixed inset-0 -z-10 cursor-pointer bg-black/20 lg:hidden"
        ></div>
      )}
      {/* sidebar */}
      {activeMenu && (
        <div
          className={`z-50 min-h-screen h-full overflow-y-auto bg-slate-900 text-slate-100 `}
        >
          {/* techblock logo */}
          <div className="my-6 mx-6 select-none tracking-wide">
            <div className="text-2xl font-bold ">TECHBLOCK</div>
            {/* admin text */}
            <div className="text-lg font-medium text-teal-300">Admin</div>
          </div>
          {/* menu*/}
          <div className="">
            {/* <div className="text-xs text-slate-400">MAIN MENU</div> */}
            <div className="space-y-1 text-slate-200">
              {/* dashboard */}
              <SidebarItem path="/admin">
                <MdDashboard size={24} /> Bảng điều khiển
              </SidebarItem>
              {/* articles items */}
              <SidebarItem path="articles">
                <MdArticle size={24} /> Bài viết
              </SidebarItem>
              {/* category items */}
              <SidebarItem path="category">
                <MdCategory size={24} /> Thể loại
              </SidebarItem>
              {/* comments items */}
              <SidebarItem path="comments">
                <MdComment size={24} /> Bình luận
              </SidebarItem>
              {/* users items */}
              <SidebarItem path="users">
                <MdGroup size={24} /> Danh sách user
              </SidebarItem>
              {/* Setting */}
              <SidebarItem path="setting">
                <MdSettings size={24} /> Cài đặt
              </SidebarItem>
            </div>
          </div>
        </div>
      )}
    </>
  );

  function SidebarItem({ path, children }) {
    return (
      <NavLink
        onClick={handleCloseSideBar}
        to={path}
        className={`flex items-center gap-3 px-6 py-3 capitalize hover:bg-slate-800`}
      >
        {children}
      </NavLink>
    );
  }
}
