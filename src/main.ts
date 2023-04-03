import { NftSaleMarketplace } from "alchemy-sdk";
import { AlchemyApiService } from "./services/AlchemyApiService"

/*
    CONFIGURATION
*/
// go to https://opensea.io/ and search for trending collections
// 0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258 -> Otherdeed is the key to claiming land in Otherside
const conctractAddress = "0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258"; 

export class Main {

    constructor(
        private alchemyApiService: AlchemyApiService
    ) {
    }

    async execute() {
        // const nftCollection = await this.alchemyApiService.getNftsForContract(conctractAddress);    
        
        // for(let i=0; i<4 ; i++){
        //     console.log("------------------------------------------------")
        //     const response = await this.alchemyApiService.computeRarity(nftCollection.nfts[i].contract.address, nftCollection.nfts[i].tokenId);
        //     console.log(response)
        // }

        // const result = await this.alchemyApiService.getTransfersForContract(conctractAddress);
        // console.log(result)

        // let options = {
        //     pageKey: result.pageKey,
        // };

        // const result2 = await this.alchemyApiService.getTransfersForContract(conctractAddress, options);
        // console.log(result2)


        let options = {
            marketplace: NftSaleMarketplace.SEAPORT,
        };
        const result = await this.alchemyApiService.getNftSales(options);
        console.log(result.nftSales.length)

    }


}