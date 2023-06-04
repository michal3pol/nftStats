import { AlchemyApiService } from "../services/AlchemyApiService";
import { NftSale } from "alchemy-sdk";
import { UltraRarityData } from "./../NftsModels";


export class NftSeekerActor {
    
    private alchemyApiService: AlchemyApiService;
    private log: any;

    constructor(
        alchemyApiService: AlchemyApiService
    ) {
        this.alchemyApiService = alchemyApiService;
    }

    async seekNftsForOwner(nftSale: NftSale) {
        const rarity = await this.alchemyApiService.computeRarity(nftSale.contractAddress, nftSale.tokenId)
        const ultraRarity = rarity.filter(
                                attribute => attribute.prevalence <= 0.001
        )
        if (ultraRarity.length == 0) {
            return; 
        }

        const data: UltraRarityData = {
            attributes: ultraRarity,
            buyer: nftSale.buyerAddress,
            seller: nftSale.sellerAddress,
            isSpam: await this.alchemyApiService.isSpamContract(nftSale.contractAddress),
            floorPrice: await this.alchemyApiService.getFloorPrice(nftSale.contractAddress)
        }
        return data;
    }

    static inject() {
        return ["ActorServiceHelper"];
    }

    initialize(selfActor: any) {
        this.log = selfActor.getLog();
    }

}

export default NftSeekerActor;