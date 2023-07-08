import {
    Args,
    EOperationStatus,
    IAccount,
    MassaUnits,
    WalletClient,
} from "@massalabs/massa-web3";
import client from "./client.js";
import { tokens } from "./config.js";

export const generateWallet = async (): Promise<IAccount> => {
    return WalletClient.walletGenerateNewAccount();
};

export const sendMAS = async (address: string): Promise<void> => {
    await client.wallet().sendTransaction({
        amount: BigInt(1000) * MassaUnits.oneMassa,
        fee: MassaUnits.mMassa,
        recipientAddress: address,
    });
};

export const sendTokens = async (address: string): Promise<void> => {
    const promises = tokens.map(async (token) => {
        const txId = await client.smartContracts().callSmartContract({
            targetAddress: token.address,
            functionName: "mint",
            parameter: new Args()
                .addString(address)
                .addU64(BigInt(token.amount * 10 ** 9))
                .serialize(),
            fee: MassaUnits.mMassa,
            coins: BigInt(0),
            maxGas: BigInt(100_000_000),
        });

        const status = await client
            .smartContracts()
            .awaitRequiredOperationStatus(
                txId,
                EOperationStatus.INCLUDED_PENDING
            );
        console.log(status);

        client
            .smartContracts()
            .getFilteredScOutputEvents({
                original_operation_id: txId,
                emitter_address: null,
                end: null,
                start: null,
                is_final: null,
                original_caller_address: null,
            })
            .then((events) => console.log(events.map(event => event.data)));
    });
    await Promise.all(promises);
};
