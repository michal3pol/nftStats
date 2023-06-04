import { NftSaleMarketplace } from "alchemy-sdk";
import { UltraRarityData } from "./NftsModels";
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

        /*
            COMEDY FRAMEWORK
        */  
        var actors = require('comedy');
        var P = require('bluebird');
        const fs = require('fs');

        var actorSystem = actors();

        let options = {
            marketplace: NftSaleMarketplace.SEAPORT,
        };
        const nftSalesResponse = await this.alchemyApiService.getNftSales(options);
        // console.log(nftSalesResponse.nftSales.length)
        // for(let i =0 ; i< 7; i++) {
        //     console.log(nftSalesResponse.nftSales[i].buyerAddress)
        // }

        var actorSystem = actors({
            resources: ["/dist/actors/ActorServiceHelper"]
          });

        // number of responses to search 
        const N = 10;
        const arrIterator = Array.from({ length: N }, (_, index) => index + 1);

        var programOutput!: UltraRarityData[];

        actorSystem
        // Get a root actor reference.
        .rootActor()
        // Create a class-defined child actor.
        .then((rootActor: any) => rootActor.createChild('/dist/actors/NftSeekerActor', {
            mode: 'forked', // Spawn separate process.
            clusterSize: 3 // Spawn instances of this actor to load-balance over.
        }))
        .then((myActor: any) => {
            // Sequentially send messages to our newly-created actor cluster.
            // The messages will be load-balanced between forked actors using
            // the default balancing strategy (round-robin).
            return P.each(arrIterator, (number: any) => {
            return myActor.sendAndReceive('seekNftsForOwner', nftSalesResponse.nftSales[number])
                .then((reply: any) => {
                    if (reply != undefined) {
                        // programOutput.push(reply);
                        console.log(reply);
                        // console.log(`Actor replied: ${JSON.stringify(reply)}`);
                    } else {
                        console.log("Nothing interesting")
                    }

                });
            });
        })
        .catch((err:any) => {
            console.error(err);
          })
            .finally(() => {

                actorSystem.destroy()

//                fs.writeFile("output.json", JSON.stringify(programOutput), 'utf8', function (err: any) {
//                    if (err) {
//                        console.log("An error occured while writing JSON Object to File.");
//                        return console.log(err);
//                    }
//
//                    console.log("JSON file has been saved.");
//                });
            });


        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`The script uses approximately ${used} MB`);
    }


}