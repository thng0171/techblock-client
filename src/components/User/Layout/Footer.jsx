import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="relative mx-auto max-w-screen-xl px-4 py-10 sm:px-6 lg:px-8 lg:pt-12">
      
        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <div className="flex justify-center text-teal-300 lg:justify-start">
              <div className="flex justify-center text-teal-300 sm:justify-start">
                <div className="flex select-none items-center gap-1 font-['Righteous'] text-2xl font-medium uppercase tracking-wide  lg:text-[1.75rem]">
                  <span>Tech</span>
                  <span className="text-slate-50">Block</span>
                </div>
              </div>
            </div>
            <p className="mx-auto mt-3 max-w-md text-center leading-relaxed text-gray-400 lg:text-left">
              TechBlock - Trang thông tin dành cho tín đồ công nghệ
            </p>
          </div>
          <nav className="mt-12 lg:mt-0" aria-labelledby="footer-navigation">
            <h2 className="sr-only" id="footer-navigation">
              Footer navigation
            </h2>
            <ul className="flex flex-wrap justify-center gap-6 md:gap-8 lg:justify-end lg:gap-12">
              <li>
                <a
                  className="text-white transition hover:text-white/75"
                  href="/"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  className="text-white transition hover:text-white/75"
                  href="/"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  className="text-white transition hover:text-white/75"
                  href="/"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  className="text-white transition hover:text-white/75"
                  href="/"
                >
                  News
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <p className="mt-6 text-center text-sm text-gray-400 lg:text-right">
          Copyright © 2022. All rights reserved.
        </p>
      </div>
    </footer>

    // <footer className="bg-gray-900">
    //   <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
    //     <div className="sm:flex sm:items-center sm:justify-between">
    //       <div className="flex justify-center text-teal-300 sm:justify-start">
    //         <div className="flex select-none items-center gap-1 px-4 font-['Righteous'] text-2xl font-medium uppercase tracking-wide  lg:text-[1.75rem]">
    //           <span>Tech</span>
    //           <span className="text-slate-50">Block</span>
    //         </div>
    //       </div>
    //       <p className="mt-4 text-center text-sm text-gray-400 lg:mt-0 lg:text-right">
    //         Copyright © 2022. All rights reserved.
    //       </p>
    //     </div>
    //   </div>
    // </footer>
  );
}
