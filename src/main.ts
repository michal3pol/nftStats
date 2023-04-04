import { NftSaleMarketplace } from "alchemy-sdk";
import { AlchemyApiService } from "./services/AlchemyApiService"

/*
    CONFIGURATION
*/
// go to https://opensea.io/ and search for trending collections
// 0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258 -> Otherdeed is the key to claiming land in Otherside
const conctractAddress = "0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258"; 



export class NftSeekerActor {
    
    constructor() {
        
    }

    async seekNftsForOwner(buyerAddress: string) {
        console.log("this is me actor and i received this address " + buyerAddress)
        //const alchemyApiService = new AlchemyApiService();
        //const nfts = await alchemyApiService.getNftsForOwner(buyerAddress);
        return "bajo jajo"; 
    }

}

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

        /*
            COMEDY FRAMEWORK
        */  
        var actors = require('comedy');
        var P = require('bluebird');
        var actorSystem = actors();

        let options = {
            marketplace: NftSaleMarketplace.SEAPORT,
        };
        const nftSalesResponse = await this.alchemyApiService.getNftSales(options);
        console.log(nftSalesResponse.nftSales.length)
        for(let i =0 ; i< 7; i++) {
            console.log(nftSalesResponse.nftSales[i].buyerAddress)
        }
        

        actorSystem
        // Get a root actor reference.
        .rootActor()
        // Create a class-defined child actor.
        .then((rootActor: any) => rootActor.createChild(NftSeekerActor, {
            mode: 'forked', // Spawn separate process.
            clusterSize: 3 // Spawn 3 instances of this actor to load-balance over.
        }))
        .then((myActor: any) => {
            // Sequentially send 6 messages to our newly-created actor cluster.
            // The messages will be load-balanced between 3 forked actors using
            // the default balancing strategy (round-robin).
            return P.each([0, 1, 2, 3, 4, 5, 6], (number: any) => {
            return myActor.sendAndReceive('seekNftsForOwner', nftSalesResponse.nftSales[number].buyerAddress)
                .then((reply: any) => {
                console.log(`Actor replied: ${reply}`);
                });
            });
        })
        .catch((err:any) => {
            console.error(err);
          })
        .finally(() => actorSystem.destroy());


    }


}