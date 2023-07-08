import React, { useEffect } from "react";
import { Web3ModalContext } from "../../contexts/Web3ModalProvider";
import "./index.css";
import Spinner from "../Spinner";
import results from "../../assets/docs/results.json";

const Collection = () => {
  const [nfts, setNfts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<any[]>([]);
  const properties = [
    "backgroundColor",
    "futuristicLines",
    "femenineShape",
    "geometricFigure",
    "sensualVegetation",
  ];
  const attributesRarity = [
    "globalRarity",
    "globalRarityName",
    "addedMultiplier",
  ];

  const getAttributeCount = (category: string, attribute: string) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].key === category) {
        for (let j = 0; j < data[i].counts.length; j++) {
          if (data[i].counts[j].value === attribute) {
            return data[i].counts[j].count;
          }
        }
      }
    }
    return "Attribute not found";
  };

  const fetchMetadata = async () => {
    setNfts(results);

    const totalStat = await fetch(
      "https://api.primeport.xyz/collection/metafilter/xdc/0xf87f7dd4e47dd5bcac902c381ea0d2730db5c6ad"
    ).then((res) => res.json());

    setData(totalStat);
    setLoading(false);
  };

  useEffect(() => {
    fetchMetadata();
  }, []);

  useEffect(() => {
    if (!loading) {
      const ranksArray: number[] = [];
      nfts.map((nft) => {
        let propertiesRarity = 0;
        properties.map((property) => {
          propertiesRarity += getAttributeCount(
            property,
            nft.asset.metadata.properties[property]
          );
        });
        attributesRarity.map((attribute) => {
          propertiesRarity += getAttributeCount(
            attribute,
            nft.asset.metadata.attributes[attribute]
          );
        });
        ranksArray.push(propertiesRarity);
      });
      const sortedElements = nfts
        .map((element, index) => ({ element, score: ranksArray[index] }))
        .sort((a, b) => a.score - b.score)
        .map((item) => item.element);
      setNfts(sortedElements);
    }
  }, [loading]);

  if (loading) return <Spinner />;

  return (
    <div className="Collection">
      <h1>PrimeNumbers collection</h1>
      <div className="collection-container">
        {nfts.map((nft, index) => (
          <div className="collection-item" key={nft.asset.idAsset + index}>
            <span>Rank {index + 1}</span>
            <img src={nft.asset.files[0].url} alt={nft.asset.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
