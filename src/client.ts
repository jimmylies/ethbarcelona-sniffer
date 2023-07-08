import {
    ClientFactory,
    IProvider,
    ProviderType,
    WalletClient,
} from "@massalabs/massa-web3";
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.SECRET_KEY) {
    throw new Error(
        'SECRET_KEY is not set. Did you create environment file ".env" ?'
    );
}

export const baseAccount = await WalletClient.getAccountFromSecretKey(
    process.env.SECRET_KEY
);

const dusanet: Array<IProvider> = [
    {
        url: "https://node.dusa.io/testnet",
        type: ProviderType.PUBLIC,
    },
    {
        url: "https://node.dusa.io/testnet",
        type: ProviderType.PRIVATE,
    },
];

const client = await ClientFactory.createCustomClient(
    dusanet,
    true,
    baseAccount
);

export default client;
