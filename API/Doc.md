## Endpoint
### POST /add-NFT-wish
Creates a new NFT buy wish.
Request body should be JSON with the following properties:
- userAddress (string): The Ethereum address of the user.
- contractAddress (string): The contract address of the NFT.
- rarity (number): The rarity of the NFT.
- priceThreshold (number): The price threshold for the NFT buy wish.
Returns the created NFT buy wish.