import { GetFloorPriceResponse, NftAttributeRarity } from "alchemy-sdk";

export interface NftMetadata {
    contract: string;
    tokenId: number;
    tokenType: string;
    title: string;
    description: string;
    timeLastUpdated: string;
    meradataError: string;
    rawMetadata: string;
    tokenUri: string;
    media: string;
    spamInfo: string;

} 

export interface UltraRarityData {
    attributes: NftAttributeRarity [],
    seller: string,
    buyer: string;
    isSpam: boolean;
    floorPrice: GetFloorPriceResponse;
}

