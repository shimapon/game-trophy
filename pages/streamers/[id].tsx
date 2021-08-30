import { useRouter } from "next/router";
import React, { useState } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import { Layout } from "../../components/Layout";
import YoutubeEmbed from "../../components/YoutubeEmbed";
import { Streamer_TYPE, Content } from "../../data/type";

type Props = {
  sdata: Streamer_TYPE;
};

// 文字数制限
const check = (text: string) => {
  if (text.length >= 6) {
    return text.slice(0, 6) + "…";
  } else {
    return text;
  }
};

const contentsList = (
  content: Content[],
  setShowModal: any,
  setModalContent: any
) => {
  const handleonClick = (data: Content) => {
    setModalContent(data);
    setShowModal(true);
  };

  return content.map((data: Content) => {
    return (
      <button
        className="relative m-4"
        key={data.title + "trophy"}
        onClick={() => handleonClick(data)}
      >
        <img
          src={data.thumnail}
          alt={data.title}
          className="w-full h-full object-cover"
        />
        <p
          className="whitespace-nowrap bg-black bg-opacity-50 text-white absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-base p-1"
          key={data.title}
        >
          {check(data.title)}
        </p>
      </button>
    );
  });
};

export async function getStaticPaths() {
  const posts = await require("../../data/streamer.json");

  const paths = posts.map((post: Object, index: number) => ({
    params: { id: String(index) },
  }));

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params }: any = context;
  const posts = await require("../../data/streamer.json");
  const sdata = posts[params.id];

  return { props: { sdata } };
};

const Streamer: React.FC<Props> = ({ sdata }) => {
  const streamer: Streamer_TYPE = sdata;

  const [isComp, setIsComp] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<Content | null>(null);

  console.log(modalContent);

  return (
    <Layout>
      <div className="text-black">
        {/* <p>userId: {router.query.id}</p> */}
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

        {/* Header */}
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
                {streamer.youtubeURL && (
                  <button
                    className="ml-8 transform hover:scale-110 transition-transform"
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
                )}

                {streamer.twitchURL && (
                  <button
                    className="ml-2 transform hover:scale-110 transition-transform"
                    onClick={() => window.open(streamer.twitchURL, "_blank")}
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
              </div>
            </div>
            {/* Tabs */}

            <div className="bg-white transform skew-y-6 mb-7">
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
            {/* Content */}
            {streamer.content && (
              <div className="grid grid-flow-row grid-cols-2 gap-2 place-content-center">
                {isComp &&
                  streamer.content &&
                  contentsList(
                    streamer.content.complete,
                    setShowModal,
                    setModalContent
                  )}
                {!isComp &&
                  streamer.content &&
                  contentsList(
                    streamer.content.challenge,
                    setShowModal,
                    setModalContent
                  )}
              </div>
            )}
            {/* Modal */}
            {showModal && (
              <div
                onClick={() => setShowModal(false)}
                className="fixed inset-0 bg-black flex items-center justify-center"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
              >
                <div className="bg-gray-100 shadow m-4 z-10 w-full lg:w-1/3 md:w-2/3 p-1">
                  {modalContent && (
                    <>
                      <div className="bg-gray-200">
                        <p className="text-black text-2xl text-center">
                          {modalContent.title}
                        </p>
                      </div>
                      <div className="bg-red-200 my-2">
                        <YoutubeEmbed embedId={modalContent.videoID} />
                      </div>
                      <div className="bg-gray-300">
                        <p className="text-black text-lg">
                          {modalContent.description}
                        </p>
                      </div>
                      {modalContent.cleartime && (
                        <div className="bg-gray-300">
                          <p className="text-black text-lg">
                            クリア時間：{modalContent.cleartime}
                          </p>
                        </div>
                      )}
                      {modalContent.playtime && (
                        <div className="bg-gray-400">
                          <p className="text-black text-lg">
                            チャレンジ時間：{modalContent.playtime}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Streamer;
