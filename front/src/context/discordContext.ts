import { createContext } from "react";

export interface DiscordUserContextType {
  discordUser: string;
  setDiscordUser: (discordUser: string) => void;
}

export const DiscordUserContext = createContext<DiscordUserContextType>({
  discordUser: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDiscordUser: () => {},
});
