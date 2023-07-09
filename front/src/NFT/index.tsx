import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import results from "../assets/docs/results.json";

const NFT = () => {
    const { tokenId } = useParams();
    const [nft, setNft] = useState<any>();

    useEffect(() => {
        const x = results.find(
            (result) => result.asset.idAsset === (tokenId as string)
        );
        setNft(x);
        console.log(x?.asset.metadata.properties);
    }, [tokenId]);

    if (!nft) {
        return <div>Not found</div>;
    }

    return (
        <div>
            <img src={nft?.asset.files[0].url} alt={nft.asset.name} />

            <div className="properties">
                {Object.keys(nft?.asset.metadata.properties).map(
                    (property: any) => (
                        <div className="property">
                            <span>{property}</span>
                            <br />
                            <span>
                                {nft?.asset.metadata.properties[property]}
                            </span>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default NFT;
