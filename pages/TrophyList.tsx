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
        <p className="text-4xl text-center bg-gray-800 my-2">Game Trophy</p>
        <div className="grid grid-flow-row grid-cols-2 gap-2 mx-2">
          {gamesdata &&
            gamesdata.map((gamedata) => {
              return (
                <button
                  onClick={() =>
                    handleClickTrophy(gamedata, setShowModal, setModalContent)
                  }
                  className="relative"
                  key={gamedata.Title + "_key"}
                >
                  <img
                    src={gamedata.thumnail}
                    alt={gamedata.shortTitle + "IMG"}
                    className="opacity-60"
                  />
                  <p className="whitespace-nowrap font-serif text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-base p-2 opacity-100 border-solid border-2">
                    {gamedata.shortTitle}
                  </p>
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
            <div className="bg-gray-100 shadow m-4 z-10 w-full p-1 h-96 overflow-y-auto">
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
