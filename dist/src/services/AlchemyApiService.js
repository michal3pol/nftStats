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
exports.AlchemyApiService = void 0;
const alchemy_sdk_1 = require("alchemy-sdk");
const settings = {
    apiKey: "TyH5Xni9Axsxqi8Wo0PWH5wqjqSZBV1j",
    network: alchemy_sdk_1.Network.ETH_MAINNET,
};
class AlchemyApiService {
    constructor() {
        this.alchemy = new alchemy_sdk_1.Alchemy(settings);
    }
    getNftsForContract(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.alchemy.nft
                .getNftsForContract(address);
        });
    }
    computeRarity(address, tokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.alchemy.nft.computeRarity(address, tokenId);
        });
    }
    getTransfersForContract(address, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.alchemy.nft.getTransfersForContract(address, options);
        });
    }
    getNftSales(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.alchemy.nft.getNftSales(options);
        });
    }
    getNftsForOwner(owner) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.alchemy.nft.getNftsForOwner(owner);
        });
    }
}
exports.AlchemyApiService = AlchemyApiService;
exports.default = AlchemyApiService;
