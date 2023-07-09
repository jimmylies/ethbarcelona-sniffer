import React, { useContext, useEffect } from "react";
import { Web3ModalContext } from "../../contexts/Web3ModalProvider";
import "./index.css";
import Spinner from "../Spinner";
import results from "../../assets/docs/results.json";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { trpc } from "../../utils/trpc";
import { Link } from "react-router-dom";
import { DiscordUserContext } from "../../context/discordContext";

const Collection = () => {
  const [nfts, setNfts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<any[]>([]);
  const [rankValue, setRankValue] = React.useState<number>(0);
  const [priceValue, setPriceValue] = React.useState<number>(0);

  const { discordUser } = useContext(DiscordUserContext);

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

  const { mutate } = trpc.subscribeToXRC721.useMutation();

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

  const save = () => {
    if (discordUser?.id)
      mutate({
        discordId: discordUser.id || "",
        xrc721: {
          address: "",
          price: priceValue,
          rank: rankValue,
          symbol: "PMNT",
        },
      });
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
        .map((element, index) => ({
          element,
          score: ranksArray[index],
        }))
        .sort((a, b) => a.score - b.score)
        .map((item) => item.element);
      console.log(sortedElements);
      setNfts(sortedElements);
    }
  }, [loading]);

  const minMaxSelection = (title: string, min: number, max: number) => {
    return (
      <div className="min-max-selection">
        <span>{title}</span>
        <div className="min-max">
          <span>{min}</span>
          <span>{max}</span>
          <div className="Collection">
            <div className="collection-hero">
              <span className="collection-title">PrimeNumbers collection</span>
              <div className="collection-illustration">
                <span></span>
                <img
                  src="https://ik.imagekit.io/thearmors/thumbnails/prime_YUL7jg_Xx.jpeg?1688845505733"
                  alt="illustration"
                />
              </div>
            </div>

            <div className="sniping-container">
              <div className="sniping-left">
                <h3>GET YOUR PERSONALIZED NOTIFICATION</h3>
                <FontAwesomeIcon icon={faBell} />
                <span>NFT Sniping</span>
              </div>
              <div className="sniping-right">
                <div className="min-max-selection-container">
                  <div className="min-max-selection">
                    <div className="min-max">
                      <span>RANK</span>
                      <input
                        type="text"
                        onChange={(e) => setRankValue(parseInt(e.target.value))}
                      />
                    </div>
                    <div className="min-max">
                      <span>PRICE</span>
                      <input
                        type="text"
                        onChange={(e) =>
                          setPriceValue(parseInt(e.target.value))
                        }
                      />
                    </div>
                    <button onClick={() => console.log("applied")}>
                      Apply
                    </button>
                  </div>
                </div>
                <div className="filter-by-trait">
                  <span>FILTER BY TRAIT</span>
                  <div className="filters-container">
                    {properties.concat(attributesRarity).map((property) => (
                      <div className="filter-by-trait-item">
                        <input type="checkbox" />
                        <span>{property}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => save()}>SAVE</button>
                </div>
              </div>
            </div>

            <div className="collection-container">
              {nfts.map((nft, index) => (
                <Link
                  to={nft.asset.idAsset}
                  className="collection-item"
                  key={nft.asset.idAsset + index}
                >
                  <span>RANK #{index + 1}</span>
                  <span className="item-name">{nft.asset.name}</span>
                  <img src={nft.asset.files[0].url} alt={nft.asset.name} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <Spinner />;

  return (
    <div className="Collection">
      <div className="collection-hero">
        <span className="collection-title">PrimeNumbers collection</span>
        <div className="collection-illustration">
          <img
            src="https://ik.imagekit.io/thearmors/thumbnails/prime_YUL7jg_Xx.jpeg?1688845505733"
            alt="illustration"
          />
        </div>
      </div>

      <div className="sniping-container">
        <div className="sniping-left">
          <h3>GET YOUR PERSONALIZED NOTIFICATION</h3>
          <FontAwesomeIcon icon={faBell} />
          <span>NFT Sniping</span>
        </div>
        <div className="sniping-right">
          <div className="min-max-selection-container">
            {[
              { title: "RANK", minMax: "Min" },
              { title: "PRICE", minMax: "Max" },
            ].map((item) => (
              <div className="min-max-selection">
                <span>{item.title}</span>
                <div className="min-max">
                  <input type="text" placeholder={item.minMax} />
                </div>
              </div>
            ))}
            <button className='buttonX' onClick={() => console.log("applied")}>Apply</button>
          </div>
          <div className="filter-by-trait">
            <span>FILTER BY TRAIT</span>
            <div className="filters-container">
              {properties.concat(attributesRarity).map((property) => (
                <div className="filter-by-trait-item">
                  <input type="checkbox" />
                  <span>{property}</span>
                </div>
              ))}
            </div>
            <button onClick={() => save()}>SAVE</button>
          </div>
        </div>
      </div>

      <div className="collection-container">
        {nfts.map((nft, index) => (
          <Link
            to={nft.asset.idAsset}
            className="collection-item"
            key={nft.asset.idAsset + index}
          >
            <span>RANK #{index + 1}</span>
            <span className="item-name">{nft.asset.name}</span>
            <img src={nft.asset.files[0].url} alt={nft.asset.name} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Collection;
