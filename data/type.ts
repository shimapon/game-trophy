export type Streamer_TYPE = {
  name: string;
  channelID: string;
  youtubeURL?: string;
  twitchURL?: string;
  bannerURL: string;
  content?: {
    complete: Content[];
    challenge: Content[];
  };
};

export type Content = {
  thumnail: string;
  title: string;
  description: string;
  videoID: string;
  cleartime?: string;
  playtime?: string;
};

export type TrophyInfo = {
  Title: string;
  shortTitle: string;
  thumnail: string;
  description: string;
  gameIMG?: string;
  game_name: string;
};
