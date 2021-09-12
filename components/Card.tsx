import React from "react";

type Props = {
  Icon: any;
  text: string;
};

const Card: React.FC<Props> = ({ text, Icon }) => (
  <div
    style={{
      background: "linear-gradient(to top, #fafafa 40%, #ebebec 55%)",
    }}
    className="rounded-xl shadow my-3 text-white font-bold w-8/12 mx-auto p-1 border-2 border-gray-300"
  >
    <div className="rounded-xl flex justify-center items-center h-20 bg-gray-400 shadow-inner">
      <p className="text-3xl font-myo">{text}</p>
      <Icon />
    </div>
  </div>
);

export default Card;
