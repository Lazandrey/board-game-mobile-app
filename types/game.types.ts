export type SortGameFileds =
  | "rating"
  | "usersrated"
  | "minPlayers"
  | "maxPlayers"
  | "minPlayTime"
  | "maxPlayTime"
  | "weight"
  | "age";
export type GameType = {
  id: string;
  title: string;
  rating: number;
  usersrated: number;
  minPlayers: number;
  maxPlayers: number;
  minPlayTime: number;
  maxPlayTime: number;
  weight: number;
  gameImageUrl: string;
  age: number;
  description: string;
};

export type GameSearchType = {
  title: string;
  sortField: SortGameFileds | null;
  startIndex: number;
  offset: number;
};

export type GameCardType = {
  game: GameType;
  isOverlay?: boolean;
};

export type GetGamesType = {
  gameSearchProps: GameSearchType;
};

export type GetGameType = {
  id: string;
  setGame: (game: GameType) => void;
  setFetchError: (fetchError: number | null) => void;
};
export type SaveEventType = {
  event: EventType;
  setFetchError: (fetchError: number | null) => void;
};

export type EventType = {
  id: string;
  host: { name: string; _id?: string; id: string };
  game: GameType;
  number_persons: number;
  date_time: Date;
  description: string;
  price: number;
  accepted_persons_ids: {
    user: { name: string; id: string };
    user_id: string;
    addedAt: Date;
  }[];
  isCanceled: boolean;
  address: { street: string; city: string; country: string };
  geolocation: {
    coordinates: [number, number];
  };
};

export type GetEventType = {
  id: string;
  setEvent: (event: EventType) => void;
  setFetchError: (fetchError: number | null) => void;
};
export type UpdateEventType = {
  id: string;
  event: EventType;

};
export type GetEventsType = {
  gameTitle?: string;
  dateTime?: Date;
  hostId?: string;
  isCanceled?: boolean;
  userGeolocation?: { longitude: number; latitude: number };
  distance?: number;
};



export type IsUserRegisteredType = {
  eventId: string;
  setIsRegistered: (isRegistered: string) => void;
  setFetchError: (fetchError: number | null) => void;
  setIsShowAddUserButton: (isShowAddUserButton: boolean) => void;
};

export type UserType = {
  id: string;
  name: string;
  email: string;
};

export type GamesSearchOverlayProps = {
  setIsOpen: (isOpen: boolean) => void;
  setSelectedGame: (game: GameType | null) => void;
};

export type UserSignInPropsType = {
  email: string;
  password: string;
};
export type UserSignUpPropsType = {
  name: string;
  email: string;
  password: string;
};
export type UserSignInType = {
  isLoggedIn: boolean;
  token: string;
  email: string;
  username: string;
  userId: string;
  responseMessage?: string | undefined | unknown;
  responseStatus: number;
};

export type UserUpdatePropsType = {
  id: string;
  name: string;
  email: string;
  password: string;
  newPassword: string;
};
