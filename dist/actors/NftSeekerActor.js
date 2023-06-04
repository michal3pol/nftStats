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
exports.NftSeekerActor = void 0;
class NftSeekerActor {
    constructor(alchemyApiService) {
        this.alchemyApiService = alchemyApiService;
    }
    seekNftsForOwner(nftSale) {
        return __awaiter(this, void 0, void 0, function* () {
            const rarity = yield this.alchemyApiService.computeRarity(nftSale.contractAddress, nftSale.tokenId);
            const ultraRarity = rarity.filter(attribute => attribute.prevalence <= 0.001);
            if (ultraRarity.length == 0) {
                return;
            }
            const data = {
                attributes: ultraRarity,
                buyer: nftSale.buyerAddress,
                seller: nftSale.sellerAddress,
                isSpam: yield this.alchemyApiService.isSpamContract(nftSale.contractAddress),
                floorPrice: yield this.alchemyApiService.getFloorPrice(nftSale.contractAddress)
            };
            return data;
        });
    }
    static inject() {
        return ["ActorServiceHelper"];
    }
    initialize(selfActor) {
        this.log = selfActor.getLog();
    }
}
exports.NftSeekerActor = NftSeekerActor;
exports.default = NftSeekerActor;
