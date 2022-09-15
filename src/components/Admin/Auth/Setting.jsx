import React from "react";
import ChangePasswordAdmin from "./CPasswordAdmin";
import InfoAdmin from "./InfoAdmin";

export default function Setting() {
  return (
    <div className="p-8">
      <InfoAdmin />
      <ChangePasswordAdmin />
    </div>
  );
}
