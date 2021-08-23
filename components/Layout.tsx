import Head from "next/head";
import React, { useEffect, useState, useContext } from "react";

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  // 副作用フック（初期マウント時に実行）
  React.useEffect(() => {}, []);

  return (
    <>
      <Head>
        <title>Gama Trophy -難関のゲーム-</title>
        <meta
          name="description"
          content="あなたのゲーマープロフィールを作ってみましょう"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="lg:w-1/3 md:w-2/3 mx-auto "
        style={{ minHeight: "-webkit-fill-available" }}
      >
        {children}
      </div>
    </>
  );
};
