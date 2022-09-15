import React, { useEffect, useState } from "react";
import { HiArrowUp } from "react-icons/hi";

export default function BacktoTop() {
  const [showScroll, setShowScroll] = useState(false);
  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showScroll]);

  const toTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      {showScroll && (
        <button
          className="fixed bottom-5 right-10 z-50 bg-slate-300 p-2 "
          onClick={toTop}
          title="Back to top"
        >
          <HiArrowUp size={20} />
        </button>
      )}
    </>
  );
}
