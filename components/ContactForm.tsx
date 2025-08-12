"use client";
import { createComment } from "@/utils/actions";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import SubmitBtn from "./SubmitBtn";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const success = searchParams.get("success");
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (success && ref.current) {
      ref.current.reset();
    }
  }, [success]);

  return (
    <div className="max-w-4xl mx-auto p-5 py-16 ">
      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-5">
          <p className="font-bold">Success</p>
          <p>Your message has been sent successfully.</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-5">
          <h1 className="text-2xl font-bold">Leave a Message</h1>
          <form
            action={createComment}
            method="POST"
            className="space-y-4"
            ref={ref}
          >
            <div className="form-label">
              <input
                type="text"
                placeholder="Enter Your Name"
                className="input input-bordered focus:ring-blue-600 w-full p-2"
                name="name"
                required
              />
            </div>
            <div className="form-label">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="input input-bordered focus:ring-blue-600 w-full p-2"
                name="email"
                required
              />
            </div>
            <div className="form-label">
              <textarea
                placeholder="Enter Your Message"
                className="textarea textarea-bordered focus:ring-blue-600 w-full p-2"
                name="message"
                required
              ></textarea>
            </div>
            <SubmitBtn />
          </form>
        </div>

        <div className="space-y-5">
          <h2 className="text-2xl font-bold">Reach Us</h2>
          <p className="text-gray-700">
            Email:{" "}
            <a
              href="mailto:khanrajahamza52@gmail.com"
              className="text-blue-600"
            >
              khanrajahamza52@gmail.com
            </a>
          </p>
          <p className="text-gray-700">
            Phone:{" "}
            <a href="tel:+92 312 5608356" className="text-blue-600">
              +92 312 5608356
            </a>
          </p>
          <p className="text-gray-700">
            Address:{" "}
            <span className="text-blue-600">
              1234, Main Street, Muzaffrabad, AJK
            </span>
          </p>

          <h3>Social Media</h3>

          <div className="space-x-3 flex">
            <Link
              href="https://www.youtube.com/@EducationWithHamza-g8v"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </Link>
            <Link
              href="https://www.facebook.com/profile.php?id=61566559002640"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
