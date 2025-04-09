"use client";
import { useEffect } from "react";
import Head from "next/head"; // Import from next/head
import Script from "next/script"; // Import Script from next/script

const GoogleAds = () => {
  useEffect(() => {
    // Push ad code once the component is mounted on the client
    if (typeof window !== "undefined" && window.adsbygoogle) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);

  return (
    <>
      <Head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7339717436236652"
          crossOrigin="anonymous"
        />
      </Head>
    </>
  );
};

export default GoogleAds;
