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

const Index: React.FC<Props> = ({ streamers }) => {
  console.log(streamers);

  return (
    <Layout>
      <div>
        {/* アプリの説明 */}
        <p className="text-2xl text-center my-3 text-blue-400">アプリの説明</p>
        <div className="bg-indigo-200 h-36">
          <p className="text-lg">
            大人でもクリアが難しいゲーム・ゲームの一部のコンテンツに加え,
            ストリーマー独自のいろいろな縛りをもうけたゲームなどの「トロフィー」を揃えてあなたのプロフィールを作りましょう！！
          </p>
        </div>
        {/* あなたのプロフィール */}

        <p className="text-2xl text-center my-3 text-blue-400">
          プロフィールを作成する
        </p>
        <Link href="/You" passHref>
          <button className="flex text-black bg-blue-100 border-solid border-2 p-2 border-black rounded  w-min mx-auto hover:bg-black hover:border-white hover:text-white">
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
        {/* Streamer一覧 */}
        <p className="text-2xl text-center my-3 text-blue-400">Streamer一覧</p>
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
                    <div className="cursor-pointer relative group">
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
        <p className="text-2xl text-center my-3 text-blue-400">Trophy一覧</p>

        <Link href="/TrophyList" passHref>
          <div className="text-center">
            <button className=" mx-auto cursor-pointer w-8/12 h-40 bg-blue-300 hover:opacity-50">
              トロフィー一覧を見る
            </button>
          </div>
        </Link>
        <div className="cursor-pointer h-8 mx-auto"></div>
      </div>
      {/* Trophy一覧 */}
    </Layout>
  );
};

export default Index;
