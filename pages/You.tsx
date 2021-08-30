import { useRouter } from "next/router";
import React, { useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import { Layout } from "../components/Layout";

const You: React.FC = () => {
  const [isComp, setIsComp] = useState(true);
  const [isEdit, setIsEdit] = useState(true);
  const [modalContent, setModalContent] = useState<{
    title: string;
    thumnail: string;
    description: string;
    videoID: string;
  } | null>(null);

  const [name, setName] = useState("");
  const [yID, setYID] = useState("");
  const [twitchID, setTwitchID] = useState("");
  const [twitterID, setTwitterID] = useState("");

  console.log(modalContent);

  const handleChange = (
    event: {
      target: { value: React.SetStateAction<string> };
    },
    setFunc: Function
  ) => {
    setFunc(event.target.value);
  };

  return (
    <Layout>
      <div className="text-black">
        <div className="relative">
          {isEdit && (
            <Link href="/" passHref>
              <div className="absolute z-10 cursor-pointer text-white">
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
          )}

          {!isEdit && (
            <button className="absolute z-10" onClick={() => setIsEdit(true)}>
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
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          )}
        </div>
        {isEdit && (
          <div>
            <div className="mx-auto max-w-md px-6 py-12 bg-black border-0 shadow-lg">
              <h1 className="text-2xl font-bold mb-8">Edit</h1>
              <form id="form">
                <div className="relative z-0 w-full mb-5">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleChange(e, setName)}
                    className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                  />
                  {name.length === 0 && (
                    <label className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">
                      Enter yourname
                    </label>
                  )}
                  <span className="text-sm text-red-600 hidden" id="error">
                    Name is required
                  </span>
                </div>

                <div className="relative z-0 w-full mb-5">
                  <input
                    type="text"
                    value={yID}
                    onChange={(e) => handleChange(e, setYID)}
                    className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                  />
                  {yID.length === 0 && (
                    <label className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">
                      Enter Youtube channelID(あれば)
                    </label>
                  )}
                  <span className="text-sm text-red-600 hidden" id="error">
                    Enter Youtube channelID is required
                  </span>
                </div>

                <div className="relative z-0 w-full mb-5">
                  <input
                    type="text"
                    value={twitchID}
                    onChange={(e) => handleChange(e, setTwitchID)}
                    className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                  />
                  {twitchID.length === 0 && (
                    <label className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">
                      Enter Twitch channelID(あれば)
                    </label>
                  )}
                  <span className="text-sm text-red-600 hidden" id="error">
                    Enter Twitch channelID is required
                  </span>
                </div>

                <div className="relative z-0 w-full mb-5">
                  <input
                    type="text"
                    value={twitterID}
                    onChange={(e) => handleChange(e, setTwitterID)}
                    className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                  />
                  {twitterID.length === 0 && (
                    <label className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500">
                      Enter TwitterID(あれば)
                    </label>
                  )}
                  <span className="text-sm text-red-600 hidden" id="error">
                    Enter TwitterID is required
                  </span>
                </div>
                <button
                  onClick={() => setIsEdit(false)}
                  id="button"
                  type="button"
                  className="w-full px-6 py-3 mt-3 text-lg text-white transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-blue-500 hover:bg-blue-600 hover:shadow-lg focus:outline-none"
                >
                  Done
                </button>
              </form>
            </div>
          </div>
        )}
        {!isEdit && (
          <>
            <div className="relative mb-8">
              {/* HeaderIMG */}
              <div className="h-24 w-full"></div>
              {/* Header */}
              <div className="mt-4 w-full bg-opacity-50 bg-gray-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center">
                <p className="text-4xl text-center my-3">
                  {name !== "" ? name : "名無しさん"}
                </p>
                {yID !== "" && (
                  <button
                    className="ml-8 transform hover:scale-110 transition-transform"
                    onClick={() =>
                      window.open(
                        "https://www.youtube.com/channel/" + yID!,
                        "_blank"
                      )
                    }
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
                )}

                {twitchID !== "" && (
                  <button
                    className="ml-2 transform hover:scale-110 transition-transform"
                    onClick={() =>
                      window.open(
                        "https://www.twitch.tv/" + twitchID!,
                        "_blank"
                      )
                    }
                  >
                    <div
                      className="w-12 rounded"
                      style={{ backgroundColor: "#9047ff" }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 py-1 mx-auto"
                      >
                        <path
                          fill="#3b1c69"
                          d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"
                        />
                      </svg>
                    </div>
                  </button>
                )}
                {twitterID !== "" && (
                  <button
                    className="ml-2 transform hover:scale-110 transition-transform"
                    onClick={() =>
                      window.open("https://twitter.com/" + twitterID!, "_blank")
                    }
                  >
                    <div
                      className="w-12 rounded"
                      style={{ backgroundColor: "#1DA1F2" }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 py-1 mx-auto"
                      >
                        <path
                          fill="#073a59"
                          d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                        />
                      </svg>
                    </div>
                  </button>
                )}
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
            {/* Content */}
          </>
        )}
      </div>
    </Layout>
  );
};

export default You;
