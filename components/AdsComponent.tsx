"use client";

import React, { useEffect } from "react";

interface AdSlotProps {
  adClient: string;
  adSlot: string;
  format?: string;
  responsive?: boolean;
  style?: React.CSSProperties;
}

const AdSlot: React.FC<AdSlotProps> = ({
  adClient,
  adSlot,
  format = "auto",
  responsive = true,
  style = { display: "block" },
}) => {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format={format}
      data-full-width-responsive={responsive ? "true" : "false"}
    ></ins>
  );
};

export default AdSlot;
