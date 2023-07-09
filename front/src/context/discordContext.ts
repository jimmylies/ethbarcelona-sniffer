import { createContext } from "react";

export type DiscordUser = {
    id: string;
    username: string;
};
export interface DiscordUserContextType {
    discordUser?: DiscordUser;
    setDiscordUser: (discordUser: DiscordUser) => void;
}

export const DiscordUserContext = createContext<DiscordUserContextType>({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setDiscordUser: () => {},
});
