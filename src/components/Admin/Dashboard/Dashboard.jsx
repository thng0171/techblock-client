import React from "react";
import Widget from "./Widget";
import RenderLineChart from "./Chart";
import Header from "../Layout/PageHeader";
export default function AdminDashboard() {
  return (
    <div className="space-y-6 p-8">
      <Header largeText={"Bảng điều khiển"} />
      <div className="flex w-full flex-wrap  justify-start gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-4  lg:gap-8">
        {/* toogle menu btn */}
        <Widget type="article" />
        <Widget type="category" />
        <Widget type="user" />
        <Widget type="comment" />
        <div className="hidden sm:block sm:col-span-2">
          <RenderLineChart aspect={2 / 1} title={"Page visitor"} />
        </div>
        <div className="hidden sm:block sm:col-span-2">
          <RenderLineChart aspect={2 / 1} title={"Article"} />
        </div>
      </div>
    </div>
  );
}
