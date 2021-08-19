import { useRouter } from "next/router";
import React, { useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";

// 文字数制限
const check = (text: string) => {
  if (text.length >= 6) {
    return text.slice(0, 6) + "…";
  } else {
    return text;
  }
};
const Streamer: React.FC = () => {
  const res = require("../../data/streamer.json");
  const router = useRouter();
  const streamer = res[String(router.query.id)];

  const [isComp, setIsComp] = useState(true);

  console.log(streamer);

  return (
    <div className="text-white">
      {/* <p>userId: {router.query.id}</p> */}
      <Link href="/List" passHref>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 m-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </Link>
      {streamer && (
        <>
          <div className="relative mb-8">
            <img
              src={streamer.bannerURL}
              alt=""
              className="absolute object-cover opacity-40 h-36 w-full"
            />
            <div className="h-24 w-full"></div>
            <div className="mt-4 w-full bg-opacity-50 bg-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center">
              <p className="text-4xl text-center my-3">{streamer.name}</p>
              <button
                className="ml-8"
                onClick={() => window.open(streamer.youtubeURL, "_blank")}
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 px-2 rounded"
                  style={{ backgroundColor: "#FF0000" }}
                >
                  <path
                    fill="#4f0505"
                    d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="bg-white transform skew-y-6 mb-2">
            {isComp && (
              <nav className="grid grid-flow-row grid-cols-2">
                <button className="py-2 text-white block bg-blue-500 font-bold">
                  達成!!
                </button>
                <div
                  className="block absolute left-1/2 bottom-0 border-solid"
                  style={{
                    borderBottom: "20px solid transparent",
                    borderRight: "3vw solid transparent",
                    borderLeft:
                      "3vw solid rgba(59, 130, 246, var(--tw-bg-opacity))",
                    borderTop:
                      "20px solid rgba(59, 130, 246, var(--tw-bg-opacity))",
                  }}
                ></div>
                <button
                  onClick={() => setIsComp(false)}
                  className="py-2 text-blue-500 block font-bold"
                >
                  挑戦中・未達成
                </button>
              </nav>
            )}
            {!isComp && (
              <nav className="grid grid-flow-row grid-cols-2">
                <button
                  onClick={() => setIsComp(true)}
                  className="py-2 text-blue-500 block font-bold"
                >
                  達成!!
                </button>
                <div
                  className="block absolute left-1/2 bottom-0 border-solid"
                  style={{
                    borderBottom:
                      "20px solid  rgba(59, 130, 246, var(--tw-bg-opacity))",
                    borderRight:
                      "3vw solid  rgba(59, 130, 246, var(--tw-bg-opacity))",
                    borderLeft: "3vw solid #fff",
                    borderTop: "20px solid  #fff",
                  }}
                ></div>
                <button className="py-2 text-white block bg-blue-500 font-bold">
                  挑戦中・未達成
                </button>
              </nav>
            )}
          </div>
          <div className="grid grid-flow-row grid-cols-2 gap-2">
            {isComp &&
              streamer.content.complete.map(
                (data: { thumnail: string; title: string }) => {
                  return (
                    <div className="relative m-4" key={data.title + "trophy"}>
                      <img src={data.thumnail} alt="" />
                      <p
                        className="whitespace-nowrap bg-black bg-opacity-50 text-white absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-base p-1"
                        key={data.title}
                      >
                        {check(data.title)}
                      </p>
                    </div>
                  );
                }
              )}
            {!isComp &&
              streamer.content.challenge.map(
                (data: { thumnail: string; title: string }) => {
                  return (
                    <div className="relative m-4" key={data.title + "trophy"}>
                      <img src={data.thumnail} alt="" />
                      <p
                        className="whitespace-nowrap bg-black bg-opacity-50 text-white absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-base p-1"
                        key={data.title}
                      >
                        {check(data.title)}
                      </p>
                    </div>
                  );
                }
              )}
          </div>
        </>
      )}
    </div>
  );
};

export default Streamer;
