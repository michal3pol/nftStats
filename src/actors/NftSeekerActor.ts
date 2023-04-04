

class NftSeekerActor {
    constructor() {
        
    }

    async seekNftsForOwner(buyerAddress: string) {
        console.log("this is me actor and i received this address " + buyerAddress)
        //const nfts = await this.alchemyApiService.getNftsForOwner(buyerAddress);
        //console.log("kuap" + nfts.ownedNfts)
        return "bajojajo"; 
    }

}

module.exports = NftSeekerActor;
