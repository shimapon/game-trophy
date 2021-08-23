import { GetStaticProps } from "next";
import Link from "next/link";
import React, { useState } from "react";

import { Layout } from "../components/Layout";

import { TrophyInfo } from "../data/type";

type Props = {
  gamesdata: TrophyInfo[];
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const gamesdata = await require("../data/trophy.json");

  if (!gamesdata) {
    return {
      notFound: true,
    };
  }

  return {
    props: { gamesdata },
  };
};

const handleClickTrophy = (
  data: TrophyInfo,
  setShowModal: any,
  setModalContent: any
) => {
  setModalContent(data);
  setShowModal(true);
};

const TrophyList: React.FC<Props> = ({ gamesdata }) => {
  console.log(gamesdata);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<TrophyInfo | null>(null);

  return (
    <Layout>
      <div className=" text-white">
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
        <p className="text-4xl text-center bg-gray-600 my-2">Game Trophy</p>

        <div className="grid grid-flow-row grid-cols-1 gap-2 mx-6">
          {gamesdata &&
            gamesdata.map((gamedata) => {
              return (
                <button
                  onClick={() =>
                    handleClickTrophy(gamedata, setShowModal, setModalContent)
                  }
                  className=" bg-gray-700 shadow-md  rounded-3xl p-4 group"
                  key={gamedata.Title + "_key"}
                >
                  <div className="flex">
                    <div className="flex-1 h-full w-full">
                      <img
                        src={gamedata.thumnail}
                        alt={gamedata.shortTitle + "IMG"}
                        className="object-cover h-32 w-full rounded-2xl group-hover:opacity-50"
                      />
                    </div>
                    <div className="flex-1 ml-3 justify-evenly py-2">
                      <div className="flex flex-wrap ">
                        <p className="text-white flex-auto text-lg md:text-xl font-bold font-serif">
                          {gamedata.shortTitle}
                        </p>
                        <div className="w-full text-xs text-white font-medium text-right hidden md:block ">
                          {gamedata.game_name}
                        </div>
                      </div>
                      <div className="flex pt-4  text-sm text-gray-500">
                        <div className="flex-1 inline-flex">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                            />
                          </svg>
                          <p className="">難易度</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
        </div>
        {showModal && (
          <div
            onClick={() => setShowModal(false)}
            className="fixed inset-0 bg-black flex items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-100 shadow m-4 z-10 w-full p-1 h-2/3 overflow-y-auto"
            >
              {modalContent && (
                <div className="">
                  <div className="bg-gray-200">
                    <p className="text-black text-2xl text-center">
                      {modalContent.shortTitle}
                    </p>
                  </div>
                  <div className="bg-gray-200 my-2">
                    <img
                      src={modalContent.thumnail}
                      alt={modalContent.shortTitle}
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="bg-gray-300">
                    <p className="text-black text-base">
                      {modalContent.description}
                    </p>
                  </div>
                  <div className="bg-gray-200  my-2">
                    <p className="text-black text-base">
                      Game Data（開いて表示）↓
                    </p>
                  </div>
                  <div className="bg-gray-400  my-2">
                    <p className="text-black text-lg text-center">
                      {modalContent.game_name}
                    </p>
                  </div>
                  <div className="bg-gray-100">
                    <img
                      src={modalContent.gameIMG}
                      alt={modalContent.shortTitle + "_GAMEIMG"}
                      className="w-3/4 mx-auto"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TrophyList;
