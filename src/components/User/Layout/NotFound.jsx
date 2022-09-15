import React from "react";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-10">
      <div className="flex flex-col items-center justify-center gap-6 ">
        <div className="text-start font-['Righteous'] text-2xl uppercase">
          Techblock
        </div>
        <div className="text-center">
          <h1 className="font-mono text-8xl font-semibold tracking-wide lg:text-9xl ">
            404
          </h1>
          <h2 className="text-lg font-semibold text-slate-700 lg:text-2xl">
            Oops! Page not found
          </h2>
        </div>
        <Link
          to={"/"}
          className="group relative mt-4 border border-black px-8 py-3 text-sm font-medium uppercase tracking-wide text-white"
        >
          Back to Home
          <div className="absolute inset-0 -z-10 translate-x-2 translate-y-2 bg-primary duration-300 group-hover:translate-y-0 group-hover:translate-x-0"></div>
        </Link>
      </div>
    </div>
  );
}
