import React from "react";

export default function PageHeader({ text, largeText }) {
  return (
    <div className="inline-block">
      <div className="text-sm font-medium text-slate-500">{text}</div>
      <div className="text-[1.75rem] font-bold leading-tight tracking-tight">
        {largeText}
      </div>
    </div>
  );
}
