"use client";
import React, { useEffect } from "react";

const Adsense = () => {
  useEffect(() => {
    const loadAdScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initializeAd = async () => {
      try {
        await loadAdScript();

        const adElement = document.querySelector(".adsbygoogle");

        if (adElement && !adElement.querySelector("iframe")) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (error) {
        console.error("Failed to load AdSense script", error);
      }
    };

    initializeAd();

    return () => {};
  }, []);

  return (
    <div
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="your-ad-client-id"
      data-ad-slot="your-ad-slot-id"
    />
  );
};

export default Adsense;
