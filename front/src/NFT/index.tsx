import { useEffect } from "react";
import { useParams } from "react-router-dom";
import results from "../assets/docs/results.json";
import { parse } from "path";

const NFT = () => {
    const { tokenId } = useParams();

    useEffect(() => {
        const index = parseInt(tokenId as string);
        console.log(results[index - 1]);
    }, [tokenId]);

    return <div>{tokenId}</div>;
};

export default NFT;
