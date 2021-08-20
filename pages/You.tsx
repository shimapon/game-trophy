import { useRouter } from "next/router";
import React, { useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import { Layout } from "../components/Layout";

const You: React.FC = () => {
  const [isComp, setIsComp] = useState(true);
  const [modalContent, setModalContent] = useState<{
    title: string;
    thumnail: string;
    description: string;
    videoID: string;
  } | null>(null);

  console.log(modalContent);

  return (
    <Layout>
      <div className="text-white">
        <div className="relative">
          <Link href="/" passHref>
            <div className="absolute z-10 cursor-pointer">
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
            </div>
          </Link>
        </div>
        <div className="relative mb-8">
          <div className="h-24 w-full"></div>
          <div className="mt-4 w-full bg-opacity-50 bg-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center">
            <p className="text-4xl text-center my-3">あなた</p>
          </div>
        </div>
        {/* Tabs */}
        <div className="bg-white transform skew-y-6 mb-4">
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
                挑戦中
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
                挑戦中
              </button>
            </nav>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default You;
