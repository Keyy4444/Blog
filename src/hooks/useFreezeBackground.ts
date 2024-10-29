"use client";
import { useEffect } from "react";

const useFreezeBackground = (showModal: boolean) => {
  useEffect(() => {
    if (showModal) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [showModal]);
};

export default useFreezeBackground;
