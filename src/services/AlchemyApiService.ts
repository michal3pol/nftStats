import { Network, Alchemy, GetTransfersForContractOptions, GetNftSalesOptions } from 'alchemy-sdk';

const settings = {
    apiKey: "TyH5Xni9Axsxqi8Wo0PWH5wqjqSZBV1j",
    network: Network.ETH_MAINNET,
};

export class AlchemyApiService {
    constructor() { }

    alchemy = new Alchemy(settings);

    async getNftsForContract(address: string) {
        return await this.alchemy.nft
            .getNftsForContract(address);
    }

    async computeRarity(address: string, tokenId: string) {
        return await this.alchemy.nft.computeRarity(address, tokenId)
    }

    async getTransfersForContract(address: string, options?: GetTransfersForContractOptions) {
        return await this.alchemy.nft.getTransfersForContract(address, options)
    }

    async getNftSales(options?: GetNftSalesOptions) {
        return await this.alchemy.nft.getNftSales(options)
    }

    async getNftsForOwner(owner: string) {
        return await this.alchemy.nft.getNftsForOwner(owner)
    }

} 
export default AlchemyApiService;