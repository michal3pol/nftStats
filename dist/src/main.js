"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const alchemy_sdk_1 = require("alchemy-sdk");
/*
    CONFIGURATION
*/
// go to https://opensea.io/ and search for trending collections
// 0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258 -> Otherdeed is the key to claiming land in Otherside
const conctractAddress = "0x34d85c9CDeB23FA97cb08333b511ac86E1C4E258";
class Main {
    constructor(alchemyApiService) {
        this.alchemyApiService = alchemyApiService;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
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
                marketplace: alchemy_sdk_1.NftSaleMarketplace.SEAPORT,
            };
            const nftSalesResponse = yield this.alchemyApiService.getNftSales(options);
            // console.log(nftSalesResponse.nftSales.length)
            // for(let i =0 ; i< 7; i++) {
            //     console.log(nftSalesResponse.nftSales[i].buyerAddress)
            // }
            var actorSystem = actors({
                resources: ["/dist/src/actors/ActorServiceHelper"]
            });
            actorSystem
                // Get a root actor reference.
                .rootActor()
                // Create a class-defined child actor.
                .then((rootActor) => rootActor.createChild('/dist/src/actors/NftSeekerActor', {
                mode: 'forked',
                clusterSize: 3 // Spawn 3 instances of this actor to load-balance over.
            }))
                .then((myActor) => {
                // Sequentially send messages to our newly-created actor cluster.
                // The messages will be load-balanced between 3 forked actors using
                // the default balancing strategy (round-robin).
                return P.each([0, 1, 2, 3, 4, 5, 6], (number) => {
                    return myActor.sendAndReceive('seekNftsForOwner', nftSalesResponse.nftSales[number].buyerAddress)
                        .then((reply) => {
                        console.log(`Actor replied: ${reply}`);
                    });
                });
            })
                .catch((err) => {
                console.error(err);
            })
                .finally(() => actorSystem.destroy());
            const used = process.memoryUsage().heapUsed / 1024 / 1024;
            console.log(`The script uses approximately ${used} MB`);
        });
    }
}
exports.Main = Main;
