import { GetStaticProps } from "next";
import Link from "next/link";
import { Layout } from "../components/Layout";

// ページコンポーネントに渡されるデータ
type Props = {
  streamers: { name: string; channelID: string; bannerURL: string }[];
};

// この関数がビルド時に呼び出され、戻り値の props の値がページコンポーネントに渡される
export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const streamers = await require("../data/streamer.json");

  if (!streamers) {
    return {
      notFound: true,
    };
  }

  for (const [index, streamer] of streamers.entries()) {
    const res = await fetch(
      "https://www.googleapis.com/youtube/v3/channels?part=" +
        "snippet" +
        "&id=" +
        streamers[index].channelID +
        "&key=" +
        process.env.YOUTUBE_API_KEY
    );
    const data = await res.json();

    if (!data) {
      return {
        notFound: true,
      };
    }
    streamers[index].bannerURL = data.items[0].snippet.thumbnails.default.url;
  }

  return {
    props: { streamers }, // will be passed to the page component as props
  };
};

// 文字数制限
const check = (text: string) => {
  if (text.length >= 7) {
    return text.slice(0, 7) + "…";
  } else {
    return text;
  }
};

const heading2 = (text: string, textcolor: string, Icon: any) => {
  return (
    <h2 className={"text-3xl my-3 flex ml-3 " + textcolor}>
      {Icon}
      <div className="ml-2 font-serif">{text}</div>
    </h2>
  );
};

const Index: React.FC<Props> = ({ streamers }) => {
  return (
    <Layout>
      <div>
        <div className="bg-primary-dark pb-6">
          <h1 className="title text-3xl mx-auto text-primary-contrastText">
            難関
            <br />
            ゲームズ
          </h1>
        </div>
        {/* About */}
        {heading2(
          "About",
          "text-secondary-contrastText",
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        <div className="font-serif ont-bold justify-center flex mx-auto p-3 text-3xl text-secondary-contrastText my-2 w-11/12 border-t-2 border-b-2 border-black">
          ゲーマープロフ作成
          <svg
            className="h-8 w-8 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <path
              fill="currentColor"
              d="M480.07 96H160a160 160 0 10114.24 272h91.52A160 160 0 10480.07 96zM248 268a12 12 0 01-12 12h-52v52a12 12 0 01-12 12h-24a12 12 0 01-12-12v-52H84a12 12 0 01-12-12v-24a12 12 0 0112-12h52v-52a12 12 0 0112-12h24a12 12 0 0112 12v52h52a12 12 0 0112 12zm216 76a40 40 0 1140-40 40 40 0 01-40 40zm64-96a40 40 0 1140-40 40 40 0 01-40 40z"
            />
          </svg>
        </div>

        <div className="font-serif justify-center flex mx-auto p-3 text-3xl text-secondary-contrastText my-2 w-11/12 border-t-2 border-b-2 border-black">
          <svg
            aria-hidden="true"
            data-prefix="fas"
            data-icon="trophy"
            className="h-8 w-8 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path
              fill="currentColor"
              d="M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24zM99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-15.1-5.2-29.2-12.4-41.7-21.4zM512 144c0 16.1-17.7 36.1-35.3 48.8-12.5 9-26.7 16.2-41.8 21.4 7-25 11.8-53.6 12.8-86.2H512v16z"
            />
          </svg>
          <b>難関</b>トロフィー
        </div>

        <div className="font-serif justify-center flex mx-auto p-3 text-3xl text-secondary-contrastText my-2 w-11/12 border-t-2 border-b-2 border-black">
          <b>実況者</b>オリジナル
          <svg
            className="h-8 w-8 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M256 112a56 56 0 10-56-56 56 56 0 0056 56zm176 336H80a16 16 0 00-16 16v32a16 16 0 0016 16h352a16 16 0 0016-16v-32a16 16 0 00-16-16zm72.87-263.84l-28.51-15.92c-7.44-5-16.91-2.46-22.29 4.68a47.59 47.59 0 01-47.23 18.23C383.7 186.86 368 164.93 368 141.4a13.4 13.4 0 00-13.4-13.4h-38.77c-6 0-11.61 4-12.86 9.91a48 48 0 01-93.94 0c-1.25-5.92-6.82-9.91-12.86-9.91H157.4a13.4 13.4 0 00-13.4 13.4c0 25.69-19 48.75-44.67 50.49a47.5 47.5 0 01-41.54-19.15c-5.28-7.09-14.73-9.45-22.09-4.54l-28.57 16a16 16 0 00-5.44 20.47L104.24 416h303.52l102.55-211.37a16 16 0 00-5.44-20.47z"
            />
          </svg>
        </div>

        {/* Create */}
        {heading2(
          "Create",
          "text-secondary-contrastText",

          <svg
            className="h-8 w-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path
              fill="currentColor"
              d="M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-352 96c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64zm112 236.8c0 10.6-10 19.2-22.4 19.2H86.4C74 384 64 375.4 64 364.8v-19.2c0-31.8 30.1-57.6 67.2-57.6h5c12.3 5.1 25.7 8 39.8 8s27.6-2.9 39.8-8h5c37.1 0 67.2 25.8 67.2 57.6v19.2zM512 312c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-64c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-64c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z"
            />
          </svg>
        )}
        <Link href="/You" passHref>
          <button className="flex text-primary-contrastText bg-secondary-dark border-solid border-2 p-4 rounded w-min mx-auto shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 my-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 ml-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
        </Link>

        <div className="relative h-0 my-8">
          <div className="Block2 h-36 absolute" style={{ zIndex: -1 }}></div>
        </div>
        {/* Streamer一覧 */}
        <div className="bg-primary">
          {heading2(
            "Streamer",
            "text-primary-contrastText",
            <svg
              className="h-8 w-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M192 208c0-17.67-14.33-32-32-32h-16c-35.35 0-64 28.65-64 64v48c0 35.35 28.65 64 64 64h16c17.67 0 32-14.33 32-32V208zm176 144c35.35 0 64-28.65 64-64v-48c0-35.35-28.65-64-64-64h-16c-17.67 0-32 14.33-32 32v112c0 17.67 14.33 32 32 32h16zM256 0C113.18 0 4.58 118.83 0 256v16c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-16c0-114.69 93.31-208 208-208s208 93.31 208 208h-.12c.08 2.43.12 165.72.12 165.72 0 23.35-18.93 42.28-42.28 42.28H320c0-26.51-21.49-48-48-48h-32c-26.51 0-48 21.49-48 48s21.49 48 48 48h181.72c49.86 0 90.28-40.42 90.28-90.28V256C507.42 118.83 398.82 0 256 0z"
              />
            </svg>
          )}
          <div className="grid grid-flow-row grid-cols-2 gap-2 mx-2">
            {streamers &&
              streamers.map(
                (
                  streamer: {
                    name: string;
                    channelID: string;
                    bannerURL: string;
                  },
                  index
                ) => {
                  return (
                    <Link
                      href={"/streamers/" + index}
                      passHref
                      key={streamer.name + "_card"}
                    >
                      <div className="cursor-pointer relative group shadow">
                        <img
                          src={streamer.bannerURL}
                          alt={streamer.name}
                          className="opacity-75 object-cover w-full h-20 group-hover:opacity-50"
                        />
                        <p className="whitespace-nowrap font-serif text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-base p-2 opacity-100 border-solid border-2">
                          {check(streamer.name)}
                        </p>
                      </div>
                    </Link>
                  );
                }
              )}
          </div>
        </div>
      </div>

      <div className="relative h-0 my-8">
        <div
          className="Block2 h-36 absolute -top-20"
          style={{ zIndex: -1 }}
        ></div>
      </div>
      {/* Trophy一覧 */}
      {heading2(
        "Trophy",
        "text-primary-contrastText",
        <svg
          aria-hidden="true"
          data-prefix="fas"
          data-icon="trophy"
          className="h-8 w-8"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            fill="currentColor"
            d="M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24zM99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-15.1-5.2-29.2-12.4-41.7-21.4zM512 144c0 16.1-17.7 36.1-35.3 48.8-12.5 9-26.7 16.2-41.8 21.4 7-25 11.8-53.6 12.8-86.2H512v16z"
          />
        </svg>
      )}
      <Link href="/TrophyList" passHref>
        <div className="text-center text-4xl text-primary-contrastText">
          <button className="border-primary-contrastText border-double border-8 mx-auto cursor-pointer w-10/12 h-32 bg-primary-dark bg-opacity-90 rounded">
            <div
              className="flex flex-initial mx-auto w-max font-bold"
              style={{
                backgroundImage:
                  "-webkit-linear-gradient(315deg,#b8751e 0%, #ffce08 37%,  #fefeb2 47%,  #fafad6 50%, #fefeb2 53%,  #e1ce08 63%,  #b8751e 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Trophy List
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 ml-3 mt-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </button>
        </div>
      </Link>

      <div className="cursor-pointer h-8 mx-auto"></div>
    </Layout>
  );
};

export default Index;
